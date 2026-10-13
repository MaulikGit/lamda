import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Beaker, 
  Package, 
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
  const page = getStoredPage('manufacturing', 'manufacturing', { previewDraft: isPreview });

  return {
    title: page?.metaTitle || page?.title || 'Manufacturing Services — cGMP Biomanufacturing & Clinical Supplies | Lambda CDMO',
    description: page?.metaDesc || page?.description || 'Lambda CDMO provides integrated manufacturing capabilities for biologics, supporting the transition from development into GMP drug substance and drug product manufacturing for clinical supplies.',
  };
}

const DOWNSTREAM_HERO_IMAGES = [
  '/images/down stream/AKTA Pilot.png',
  '/images/down stream/AKTA Pure 150_Akta Avant.png',
  '/images/down stream/Column Storage Rack.png',
  '/images/down stream/TFF System.png',
  '/images/down stream/Tecan Freedom EVO.png',
];

const DEFAULT_MANUFACTURING_SUB_SERVICES = [
  {
    title: 'Drug Substance Manufacturing',
    slug: 'drug-substance',
    href: '/manufacturing/drug-substance',
    image: '/images/upstream_GMP/GMP Production bioreactor.png',
    description: 'Lambda CDMO provides cGMP drug substance manufacturing for biologics, supporting clinical development from First-in-Human (FIH) studies through later-phase programs.',
    capabilities: [
      'GMP seed train and production bioreactor operations',
      'Mammalian cell culture manufacturing',
      'Upstream and downstream processing',
      'Chromatographic purification and polishing'
    ],
  },
  {
    title: 'Drug Product Manufacturing',
    slug: 'drug-product',
    href: '/manufacturing/drug-product',
    image: '/images/insights/robotic_fill_finish.png',
    description: 'Lambda CDMO provides drug product manufacturing capabilities supporting the transition from bulk drug substance to finished clinical products across liquid and lyophilized forms.',
    capabilities: [
      'Formulation development and optimization',
      'Excipient compatibility studies',
      'GMP aseptic fill-finish operations',
      'Liquid and lyophilized dosage forms'
    ],
  },
];

const DEFAULT_MANUFACTURING_FAQS = [
  {
    question: 'What batch scales and filling formats are supported at the Ahmedabad facility?',
    answer: 'Our drug substance facility operates single-use bioreactors up to 2x 200L scale. Our drug product aseptic suite features an automated robotic isolator supporting liquid and lyophilized vials (2R to 50R), prefilled syringes (0.5 mL to 5 mL), and cartridges (1.5 mL to 3 mL).',
  },
  {
    question: 'How do you prevent cross-contamination during multi-product operations?',
    answer: 'We utilize dedicated single-use disposable flow paths across upstream, downstream, and fill-finish operations. Combined with Grade A/B/C cleanroom zoning, directional pressure differentials, and continuous environmental monitoring, product cross-contamination is eliminated.',
  },
  {
    question: 'What regulatory standards govern the manufacturing facility?',
    answer: 'The Ahmedabad manufacturing campus operates under a harmonized Quality Management System compliant with US FDA (21 CFR Part 210, 211, and Part 11), EMA cGMP (EudraLex Vol 4, Annex 1), PIC/S, and WHO cGMP guidelines.',
  },
  {
    question: 'Do you support lyophilization cycle development and clinical scale freeze-drying?',
    answer: 'Yes, we provide formulation screening, thermal characterization (Tg/Tcc), lyophilization cycle development, and clinical-scale freeze-drying with automated loading/unloading inside our barrier isolator system.',
  },
];

function getManufacturingIcon(title: string, index: number) {
  const t = title.toLowerCase();
  if (t.includes('substance') || t.includes('bioreactor')) return Beaker;
  if (t.includes('product') || t.includes('fill') || t.includes('finish')) return Package;
  return index === 0 ? Beaker : Package;
}

