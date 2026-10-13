import fs from 'fs';
import path from 'path';
import { cdmoData } from '@/data/cdmoData';
import type { CDMOPage } from '@/data/cdmoData';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const STORAGE_FILE = path.join(DATA_DIR, 'storedPages.json');

/**
 * Initializes the storage file with default cdmoData if it doesn't already exist.
 * Also ensures newly introduced default pages (such as 'home') exist in storage.
 */
function ensureStorageFileExists(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(STORAGE_FILE)) {
      // Initialize with cdmoData, marking defaults as published
      const initialPages = cdmoData.map((p) => ({
        ...p,
        isPublished: true,
        hasUnpublishedChanges: false,
        status: 'published' as const,
        lastPublishedAt: new Date().toISOString(),
        lastSavedAt: new Date().toISOString(),
      }));
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(initialPages, null, 2), 'utf-8');
      return;
    }

    // If file exists, check if any default pages are missing and add them
    const content = fs.readFileSync(STORAGE_FILE, 'utf-8');
    const parsed: CDMOPage[] = JSON.parse(content);
    if (Array.isArray(parsed)) {
      let changed = false;
      for (const defPage of cdmoData) {
        const foundIdx = parsed.findIndex(
          (p) =>
            p.category.toLowerCase() === defPage.category.toLowerCase() &&
            p.slug.toLowerCase() === defPage.slug.toLowerCase()
        );
        if (foundIdx === -1) {
          parsed.push({
            ...defPage,
            isPublished: true,
            hasUnpublishedChanges: false,
            status: 'published',
            lastPublishedAt: new Date().toISOString(),
            lastSavedAt: new Date().toISOString(),
          });
          changed = true;
        } else {
          // If default page exists, make sure heroVideo on home is fixed to /videos/hero5.mp4 if it had /cta-bg-video.mp4 or /videos/newhero.mp4
          if (
            defPage.category === 'home' &&
            defPage.slug === 'home' &&
            (parsed[foundIdx].heroVideo === '/cta-bg-video.mp4' || parsed[foundIdx].heroVideo === '/videos/newhero.mp4')
          ) {
            parsed[foundIdx].heroVideo = '/videos/hero5.mp4';
            changed = true;
          }
        }
      }
      if (changed) {
        fs.writeFileSync(STORAGE_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
      }
    }
  } catch (error) {
    console.error('Error initializing storedPages.json:', error);
  }
}

/**
 * Reads raw page records directly from storedPages.json.
 */
function getRawStoredRecords(): CDMOPage[] {
  ensureStorageFileExists();
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const content = fs.readFileSync(STORAGE_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading storedPages.json:', error);
  }
  return cdmoData.map((p) => ({
    ...p,
    isPublished: true,
    hasUnpublishedChanges: false,
    status: 'published',
  }));
}

/**
 * Reads all stored pages.
 * - If includeDrafts = false (default): Returns only published versions (for public site visitors).
 * - If includeDrafts = true: Returns draft-merged pages with admin metadata.
 */
export function getAllStoredPages(options: { includeDrafts?: boolean } = {}): CDMOPage[] {
  const records = getRawStoredRecords();

  if (options.includeDrafts) {
    return records.map((rec) => {
      if (rec.draftContent && Object.keys(rec.draftContent).length > 0) {
        return {
          ...rec,
          ...rec.draftContent,
          isPublished: rec.isPublished !== false,
          hasUnpublishedChanges: true,
          status: rec.isPublished === false ? 'draft' : 'modified',
          lastSavedAt: rec.lastSavedAt,
          lastPublishedAt: rec.lastPublishedAt,
          draftContent: rec.draftContent,
        } as CDMOPage;
      }
      return {
        ...rec,
        isPublished: rec.isPublished !== false,
        hasUnpublishedChanges: Boolean(rec.hasUnpublishedChanges),
        status: rec.isPublished === false ? 'draft' : (rec.hasUnpublishedChanges ? 'modified' : 'published'),
      };
    });
  }

  // Normal public website view: ONLY return published pages with published content (strip draft modifications)
  return records
    .filter((rec) => rec.isPublished !== false)
    .map((rec) => {
      // Create clean published page object without draftContent
      const published = { ...rec };
      delete published.draftContent;
      return published;
    });
}

/**
 * Finds a specific page by category and slug (case-insensitive & URL-decoded).
 * - For normal visitors: returns ONLY the published version. Returns null if unpublished.
 * - If options.previewDraft === true: merges working draft for live admin preview.
 */
