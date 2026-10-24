import { notFound, redirect } from 'next/navigation';
import { cdmoData } from '@/data/cdmoData';
import { getStoredPage, getAllStoredPages } from '@/lib/pagesStorage';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';
import OverviewLayout from '@/components/page-layouts/OverviewLayout';
import ServiceLayout from '@/components/page-layouts/ServiceLayout';
import ManufacturingLayout from '@/components/page-layouts/ManufacturingLayout';
import CharacterizationLayout from '@/components/page-layouts/CharacterizationLayout';
import ModalityLayout from '@/components/page-layouts/ModalityLayout';
import InsightsLayout from '@/components/page-layouts/InsightsLayout';
import ModularPageLayout from '@/components/page-layouts/ModularPageLayout';
import DynamicSectionRenderer from '@/components/DynamicSectionRenderer';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  const allPages = getAllStoredPages();
  return allPages
    .filter((page) => page.category !== 'home' && page.slug !== 'home' && page.slug !== page.category)
    .map((page) => ({
      category: page.category,
      slug: page.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category: rawCategory, slug: rawSlug } = await params;
  const category = decodeURIComponent(rawCategory);
  const slug = decodeURIComponent(rawSlug);
  const page = getStoredPage(category, slug);

  if (!page) {
    return {
      title: 'Page Not Found - Lambda CDMO',
    };
  }

  return {
    title: `${page.title} | Lambda CDMO`,
    description: page.metaDesc || page.description,
  };
}

function getDynamicContent(
  category: string,
  slug: string,
  pageTitle: string,
  existingSections: CDMOPage['sections'],
  existingStats: CDMOPage['stats'],
  existingSpecs: CDMOPage['specs']
) {
  const sections = [...(existingSections || [])];

  const defaultImages = [
    '/images/benefit_accelerate.png',
    '/images/default_analytics.png',
    '/images/hero_cleanroom.png',
    '/images/default_scientist.png',
    '/images/benefit_succeed.png'
  ];

  function getUniqueBentoImage(cat: string, pageSlug: string, idx: number) {
    if (cat === 'overview' && pageSlug === 'about') {
      const imgs = [
        '/images/cdn/unsplash-1582719471384-894fbb16e074.jpg',
        '/images/cdn/unsplash-1532094349884-543bc11b234d.jpg',
        '/images/default_scientist.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'overview' && pageSlug === 'leadership') {
      const imgs = [
        '/images/teamwork.png',
        '/images/cdn/unsplash-1522071820081-009f0129c71c.jpg',
        '/images/cdn/unsplash-1552664730-d307ca884978.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if ((cat === 'overview' || cat === 'facility&location') && (pageSlug === 'facility' || pageSlug === 'India' || pageSlug.toLowerCase() === 'india')) {
      const imgs = [
        '/images/CDMOblue.png',
        '/images/celldev.png',
        '/images/equipment1.png',
        '/images/cgmp2.png',
        '/images/equipment2.png',
        '/images/equipment3.png',
        '/images/cGMP.png',
      ];
      return imgs[idx % imgs.length];
    }
    if ((cat === 'overview' || cat === 'facility&location') && (pageSlug === 'london' || pageSlug === 'UK' || pageSlug.toLowerCase() === 'uk')) {
      const imgs = [
        '/images/Lab.jpg',
        '/images/development.jpg',
        '/images/default_scientist.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'overview' && pageSlug === 'integrated') {
      const imgs = [
        '/images/development.jpg',
        '/images/cdn/unsplash-1532187863486-abf9dbad1b69.jpg',
        '/images/cdn/unsplash-1532094349884-543bc11b234d.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'overview' && pageSlug === 'quality') {
      const imgs = [
        '/images/Lab.jpg',
        '/images/development.jpg',
        '/images/default_scientist.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'overview' && pageSlug === 'careers') {
      const imgs = [
        '/images/cdn/unsplash-1532094349884-543bc11b234d.jpg',
        '/images/cdn/unsplash-1522071820081-009f0129c71c.jpg',
        '/images/cdn/unsplash-1552664730-d307ca884978.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'services' && pageSlug === 'cell-line') {
      const imgs = [
        '/images/cdn/unsplash-1576086213369-97a306d36557.jpg',
        '/images/cdn/unsplash-1628595351029-c2bf17511435.jpg',
        '/images/cdn/unsplash-1576671081837-49000212a370.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'services' && pageSlug === 'process') {
      const imgs = [
        '/images/cdn/unsplash-1532187863486-abf9dbad1b69.jpg',
        '/images/cdn/unsplash-1606206873764-fd15e242df52.jpg',
        '/images/cdn/unsplash-1628595351029-c2bf17511435.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'services' && pageSlug === 'analytical') {
      const imgs = [
        '/images/cdn/unsplash-1579154204601-01588f351e67.jpg',
        '/images/cdn/unsplash-1614935151651-0bea6508db6b.jpg',
        '/images/cdn/unsplash-1606206873764-fd15e242df52.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'manufacturing' && pageSlug === 'drug-substance') {
      const imgs = [
        '/images/cdn/unsplash-1606206873764-fd15e242df52.jpg',
        '/images/cdn/pexels-2280571.jpg',
        '/images/cdn/pexels-3938023.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'manufacturing' && pageSlug === 'drug-product') {
      const imgs = [
        '/images/sample.webp',
        '/images/cdn/unsplash-1622227922682-56c92e523e58.jpg',
        '/images/cdn/unsplash-1614935151651-0bea6508db6b.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'characterization' && pageSlug === 'analytical-testing') {
      const imgs = [
        '/images/cdn/pexels-3938022.jpg',
        '/images/cdn/unsplash-1532094349884-543bc11b234d.jpg',
        '/images/cdn/unsplash-1576671081837-49000212a370.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'characterization' && pageSlug === 'physicochemical') {
      const imgs = [
        '/images/cdn/pexels-2280571.jpg',
        '/images/cdn/unsplash-1582719471384-894fbb16e074.jpg',
        '/images/cdn/unsplash-1628595351029-c2bf17511435.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'characterization' && pageSlug === 'bioassays') {
      const imgs = [
        '/images/upstream/Biosaftey_cabinet.png',
        '/images/cdn/pexels-4033148.jpg',
        '/images/cdn/unsplash-1614935151651-0bea6508db6b.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'characterization' && pageSlug === 'microbiological') {
      const imgs = [
        '/images/Analytical/microbiology/petri_dish_culture.webp',
        '/images/cdn/unsplash-1576086213369-97a306d36557.jpg',
        '/images/cdn/pexels-4033148.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'modalities' && pageSlug === 'mabs') {
      const imgs = [
        '/images/cdn/unsplash-1532187863486-abf9dbad1b69.jpg',
        '/images/cdn/unsplash-1532094349884-543bc11b234d.jpg',
        '/images/cdn/unsplash-1579154204601-01588f351e67.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'modalities' && pageSlug === 'bispecifics') {
      const imgs = [
        '/images/cdn/unsplash-1532187863486-abf9dbad1b69.jpg',
        '/images/cdn/unsplash-1579154204601-01588f351e67.jpg',
        '/images/cdn/unsplash-1532094349884-543bc11b234d.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'modalities' && pageSlug === 'adcs') {
      const imgs = [
        '/images/cdn/pexels-3825586.jpg',
        '/images/cdn/unsplash-1532187863486-abf9dbad1b69.jpg',
        '/images/default_scientist.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'modalities' && pageSlug === 'proteins-peptides') {
      const imgs = [
        '/images/development.jpg',
        '/images/cdn/unsplash-1532187863486-abf9dbad1b69.jpg',
        '/images/default_scientist.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'insights' && pageSlug === 'blogs') {
      const imgs = [
        '/images/cdn/unsplash-1532187863486-abf9dbad1b69.jpg',
        '/images/cdn/unsplash-1579154204601-01588f351e67.jpg',
        '/images/cdn/unsplash-1532094349884-543bc11b234d.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'insights' && pageSlug === 'case-studies') {
      const imgs = [
        '/images/cdn/unsplash-1606206873764-fd15e242df52.jpg',
        '/images/cdn/unsplash-1614935151651-0bea6508db6b.jpg',
        '/images/cdn/unsplash-1582719471384-894fbb16e074.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'insights' && pageSlug === 'brochures') {
      const imgs = [
        '/images/cdn/unsplash-1576671081837-49000212a370.jpg',
        '/images/cdn/unsplash-1628595351029-c2bf17511435.jpg',
        '/images/cdn/pexels-2280571.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'insights' && pageSlug === 'news') {
      const imgs = [
        '/images/cdn/unsplash-1576086213369-97a306d36557.jpg',
        '/images/cdn/pexels-3938022.jpg',
        '/images/cdn/pexels-3938023.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'insights' && pageSlug === 'events') {
      const imgs = [
        '/images/cdn/pexels-4033148.jpg',
        '/images/cdn/unsplash-1587854692152-cbe660dbde88.jpg',
        '/images/cdn/unsplash-1622227922682-56c92e523e58.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    return defaultImages[idx % defaultImages.length];
  }

  const enrichedSections = sections.map((sec, idx) => ({
    ...sec,
    image: (category === 'services' && slug === 'cell-line')
      ? ''
      : (sec.image !== undefined ? sec.image : getUniqueBentoImage(category, slug, idx)),
  }));

  let processSteps = [];
  if (category === 'characterization') {
    processSteps = [
      { step: '01', title: 'Target Spec Assessment', text: 'We review the molecular structure, sequence files, and stability parameters under NDA.' },
      { step: '02', title: 'Method Feasibility & Dev', text: 'Developing custom elution gradients and assay protocols on chromatographic systems.' },
      { step: '03', title: 'Analytical Validation', text: 'Verifying accuracy, precision, and robustness according to ICH Q2(R1) regulatory guidelines.' },
      { step: '04', title: 'Dossier & QA Release', text: 'Compiling technical release reports, chromatograms, and certificate of analysis (CoA) files.' }
    ];
  } else if (category === 'manufacturing') {
    processSteps = [
      { step: '01', title: 'Process Transfer', text: 'Transferring scale-up guidelines, media requirements, and parameters to the GMP floor.' },
      { step: '02', title: 'Seed Train Expansion', text: 'Growing the expression cell line in steps from laboratory vials to pilot inoculations.' },
      { step: '03', title: 'cGMP Cleanroom Production', text: 'Running single-use bioreactor systems under digital tracking of DO, pH, and cell growth.' },
      { step: '04', title: 'Aseptic Isolation Filling', text: 'Automated filling and stopper operations in Grade A environments with full quality documentation.' }
    ];
  } else if (category === 'services') {
    processSteps = [
      { step: '01', title: 'Codon Optimization', text: 'Optimizing gene target sequence designs for high-efficiency cellular translation.' },
      { step: '02', title: 'Cell Line Engineering', text: 'Transfecting host cell lines (CHO-K1) and screening stable clonal systems.' },
      { step: '03', title: 'Bioprocess Development', text: 'Optimizing feed nutrients, perfusion configurations, and upstream parameters.' },
      { step: '04', title: 'Downstream Purification', text: 'Developing chromatography runs to remove host cell proteins and DNA contaminants.' }
    ];
  } else {
    processSteps = [
      { step: '01', title: 'Requirement Definition', text: 'Aligning on project scale, modality specifications, and clinical timelines.' },
      { step: '02', title: 'Technical Scaffolding', text: 'Formulating standard operating procedures and custom batch release criteria.' },
      { step: '03', title: 'Execution & Analysis', text: 'Running development, manufacturing campaigns, or characterization protocols.' },
      { step: '04', title: 'QA Release Package', text: 'Providing full technical summaries and data logs to support regulatory filings.' }
    ];
  }

  const advantages: { badge: string; title?: string; value?: string; desc: string }[] = [];

  let stats = [...(existingStats || [])];
  if (stats.length === 0) {
    if (category === 'characterization') {
      stats = [
        { value: '99.9%', label: 'Analytical Purity', sublabel: 'Resolved using high-resolution chromatography variants.' },
        { value: 'ICH Q2', label: 'Validation Standard', sublabel: 'Methods verified to satisfy international guidelines.' },
        { value: '21 CFR', label: 'Part 11 Compliant', sublabel: 'Secure electronic data records and log tracking.' },
      ];
    } else if (category === 'manufacturing') {
      stats = [
        { value: '50-500L', label: 'SUB Capacities', sublabel: 'Single-use bioreactor trains in Grade C cleanrooms.' },
        { value: 'Grade A', label: 'Aseptic Filling', sublabel: 'Sterile filling under barrier isolator containment.' },
        { value: '100%', label: 'GMP Compliance', sublabel: 'Quality releases mapped for US FDA and EU EMA batches.' },
      ];
    } else {
      stats = [
        { value: '16 wk', label: 'Gene-to-RCB Timeline', sublabel: 'Rapid cell line engineering pathway.' },
        { value: '3-8 g/L', label: 'Expression Titers', sublabel: 'High yield mAb clonal systems in CHO lines.' },
        { value: 'Global', label: 'Service Footprint', sublabel: 'Supporting IND filings across US, EU, and Asia.' },
      ];
    }
  }

  let specs = [...(existingSpecs || [])];
  if (specs.length === 0) {
    if (category === 'characterization') {
      specs = [
        { label: 'Chromatography Platforms', value: 'UPLC, SEC, IEX, HILIC' },
        { label: 'Mass Spectrometry', value: 'QTOF LC-MS/MS Peptide Mapping' },
        { label: 'Quality System Standards', value: 'cGMP, FDA/EMA Inspection Ready' },
      ];
    } else if (category === 'manufacturing') {
      specs = [
        { label: 'Cleanroom Zones', value: 'Grade A/B filling, Grade C processing' },
        { label: 'Bioreactor Types', value: 'Single-use (SUB) continuous trains' },
        { label: 'Batch Scale Capabilities', value: 'Kilogram-scale GMP drug substance' },
      ];
    } else {
      specs = [
        { label: 'Host Expression Systems', value: 'CHO-K1 and CHO-S clonal lineages' },
        { label: 'Standard Upstream Feed', value: 'Serum-free, chemically defined media' },
        { label: 'Downstream Columns', value: 'Protein A/G Affinity, IEX, Hydrophobic' },
      ];
    }
  }

  return {
    sections: enrichedSections,
    processSteps,
    stats,
    specs,
    advantages,
  };
}

export default async function CDMODynamicPage({ params, searchParams }: PageProps) {
  const { category: rawCategory, slug: rawSlug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const isPreview = resolvedSearchParams?.preview === 'true';

  const category = decodeURIComponent(rawCategory);
  const slug = decodeURIComponent(rawSlug);

  if (category === slug) {
    redirect(`/${category}${isPreview ? '?preview=true' : ''}`);
  }

  const page = getStoredPage(category, slug, { previewDraft: isPreview });

  if (!page) {
    notFound();
  }

  const content = getDynamicContent(
    page.category,
    page.slug,
    page.title,
    page.sections || [],
    page.stats || [],
    page.specs || []
  ) as PageContent;

  const standardCategories = ['facility&location', 'overview', 'services', 'manufacturing', 'characterization', 'modalities', 'insights'];
  const isCustomCategory = !standardCategories.includes(page.category.toLowerCase());
  const isFullyCustom = Boolean(page.isCustom) || isCustomCategory;

  if (isFullyCustom) {
    return (
      <div className="bg-white text-neutral-900 min-h-screen font-sans pb-0 select-none">
        {isPreview && (
          <div className="bg-amber-500 text-black text-xs font-bold px-4 py-2 text-center sticky top-0 z-50 flex items-center justify-center gap-2 shadow-sm">
            <span>⚠️ You are viewing an UNPUBLISHED DRAFT PREVIEW of &quot;{page.title}&quot;. Regular visitors see only published content.</span>
          </div>
        )}
        <ModularPageLayout page={page} content={content} />
      </div>
    );
  }

  const LayoutComponent = (() => {
    switch (page.category.toLowerCase()) {
      case 'facility&location':
      case 'overview':
        return OverviewLayout;
      case 'services':
        return ServiceLayout;
      case 'manufacturing':
        return ManufacturingLayout;
      case 'characterization':
        return CharacterizationLayout;
      case 'modalities':
        return ModalityLayout;
      case 'insights':
        return InsightsLayout;
      default:
        return ModularPageLayout;
    }
  })();

  // For overview category, OverviewLayout already handles all specialized sections (hero, 50/50 split, locations map, advantage grid, faqs, cta)
  const isOverviewCategory = page.category.toLowerCase() === 'overview';
  const modularCustomSections = isOverviewCategory
    ? []
    : (page.sections || []).filter(
        (s) => s.style && s.style !== 'feature-split' && s.style !== 'faq-accordion'
      );

  return (
    <div className="bg-white text-neutral-900 min-h-screen font-sans pb-0 select-none">
      {isPreview && (
        <div className="bg-amber-500 text-black text-xs font-bold px-4 py-2 text-center sticky top-0 z-50 flex items-center justify-center gap-2 shadow-sm">
          <span>⚠️ You are viewing an UNPUBLISHED DRAFT PREVIEW of &quot;{page.title}&quot;. Regular visitors see only published content.</span>
        </div>
      )}
      <LayoutComponent page={page} content={content} />
      {modularCustomSections.length > 0 && (
        <div className="divide-y divide-neutral-100 border-t border-neutral-200">
          {modularCustomSections.map((sec, idx) => (
            <DynamicSectionRenderer
              key={idx}
              section={sec}
              index={idx}
              pageSlug={page.slug}
              category={page.category}
            />
          ))}
        </div>
      )}
    </div>
  );
}
