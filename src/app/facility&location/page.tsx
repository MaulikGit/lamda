import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Building2, 
  Factory, 
  ArrowRight, 
  Check
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import CDMOLocationsMapSection from '@/components/CDMOLocationsMapSection';
import FacilityHeroCarousel from '@/components/FacilityHeroCarousel';
import FAQSection from '@/components/FAQSection';
import CommonCTA from '@/components/CommonCTA';
import { getStoredPage } from '@/lib/pagesStorage';

interface PageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const isPreview = resolvedSearchParams?.preview === 'true';
  const page = getStoredPage('facility&location', 'facility&location', { previewDraft: isPreview });

  return {
    title: page?.metaTitle || page?.title || 'Facility and Locations — Biologics Development & Manufacturing | Lambda CDMO',
    description: page?.metaDesc || page?.description || 'Lambda CDMO operates across Ahmedabad, India, and London, UK, bringing together complementary capabilities in biologics development, analytical sciences, process development, and GMP manufacturing.',
  };
}

interface CapabilityRow {
  capability: string;
  ahmedabad: string;
  london: string;
  isCheckmarkAhmedabad?: boolean;
  isCheckmarkLondon?: boolean;
}

const CAPABILITIES_TABLE: CapabilityRow[] = [
  {
    capability: 'Cell Line Development',
    ahmedabad: '✓',
    london: 'Clone Screening',
    isCheckmarkAhmedabad: true,
    isCheckmarkLondon: false,
  },
  {
    capability: 'Upstream Process Development',
    ahmedabad: '✓',
    london: '✓',
    isCheckmarkAhmedabad: true,
    isCheckmarkLondon: true,
  },
  {
    capability: 'Downstream Process Development',
    ahmedabad: '✓',
    london: '✓',
    isCheckmarkAhmedabad: true,
    isCheckmarkLondon: true,
  },
  {
    capability: 'Analytical Development & Characterization',
    ahmedabad: '✓',
    london: '✓',
    isCheckmarkAhmedabad: true,
    isCheckmarkLondon: true,
  },
  {
    capability: 'Biosimilar Development',
    ahmedabad: '✓',
    london: '✓',
    isCheckmarkAhmedabad: true,
    isCheckmarkLondon: true,
  },
  {
    capability: 'Drug Product Development',
    ahmedabad: '✓',
    london: '—',
    isCheckmarkAhmedabad: true,
    isCheckmarkLondon: false,
  },
  {
    capability: 'GMP Manufacturing',
    ahmedabad: '✓',
    london: '—',
    isCheckmarkAhmedabad: true,
    isCheckmarkLondon: false,
  },
  {
    capability: 'Process Characterization',
    ahmedabad: '✓',
    london: '✓',
    isCheckmarkAhmedabad: true,
    isCheckmarkLondon: true,
  },
  {
    capability: 'Technology Transfer Support',
    ahmedabad: '✓',
    london: '✓',
    isCheckmarkAhmedabad: true,
    isCheckmarkLondon: true,
  },
];

const DEFAULT_FACILITY_FAQS = [
  {
    question: 'How do Lambda CDMO’s Ahmedabad and London facilities collaborate on a single program?',
    answer: 'Our multi-site model allows sponsors to initiate clone screening, analytical development, and early process characterisation in our London facility, followed by seamless technology transfer to our Ahmedabad cGMP suites for scale-up (up to 2x 200L single-use bioreactors) and automated isolator fill-finish.',
  },
  {
    question: 'What regulatory standards do the facilities comply with?',
    answer: 'Both facilities operate under a harmonized quality management system aligned with US FDA (21 CFR Part 210/211/11), EMA cGMP (EudraLex Volume 4, Annex 1), PMDA, and TGA requirements for global clinical and commercial submissions.',
  },
  {
    question: 'What filling and packaging formats are supported at the Ahmedabad GMP facility?',
    answer: 'The drug product platform in Ahmedabad features a robotic isolator filling line supporting vials, pre-filled syringes (PFS), and cartridges with automated visual inspection and secondary packaging capabilities.',
  },
  {
    question: 'Can sponsors visit or audit the facilities?',
    answer: 'Yes, we welcome sponsor on-site technical visits, vendor qualification audits, and remote virtual audits with full access to our quality management and batch release documentation.',
  },
];