export function getStoredPage(
  category: string,
  slug: string,
  options: { previewDraft?: boolean } = {}
): CDMOPage | null {
  const normCat = decodeURIComponent(category || '').toLowerCase();
  const normSlug = decodeURIComponent(slug || '').toLowerCase();
  const records = getRawStoredRecords();

  const found = records.find(
    (p) =>
      p.category.toLowerCase() === normCat &&
      p.slug.toLowerCase() === normSlug
  );

  if (found) {
    // If previewing draft
    if (options.previewDraft) {
      if (found.draftContent && Object.keys(found.draftContent).length > 0) {
        return {
          ...found,
          ...found.draftContent,
          isPublished: found.isPublished !== false,
          hasUnpublishedChanges: true,
        };
      }
      return found;
    }

    // Normal visitor request
    // If page is draft-only and not yet published, do not expose to public
    if (found.isPublished === false) {
      return null;
    }

    // Return the pure published version (without unpublished draft edits)
    const cleanPublished = { ...found };
    delete cleanPublished.draftContent;
    return cleanPublished;
  }

  // Fallback check against static cdmoData (default pages are published by default)
  const defaultPage = cdmoData.find(
    (p) =>
      p.category.toLowerCase() === normCat &&
      p.slug.toLowerCase() === normSlug
  );

  return defaultPage ? { ...defaultPage, isPublished: true, status: 'published' } : null;
}

/**
 * Retrieves the draft page specifically for the Admin Editor.
 * Merges any existing draftContent over the base page so admin can continue working on unsaved drafts.
 */
export function getDraftPageForAdmin(category: string, slug: string): CDMOPage | null {
  const normCat = decodeURIComponent(category || '').toLowerCase();
  const normSlug = decodeURIComponent(slug || '').toLowerCase();
  const records = getRawStoredRecords();

  const found = records.find(
    (p) =>
      p.category.toLowerCase() === normCat &&
      p.slug.toLowerCase() === normSlug
  );

  if (found) {
    if (found.draftContent && Object.keys(found.draftContent).length > 0) {
      return {
        ...found,
        ...found.draftContent,
        isPublished: found.isPublished !== false,
        hasUnpublishedChanges: true,
        status: found.isPublished === false ? 'draft' : 'modified',
        lastSavedAt: found.lastSavedAt,
        lastPublishedAt: found.lastPublishedAt,
        draftContent: found.draftContent,
      };
    }
    return {
      ...found,
      isPublished: found.isPublished !== false,
      hasUnpublishedChanges: Boolean(found.hasUnpublishedChanges),
      status: found.isPublished === false ? 'draft' : 'published',
    };
  }

  // Fallback check against static cdmoData
  const defaultPage = cdmoData.find(
    (p) =>
      p.category.toLowerCase() === normCat &&
      p.slug.toLowerCase() === normSlug
  );

  return defaultPage ? { ...defaultPage, isPublished: true, status: 'published' } : null;
}

/**
 * Saves a page as a DRAFT.
 * This updates only the draftContent and marks hasUnpublishedChanges = true.
 * THE LIVE WEBSITE IS UNTOUCHED AND WILL NOT SHOW THESE CHANGES UNTIL PUBLISHED.
 */
export function saveDraftPage(updatedDraft: CDMOPage): CDMOPage {
  ensureStorageFileExists();
  const allRecords = getRawStoredRecords();

  const targetCat = updatedDraft.category.toLowerCase();
  const targetSlug = updatedDraft.slug.toLowerCase();

  const existingIdx = allRecords.findIndex(
    (p) =>
      p.category.toLowerCase() === targetCat &&
      p.slug.toLowerCase() === targetSlug
  );

  const nowIso = new Date().toISOString();

  // Create a clean draft payload (omit nested draftContent)
  const draftPayload = { ...updatedDraft };
  delete draftPayload.draftContent;

  if (existingIdx >= 0) {
    const existing = allRecords[existingIdx];
    allRecords[existingIdx] = {
      ...existing,
      hasUnpublishedChanges: true,
      lastSavedAt: nowIso,
      status: existing.isPublished === false ? 'draft' : 'modified',
      draftContent: draftPayload,
    };
  } else {
    // Brand new custom page created in draft mode
    allRecords.push({
      ...draftPayload,
      isPublished: false,
      hasUnpublishedChanges: true,
      status: 'draft',
      createdAt: nowIso,
      lastSavedAt: nowIso,
      draftContent: draftPayload,
    });
  }

  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(allRecords, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write draft to storedPages.json:', error);
    throw new Error('Failed to persist draft changes.');
  }

  return getDraftPageForAdmin(updatedDraft.category, updatedDraft.slug) || updatedDraft;
}

/**
 * Publishes a page to the LIVE website.
 * Copies the current draft (or passed pageData) into the published top-level fields,
 * clears draftContent, marks hasUnpublishedChanges = false, and sets isPublished = true.
 */
