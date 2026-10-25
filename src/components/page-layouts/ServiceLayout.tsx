import Link from 'next/link';
import {
  ArrowRight,
  Activity,
  Beaker,
  Dna,
  FlaskConical,
  Microscope,
  Search,
  Filter,
  Layers,
  FileCheck,
  ShieldCheck,
  Atom,
  Sliders,
  TestTubes,
  ShieldAlert,
  Droplets,
  LineChart,
  Award,
  Share2,
  Maximize2,
  Repeat,
  Zap,
  Workflow,
  GitMerge
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import DownstreamProcessAnimation from '@/components/DownstreamProcessAnimation';
import UpstreamProcessAnimation from '@/components/UpstreamProcessAnimation';
import FAQSection from '@/components/FAQSection';
import CommonCTA from '@/components/CommonCTA';
import EquipmentCarousel from '@/components/EquipmentCarousel';
import AboutHeroCarousel from '@/components/AboutHeroCarousel';
import { getSectionEquipment, getPageEquipment, UPSTREAM_EQUIPMENT, DOWNSTREAM_EQUIPMENT, ALL_EQUIPMENT_ITEMS } from '@/data/equipmentData';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';

interface ServiceLayoutProps {
  page: CDMOPage;
  content: PageContent;
}

const CAPABILITY_ICONS = [FlaskConical, Dna, Microscope, Activity, Search, Beaker];

function getBulletCapabilityIcon(text: string, index: number) {
  const lower = text.toLowerCase();
  if (lower.includes('gene construct') || lower.includes('codon') || lower.includes('gene synthesis')) return Dna;
  if (lower.includes('vector') || lower.includes('construct')) return Workflow;
  if (lower.includes('stable cell pool') || lower.includes('pool generation')) return FlaskConical;
  if (lower.includes('single-cell') || lower.includes('monoclonality')) return Microscope;
  if (lower.includes('high-throughput') || lower.includes('selection')) return Sliders;
  if (lower.includes('monitoring') || lower.includes('metabolite')) return LineChart;
  if (lower.includes('growth') || lower.includes('product quality')) return ShieldCheck;
  if (lower.includes('productivity') || lower.includes('assessment')) return Activity;
  if (lower.includes('research cell bank') || lower.includes('rcb')) return TestTubes;
  if (lower.includes('master cell bank') || lower.includes('mcb') || lower.includes('cgmp')) return Award;
  if (lower.includes('documentation') || lower.includes('regulatory') || lower.includes('submissions') || lower.includes('validation') || lower.includes('qualification')) return FileCheck;
  if (lower.includes('media') || lower.includes('feed')) return FlaskConical;
  if (lower.includes('bioreactor') || lower.includes('shake flask')) return TestTubes;
  if (lower.includes('doe') || lower.includes('optimization') || lower.includes('characterization')) return Sliders;
  if (lower.includes('cell culture') || lower.includes('clone') || lower.includes('cell line')) return Dna;
  if (lower.includes('intensification') || lower.includes('perfusion') || lower.includes('atf') || lower.includes('fed-batch')) return Repeat;
  if (lower.includes('glycosylation')) return Atom;
  if (lower.includes('resin') || lower.includes('screening')) return Search;
  if (lower.includes('affinity') || lower.includes('chromatography')) return Filter;
  if (lower.includes('anion') || lower.includes('cation') || lower.includes('ion exchange') || lower.includes('mixed-mode')) return Layers;
  if (lower.includes('hydrophobic')) return Droplets;
  if (lower.includes('virus') || lower.includes('viral')) return ShieldAlert;
  if (lower.includes('ultrafiltration') || lower.includes('diafiltration') || lower.includes('uf/df') || lower.includes('filtration')) return Filter;
  if (lower.includes('impurity') || lower.includes('clearance')) return ShieldCheck;
  if (lower.includes('formulation')) return Beaker;
  if (lower.includes('lc-ms') || lower.includes('mass spec')) return Microscope;
  if (lower.includes('electrophoresis') || lower.includes('capillary')) return LineChart;
  if (lower.includes('elisa')) return TestTubes;
  if (lower.includes('identity') || lower.includes('purity') || lower.includes('testing')) return Search;
  if (lower.includes('hplc') || lower.includes('uplc') || lower.includes('ce-sds') || lower.includes('ief')) return LineChart;
  if (lower.includes('potency') || lower.includes('binding') || lower.includes('cell-based') || lower.includes('assay')) return Activity;
  if (lower.includes('forced degradation') || lower.includes('stability')) return ShieldCheck;
  if (lower.includes('reference standard')) return Award;
  if (lower.includes('transfer') || lower.includes('tech transfer')) return Share2;
  if (lower.includes('comparability') || lower.includes('biosimilar')) return GitMerge;
  if (lower.includes('support')) return Workflow;
  if (lower.includes('method development') || lower.includes('method')) return FileCheck;
  if (lower.includes('scalability') || lower.includes('scale-up')) return Maximize2;

  const fallbacks = [Dna, Workflow, FlaskConical, Microscope, Sliders, Activity, TestTubes, Award, FileCheck];
  return fallbacks[index % fallbacks.length];
}

export default function ServiceLayout({ page, content }: ServiceLayoutProps) {
  const heroEquipment = getPageEquipment(page.slug);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-molecules-hero overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        <div className="relative w-full max-w-[1700px] mx-auto pt-16 pb-12 md:pt-20 md:pb-16">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500 mb-8">
            <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-500">{page.category}</span>
            <span>/</span>
            <span className="text-brand-yellow">{page.slug}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {page.badge && (
                <span className="inline-block px-3 py-1 rounded-[10px] text-[10px] uppercase font-semibold tracking-wider bg-brand-yellow text-black mb-6">
                  {page.badge}
                </span>
              )}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.05]">
                <span className="text-neutral-900">{page.heading.split(' ')[0]}</span>
                {` ${page.heading.split(' ').slice(1).join(' ')}`}
              </h1>
              <div className="text-[17px] text-slate-500 font-normal leading-relaxed mt-6 max-w-xl space-y-3">
                {page.description.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
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

      {/* TECHNICAL FOCUS AREAS — HORIZONTAL SECTIONS WITH KEY CAPABILITIES ICONS */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20">
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="flex flex-col gap-10 md:gap-14">
            {content.sections
              .filter((s: any) => s.style !== 'faq-accordion' && !s.id?.includes('faq') && s.title !== 'Frequently Asked Questions')
              .map((section: any, idx: number) => {
              const Icon = section.title.toLowerCase().includes('upstream')
                ? FlaskConical
                : section.title.toLowerCase().includes('downstream')
                  ? Filter
                  : section.title.toLowerCase().includes('analytical')
                    ? Microscope
                    : section.title.toLowerCase().includes('cell line') || section.title.toLowerCase().includes('clone')
                      ? Dna
                      : section.title.toLowerCase().includes('formulation')
                        ? Beaker
                        : CAPABILITY_ICONS[idx % CAPABILITY_ICONS.length];

              const isUpstreamProcess = page.slug === 'process' && section.title.toLowerCase().includes('upstream');
              const isDownstreamProcess = page.slug === 'process' && section.title.toLowerCase().includes('downstream');
              const imageRight = idx % 2 === 1;

              const equipmentItems = (page.slug === 'cell-line') ? null : getSectionEquipment(section.title, page.slug);
              const isVideo = section.mediaType === 'video' || /\.(mp4|webm|ogg|mov)$/i.test(section.video || section.image || '');
              const hasEquipment = Boolean(equipmentItems && equipmentItems.length > 0);
              const hasMultiImages = Boolean(section.images && section.images.length > 1);
              const hasSingleImage = Boolean(section.image && section.image.trim() !== '');
              const hasVideo = Boolean(isVideo && (section.video || section.image));
              const hasMedia = page.slug !== 'cell-line' && (hasMultiImages || hasVideo || hasEquipment || hasSingleImage);

              return (
                <Reveal key={idx} delay={idx * 0.08}>
                  {isUpstreamProcess ? (
                    <div className="bg-white border border-neutral-200/80 rounded-[10px] p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
                      {/* Top 2-column: Carousel & Content */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8">
                        <div className="lg:col-span-5">
                          <EquipmentCarousel items={UPSTREAM_EQUIPMENT} sectionTitle="Upstream Process Equipment" />
                        </div>
                        <div className="lg:col-span-7">
                          {/* Header */}
                          <div className="flex items-center gap-3 mb-4">
                            <span className="w-11 h-11 rounded-[10px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-brand-blue" />
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-light md:font-normal tracking-tight text-neutral-900">
                              {section.title}
                            </h3>
                          </div>

                          <p className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed mb-6">
                            {section.text}
                          </p>

                          {section.bullets && section.bullets.length > 0 && (
                            <div className="pt-5 border-t border-neutral-100">
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 block mb-3">
                                Key Capabilities
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                {section.bullets.map((b: string, bIdx: number) => {
                                  const BulletIcon = getBulletCapabilityIcon(b, bIdx);
                                  return (
                                    <div
                                      key={bIdx}
                                      className="group/pill flex items-center gap-3.5 p-3.5 rounded-[8px] bg-neutral-50 border border-neutral-200/70 hover:border-brand-yellow hover:bg-white transition-all duration-200"
                                    >
                                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover/pill:bg-brand-yellow group-hover/pill:border-brand-yellow transition-colors duration-200">
                                        <BulletIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-brand-blue group-hover/pill:text-black transition-colors duration-200" />
                                      </div>
                                      <span className="text-sm sm:text-base font-medium text-neutral-900 leading-snug group-hover/pill:text-black">
                                        {b}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {section.footerText && (
                        <p className="text-sm sm:text-[15px] text-slate-600 font-medium leading-relaxed mb-6 pt-4 border-t border-neutral-100">
                          {section.footerText}
                        </p>
                      )}

                      {/* 6-Stage Upstream Process Interactive Animation */}
                      <div className="pt-6 border-t border-neutral-100">
                        <UpstreamProcessAnimation />
                      </div>
                    </div>
                  ) : isDownstreamProcess ? (
                    <div className="bg-white border border-neutral-200/80 rounded-[10px] p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
                      {/* Top 2-column: Content & Carousel */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8">
                        <div className="lg:col-span-7">
                          {/* Header */}
                          <div className="flex items-center gap-3 mb-4">
                            <span className="w-11 h-11 rounded-[10px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-brand-blue" />
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-light md:font-normal tracking-tight text-neutral-900">
                              {section.title}
                            </h3>
                          </div>

                          <p className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed mb-6">
                            {section.text}
                          </p>

                          {section.bullets && section.bullets.length > 0 && (
                            <div className="pt-5 border-t border-neutral-100">
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 block mb-3">
                                Key Capabilities
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                {section.bullets.map((b: string, bIdx: number) => {
                                  const BulletIcon = getBulletCapabilityIcon(b, bIdx);
                                  return (
                                    <div
                                      key={bIdx}
                                      className="group/pill flex items-center gap-3.5 p-3.5 rounded-[8px] bg-neutral-50 border border-neutral-200/70 hover:border-brand-yellow hover:bg-white transition-all duration-200"
                                    >
                                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover/pill:bg-brand-yellow group-hover/pill:border-brand-yellow transition-colors duration-200">
                                        <BulletIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-brand-blue group-hover/pill:text-black transition-colors duration-200" />
                                      </div>
                                      <span className="text-sm sm:text-base font-medium text-neutral-900 leading-snug group-hover/pill:text-black">
                                        {b}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="lg:col-span-5">
                          <EquipmentCarousel items={DOWNSTREAM_EQUIPMENT} sectionTitle="Downstream Process Equipment" />
                        </div>
                      </div>

                      {section.footerText && (
                        <div className="mb-6 p-4 rounded-[8px] bg-neutral-50 border border-neutral-200/80 text-sm sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                          {section.footerText}
                        </div>
                      )}

                      {/* 6-Stage Downstream Purification Interactive Animation */}
                      <div className="pt-6 border-t border-neutral-100">
                        <DownstreamProcessAnimation />
                      </div>
                    </div>
                  ) : !hasMedia ? (
                    <div className="bg-white border border-neutral-200/80 rounded-[10px] p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="w-11 h-11 rounded-[10px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-brand-blue" />
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-light md:font-normal tracking-tight text-neutral-900">
                          {section.title}
                        </h3>
                      </div>

                      {section.subtitle && (
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-orange block mb-3">
                          {section.subtitle}
                        </span>
                      )}

                      {section.text && (
                        <p className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed max-w-5xl mb-6">
                          {section.text}
                        </p>
                      )}

                      {section.bullets && section.bullets.length > 0 && (
                        <div className={section.text ? "pt-5 border-t border-neutral-100" : ""}>
                          {section.bulletsTitle && (
                            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 block mb-3">
                              {section.bulletsTitle}
                            </span>
                          )}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                            {section.bullets.map((b: string, bIdx: number) => {
                              const BulletIcon = getBulletCapabilityIcon(b, bIdx);
                              return (
                                <div
                                  key={bIdx}
                                  className="group/pill flex items-center gap-3.5 p-3.5 rounded-[8px] bg-neutral-50 border border-neutral-200/70 hover:border-brand-yellow hover:bg-white transition-all duration-200"
                                >
                                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover/pill:bg-brand-yellow group-hover/pill:border-brand-yellow transition-colors duration-200">
                                    <BulletIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-brand-blue group-hover/pill:text-black transition-colors duration-200" />
                                  </div>
                                  <span className="text-sm sm:text-base font-medium text-neutral-900 leading-snug group-hover/pill:text-black">
                                    {b}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {section.footerText && (
                        <div className="mt-6 p-4 rounded-[8px] bg-neutral-50 border border-neutral-200/80 text-sm sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                          {section.footerText}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-white border border-neutral-200/80 rounded-[10px] p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                        {/* Image Box */}
                        <div className={`lg:col-span-5 ${imageRight ? 'lg:order-2' : 'lg:order-1'}`}>
                          {(() => {
                            if (section.images && section.images.length > 1) {
                              return <AboutHeroCarousel images={section.images} />;
                            }
                            if (isVideo && (section.video || section.image)) {
                              return (
                                <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden bg-neutral-950 border border-neutral-200 shadow-sm">
                                  <video
                                    src={section.video || section.image}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              );
                            }
                            if (equipmentItems && equipmentItems.length > 0) {
                              return <EquipmentCarousel items={equipmentItems} sectionTitle={section.title} />;
                            }
                            return (
                              <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden bg-neutral-100 border border-neutral-200/90 shadow-inner group">
                                {section.image && (
                                  <img
                                    src={section.image}
                                    alt={section.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                  />
                                )}
                              </div>
                            );
                          })()}
                        </div>

                        {/* Content Box */}
                        <div className={`lg:col-span-7 ${imageRight ? 'lg:order-1' : 'lg:order-2'}`}>
                          <div className="flex items-center gap-3 mb-4">
                            <span className="w-11 h-11 rounded-[10px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-brand-blue" />
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-light md:font-normal tracking-tight text-neutral-900">
                              {section.title}
                            </h3>
                          </div>

                          {section.text && (
                            <p className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed mb-6">
                              {section.text}
                            </p>
                          )}

                          {section.bullets && section.bullets.length > 0 && (
                            <div className={section.text ? "pt-5 border-t border-neutral-100" : ""}>
                              {section.bulletsTitle && (
                                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 block mb-3">
                                  {section.bulletsTitle}
                                </span>
                              )}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                {section.bullets.map((b: string, bIdx: number) => {
                                  const BulletIcon = getBulletCapabilityIcon(b, bIdx);
                                  return (
                                    <div
                                      key={bIdx}
                                      className="group/pill flex items-center gap-3.5 p-3.5 rounded-[8px] bg-neutral-50 border border-neutral-200/70 hover:border-brand-yellow hover:bg-white transition-all duration-200"
                                    >
                                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover/pill:bg-brand-yellow group-hover/pill:border-brand-yellow transition-colors duration-200">
                                        <BulletIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-brand-blue group-hover/pill:text-black transition-colors duration-200" />
                                      </div>
                                      <span className="text-sm sm:text-base font-medium text-neutral-900 leading-snug group-hover/pill:text-black">
                                        {b}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>



      {/* APPLICABLE MODALITIES */}
      {page.applicableModalities && page.applicableModalities.length > 0 && (
        <section className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-neutral-50/70 border-t border-neutral-200/80">
          <div className="w-full max-w-[1700px] mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-2.5">
                  Therapeutic Scope
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                  Applicable Modalities
                </h2>
                <p className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed max-w-2xl mx-auto mt-3">
                  Our mammalian cell line development platform supports a comprehensive range of complex biologic modalities.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
              {page.applicableModalities.map((modality, mIdx) => {
                const ModIcon = modality.title.toLowerCase().includes('bispecific')
                  ? GitMerge
                  : modality.title.toLowerCase().includes('recombinant')
                    ? FlaskConical
                    : modality.title.toLowerCase().includes('other') || modality.title.toLowerCase().includes('biosimilar')
                      ? Atom
                      : Dna;

                return (
                  <Reveal key={mIdx} delay={mIdx * 0.05} className="h-full">
                    {modality.link ? (
                      <Link
                        href={modality.link}
                        className="group block h-full bg-white border border-neutral-200/80 rounded-[10px] p-5 sm:p-6 shadow-xs hover:shadow-lg hover:border-brand-yellow transition-all duration-300"
                      >
                        <div className="w-12 h-12 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors duration-200 mb-4">
                          <ModIcon className="w-6 h-6 text-brand-blue group-hover:text-black transition-colors duration-200" />
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-base sm:text-lg font-semibold text-neutral-900 group-hover:text-brand-blue transition-colors duration-200 leading-snug">
                            {modality.title}
                          </h3>
                          <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-blue group-hover:translate-x-1 transition-all duration-200 shrink-0" />
                        </div>
                      </Link>
                    ) : (
                      <div className="h-full bg-white border border-neutral-200/80 rounded-[10px] p-5 sm:p-6 shadow-xs">
                        <div className="w-12 h-12 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-4">
                          <ModIcon className="w-6 h-6 text-brand-blue" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-neutral-900 leading-snug">
                          {modality.title}
                        </h3>
                      </div>
                    )}
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