export default async function FacilityAndLocationPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const isPreview = resolvedSearchParams?.preview === 'true';
  const page = getStoredPage('facility&location', 'facility&location', { previewDraft: isPreview });

  const badge = page?.badge || 'Facility & Locations';
  const heading = page?.heading || 'Biologics Development and Manufacturing Across India and Europe';
  const descriptionParagraphs = page?.description
    ? page.description.split('\n\n').filter(Boolean)
    : [
        'Lambda CDMO operates across Ahmedabad, India, and London, UK, bringing together complementary capabilities in biologics development, analytical sciences, process development, and GMP manufacturing.',
        'Our facilities support with a strong focus, different aspects of biologics development, with Ahmedabad providing an integrated development and GMP manufacturing platform and London providing specialized biologics development and analytical capabilities, for drug substance process development and process characterisation.'
      ];

  const faqs = (page?.faqs && page.faqs.length > 0) ? page.faqs : DEFAULT_FACILITY_FAQS;

  return (
    <main className="min-h-screen bg-white">
      {isPreview && (
        <div className="bg-amber-500 text-black text-xs font-bold px-4 py-2 text-center sticky top-0 z-50 flex items-center justify-center gap-2 shadow-sm">
          <span>⚠️ You are viewing an UNPUBLISHED DRAFT PREVIEW of the Facility & Locations Hub Page. Regular visitors see the live published version.</span>
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
            <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-yellow">Facility & Locations</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-[10px] text-[10px] uppercase font-semibold tracking-wider bg-brand-yellow text-black mb-6">
                {badge}
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.05]">
                {heading}
              </h1>

              <div className="space-y-4 text-[17px] text-slate-600 font-normal leading-relaxed mt-6 max-w-xl">
                {descriptionParagraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Quick Facility Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/facility&location/India"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] bg-brand-orange hover:bg-brand-orange-hover text-black font-semibold text-xs uppercase tracking-wider shadow-sm transition-all group"
                >
                  <Factory className="w-4 h-4" />
                  <span>Ahmedabad Facility</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/facility&location/UK"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold text-xs uppercase tracking-wider shadow-sm transition-all group"
                >
                  <Building2 className="w-4 h-4" />
                  <span>London Facility</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <Reveal delay={0.1}>
              <FacilityHeroCarousel />
            </Reveal>
          </div>
        </div>
      </section>

      {/* INTERACTIVE MAP SECTION WITH UK & INDIA HIGHLIGHTED */}
      <CDMOLocationsMapSection 
        title="Global CDMO Capabilities Across India and Europe"
        subtitle="Bespoke Biologics Infrastructure"
      />

      {/* COMPLEMENTARY CAPABILITIES ACROSS TWO LOCATIONS — MATRIX TABLE */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-molecules border-b border-neutral-100">
        <div className="w-full max-w-[1400px] mx-auto">
          <Reveal>
            <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3">
                Strategic Global Footprint
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15] mb-5">
                Complementary Capabilities Across Two Locations
              </h2>
              <div className="h-1 w-16 bg-brand-yellow rounded-full mx-auto mb-6" />
              <p className="text-[16px] sm:text-[18px] text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto">
                Complementary capabilities across Ahmedabad and London enable Lambda CDMO to support biologics programs across development, characterization, manufacturing, and clinical supply.
              </p>
            </div>
          </Reveal>

          {/* TABLE CONTAINER */}
          <Reveal delay={0.1}>
            <div className="bg-white border border-neutral-200/90 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-neutral-50 via-slate-50 to-neutral-50 border-b border-neutral-200">
                      <th className="py-5 px-6 sm:px-8 text-sm sm:text-base font-bold text-neutral-900 w-1/2">
                        Capability
                      </th>
                      <th className="py-5 px-6 sm:px-8 text-center border-l border-neutral-200/80 w-1/4">
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-xs uppercase font-semibold text-brand-orange tracking-wider">India Facility</span>
                          <span className="text-sm sm:text-base font-bold text-neutral-900 flex items-center gap-1.5 mt-0.5">
                            <Factory className="w-4 h-4 text-brand-orange shrink-0" />
                            <span>Ahmedabad</span>
                          </span>
                        </div>
                      </th>
                      <th className="py-5 px-6 sm:px-8 text-center border-l border-neutral-200/80 w-1/4">
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-xs uppercase font-semibold text-brand-blue tracking-wider">UK Innovation Hub</span>
                          <span className="text-sm sm:text-base font-bold text-neutral-900 flex items-center gap-1.5 mt-0.5">
                            <Building2 className="w-4 h-4 text-brand-blue shrink-0" />
                            <span>London</span>
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {CAPABILITIES_TABLE.map((row, idx) => (
                      <tr 
                        key={idx}
                        className={`transition-colors hover:bg-blue-50/40 ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/40'
                        }`}
                      >
                        {/* Capability Name */}
                        <td className="py-4.5 px-6 sm:px-8 text-sm sm:text-[15px] font-medium text-neutral-900">
                          {row.capability}
                        </td>

                        {/* Ahmedabad Column */}
                        <td className="py-4.5 px-6 sm:px-8 text-center border-l border-neutral-100">
                          {row.ahmedabad === '✓' ? (
                            <div className="w-7 h-7 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange flex items-center justify-center mx-auto shadow-xs">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          ) : (
                            <span className="text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-md">
                              {row.ahmedabad}
                            </span>
                          )}
                        </td>

                        {/* London Column */}
                        <td className="py-4.5 px-6 sm:px-8 text-center border-l border-neutral-100">
                          {row.london === '✓' ? (
                            <div className="w-7 h-7 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue flex items-center justify-center mx-auto shadow-xs">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          ) : row.london === '—' ? (
                            <span className="text-neutral-400 font-bold text-lg select-none">
                              —
                            </span>
                          ) : (
                            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-3 py-1 rounded-md shadow-xs">
                              {row.london}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Actions */}
              <div className="p-6 bg-gradient-to-r from-neutral-50 via-white to-neutral-50 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Cross-facility recipe compatibility & technology transfer assured</span>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/facility&location/India"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange hover:underline"
                  >
                    <span>View Ahmedabad Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-neutral-300">|</span>
                  <Link
                    href="/facility&location/UK"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:underline"
                  >
                    <span>View London Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQS SECTION */}
      <FAQSection 
        faqs={faqs}
        title={page?.faqTitle}
        subtitle={page?.faqSubtitle}
        buttonText={page?.faqButtonText}
        buttonLink={page?.faqButtonLink}
      />

      {/* CTA SECTION */}
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