export default async function ManufacturingServicesPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const isPreview = resolvedSearchParams?.preview === 'true';
  const page = getStoredPage('manufacturing', 'manufacturing', { previewDraft: isPreview });

  const badge = page?.badge || 'MANUFACTURING SERVICES';
  const heading = page?.heading || 'From Process Development to Clinical Manufacturing. Delivered with Confidence.';
  const heroImages = (page?.images && page.images.length > 0) ? page.images : DOWNSTREAM_HERO_IMAGES;

  const descriptionParagraphs = page?.description
    ? page.description.split('\n\n').filter(Boolean)
    : [
        'Manufacturing success depends on process consistency, product quality, and effective technology transfer. Lambda CDMO provides integrated manufacturing capabilities for biologics, supporting the transition from development into GMP drug substance and drug product manufacturing for clinical supplies.',
        'Our manufacturing operations at Ahmedabad, India bring together process, analytical, manufacturing, and quality functions to support controlled execution, consistent product quality, and regulatory requirements across clinical programs.'
      ];

  // Dynamic Cards
  const cardsSection = page?.sections?.find((s) => s.cards && s.cards.length > 0) || page?.sections?.[0];
  const renderedCards = (cardsSection?.cards && cardsSection.cards.length > 0)
    ? cardsSection.cards.map((card, idx) => ({
        title: card.title || DEFAULT_MANUFACTURING_SUB_SERVICES[idx]?.title || `Capability ${idx + 1}`,
        slug: card.title?.toLowerCase().replace(/\s+/g, '-') || `cap-${idx + 1}`,
        href: card.link || DEFAULT_MANUFACTURING_SUB_SERVICES[idx]?.href || '/manufacturing',
        image: card.image || DEFAULT_MANUFACTURING_SUB_SERVICES[idx]?.image || '/images/upstream_GMP/GMP Production bioreactor.png',
        description: card.description || DEFAULT_MANUFACTURING_SUB_SERVICES[idx]?.description || '',
        capabilities: (card.bullets && card.bullets.length > 0) ? card.bullets : (DEFAULT_MANUFACTURING_SUB_SERVICES[idx]?.capabilities || []),
      }))
    : DEFAULT_MANUFACTURING_SUB_SERVICES;

  const faqs = (page?.faqs && page.faqs.length > 0) ? page.faqs : DEFAULT_MANUFACTURING_FAQS;

  return (
    <main className="min-h-screen bg-white">
      {isPreview && (
        <div className="bg-amber-500 text-black text-xs font-bold px-4 py-2 text-center sticky top-0 z-50 flex items-center justify-center gap-2 shadow-sm">
          <span>⚠️ You are viewing an UNPUBLISHED DRAFT PREVIEW of the Manufacturing Hub Page. Regular visitors see the live published version.</span>
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
            <span className="text-brand-orange">Manufacturing Services</span>
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
                  href="/manufacturing/drug-substance"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
                >
                  <Beaker className="w-4 h-4" />
                  <span>Drug Substance</span>
                </Link>
                <Link
                  href="/manufacturing/drug-product"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-neutral-900 hover:bg-brand-orange text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
                >
                  <Package className="w-4 h-4" />
                  <span>Drug Product</span>
                </Link>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <Reveal delay={0.15}>
                <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-xl bg-white group">
                  <CardImageCarousel
                    images={heroImages}
                    alt="Lambda CDMO cGMP Biomanufacturing Facility"
                    aspectRatio="aspect-[4/3]"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* MANUFACTURING PILLARS — 2 LARGE CARDS */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-molecules border-b border-neutral-100">
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {renderedCards.map((service, idx) => {
              const ServiceIcon = getManufacturingIcon(service.title, idx);
              return (
                <Reveal key={service.slug || idx} delay={idx * 0.12}>
                  <div className="group h-full bg-white rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
                    {/* Header Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/75 via-brand-navy/25 to-transparent" />
                      
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
                                <li key={cIdx} className="flex items-start gap-2.5 text-[14px] text-neutral-700 font-normal">
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
                          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-brand-orange text-white font-semibold text-xs uppercase tracking-wider transition-all group/btn shadow-xs"
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
