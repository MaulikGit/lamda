import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Microscope, 
  Scale, 
  HeartPulse, 
  Bug, 
  ArrowRight, 
  Check
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import FAQSection from '@/components/FAQSection';
import CommonCTA from '@/components/CommonCTA';
import CardImageCarousel from '@/components/CardImageCarousel';
import { getStoredPage } from '@/lib/pagesStorage';

interface PageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const isPreview = resolvedSearchParams?.preview === 'true';
  const page = getStoredPage('characterization', 'characterization', { previewDraft: isPreview });

  return {
    title: page?.metaTitle || page?.title || 'Analytical Characterization & Testing — Biologics Analytics | Lambda CDMO',
    description: page?.metaDesc || page?.description || 'Lambda CDMO provides analytical characterization and testing capabilities to support product understanding, process development, comparability, manufacturing, batch release, and stability assessment across biologics programs.',
  };
}

const ANALYTICAL_HERO_IMAGES = [
  '/images/Analytical/Biacore 8K+.png',
  '/images/Analytical/Orbitrap.png',
  '/images/Analytical/Q ToF.png',
  '/images/Analytical/Maurice.png',
  '/images/Analytical/nanoDSF.png',
  '/images/Analytical/Octet.png',
  '/images/Analytical/UPLC.png',
];

const DEFAULT_CHARACTERIZATION_SUB_SERVICES = [
  {
    title: 'Analytical Testing',
    slug: 'analytical-testing',
    href: '/characterization/analytical-testing',
    image: '/images/Analytical/UPLC.png',
    description: 'Reliable analytical testing for biologics drug substance and drug product, supporting in-process controls, batch release, stability programs, and regulatory compliance.',
    capabilities: [
      'Identity testing using peptide mapping, LC-MS, and immunological methods',
      'Purity and impurity analysis using SEC-HPLC, CE-SDS, and IEF',
      'Protein concentration analysis',
      'Potency testing using cell-based and ligand-binding assays'
    ],
  },
  {
    title: 'Physicochemical Characterization',
    slug: 'physicochemical',
    href: '/characterization/physicochemical',
    image: '/images/Analytical/Orbitrap.png',
    description: 'Comprehensive structural, molecular, and biophysical characterization to evaluate identity, purity, structural attributes, heterogeneity, stability, and product comparability.',
    capabilities: [
      'Primary structure analysis',
      'Intact mass and peptide mass analysis',
      'Disulfide bond characterization',
      'Glycan profiling'
    ],
  },
  {
    title: 'Bioassays & Immunogenicity Testing',
    slug: 'bioassays',
    href: '/characterization/bioassays',
    image: '/images/upstream/Biosaftey_cabinet.png',
    description: 'Bioassay capabilities to evaluate biological activity, potency, binding, and functional properties of biologic products across development and manufacturing.',
    capabilities: [
      'Cell-based potency assays',
      'Reporter gene assays',
      'Binding assays',
      'ADCC and CDC functional assays'
    ],
  },
  {
    title: 'Microbiological Testing',
    slug: 'microbiological',
    href: '/characterization/microbiological',
    image: '/images/working employee2.png',
    description: 'Controlled microbiological testing services supporting biologics manufacturing, environmental monitoring, bioburden reduction, and sterility assurance.',
    capabilities: [
      'Sterility testing',
      'Bioburden testing',
      'Bacterial endotoxin testing (BET)',
      'Environmental monitoring'
    ],
  },
];

