import Link from 'next/link';
import {
  ArrowRight,
  Check,
  FlaskConical,
  Search,
  FileCheck,
  Scale,
  Dna,
  Microscope,
  HeartPulse,
  Activity,
  ShieldCheck,
  Bug,
  Beaker,
  Shield,
  Atom,
  Layers,
  Filter,
  Syringe,
  Sparkles,
  Droplets,
  TestTubes,
  Gauge,
  PackageCheck,
  LineChart,
  Sliders,
  GitMerge
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import FAQSection from '@/components/FAQSection';
import CommonCTA from '@/components/CommonCTA';
import EquipmentCarousel from '@/components/EquipmentCarousel';
import AboutHeroCarousel from '@/components/AboutHeroCarousel';
import { getPageEquipment } from '@/data/equipmentData';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';

interface CharacterizationLayoutProps {
  page: CDMOPage;
  content: PageContent;
}

// Per-slug lab icon sets so sibling pages feel distinct
const SLUG_ICONS: Record<string, typeof FlaskConical[]> = {
  'analytical-testing': [FlaskConical, Search, FileCheck],
  physicochemical: [Scale, Dna, Microscope],
  bioassays: [HeartPulse, Activity, ShieldCheck],
  microbiological: [Bug, Beaker, Shield],
};

function getTechIcon(text: string, index: number) {
  const lower = text.toLowerCase();
  if (lower.includes('hplc') || lower.includes('uplc') || lower.includes('chromatograph')) return LineChart;
  if (lower.includes('lc-ms') || lower.includes('mass')) return Microscope;
  if (lower.includes('capillary') || lower.includes('electrophoresis') || lower.includes('cief') || lower.includes('ce-sds')) return Sliders;
  if (lower.includes('circular dichroism') || lower.includes('cd')) return Atom;
  if (lower.includes('ftir') || lower.includes('infrared') || lower.includes('spectroscopy')) return Search;
  if (lower.includes('nano-dsf') || lower.includes('dsf') || lower.includes('fluorimetry')) return FlaskConical;
  if (lower.includes('spr') || lower.includes('octet') || lower.includes('interaction') || lower.includes('binding')) return GitMerge;

  const fallbacks = [LineChart, Microscope, Sliders, Atom, Search, FlaskConical, GitMerge];
  return fallbacks[index % fallbacks.length];
}

function getCharCapabilityIcon(text: string, index: number) {
  const lower = text.toLowerCase();
  if (lower.includes('peptide mapping') || lower.includes('primary structure') || lower.includes('mass analysis')) return Dna;
  if (lower.includes('sec-hplc') || lower.includes('ce-sds') || lower.includes('ief') || lower.includes('purity') || lower.includes('aggregation') || lower.includes('fragmentation') || lower.includes('impurity')) return Filter;
  if (lower.includes('potency') || lower.includes('adcc') || lower.includes('cdc') || lower.includes('bioassay') || lower.includes('activity')) return Activity;
  if (lower.includes('concentration') || lower.includes('water') || lower.includes('utility')) return Droplets;
  if (lower.includes('stability') || lower.includes('forced degradation') || lower.includes('stress')) return ShieldCheck;
  if (lower.includes('endotoxin') || lower.includes('lal') || lower.includes('bet') || lower.includes('mycoplasma') || lower.includes('microbial') || lower.includes('bioburden')) return Bug;
  if (lower.includes('sterility') || lower.includes('particulate')) return Sparkles;
  if (lower.includes('batch release') || lower.includes('regulatory') || lower.includes('standard qualification') || lower.includes('submissions')) return FileCheck;
  if (lower.includes('disulfide') || lower.includes('glycan')) return Atom;
  if (lower.includes('charge variant') || lower.includes('higher-order') || lower.includes('structure')) return Layers;
  if (lower.includes('comparability') || lower.includes('biosimilar') || lower.includes('reference product')) return Scale;
  if (lower.includes('reporter gene') || lower.includes('mechanism-of-action')) return HeartPulse;
  if (lower.includes('binding')) return GitMerge;
  if (lower.includes('anti-drug antibody') || lower.includes('ada') || lower.includes('neutralizing') || lower.includes('immunogenicity')) return Shield;
  if (lower.includes('environmental monitoring')) return Gauge;
  if (lower.includes('container closure')) return PackageCheck;
  if (lower.includes('identity') || lower.includes('lc-ms') || lower.includes('immunological')) return Microscope;
  
  const fallbacks = [Microscope, Scale, HeartPulse, Bug, FlaskConical, Beaker, ShieldCheck, Dna];
  return fallbacks[index % fallbacks.length];
}

function splitHeading(heading: string) {
  const words = heading.replace(/\.$/, '').split(' ');
  return { first: words[0], rest: words.slice(1).join(' ') };
}

export default function CharacterizationLayout({ page, content }: CharacterizationLayoutProps) {
  const heroHeading = splitHeading(page.heading);
  const heroEquipment = getPageEquipment(page.slug);

  return (
    <>
      {/* HERO — dark lab bench */}
      <section className="relative bg-molecules-hero overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        <div className="relative w-full max-w-[1700px] mx-auto pt-16 pb-14 md:pt-20 md:pb-18">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500 mb-8">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-500">{page.category}</span>
            <span>/</span>
            <span className="text-black">{page.slug}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {page.badge && (
                <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-brand-yellow text-black mb-6">
                  {page.badge}
                </span>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.05]">
                <span className="text-neutral-900">{heroHeading.first}</span> {heroHeading.rest}
              </h1>
              <div className="text-[17px] text-slate-500 font-normal leading-relaxed max-w-xl mt-6 space-y-4">
                {page.description.split('\n\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
            <Reveal delay={0.1} className="w-full">
              {page.images && page.images.length > 1 ? (
                <AboutHeroCarousel images={page.images} />
              ) : heroEquipment && heroEquipment.length > 0 ? (
                <EquipmentCarousel items={heroEquipment} sectionTitle={page.heading} />
              ) : (page.heroVideo || (page.image && /\.(mp4|webm|ogg|mov)$/i.test(page.image))) ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200 shadow-lg bg-neutral-950">
                  <video
                    src={page.heroVideo || page.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200 shadow-lg bg-white">
                  <img
                    src={page.image || '/images/hero_cleanroom.png'}
                    alt={page.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* CAPABILITIES CHECKLIST GRID (Analytical Testing, Physicochemical, Microbiological) */}
      {page.capabilities && page.capabilities.length > 0 && page.slug !== 'bioassays' && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-neutral-50/60 border-b border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                  Capabilities
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {page.capabilities.map((cap, idx) => {
                const Icon = getCharCapabilityIcon(cap, idx);
                return (
                  <Reveal key={idx} delay={idx * 0.03} className="h-full">
                    <div className="group h-full bg-white border border-neutral-200/80 rounded-[10px] p-6 shadow-sm hover:shadow-lg hover:border-brand-yellow transition-all duration-300 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors duration-300">
                        <Icon className="w-6 h-6 text-brand-blue group-hover:text-black transition-colors duration-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold text-neutral-900 leading-snug group-hover:text-brand-blue transition-colors duration-300">
                          {cap}
                        </h4>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* BIOASSAYS & IMMUNOGENICITY TESTING SECTIONS */}
      {page.slug === 'bioassays' && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-neutral-50/60 border-b border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto space-y-16">
            {/* Bioassay Capabilities */}
            {page.bioassayCapabilities && page.bioassayCapabilities.length > 0 && (
              <div>
                <Reveal>
                  <div className="text-center mb-10 md:mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                      Bioassay Capabilities
                    </h2>
                  </div>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {page.bioassayCapabilities.map((cap, idx) => {
                    const Icon = getCharCapabilityIcon(cap, idx);
                    return (
                      <Reveal key={idx} delay={idx * 0.03} className="h-full">
                        <div className="group h-full bg-white border border-neutral-200/80 rounded-[10px] p-6 shadow-sm hover:shadow-lg hover:border-brand-yellow transition-all duration-300 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors duration-300">
                            <Icon className="w-6 h-6 text-brand-blue group-hover:text-black transition-colors duration-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base font-semibold text-neutral-900 leading-snug group-hover:text-brand-blue transition-colors duration-300">
                              {cap}
                            </h4>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Immunogenicity Testing */}
            {page.immunogenicityCapabilities && page.immunogenicityCapabilities.length > 0 && (
              <div>
                <Reveal>
                  <div className="text-center mb-10 md:mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                      Immunogenicity Testing
                    </h2>
                  </div>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {page.immunogenicityCapabilities.map((cap, idx) => {
                    const Icon = getCharCapabilityIcon(cap, idx);
                    return (
                      <Reveal key={idx} delay={idx * 0.03} className="h-full">
                        <div className="group h-full bg-white border border-neutral-200/80 rounded-[10px] p-6 shadow-sm hover:shadow-lg hover:border-brand-yellow transition-all duration-300 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors duration-300">
                            <Icon className="w-6 h-6 text-brand-blue group-hover:text-black transition-colors duration-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base font-semibold text-neutral-900 leading-snug group-hover:text-brand-blue transition-colors duration-300">
                              {cap}
                            </h4>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Footer Note Callout */}
            {page.footerNote && (
              <Reveal>
                <div className="bg-white border border-neutral-200/80 rounded-[12px] p-6 sm:p-8 lg:p-10 shadow-xs text-center max-w-4xl mx-auto">
                  <p className="text-[15px] sm:text-[17px] text-slate-600 font-normal leading-relaxed">
                    {page.footerNote}
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* ANALYTICAL TECHNOLOGIES SECTION (Physicochemical) */}
      {page.analyticalTechnologies && page.analyticalTechnologies.length > 0 && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-white border-b border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                  Analytical Technologies
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {page.analyticalTechnologies.map((tech, tIdx) => {
                const title = typeof tech === 'string' ? tech : tech.name;
                const desc = typeof tech === 'string' ? '' : tech.description;
                const category = typeof tech === 'string' ? '' : tech.category;
                const TechIcon = getTechIcon(title, tIdx);

                return (
                  <Reveal key={tIdx} delay={tIdx * 0.05} className="h-full">
                    <div className="group h-full bg-neutral-50/60 border border-neutral-200/80 rounded-[10px] p-6 shadow-xs hover:shadow-xl hover:border-brand-yellow hover:bg-white transition-all duration-300 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-11 h-11 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors duration-200">
                            <TechIcon className="w-5 h-5 text-brand-blue group-hover:text-black transition-colors duration-200" />
                          </div>
                          {category && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 group-hover:bg-brand-yellow/30 group-hover:text-neutral-900 transition-colors">
                              {category}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-semibold text-neutral-900 leading-snug group-hover:text-brand-blue transition-colors mb-2">
                          {title}
                        </h3>
                        {desc && (
                          <p className="text-sm text-neutral-600 leading-relaxed">
                            {desc}
                          </p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Accordion (Bottom Section) */}
      {page.faqs && page.faqs.length > 0 && (
        <FAQSection
          faqs={page.faqs}
          title={page.faqTitle || 'Frequently Asked Questions'}
          subtitle={page.faqSubtitle || 'Answers to key questions regarding our biologics development platform, regulatory alignment, and facility infrastructure.'}
          buttonText={page.faqButtonText}
          buttonLink={page.faqButtonLink}
        />
      )}

      {/* CTA */}
      <CommonCTA />
    </>
  );
}
