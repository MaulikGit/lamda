import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Dna, 
  Settings, 
  Search, 
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
  const page = getStoredPage('services', 'services', { previewDraft: isPreview });

  return {
    title: page?.metaTitle || page?.title || 'Development Services — Biologics Development & Process Sciences | Lambda CDMO',
    description: page?.metaDesc || page?.description || 'Lambda CDMO brings together cell line development, upstream and downstream process development, and analytical development to establish robust processes and support efficient tech transfer.',
  };
}

const UPSTREAM_HERO_IMAGES = [
  '/images/upstream/AMBR250.png',
  '/images/upstream/Bioreactor_control.png',
  '/images/upstream/Biosaftey_cabinet.png',
  '/images/upstream/Carbon_di_Oxide_shaker_incubator.png',
  '/images/upstream/Cedex_automated_cell_counter.png',
];

const DEFAULT_SUB_SERVICES = [
  {
    title: 'Cell Line Development',
    slug: 'cell-line',
    href: '/services/cell-line',
    image: '/images/celldev/CLD_Lab.png',
    description: 'A well-characterized, productive cell line provides the foundation for a robust biologics manufacturing process across mammalian expression platforms.',
    capabilities: [
      'Gene construct design and optimization',
      'Expression vector design and construction',
      'Stable cell pool generation',
      'Single-cell cloning for establishment of monoclonality'
    ],
  },
  {
    title: 'Process Development',
    slug: 'process',
    href: '/services/process',
    image: '/images/upstream/AMBR250.png',
    description: 'Upstream and downstream processes with a focus on product quality, process robustness, scalability, and manufacturability from bench to pilot scale.',
    capabilities: [
      'Media and feed optimization',
      'Shake flask and bioreactor process development',
      'DoE-based process optimization',
      'Cell culture process optimization'
    ],
  },
  {
    title: 'Analytical Development',
    slug: 'analytical',
    href: '/services/analytical',
    image: '/images/Analytical/UPLC.png',
    description: 'Analytical methods supporting product and process development, comparability, stability assessment, and regulatory requirements.',
    capabilities: [
      'Analytical method development',
      'Method optimization',
      'Method qualification',
      'Method validation'
    ],
  },
];

const DEFAULT_DEVELOPMENT_FAQS = [
  {
    question: 'What mammalian cell expression systems are supported at Lambda CDMO?',
    answer: 'We support standard CHO expression platforms (including CHO-K1, CHO-GS, and CHO-DG44) as well as HEK293 systems, offering flexible, royalty-free, and high-titer production options for global clinical development.',
  },
  {
    question: 'How do you ensure monoclonality during cell line development?',
    answer: 'Monoclonality is guaranteed through high-resolution single-cell printing and verified by multi-timepoint brightfield microscopic imaging, delivering comprehensive documentation and audit-ready monoclonality assurance reports for regulatory agencies (US FDA, EMA, PMDA).',
  },
  {
    question: 'How are development processes transferred into cGMP manufacturing?',
    answer: 'Our integrated operating model bridges process development directly with our cGMP manufacturing suites at Ahmedabad. Analytical methods, process control parameters, and operational batch records undergo structured tech transfer protocols, supported by joint cross-functional teams.',
  },
  {
    question: 'Can you support biosimilar development and comparative characterization?',
    answer: 'Yes, we provide end-to-end biosimilar development including originator fingerprinting, Quality Target Product Profile (QTPP) establishment, iterative process tuning to match glycan/charge profiles, and state-of-the-art comparative analytical similarity assessment.',
  },
];

function getServiceIcon(title: string, index: number) {
  const t = title.toLowerCase();
  if (t.includes('cell')) return Dna;
  if (t.includes('process')) return Settings;
  if (t.includes('analytical') || t.includes('testing')) return Search;
  if (index === 0) return Dna;
  if (index === 1) return Settings;
  return Search;
}