const DEFAULT_CHARACTERIZATION_FAQS = [
  {
    question: 'How does Lambda CDMO approach comparability and biosimilar similarity studies?',
    answer: 'We utilize a multi-tiered, orthogonal analytical characterization package comparing primary structure, higher-order structure, post-translational modifications (PTMs), charge/size heterogeneity, target binding kinetics, and functional bioassay potency against multiple reference product lots.',
  },
  {
    question: 'Are analytical methods qualified or validated according to ICH guidelines?',
    answer: 'Yes, all analytical methods are developed and validated in accordance with ICH Q2(R1) guidelines, covering specificity, linearity, accuracy, precision (repeatability and intermediate precision), range, limit of detection (LOD), and limit of quantitation (LOQ).',
  },
  {
    question: 'What stability conditions and programs are available for biologics?',
    answer: 'We offer ICH-compliant stability chambers covering real-time storage (5°C ± 3°C), accelerated storage (25°C/60% RH), stress testing (40°C/75% RH), and frozen/ultra-low storage (-20°C, -80°C) with validated stability-indicating methods.',
  },
  {
    question: 'Can you support forced degradation studies for critical quality attribute (CQA) identification?',
    answer: 'Yes, we perform structured forced degradation studies exposing molecules to thermal, pH (acid/base), oxidative, photolytic (ICH Q1B), and mechanical agitation stress to establish degradation pathways and validate method stability-indicating capability.',
  },
];

function getCharacterizationIcon(title: string, index: number) {
  const t = title.toLowerCase();
  if (t.includes('testing')) return Microscope;
  if (t.includes('physico')) return Scale;
  if (t.includes('bioassay') || t.includes('immun')) return HeartPulse;
  if (t.includes('microbio')) return Bug;
  const icons = [Microscope, Scale, HeartPulse, Bug];
  return icons[index % icons.length];
}

export default async function AnalyticalCharacterizationPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const isPreview = resolvedSearchParams?.preview === 'true';
  const page = getStoredPage('characterization', 'characterization', { previewDraft: isPreview });

  const badge = page?.badge || 'ANALYTICAL CHARACTERIZATION AND TESTING';
  const heading = page?.heading || 'Analytical Insights that Advance Biologics Development';
  const heroImages = (page?.images && page.images.length > 0) ? page.images : ANALYTICAL_HERO_IMAGES;

  const descriptionParagraphs = page?.description
    ? page.description.split('\n\n').filter(Boolean)
    : [
        'Lambda CDMO provides analytical characterization and testing capabilities to support product understanding, process development, comparability, manufacturing, batch release, and stability assessment across biologics programs.',
        'Our analytical platform combines physicochemical, molecular, structural, biophysical, functional, and microbiological testing to generate data across development and manufacturing.'
      ];

  // Dynamic Cards
  const cardsSection = page?.sections?.find((s) => s.cards && s.cards.length > 0) || page?.sections?.[0];
  const renderedCards = (cardsSection?.cards && cardsSection.cards.length > 0)
    ? cardsSection.cards.map((card, idx) => ({
        title: card.title || DEFAULT_CHARACTERIZATION_SUB_SERVICES[idx]?.title || `Capability ${idx + 1}`,
        slug: card.title?.toLowerCase().replace(/\s+/g, '-') || `cap-${idx + 1}`,
        href: card.link || DEFAULT_CHARACTERIZATION_SUB_SERVICES[idx]?.href || '/characterization',
        image: card.image || DEFAULT_CHARACTERIZATION_SUB_SERVICES[idx]?.image || '/images/Analytical/UPLC.png',
        description: card.description || DEFAULT_CHARACTERIZATION_SUB_SERVICES[idx]?.description || '',
        capabilities: (card.bullets && card.bullets.length > 0) ? card.bullets : (DEFAULT_CHARACTERIZATION_SUB_SERVICES[idx]?.capabilities || []),
      }))
    : DEFAULT_CHARACTERIZATION_SUB_SERVICES;

  const faqs = (page?.faqs && page.faqs.length > 0) ? page.faqs : DEFAULT_CHARACTERIZATION_FAQS;

  return (
    <main className="min-h-screen bg-white">
      {isPreview && (
        <div className="bg-amber-500 text-black text-xs font-bold px-4 py-2 text-center sticky top-0 z-50 flex items-center justify-center gap-2 shadow-sm">
          <span>⚠️ You are viewing an UNPUBLISHED DRAFT PREVIEW of the Characterization Hub Page. Regular visitors see the live published version.</span>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative bg-molecules-hero overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 border-b border-neutral-100">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="relative w-full max-w-[1700px] mx-auto pt-16 pb-12 md:pt-20 md:pb-16">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500 mb-8">
            <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-500">Services</span>
            <span>/</span>
            <span className="text-brand-orange">Analytical Characterization and Testing</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              {/* Badge: Orange Uppercase */}
              <span className="inline-block px-3.5 py-1.5 rounded-[10px] text-[11px] uppercase font-bold tracking-wider bg-brand-orange text-white mb-6 shadow-xs">
                {badge}
              </span>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.08]">
                <span className="text-neutral-900">{heading}</span>
              </h1>

              {/* Text */}
              <div className="space-y-4 text-[16px] sm:text-[17px] text-slate-600 font-normal leading-relaxed mt-6 max-w-2xl">
                {descriptionParagraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Quick Jump Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/characterization/analytical-testing"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
                >
                  <Microscope className="w-4 h-4" />
                  <span>Analytical Testing</span>
                </Link>
                <Link
                  href="/characterization/physicochemical"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-neutral-900 hover:bg-brand-orange text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
                >
                  <Scale className="w-4 h-4" />
                  <span>Physicochemical</span>
                </Link>
                <Link
                  href="/characterization/bioassays"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-neutral-300 hover:border-brand-orange hover:text-brand-orange text-neutral-800 text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <HeartPulse className="w-4 h-4" />
                  <span>Bioassays & ADA</span>
                </Link>
                <Link
                  href="/characterization/microbiological"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-neutral-300 hover:border-brand-blue hover:text-brand-blue text-neutral-800 text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <Bug className="w-4 h-4" />
                  <span>Microbiology</span>
                </Link>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <Reveal delay={0.15}>
                <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-xl bg-white group">
                  <CardImageCarousel
                    images={heroImages}
                    alt="Lambda CDMO Analytical Characterization and Testing"
                    aspectRatio="aspect-[4/3]"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4 CORE CHARACTERIZATION & TESTING PILLARS */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-molecules border-b border-neutral-100">
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {renderedCards.map((service, idx) => {
              const ServiceIcon = getCharacterizationIcon(service.title, idx);
              return (
                <Reveal key={service.slug || idx} delay={idx * 0.1}>
                  <div className="group h-full bg-white rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
                    {/* Header Image */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/75 via-brand-navy/20 to-transparent" />
                      
                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 text-white">
                        <div className="w-9 h-9 rounded-lg bg-brand-orange text-white flex items-center justify-center shrink-0 shadow-sm">
                          <ServiceIcon className="w-4 h-4" />
                        </div>
                        <h3 className="text-xl font-bold text-white leading-tight">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                      <div>
                        <p className="text-[14.5px] text-slate-600 leading-relaxed mb-6 font-normal">
                          {service.description}
                        </p>

                        {service.capabilities && service.capabilities.length > 0 && (
                          <div className="border-t border-neutral-100 pt-5 mb-6">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 block mb-3.5">
                              Key Capabilities
                            </span>
                            <ul className="space-y-3">
                              {service.capabilities.map((cap, cIdx) => (
                                <li key={cIdx} className="flex items-start gap-2.5 text-[13.5px] text-neutral-700 font-normal">
                                  <div className="w-4 h-4 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  </div>
                                  <span>{cap}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-neutral-100">
                        <Link
                          href={service.href}
                          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-50 hover:bg-brand-orange text-neutral-900 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all group/btn shadow-2xs"
                        >
                          <span>Explore {service.title}</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <FAQSection 
        faqs={faqs} 
        title={page?.faqTitle}
        subtitle={page?.faqSubtitle}
        buttonText={page?.faqButtonText}
        buttonLink={page?.faqButtonLink}
      />

      {/* CTA */}
      <CommonCTA 
        title={page?.ctaTitle}
        subtitle={page?.ctaSubtitle}
        primaryButtonText={page?.primaryCta?.text}
        primaryButtonHref={page?.primaryCta?.link}
        secondaryButtonText={page?.secondaryCta?.text}
        secondaryButtonHref={page?.secondaryCta?.link}
      />
    </main>
  );
}