export function publishStoredPage(category: string, slug: string, pageDataToPublish?: CDMOPage): CDMOPage {
  ensureStorageFileExists();
  const allRecords = getRawStoredRecords();

  const targetCat = decodeURIComponent(category).toLowerCase();
  const targetSlug = decodeURIComponent(slug).toLowerCase();

  const existingIdx = allRecords.findIndex(
    (p) =>
      p.category.toLowerCase() === targetCat &&
      p.slug.toLowerCase() === targetSlug
  );

  const nowIso = new Date().toISOString();

  let targetContent: CDMOPage;

  if (existingIdx >= 0) {
    const existing = allRecords[existingIdx];
    const source = pageDataToPublish || existing.draftContent || existing;
    const cleanSource = { ...source };
    delete cleanSource.draftContent;

    targetContent = {
      ...existing,
      ...cleanSource,
      isPublished: true,
      hasUnpublishedChanges: false,
      status: 'published',
      lastPublishedAt: nowIso,
      lastSavedAt: nowIso,
      updatedAt: nowIso,
    };
    delete targetContent.draftContent;

    allRecords[existingIdx] = targetContent;
  } else {
    const source = pageDataToPublish || {
      slug: targetSlug,
      category: targetCat,
      title: 'New Page',
      metaTitle: 'New Page',
      metaDesc: '',
      heading: 'New Page Heading',
      description: '',
      sections: [],
    };
    const cleanSource = { ...source };
    delete cleanSource.draftContent;

    targetContent = {
      ...cleanSource,
      isPublished: true,
      hasUnpublishedChanges: false,
      status: 'published',
      createdAt: nowIso,
      lastPublishedAt: nowIso,
      lastSavedAt: nowIso,
      updatedAt: nowIso,
    };
    allRecords.push(targetContent);
  }

  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(allRecords, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to publish to storedPages.json:', error);
    throw new Error('Failed to publish page changes.');
  }

  return targetContent;
}

/**
 * Reverts any unpublished draft changes back to the currently published live version.
 */
export function revertDraftPage(category: string, slug: string): CDMOPage {
  ensureStorageFileExists();
  const allRecords = getRawStoredRecords();

  const targetCat = decodeURIComponent(category).toLowerCase();
  const targetSlug = decodeURIComponent(slug).toLowerCase();

  const existingIdx = allRecords.findIndex(
    (p) =>
      p.category.toLowerCase() === targetCat &&
      p.slug.toLowerCase() === targetSlug
  );

  if (existingIdx === -1) {
    throw new Error('Page not found to revert.');
  }

  const existing = allRecords[existingIdx];
  const reverted: CDMOPage = {
    ...existing,
    hasUnpublishedChanges: false,
    status: existing.isPublished === false ? 'draft' : 'published',
  };
  delete reverted.draftContent;

  allRecords[existingIdx] = reverted;

  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(allRecords, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to revert draft in storedPages.json:', error);
    throw new Error('Failed to revert draft.');
  }

  return reverted;
}

/**
 * Unpublishes a page (takes it offline from public visitors, keeping it as draft).
 */
export function unpublishStoredPage(category: string, slug: string): CDMOPage {
  ensureStorageFileExists();
  const allRecords = getRawStoredRecords();

  const targetCat = decodeURIComponent(category).toLowerCase();
  const targetSlug = decodeURIComponent(slug).toLowerCase();

  const existingIdx = allRecords.findIndex(
    (p) =>
      p.category.toLowerCase() === targetCat &&
      p.slug.toLowerCase() === targetSlug
  );

  if (existingIdx === -1) {
    throw new Error('Page not found to unpublish.');
  }

  const existing = allRecords[existingIdx];
  allRecords[existingIdx] = {
    ...existing,
    isPublished: false,
    status: 'draft',
    hasUnpublishedChanges: true,
  };

  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(allRecords, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to unpublish page in storedPages.json:', error);
    throw new Error('Failed to unpublish page.');
  }

  return allRecords[existingIdx];
}

/**
 * General save helper. If publish = true, publishes live. Else saves as draft.
 */
export function saveStoredPage(updatedPage: CDMOPage, options: { publish?: boolean } = {}): CDMOPage {
  if (options.publish) {
    return publishStoredPage(updatedPage.category, updatedPage.slug, updatedPage);
  }
  return saveDraftPage(updatedPage);
}

/**
 * Deletes a custom page or resets an edited page back to default cdmoData.
 */
export function deleteStoredPage(category: string, slug: string): { success: boolean; isReset: boolean } {
  ensureStorageFileExists();
  const normCat = decodeURIComponent(category).toLowerCase();
  const normSlug = decodeURIComponent(slug).toLowerCase();

  const allPages = getRawStoredRecords();
  const defaultPage = cdmoData.find(
    (p) =>
      p.category.toLowerCase() === normCat &&
      p.slug.toLowerCase() === normSlug
  );

  const existingIdx = allPages.findIndex(
    (p) =>
      p.category.toLowerCase() === normCat &&
      p.slug.toLowerCase() === normSlug
  );

  if (existingIdx === -1) {
    return { success: false, isReset: false };
  }

  if (defaultPage) {
    // Reset to default cdmoData entry (cleanly published)
    allPages[existingIdx] = {
      ...JSON.parse(JSON.stringify(defaultPage)),
      isPublished: true,
      hasUnpublishedChanges: false,
      status: 'published',
      lastPublishedAt: new Date().toISOString(),
      lastSavedAt: new Date().toISOString(),
    };
    delete (allPages[existingIdx] as any).draftContent;
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(allPages, null, 2), 'utf-8');
    return { success: true, isReset: true };
  } else {
    // Remove custom page completely
    const filtered = allPages.filter(
      (p) =>
        !(p.category.toLowerCase() === normCat && p.slug.toLowerCase() === normSlug)
    );
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    return { success: true, isReset: false };
  }
}
