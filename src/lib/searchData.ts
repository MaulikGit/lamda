import { cdmoData } from '@/data/cdmoData';
import { insightsData, INSIGHT_TABS } from '@/data/insightsData';
import { faqs } from '@/data/faqs';

export interface SearchResultItem {
  id: string;
  title: string;
  category: 'Services' | 'Manufacturing' | 'Facility & Locations' | 'Modalities' | 'Insights' | 'Overview' | 'FAQs';
  subcategory?: string;
  description: string;
  href: string;
  badge?: string;
  tags?: string[];
  iconType?: string;
}

// Pre-indexed static items
export function getSearchIndex(): SearchResultItem[] {
  const items: SearchResultItem[] = [];

  // 1. CDMO Pages (Services, Manufacturing, Modalities, Facilities, Overview)
  cdmoData.forEach((page) => {
    let categoryName: SearchResultItem['category'] = 'Services';
    if (page.category === 'manufacturing') categoryName = 'Manufacturing';
    else if (page.category === 'modalities') categoryName = 'Modalities';
    else if (page.category === 'facility&location') categoryName = 'Facility & Locations';
    else if (page.category === 'overview') categoryName = 'Overview';

    const tags: string[] = [];
    if (page.capabilities) tags.push(...page.capabilities);
    if (page.sections) {
      page.sections.forEach((s) => {
        if (s.title) tags.push(s.title);
        if (s.bullets) tags.push(...s.bullets);
      });
    }

    items.push({
      id: `page-${page.category}-${page.slug}`,
      title: page.heading || page.title.replace(' — Lambda CDMO', ''),
      category: categoryName,
      subcategory: page.badge || page.category,
      description: page.description.slice(0, 160) + (page.description.length > 160 ? '...' : ''),
      href: `/${page.category}/${page.slug}`,
      badge: page.badge,
      tags: tags.slice(0, 15),
    });
  });

  // 2. Add Top-Level hub pages
  items.push(
    {
      id: 'hub-services',
      title: 'Services & Capabilities Overview',
      category: 'Services',
      description: 'End-to-end biologics development from cell line engineering to regulatory filing dossiers.',
      href: '/services',
      badge: 'All Services',
      tags: ['Cell Line', 'Upstream', 'Downstream', 'Analytical', 'Formulation'],
    },
    {
      id: 'hub-manufacturing',
      title: 'Biomanufacturing Overview',
      category: 'Manufacturing',
      description: 'cGMP drug substance and drug product manufacturing suites with single-use bioreactor trains.',
      href: '/manufacturing',
      badge: 'GMP Suites',
      tags: ['Drug Substance', 'Drug Product', 'Aseptic Filling', 'Lyophilization', 'Bioreactors'],
    },
    {
      id: 'hub-facilities',
      title: 'Global Facilities & Locations',
      category: 'Facility & Locations',
      description: 'Explore our Ahmedabad, India cGMP Facility and London, UK Innovation Hub.',
      href: '/facility&location',
      badge: 'Global Footprint',
      tags: ['Ahmedabad', 'India', 'London', 'UK', 'Facility', 'Cleanrooms'],
    },
    {
      id: 'facility-india',
      title: 'Ahmedabad Facility — India cGMP Facility',
      category: 'Facility & Locations',
      description: 'Integrated process and analytical development combined with cGMP manufacturing for drug substance and drug product.',
      href: '/facility&location/India',
      badge: 'Ahmedabad, India',
      tags: ['Bioreactor', 'Upstream GMP', 'Downstream GMP', 'Fill Finish', 'Cleanrooms', 'Estonia', 'India'],
    },
    {
      id: 'facility-uk',
      title: 'London Facility — UK Innovation Hub',
      category: 'Facility & Locations',
      description: 'Advanced biologics development supporting early-stage process, analytical characterization, and tech transfer.',
      href: '/facility&location/UK',
      badge: 'London, UK',
      tags: ['UK', 'London', 'Innovation', 'Analytics', 'Microscopy', 'Characterization'],
    },
    {
      id: 'virtual-tour',
      title: '360° Interactive Virtual Tour',
      category: 'Facility & Locations',
      description: 'Explore the 360-degree interactive virtual tour of our cleanroom suites, analytical labs, and manufacturing bays.',
      href: '/virtual-tour/00%20MAIN%20BUILDING/index.htm',
      badge: 'Virtual Tour',
      tags: ['Virtual Tour', '360', 'Cleanroom', 'Labs', 'Walkthrough'],
    },
    {
      id: 'overview-leadership',
      title: 'Leadership Team',
      category: 'Overview',
      description: 'Meet the executive leadership and scientific advisory team guiding Lambda CDMO.',
      href: '/overview/leadership',
      badge: 'Executive Team',
      tags: ['Dr. M.S. Ramakrishnan', 'Dr. Ashis Saha', 'Management', 'Scientists', 'Directors'],
    },
    {
      id: 'overview-about',
      title: 'About Lambda CDMO',
      category: 'Overview',
      description: 'Accelerating therapeutic programs from gene to clinic with scientific excellence and regulatory compliance.',
      href: '/overview/about',
      badge: 'About Us',
      tags: ['History', 'Mission', 'Vision', 'Partnership', 'Quality'],
    },
    {
      id: 'overview-integrated',
      title: 'Integrated Biologics Development',
      category: 'Overview',
      description: 'End-to-end development workflows combining molecular biology, bioprocess, formulation, and GMP release.',
      href: '/overview/integrated',
      badge: 'Integrated Path',
      tags: ['End-to-end', 'Gene to Clinic', 'Tech Transfer', 'Quality Systems'],
    },
    {
      id: 'contact-us',
      title: 'Contact Us & Technical Inquiry',
      category: 'Overview',
      description: 'Connect with our technical business development team for RFP requests, audits, or program consultations.',
      href: '/contact',
      badge: 'Get in Touch',
      tags: ['Contact', 'RFP', 'Proposal', 'Inquiry', 'Consultation'],
    }
  );

  // 3. Insights Articles (Blogs, Case Studies, Brochures, News, Events)
  Object.entries(insightsData).forEach(([categoryKey, itemsList]) => {
    const tabConfig = INSIGHT_TABS.find((t) => t.slug === categoryKey);
    const tabLabel = tabConfig ? tabConfig.label : categoryKey;

    itemsList.forEach((article) => {
      const tags: string[] = [...(article.tags || []), ...(article.keyTakeaways || [])];
      items.push({
        id: `insight-${article.id}`,
        title: article.title,
        category: 'Insights',
        subcategory: tabLabel,
        description: article.summary,
        href: `/insights/${article.category}/${article.slug || article.id}`,
        badge: article.badge || tabLabel,
        tags,
      });
    });
  });

  // 4. FAQs
  faqs.forEach((faq) => {
    items.push({
      id: `faq-${faq.id}`,
      title: faq.question,
      category: 'FAQs',
      subcategory: 'Frequently Asked Question',
      description: faq.answer,
      href: `/faqs`,
      badge: 'FAQ',
      tags: ['Question', 'Answer', 'Help', 'FAQ'],
    });
  });

  return items;
}

export function searchSite(query: string, categoryFilter?: string): SearchResultItem[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const searchIndex = getSearchIndex();
  const searchTerms = trimmed.split(/\s+/).filter(Boolean);

  const scoredResults = searchIndex
    .map((item) => {
      if (categoryFilter && categoryFilter !== 'All' && item.category !== categoryFilter) {
        return { item, score: 0 };
      }

      let score = 0;
      const titleLower = item.title.toLowerCase();
      const descLower = item.description.toLowerCase();
      const badgeLower = (item.badge || '').toLowerCase();
      const subcatLower = (item.subcategory || '').toLowerCase();
      const tagsLower = (item.tags || []).join(' ').toLowerCase();

      // Exact title match gets huge score
      if (titleLower === trimmed) score += 100;
      else if (titleLower.includes(trimmed)) score += 50;

      // Check each word term
      for (const term of searchTerms) {
        if (titleLower.includes(term)) score += 25;
        if (badgeLower.includes(term)) score += 20;
        if (subcatLower.includes(term)) score += 15;
        if (descLower.includes(term)) score += 10;
        if (tagsLower.includes(term)) score += 12;
      }

      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);

  return scoredResults;
}
