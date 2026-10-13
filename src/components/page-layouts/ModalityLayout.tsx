import Link from 'next/link';
import { 
  ArrowRight, 
  Dna, 
  Atom, 
  FlaskConical, 
  Microscope, 
  ShieldCheck, 
  Activity, 
  GitMerge, 
  Syringe, 
  Filter, 
  TrendingUp, 
  Boxes, 
  TestTubes,
  PackageCheck
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import AboutHeroCarousel from '@/components/AboutHeroCarousel';
import FAQSection from '@/components/FAQSection';
import CommonCTA from '@/components/CommonCTA';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';

interface ModalityLayoutProps {
  page: CDMOPage;
  content: PageContent;
}

function getCapabilityIcon(text: string, index: number) {
  const lower = text.toLowerCase();
  if (lower.includes('clone') || lower.includes('screening')) return Microscope;
  if (lower.includes('mammalian expression') || lower.includes('cell line') || lower.includes('expression system') || lower.includes('expression platform')) return Dna;
  if (lower.includes('upstream') || lower.includes('process development') || lower.includes('process optimization')) return FlaskConical;
  if (lower.includes('homodimer') || lower.includes('mispairing') || lower.includes('bifunctional')) return GitMerge;
  if (lower.includes('conjugation') || lower.includes('payload') || lower.includes('adc')) return Syringe;
  if (lower.includes('dar') || lower.includes('structural')) return Atom;
  if (lower.includes('peptide') || lower.includes('synthetic')) return TestTubes;
  if (lower.includes('purification') || lower.includes('impurity') || lower.includes('refolding') || lower.includes('aggregation') || lower.includes('purity')) return Filter;
  if (lower.includes('analytical') || lower.includes('characterization') || lower.includes('physicochemical') || lower.includes('subclasses')) return Microscope;
  if (lower.includes('bioassay') || lower.includes('potency') || lower.includes('immunogenicity')) return Activity;
  if (lower.includes('quality') || lower.includes('stability') || lower.includes('degradation')) return ShieldCheck;
  if (lower.includes('drug product')) return PackageCheck;
  if (lower.includes('drug substance') || lower.includes('manufacturing')) return Boxes;
  if (lower.includes('scale-up') || lower.includes('transfer')) return TrendingUp;
  if (lower.includes('clinical')) return Dna;
  
  const fallbacks = [Dna, FlaskConical, Microscope, Atom, TestTubes, ShieldCheck, Activity, Boxes];
  return fallbacks[index % fallbacks.length];
}

export default function ModalityLayout({ page, content }: ModalityLayoutProps) {
  const [firstWord, ...restWords] = page.heading.split(' ');

  return (
    <>
      {/* HERO — molecule-focused: large rounded image with floating yellow stat chips */}
      <section className="relative bg-molecules-hero overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="relative w-full max-w-[1700px] mx-auto pt-16 pb-14 md:pt-20 md:pb-18">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500 mb-10">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-500">{page.category}</span>
            <span>/</span>
            <span className="text-black">{page.slug}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              {page.badge && (
                <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-brand-yellow text-black mb-6">
                  {page.badge}
                </span>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.05] mb-6">
                <span className="text-neutral-900">{firstWord}</span>{' '}
                {restWords.join(' ')}
              </h1>
              <div className="text-[17px] text-slate-500 font-normal leading-relaxed max-w-xl space-y-4">
                {page.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <Reveal delay={0.1} className="w-full">
              {page.images && page.images.length > 1 ? (
                <AboutHeroCarousel images={page.images} />
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
              ) : page.image ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200 shadow-lg bg-[#000a1c]">
                  <img
                    src={page.image}
                    alt={page.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}
            </Reveal>
          </div>
        </div>
      </section>

      {/* PLATFORM CAPABILITIES — dedicated capability checklist grid with research symbols */}
      {page.capabilities && page.capabilities.length > 0 && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-neutral-50/60 border-b border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                  Platform Capabilities
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {page.capabilities.map((cap, idx) => {
                const Icon = getCapabilityIcon(cap, idx);
                return (
                  <Reveal key={idx} delay={idx * 0.04} className="h-full">
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

      {/* PLATFORM SUMMARY / FOOTER NOTE SECTION */}
      {page.footerNote && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-16 bg-white border-b border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto">
            <Reveal>
              <div className="bg-neutral-50/80 border border-neutral-200/80 rounded-[12px] p-6 sm:p-8 lg:p-10 shadow-xs">
                <div className="max-w-4xl space-y-4 text-[15px] sm:text-[17px] text-slate-600 font-normal leading-relaxed">
                  {page.footerNote.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </Reveal>
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