export default async function DevelopmentServicesPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const isPreview = resolvedSearchParams?.preview === 'true';
  const page = getStoredPage('services', 'services', { previewDraft: isPreview });

  const badge = page?.badge || 'DEVELOPMENT SERVICES';
  const heading = page?.heading || 'Development Designed for Manufacturing';
  const heroImages = (page?.images && page.images.length > 0) ? page.images : UPSTREAM_HERO_IMAGES;

  const descriptionParagraphs = page?.description
    ? page.description.split('\n\n').filter(Boolean)
    : [
        'Lambda CDMO brings together cell line development, upstream and downstream process development, and analytical development to establish robust processes, generate meaningful development data, and support efficient technology transfer into GMP manufacturing.',
        'Our development approach spans early-stage development through process characterization and technology transfer, with capabilities supporting monoclonal antibodies, bispecific antibodies, biosimilars, recombinant proteins, peptides, and other biologic modalities.'
      ];

  // Dynamic Cards
  const cardsSection = page?.sections?.find((s) => s.cards && s.cards.length > 0) || page?.sections?.[0];
  const renderedCards = (cardsSection?.cards && cardsSection.cards.length > 0)
    ? cardsSection.cards.map((card, idx) => ({
        title: card.title || DEFAULT_SUB_SERVICES[idx]?.title || `Service ${idx + 1}`,
        slug: card.title?.toLowerCase().replace(/\s+/g, '-') || `service-${idx + 1}`,
        href: card.link || DEFAULT_SUB_SERVICES[idx]?.href || '/services',
        image: card.image || DEFAULT_SUB_SERVICES[idx]?.image || '/images/celldev/CLD_Lab.png',
        description: card.description || DEFAULT_SUB_SERVICES[idx]?.description || '',
        capabilities: (card.bullets && card.bullets.length > 0) ? card.bullets : (DEFAULT_SUB_SERVICES[idx]?.capabilities || []),
      }))
    : DEFAULT_SUB_SERVICES;

  const faqs = (page?.faqs && page.faqs.length > 0) ? page.faqs : DEFAULT_DEVELOPMENT_FAQS;

  return (
    <main className="min-h-screen bg-white">
      {isPreview && (
        <div className="bg-amber-500 text-black text-xs font-bold px-4 py-2 text-center sticky top-0 z-50 flex items-center justify-center gap-2 shadow-sm">
          <span>⚠️ You are viewing an UNPUBLISHED DRAFT PREVIEW of the Services Hub Page. Regular visitors see the live published version.</span>
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
            <span className="text-brand-orange">Development Services</span>
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

              {/* Dynamic Text */}
              <div className="space-y-4 text-[16px] sm:text-[17px] text-slate-600 font-normal leading-relaxed mt-6 max-w-2xl">
                {descriptionParagraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Quick Jump Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/services/cell-line"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
                >
                  <Dna className="w-4 h-4" />
                  <span>Cell Line Dev</span>
                </Link>
                <Link
                  href="/services/process"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-neutral-900 hover:bg-brand-orange text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
                >
                  <Settings className="w-4 h-4" />
                  <span>Process Dev</span>
                </Link>
                <Link
                  href="/services/analytical"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] border border-neutral-300 hover:border-brand-blue hover:text-brand-blue text-neutral-800 text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <Search className="w-4 h-4" />
                  <span>Analytical Dev</span>
                </Link>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <Reveal delay={0.15}>
                <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-xl bg-white group">
                  <CardImageCarousel
                    images={heroImages}
                    alt="Lambda CDMO Biologics Development Services"
                    aspectRatio="aspect-[4/3]"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CORE DEVELOPMENT PILLARS — CARDS */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-molecules border-b border-neutral-100">
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {renderedCards.map((service, idx) => {
              const ServiceIcon = getServiceIcon(service.title, idx);
              return (
                <Reveal key={service.slug || idx} delay={idx * 0.1}>
                  <div className="group h-full bg-white rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
                    {/* Header Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/20 to-transparent" />
                      
                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2.5 text-white">
                        <div className="w-8 h-8 rounded-lg bg-brand-orange text-white flex items-center justify-center shrink-0 shadow-sm">
                          <ServiceIcon className="w-4 h-4" />
                        </div>
                        <h3 className="text-lg font-bold text-white leading-tight">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                      <div>
                        <p className="text-[14px] text-slate-600 leading-relaxed mb-6 font-normal">
                          {service.description}
                        </p>

                        {service.capabilities && service.capabilities.length > 0 && (
                          <div className="border-t border-neutral-100 pt-4 mb-6">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 block mb-3">
                              Key Capabilities
                            </span>
                            <ul className="space-y-2.5">
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
