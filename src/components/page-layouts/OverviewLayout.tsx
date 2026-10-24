import Link from 'next/link';
import { 
  ArrowRight, 
  Quote,
  ShieldCheck, 
  Microscope, 
  Factory, 
  Dna, 
  FileCheck, 
  Users,
  Sliders,
  Filter,
  Search,
  Scale,
  Workflow,
  FlaskConical,
  Activity,
  Bug,
  ClipboardCheck,
  PackageCheck,
  Pipette,
  Lock,
  TrendingUp,
  Snowflake,
  ShieldAlert,
  Eye,
  Building2,
  Globe,
  Milestone,
  Maximize2,
  Award,
  Layers,
  Repeat,
  User,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Target,
  GitMerge,
  Syringe,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import FacilityGallery from '@/components/FacilityGallery';
import FAQSection from '@/components/FAQSection';
import DnaScrollBackground from '@/components/DnaScrollBackground';
import AboutHeroCarousel from '@/components/AboutHeroCarousel';
import FacilityHeroCarousel from '@/components/FacilityHeroCarousel';
import LondonHeroCarousel from '@/components/LondonHeroCarousel';
import CDMOLocationsMapSection from '@/components/CDMOLocationsMapSection';
import CommonCTA from '@/components/CommonCTA';
import EquipmentCarousel from '@/components/EquipmentCarousel';
import { getSectionEquipment, ALL_EQUIPMENT_ITEMS } from '@/data/equipmentData';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';

interface OverviewLayoutProps {
  page: CDMOPage;
  content: PageContent;
}

function renderFormattedText(text: string) {
  if (!text.includes('**')) return text;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-neutral-900 font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

interface LeaderProfile {
  name: string;
  title: string;
  role: string;
  image: string;
  experienceBadge: string;
  credentials?: string;
  bio: string[];
}

const LEADERSHIP_PROFILES: LeaderProfile[] = [
  {
    name: 'Dr. M.S. Ramakrishnan',
    title: 'Executive Vice President – CDMO',
    role: 'Executive Leadership',
    image: '/images/team/MS Ramaki.jpg',
    experienceBadge: '27+ Years Experience',
    credentials: 'Ph.D. in Biochemistry (University of Mysore) • Post-Doctoral Fellow (Howard Hughes Medical Institute, University of Chicago)',
    bio: [
      'Dr. M. S. Ramakrishnan is a biopharmaceutical development leader with more than 27 years of experience spanning technical product development and in vitro and in vivo pharmacology. His experience includes the development of novel biologics and biosimilars, with a focus on advancing complex biologic programs through the development pipeline.',
      'Previously, Dr. Ramakrishnan served as Vice President of Research and Development at Biocon Biologics Limited, where he contributed to the development of analytical characterization technologies for novel and biosimilar monoclonal antibodies, with a focus on product quality, safety, and efficacy.',
      'He holds a Ph.D. in Biochemistry from the University of Mysore and completed post-doctoral research at the Howard Hughes Medical Institute, University of Chicago. As Executive Vice President – CDMO, he provides strategic leadership for the CDMO business, with a focus on strengthening service capabilities and aligning development and manufacturing offerings with global industry requirements.'
    ]
  },
  {
    name: 'Jagannathan Sundaram',
    title: 'Vice President – Process Sciences (India)',
    role: 'Process Sciences (India)',
    image: '/images/team/Jagan Sundaram Profile Picture.png',
    experienceBadge: '25+ Years Experience',
    credentials: 'Bioprocess Engineering & cGMP Scale-Up • Upstream & Downstream Technology Transfer',
    bio: [
      'Jagannathan Sundaram is Vice President of Process Sciences at Lambda CDMO, leading bioprocess engineering, upstream cell culture development, downstream purification, and technology transfer for biologics and biosimilars.',
      'With extensive expertise across biopharmaceutical process development and scale-up, he oversees the development of scalable single-use bioreactor systems and multi-modal downstream purification trains from bench scale through clinical and commercial cGMP biomanufacturing suites at Lambda\'s Ahmedabad campus.',
      'His leadership ensures robust tech transfer protocols, critical process parameter (CPP) control, high process yields, and full alignment with global US FDA, EMA, and WHO regulatory manufacturing expectations.'
    ]
  },
  {
    name: 'Dr. Abhishek Kulshrestha',
    title: 'Associate Vice President – Analytical Sciences (India)',
    role: 'Analytical Sciences (India)',
    image: '/images/team/Abhishek.jpeg',
    experienceBadge: '20+ Years Experience',
    credentials: 'Ph.D. in Biochemistry (University of Delhi) • M.Sc. in Biotechnology (JNU) • Co-Inventor on US & European Patents',
    bio: [
      'Dr. Abhishek Kulshrestha is Associate Vice President and Head of Analytical Sciences for the CDMO vertical at Lambda Therapeutic Research, with more than 20 years of experience in the biopharmaceutical industry. His expertise spans analytical sciences, quality control, and regulatory lifecycle management of complex biologics.',
      'At Lambda, he leads analytical development and characterization for therapeutic antibodies and large molecule bioanalytical services supporting domestic and international sponsors. His technical experience includes cell line development, orthogonal analytical and immunological strategies, process impurity clearance, asset evaluation, and immunogenicity risk assessment.',
      'Previously, Dr. Kulshrestha served as General Manager and Head of Immunology at Biocon Biologics and as a Research Leader at Reliance Life Sciences. He has also contributed to regulatory interactions and inspection-related data packages involving global health authorities. He holds a Ph.D. in Biochemistry from the University of Delhi, an M.Sc. in Biotechnology from Jawaharlal Nehru University (JNU), is a co-inventor on granted European and US patents related to antibody drug detection methods, and has published research in peer-reviewed journals.'
    ]
  },
  {
    name: 'Bhargav Perla',
    title: 'Head of Technical Development, Biopharma R&D (Harrow)',
    role: 'European R&D (Harrow, UK)',
    image: '/images/team/Bhargav Perla.png',
    experienceBadge: '20+ Years Experience',
    credentials: 'Biopharmaceutical CMC & Tech Transfer • EMA, FDA, TGA & Health Canada Regulatory Programs',
    bio: [
      'Bhargav Perla is a biopharmaceutical CMC and technical development leader with 20 years of experience across biologics and biosimilars. His expertise spans drug substance and drug product development, technology transfer, scale-up, product lifecycle management, CDMO management, and co-development partnerships.',
      'His experience includes developing and implementing development strategies, applying platform technologies, and coordinating internal and external capabilities to support biologics programs. He has worked across technical, regulatory, and operational functions to address complex development challenges and align program execution with business objectives.',
      'Bhargav has supported regulatory programs involving EMA, FDA, TGA, and Health Canada, with experience in development strategies leading to regulatory outcomes. He also has extensive experience in building high performing teams, scientific mentoring, resource management, and cross-functional governance.'
    ]
  }
];

const OVERVIEW_SLUGS = ['about', 'leadership', 'facility', 'integrated', 'quality', 'careers'];

function getOverviewCapabilityIcon(text: string, index: number) {
  const lower = text.toLowerCase();

  // 1. Specific Scientific & Laboratory Modalities
  if (lower.includes('europe') || lower.includes('india') || lower.includes('across india')) return Globe;
  if (lower.includes('novum') || lower.includes('bioanalytical') || lower.includes('partner') || lower.includes('one roof')) return Users;
  if (lower.includes('cell line') || lower.includes('clone') || lower.includes('gene construct') || lower.includes('expression system') || lower.includes('molecule-specific')) return Dna;
  if (lower.includes('microbiolog') || lower.includes('endotoxin') || lower.includes('bioburden') || lower.includes('sterility') || lower.includes('mycoplasma')) return Bug;
  if (lower.includes('bioassay') || lower.includes('immunogen') || lower.includes('potency') || lower.includes('cell-based') || lower.includes('adcc')) return Activity;
  if (lower.includes('integrated biologics') || lower.includes('upstream and downstream') || lower.includes('process development') || lower.includes('workflow')) return Workflow;
  if (lower.includes('analytical development') || lower.includes('physicochemical') || lower.includes('characterization') || lower.includes('lc-ms') || lower.includes('sec-hplc') || lower.includes('comparability')) return Microscope;
  
  // 2. Drug Substance vs Drug Product Manufacturing
  if (lower.includes('drug product') || lower.includes('fill-finish') || lower.includes('vials') || lower.includes('pfs') || lower.includes('cartridges') || lower.includes('filling line')) return PackageCheck;
  if (lower.includes('drug substance') || lower.includes('upstream production suites') || lower.includes('200l') || lower.includes('bioreactor capacity') || lower.includes('clinical gmp') || lower.includes('gmp manufacturing') || lower.includes('clinical supply')) return Factory;

  // 3. Quality & Batch Release & Compliance
  if (lower.includes('batch release') || lower.includes('quality control') || lower.includes('qc batch') || lower.includes('coa release')) return ClipboardCheck;
  if (lower.includes('data integrity') || lower.includes('ip protection') || lower.includes('21 cfr')) return Lock;
  if (lower.includes('product quality') || lower.includes('quality framework') || lower.includes('integrated qms') || lower.includes('audit') || lower.includes('compliance systems') || lower.includes('quality and compliance')) return ShieldCheck;
  if (lower.includes('continuous improvement') || lower.includes('advancement') || lower.includes('robustness') || lower.includes('manufacturability')) return TrendingUp;
  if (lower.includes('transparent') || lower.includes('project management') || lower.includes('governance')) return FileCheck;
  if (lower.includes('scientific excellence') || lower.includes('peer-reviewed') || lower.includes('awards')) return Award;

  // 4. Equipment & Facility Specifics
  if (lower.includes('ambr') || lower.includes('media/feed')) return FlaskConical;
  if (lower.includes('scale') || lower.includes('linear scale') || lower.includes('intermediate suite')) return Sliders;
  if (lower.includes('50l sus') || lower.includes('single-use')) return Layers;
  if (lower.includes('perfusion') || lower.includes('fed-batch')) return Repeat;
  if (lower.includes('liquid handling') || lower.includes('microliter') || lower.includes('resin screening')) return Pipette;
  if (lower.includes('chromatography') || lower.includes('purification') || lower.includes('column') || lower.includes('pcc')) return Filter;
  if (lower.includes('lyophil') || lower.includes('nucleation') || lower.includes('freeze')) return Snowflake;
  if (lower.includes('viral') || lower.includes('segregat') || lower.includes('grade c')) return ShieldAlert;
  if (lower.includes('visual inspection') || lower.includes('secondary packaging') || lower.includes('inspection suite')) return Eye;
  if (lower.includes('qtpp') || lower.includes('analytical sciences workflow')) return Search;
  if (lower.includes('regulatory') || lower.includes('fda') || lower.includes('ema') || lower.includes('pmda') || lower.includes('tga') || lower.includes('cmc')) return Scale;
  if (lower.includes('campus') || lower.includes('infrastructure') || lower.includes('27,000 sqft') || lower.includes('sqft')) return Building2;
  if (lower.includes('global') || lower.includes('market')) return Globe;
  if (lower.includes('phase-aligned') || lower.includes('lifecycle')) return Milestone;
  if (lower.includes('scalable') || lower.includes('capacity')) return Maximize2;

  // Diverse Fallback Array of Real Scientific Symbols
  const distinctScientificIcons = [
    Dna,
    Workflow,
    Microscope,
    Factory,
    PackageCheck,
    Activity,
    Bug,
    ClipboardCheck,
    FlaskConical,
    Filter,
    Snowflake,
    Scale,
  ];
  return distinctScientificIcons[index % distinctScientificIcons.length];
}

function AccentHeading({ text, className = '' }: { text: string; className?: string }) {
  const [first, ...rest] = text.split(' ');
  return (
    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15] ${className}`}>
      <span className="text-neutral-900">{first}</span>
      {rest.length > 0 ? ` ${rest.join(' ')}` : ''}
    </h2>
  );
}

export default function OverviewLayout({ page, content }: OverviewLayoutProps) {
  const slugIndex = OVERVIEW_SLUGS.indexOf(page.slug);
  const flip = slugIndex % 2 === 1;
  const heroImage = page.image || '/images/hero_cleanroom.png';

  const narrativeSections = content.sections.filter(
    (sec) =>
      sec.style !== 'faq-accordion' &&
      !sec.id?.includes('faq') &&
      sec.title !== 'Frequently Asked Questions' &&
      !(
        page.slug === 'about' &&
        (sec.title === 'The Lambda Advantage' ||
          sec.title === "Developing Tomorrow's Biologics" ||
          sec.style === 'locations-map' ||
          sec.style === 'cards-grid' ||
          sec.style === 'capabilities-checklist')
      ) &&
      !(
        page.slug === 'leadership' &&
        (sec.style === 'leadership-grid' ||
          sec.id === 'sec-leadership-team' ||
          sec.title?.toLowerCase().includes('leadership') ||
          sec.title?.toLowerCase().includes('executive'))
      )
  );

  const narrative = (
    <>
      {narrativeSections.map((section: any, idx: number) => {
        if (section.dark) {
          // Blue quote / highlight block
          return (
            <section key={idx} className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-molecules">
              <div className="w-full max-w-[1700px] mx-auto">
                <Reveal>
                  <div className="max-w-4xl mx-auto text-center">
                    <div className="w-14 h-14 mx-auto mb-8 rounded-[10px] bg-brand-yellow flex items-center justify-center">
                      <Quote className="w-7 h-7 text-black" />
                    </div>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15] mb-6">
                      <span className="text-neutral-900">{section.title.split(' ')[0]}</span>
                      {` ${section.title.split(' ').slice(1).join(' ')}`}
                    </h3>
                    <p className="text-[17px] md:text-[19px] text-slate-500 font-normal leading-relaxed">
                      {section.text}
                    </p>
                    {page.slug === 'careers' ? (
                      <div className="mt-8">
                        <a
                          href="https://careers.lambda-cro.com/go/CDMO/752444/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[10px] bg-brand-yellow hover:bg-brand-yellow-hover text-black font-semibold text-sm uppercase tracking-wider shadow-md hover:shadow active:scale-95 transition-all group/btn"
                        >
                          <span>Explore Open Roles</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    ) : (
                      <div className="mt-8 h-1 w-16 mx-auto bg-brand-yellow rounded-full" />
                    )}
                  </div>
                </Reveal>
              </div>
            </section>
          );
        }

        // Editorial alternating image + text row
        const imageRight = (section as any).imageSide
          ? (section as any).imageSide === 'right'
          : (idx % 2 === 1) !== flip;
        const isDiagram = Boolean(
          section.image &&
            (section.image.endsWith('.svg') ||
              section.image.includes('gene_construct')) &&
            !section.image.includes('teamwork') &&
            !section.image.includes('CDMOblue')
        );

        const equipmentItems = getSectionEquipment(section.title, page.slug);

        return (
          <div key={idx}>
            <section className={`px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 ${idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}>
              <div className="w-full max-w-[1700px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                  <Reveal className={imageRight ? 'lg:order-2' : ''}>
                    {section.images && section.images.length > 1 ? (
                      <EquipmentCarousel
                        items={section.images.map((img: string, i: number) => {
                          const match = (equipmentItems || []).find((eq) => eq.src === img) ||
                            ALL_EQUIPMENT_ITEMS.find((eq) => eq.src === img);
                          return match || {
                            src: img,
                            title: `${section.title} Equipment ${i + 1}`,
                            subtitle: `${section.title} instrumentation suite.`,
                            tag: 'Equipment'
                          };
                        })}
                        sectionTitle={section.title}
                      />
                    ) : equipmentItems && equipmentItems.length > 0 ? (
                      <EquipmentCarousel items={equipmentItems} sectionTitle={section.title} />
                    ) : (section.video || (section.mediaType === 'video' && section.image) || (section.image && /\.(mp4|webm|ogg|mov)$/i.test(section.image))) ? (
                      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-950 border border-neutral-200 rounded-[10px] shadow-sm">
                        <video
                          src={section.video || section.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : page.slug === 'careers' ? (
                      <a
                        href="https://careers.lambda-cro.com/go/CDMO/752444/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative aspect-[4/3] overflow-hidden bg-neutral-100 border border-neutral-200 rounded-[10px] shadow-sm group cursor-pointer"
                      >
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-5 py-2.5 rounded-[8px] bg-brand-yellow text-black font-bold text-xs uppercase tracking-wider shadow-xl flex items-center gap-2">
                            <span>Open Careers Portal</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </a>
                    ) : (
                      <div
                        className={`relative aspect-[4/3] overflow-hidden ${
                          isDiagram ? 'bg-white p-3 sm:p-5' : 'bg-neutral-100'
                        } border border-neutral-200 rounded-[10px] shadow-sm flex items-center justify-center`}
                      >
                        <img
                          src={section.image}
                          alt={section.title}
                          className={`w-full h-full ${
                            isDiagram ? 'object-contain' : 'object-cover'
                          } transition-transform duration-700 hover:scale-105`}
                        />
                      </div>
                    )}
                  </Reveal>
                  <Reveal delay={0.1} className={imageRight ? 'lg:order-1' : ''}>
                    <div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-black leading-[1.15] mb-5">
                        {section.title}
                      </h3>
                      <div className="h-1 w-12 bg-brand-blue rounded-full mb-5" />
                      <div className="space-y-3.5 text-[15px] md:text-[17px] text-neutral-600 leading-relaxed">
                        {section.text.split('\n\n').map((para: string, pIdx: number) => (
                          <p key={pIdx}>{renderFormattedText(para)}</p>
                        ))}
                      </div>

                      {/* Standard Single Bullets List */}
                      {section.bullets && section.bullets.length > 0 && (
                        <div className="mt-6 pt-5 border-t border-neutral-200/70">
                          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3.5">
                            {(section as any).bulletsTitle || 'Key capabilities include:'}
                          </span>
                          <ul className="space-y-2.5">
                            {section.bullets.map((bullet: string, bIdx: number) => (
                              <li key={bIdx} className="flex items-start gap-2.5">
                                <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                </div>
                                <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                                  {renderFormattedText(bullet)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Early Stage & Late Stage Split Bullets */}
                      {section.earlyStageBullets && section.lateStageBullets && (
                        <div className="mt-6 pt-5 border-t border-neutral-200/70 space-y-6">
                          <div>
                            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3">
                              Early-Stage Development
                            </span>
                            <ul className="space-y-2.5">
                              {section.earlyStageBullets.map((bullet: string, bIdx: number) => (
                                <li key={bIdx} className="flex items-start gap-2.5">
                                  <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                  </div>
                                  <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                                    {renderFormattedText(bullet)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3">
                              Late-Stage Development
                            </span>
                            <ul className="space-y-2.5">
                              {section.lateStageBullets.map((bullet: string, bIdx: number) => (
                                <li key={bIdx} className="flex items-start gap-2.5">
                                  <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                  </div>
                                  <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                                    {renderFormattedText(bullet)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Formulation, Lyophilization & Clinical GMP Bullets */}
                      {(section.formulationBullets || section.lyophilizationBullets || section.gmpManufacturingBullets) && (
                        <div className="mt-6 pt-5 border-t border-neutral-200/70 space-y-6">
                          {section.formulationBullets && section.formulationBullets.length > 0 && (
                            <div>
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3">
                                Formulation Development
                              </span>
                              <ul className="space-y-2.5">
                                {section.formulationBullets.map((bullet: string, bIdx: number) => (
                                  <li key={bIdx} className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                    </div>
                                    <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                                      {renderFormattedText(bullet)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {section.lyophilizationBullets && section.lyophilizationBullets.length > 0 && (
                            <div>
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3">
                                Lyophilization Development
                              </span>
                              <ul className="space-y-2.5">
                                {section.lyophilizationBullets.map((bullet: string, bIdx: number) => (
                                  <li key={bIdx} className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                    </div>
                                    <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                                      {renderFormattedText(bullet)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {section.gmpManufacturingBullets && section.gmpManufacturingBullets.length > 0 && (
                            <div>
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3">
                                Clinical GMP Manufacturing
                              </span>
                              <ul className="space-y-2.5">
                                {section.gmpManufacturingBullets.map((bullet: string, bIdx: number) => (
                                  <li key={bIdx} className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                    </div>
                                    <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                                      {renderFormattedText(bullet)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Analytical Physicochemical, Structural & Functional Bullets */}
                      {(section.physicochemicalBullets || section.structuralBullets || section.functionalBullets) && (
                        <div className="mt-6 pt-5 border-t border-neutral-200/70 space-y-6">
                          {section.physicochemicalBullets && section.physicochemicalBullets.length > 0 && (
                            <div>
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3">
                                Physicochemical & Molecular Characterization
                              </span>
                              <ul className="space-y-2.5">
                                {section.physicochemicalBullets.map((bullet: string, bIdx: number) => (
                                  <li key={bIdx} className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                    </div>
                                    <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                                      {renderFormattedText(bullet)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {section.structuralBullets && section.structuralBullets.length > 0 && (
                            <div>
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3">
                                Structural & Biophysical Characterization
                              </span>
                              <ul className="space-y-2.5">
                                {section.structuralBullets.map((bullet: string, bIdx: number) => (
                                  <li key={bIdx} className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                    </div>
                                    <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                                      {renderFormattedText(bullet)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {section.functionalBullets && section.functionalBullets.length > 0 && (
                            <div>
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3">
                                Functional & Cell-Based Analysis
                              </span>
                              <ul className="space-y-2.5">
                                {section.functionalBullets.map((bullet: string, bIdx: number) => (
                                  <li key={bIdx} className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                    </div>
                                    <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                                      {renderFormattedText(bullet)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {(section as any).footerText && (
                        <p className="mt-5 text-[15px] md:text-[17px] text-neutral-600 leading-relaxed">
                          {renderFormattedText((section as any).footerText)}
                        </p>
                      )}
                      {page.slug === 'careers' && (
                        <div className="mt-7">
                          <a
                            href="https://careers.lambda-cro.com/go/CDMO/752444/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[10px] bg-brand-yellow hover:bg-brand-yellow-hover text-black font-semibold text-sm uppercase tracking-wider shadow-md hover:shadow active:scale-95 transition-all group/btn"
                          >
                            <span>Explore Open Roles</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      )}
                    </div>
                  </Reveal>
                </div>

                {/* Analytical QTPP & Applications Showcase */}
                {(section.qtppText || (section.applications && section.applications.length > 0)) && (
                  <div className="mt-14 md:mt-20 pt-10 border-t border-neutral-200/80">
                    {section.qtppText && (
                      <Reveal>
                        <div className="bg-neutral-50/80 rounded-[12px] border border-neutral-200/80 p-6 md:p-8 mb-10 max-w-5xl mx-auto">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shrink-0">
                              <Target className="w-4 h-4" />
                            </div>
                            <h4 className="text-base md:text-lg font-bold text-neutral-900">
                              Quality Target Product Profile (QTPP) Alignment
                            </h4>
                          </div>
                          <p className="text-[15px] md:text-[16px] text-neutral-600 leading-relaxed font-normal">
                            {renderFormattedText(section.qtppText)}
                          </p>
                        </div>
                      </Reveal>
                    )}

                    {section.applications && section.applications.length > 0 && (
                      <Reveal delay={0.1}>
                        <div>
                          <div className="text-center max-w-2xl mx-auto mb-8">
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange block mb-2">
                              Applications & Modalities
                            </span>
                            <h4 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
                              Selected Analytical Applications
                            </h4>
                            <div className="h-1 w-12 bg-brand-blue rounded-full mx-auto mt-3" />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {section.applications.map((app: any, aIdx: number) => (
                              <div
                                key={aIdx}
                                className="bg-white rounded-[12px] border border-neutral-200/80 p-6 shadow-xs hover:shadow-md hover:border-brand-blue/40 transition-all flex flex-col"
                              >
                                <h5 className="text-base font-bold text-neutral-900 mb-2">
                                  {app.title}
                                </h5>
                                <p className="text-[14px] text-neutral-600 leading-relaxed flex-1">
                                  {app.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Reveal>
                    )}
                  </div>
                )}
              </div>
            </section>
            {(page.slug === 'facility' || page.slug === 'India') && idx === 0 && <FacilityGallery />}
          </div>
        );
      })}
    </>
  );



  return (
    <>
      {/* HERO — editorial, light with dark text */}
      <section className="relative bg-molecules-hero overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        <div className="relative w-full max-w-[1700px] mx-auto pt-16 pb-12 md:pt-20 md:pb-16">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500 mb-8">
            <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-500">{page.category === 'facility&location' ? 'Facility & Location' : page.category}</span>
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.05]">
                <span className="text-neutral-900">{page.heading.split(' ')[0]}</span>
                {` ${page.heading.split(' ').slice(1).join(' ')}`}
              </h1>
              <div className="space-y-4 text-[17px] text-slate-500 font-normal leading-relaxed mt-6 max-w-xl">
                {page.description.split('\n\n').map((para: string, pIdx: number) => (
                  <p key={pIdx}>{renderFormattedText(para)}</p>
                ))}
              </div>
              {page.slug === 'careers' && (
                <div className="mt-8">
                  <a
                    href="https://careers.lambda-cro.com/go/CDMO/752444/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-[10px] bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-sm uppercase tracking-wider shadow-md hover:shadow-lg active:scale-95 transition-all group/btn"
                  >
                    <span>Explore Open Roles</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              )}
            </div>
            <Reveal delay={0.1}>
              {page.slug === 'about' ? (
                <AboutHeroCarousel images={page.images && page.images.length > 0 ? page.images : undefined} />
              ) : (page.slug === 'facility' || page.slug === 'India') ? (
                <FacilityHeroCarousel images={page.images && page.images.length > 0 ? page.images : undefined} />
              ) : (page.slug === 'UK' || page.slug === 'london') ? (
                <LondonHeroCarousel images={page.images && page.images.length > 0 ? page.images : undefined} />
              ) : (page.images && page.images.length > 1) ? (
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
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200 shadow-lg bg-white">
                  <img
                    src={heroImage}
                    alt={page.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* GLOBAL REACH & CDMO LOCATIONS MATRIX (ABOUT, FACILITY, LONDON) */}
      {page.slug === 'about' && (() => {
        const sec1 = page.sections?.find((s) => s.style === 'feature-split') || page.sections?.[0];
        const mapSec = page.sections?.find((s) => s.style === 'locations-map');
        const sec1Title = sec1?.title || "Developing Tomorrow's Biologics";
        const sec1Media = sec1?.image || sec1?.video || "/images/upstream/Carbon_di_Oxide_shaker_incubator.png";
        const sec1Images = (sec1?.images && sec1.images.length > 0) ? sec1.images : [sec1Media];
        const sec1IsVideo = sec1?.mediaType === 'video' || /\.(mp4|webm|ogg|mov)$/i.test(sec1Media);

        // Parse paragraphs
        const rawText = sec1?.text;
        const paragraphs = rawText ? rawText.split('\n\n').filter(Boolean) : null;

        return (
          <>
            <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-white border-b border-neutral-100">
              <div className="w-full max-w-[1700px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  <Reveal>
                    {sec1Images.length > 1 ? (
                      <AboutHeroCarousel images={sec1Images} />
                    ) : sec1IsVideo ? (
                      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-950 border border-neutral-200 rounded-[10px] shadow-sm">
                        <video
                          src={sec1Media}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 border border-neutral-200 rounded-[10px] shadow-sm">
                        <img
                          src={sec1Media}
                          alt={sec1Title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                    )}
                  </Reveal>
                  <Reveal delay={0.1}>
                    <div>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15] mb-5">
                        {sec1Title}
                      </h2>
                      <div className="h-1 w-12 bg-brand-blue rounded-full mb-6" />
                      
                      <div className="space-y-4 text-[15px] md:text-[17px] text-neutral-600 leading-relaxed font-normal">
                        {paragraphs && paragraphs.length > 0 ? (
                          paragraphs.map((p: string, pIdx: number) => {
                            if (p.includes('Lambda Therapeutic Research') && p.includes('Novum Pharmaceutical')) {
                              return (
                                <p key={pIdx}>
                                  Backed by a combined legacy of more than 75 years from{' '}
                                  <a
                                    href="https://www.lambda-cro.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-brand-blue hover:text-brand-blue-hover underline font-medium inline-flex items-center gap-1"
                                  >
                                    <span>Lambda Therapeutic Research Ltd.</span>
                                    <ExternalLink className="w-3.5 h-3.5 inline-block" />
                                  </a>{' '}
                                  and{' '}
                                  <a
                                    href="https://www.novumprs.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-brand-blue hover:text-brand-blue-hover underline font-medium inline-flex items-center gap-1"
                                  >
                                    <span>Novum Pharmaceutical Research Services</span>
                                    <ExternalLink className="w-3.5 h-3.5 inline-block" />
                                  </a>
                                  , Lambda CDMO now brings together process and analytical development, robust quality systems, and manufacturing capabilities within an integrated framework.
                                </p>
                              );
                            }
                            if (p.includes('India and Europe')) {
                              return (
                                <p key={pIdx}>
                                  With capabilities across <strong className="text-neutral-900 font-semibold">India and Europe</strong>, Lambda CDMO supports biologics programs through cell line development, upstream and downstream process development, analytical development and characterization, and GMP manufacturing.
                                </p>
                              );
                            }
                            if (p.includes('monoclonal antibodies')) {
                              return (
                                <p key={pIdx}>
                                  From <strong className="text-neutral-900 font-semibold">monoclonal antibodies and bispecific antibodies to ADCs, recombinant proteins, and peptides</strong>, our multidisciplinary teams work closely with sponsors to support different aspects of process development, analytical characterization, technology transfer, and clinical supplies.
                                </p>
                              );
                            }
                            return <p key={pIdx}>{renderFormattedText(p)}</p>;
                          })
                        ) : (
                          <>
                            <p>
                              With capabilities across <strong className="text-neutral-900 font-semibold">India and Europe</strong>, Lambda CDMO supports biologics programs through cell line development, upstream and downstream process development, analytical development and characterization, and GMP manufacturing.
                            </p>
                            <p>
                              Backed by a combined legacy of more than 75 years from{' '}
                              <a
                                href="https://www.lambda-cro.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-blue hover:text-brand-blue-hover underline font-medium inline-flex items-center gap-1"
                              >
                                <span>Lambda Therapeutic Research Ltd.</span>
                                <ExternalLink className="w-3.5 h-3.5 inline-block" />
                              </a>{' '}
                              and{' '}
                              <a
                                href="https://www.novumprs.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-blue hover:text-brand-blue-hover underline font-medium inline-flex items-center gap-1"
                              >
                                <span>Novum Pharmaceutical Research Services</span>
                                <ExternalLink className="w-3.5 h-3.5 inline-block" />
                              </a>
                              , Lambda CDMO now brings together process and analytical development, robust quality systems, and manufacturing capabilities within an integrated framework.
                            </p>
                            <p>
                              From <strong className="text-neutral-900 font-semibold">monoclonal antibodies and bispecific antibodies to ADCs, recombinant proteins, and peptides</strong>, our multidisciplinary teams work closely with sponsors to support different aspects of process development, analytical characterization, technology transfer, and clinical supplies.
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
            <CDMOLocationsMapSection
              title={mapSec?.title || 'Global CDMO Capabilities Across India and Europe'}
              subtitle={mapSec?.subtitle || mapSec?.text || 'Bespoke Biologics Infrastructure'}
              cards={mapSec?.cards}
            />
          </>
        );
      })()}

      {/* CAPABILITIES / THE LAMBDA ADVANTAGE SECTION */}
      {page.capabilities && page.capabilities.length > 0 && page.slug !== 'quality' && page.slug !== 'facility' && page.slug !== 'India' && page.slug !== 'london' && page.slug !== 'UK' && page.slug !== 'leadership' && (() => {
        const advantageSec = page.sections?.find((s) => s.style === 'cards-grid' || s.title?.toLowerCase().includes('advantage'));
        const advantageTitle = advantageSec?.title || 'The Lambda Advantage';
        const advantageFirstWord = advantageTitle.split(' ')[0] || 'The';
        const advantageRemainingWords = advantageTitle.split(' ').slice(1).join(' ') || 'Lambda Advantage';
        const advantageSubtitle = advantageSec?.subtitle || 'What Sets Us Apart';
        const advantageCards = (advantageSec?.cards && advantageSec.cards.length > 0)
          ? advantageSec.cards.map((c) => c.title)
          : page.capabilities;

        return (
          <section className={`relative px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 ${page.slug === 'about' ? 'bg-molecules' : 'bg-neutral-50/60'} border-b border-neutral-100 overflow-hidden`}>
            {page.slug === 'about' && <DnaScrollBackground />}
            <div className="relative z-10 w-full max-w-[1700px] mx-auto">
              <Reveal>
                <div className="text-center mb-10 md:mb-14">
                  {page.slug === 'about' ? (
                    <div className="max-w-4xl mx-auto">
                      <div className="w-14 h-14 mx-auto mb-8 rounded-[10px] bg-brand-yellow flex items-center justify-center shadow-xs">
                        <Quote className="w-7 h-7 text-black" />
                      </div>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15] mb-6">
                        <span className="text-neutral-900">{advantageFirstWord}</span>{' '}
                        {advantageRemainingWords}
                      </h2>
                      <div className="space-y-4 max-w-3xl mx-auto text-[17px] md:text-[19px] text-slate-600 font-normal leading-relaxed text-center">
                        {advantageSec?.text ? (
                          advantageSec.text.split('\n\n').map((para: string, pIdx: number) => (
                            <p key={pIdx}>{renderFormattedText(para)}</p>
                          ))
                        ) : (
                          <>
                            <p>
                              Every biologic program has its own process, analytical, manufacturing, and regulatory requirements. Lambda CDMO brings together an integrated approach for process and analytical development, cGMP manufacturing, adequately supported by a quality management system to support programs from early development through clinical supplies.
                            </p>
                            <p>
                              Our approach combines flexible development strategies, scalable processes, and quality systems designed to support evolving program requirements and global regulatory expectations.
                            </p>
                          </>
                        )}
                      </div>
                      <div className="mt-10 mb-2 flex flex-col items-center justify-center">
                        <div className="h-1 w-16 bg-brand-yellow rounded-full mb-6" />
                        <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
                          {advantageSubtitle}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                        {page.slug === 'leadership' ? (
                          <>
                            <span className="text-black">Operational</span> Commitments
                          </>
                        ) : page.slug === 'quality' ? (
                          <>
                            <span className="text-black">Quality</span> & Regulatory Framework
                          </>
                        ) : page.slug === 'integrated' ? (
                          <>
                            <span className="text-black">Integrated</span> Services
                          </>
                        ) : (
                          <>
                            <span className="text-black">Core</span> Lifecycle Capabilities
                          </>
                        )}
                      </h2>
                      <p className="text-[15px] sm:text-[17px] text-neutral-600 leading-relaxed max-w-3xl mx-auto mt-4">
                        {page.slug === 'leadership'
                          ? 'Every project is supported by a dedicated team focused on delivering solutions that are scientifically sound, operationally efficient, and aligned with regulatory expectations. The team is focused on client requirements and the criticality of on-time, in-full delivery, with a working model built around six core commitments:'
                          : page.slug === 'quality'
                          ? 'Robust quality assurance, international compliance standards, and risk-managed processes across every program.'
                          : 'Seamless coordination across development, analytical characterization, and GMP manufacturing under one roof.'}
                      </p>
                    </>
                  )}
                </div>
              </Reveal>

              {page.slug === 'about' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {advantageCards.map((cap: any, idx: number) => {
                    const Icon = getOverviewCapabilityIcon(cap, idx);
                    return (
                      <Reveal key={idx} delay={idx * 0.04} className="h-full">
                        <div className="group h-full bg-white border border-neutral-200/80 rounded-[10px] p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-brand-yellow transition-all duration-300 flex items-start gap-4">
                          <div className="w-11 h-11 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors duration-300 mt-0.5">
                            <Icon className="w-5 h-5 text-brand-blue group-hover:text-black transition-colors duration-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[15px] sm:text-base font-medium text-neutral-800 leading-snug group-hover:text-black transition-colors duration-300">
                              {cap}
                            </h4>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              ) : page.slug === 'integrated' || page.slug === 'quality' || page.slug === 'leadership' ? (
                <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
                  {page.capabilities.map((cap: any, idx: number) => {
                    const Icon = getOverviewCapabilityIcon(cap, idx);
                    return (
                      <Reveal key={idx} delay={idx * 0.04} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex">
                        <div className="group w-full h-full bg-white border border-neutral-200/80 rounded-[10px] p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-brand-yellow transition-all duration-300 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors duration-300">
                            <Icon className="w-6 h-6 text-brand-blue group-hover:text-black transition-colors duration-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base sm:text-lg font-semibold text-neutral-900 leading-snug group-hover:text-black transition-colors duration-300">
                              {cap}
                            </h4>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-3.5 max-w-4xl mx-auto">
                  {page.capabilities.map((cap: any, idx: number) => {
                    const Icon = getOverviewCapabilityIcon(cap, idx);
                    return (
                      <Reveal key={idx} delay={idx * 0.04}>
                        <div className="group w-full bg-white border border-neutral-200/80 rounded-[10px] p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-brand-yellow transition-all duration-300 flex items-center gap-4 sm:gap-5">
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors duration-300">
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-blue group-hover:text-black transition-colors duration-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base sm:text-lg font-semibold text-neutral-900 leading-snug group-hover:text-black transition-colors duration-300">
                              {cap}
                            </h4>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        );
      })()}

      {/* LEADERSHIP PROFILES GRID */}
      {page.slug === 'leadership' && (() => {
        const leaderSec = page.sections?.find(
          (s) => s.style === 'leadership-grid' || s.id === 'sec-leadership-team' || s.title?.toLowerCase().includes('leadership') || s.title?.toLowerCase().includes('executive')
        );
        const leadersToRender: LeaderProfile[] = (leaderSec?.cards && leaderSec.cards.length > 0)
          ? leaderSec.cards.map((c) => ({
              name: c.title,
              title: c.link || c.href || '',
              role: c.badge || 'Executive Leadership',
              image: c.image || '/images/team/MS Ramaki.jpg',
              experienceBadge: c.step || '25+ Years Experience',
              credentials: c.icon || '',
              bio: c.description ? c.description.split('\n\n').filter(Boolean) : []
            }))
          : LEADERSHIP_PROFILES;

        const secTitle = leaderSec?.title || 'Executive & Scientific Team';
        const secSubtitle = leaderSec?.text || leaderSec?.subtitle || 'Led by experienced biopharma leaders across technical product development, process sciences, analytical characterization, and global regulatory execution.';

        return (
          <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-white border-b border-neutral-100">
            <div className="w-full max-w-[1700px] mx-auto">
              <Reveal>
                <div className="text-center mb-12 md:mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                    {secTitle}
                  </h2>
                  <p className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed max-w-3xl mx-auto mt-4">
                    {secSubtitle}
                  </p>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-10 items-stretch">
                {leadersToRender.map((leader: any, idx: number) => (
                  <Reveal key={idx} delay={idx * 0.08} className="h-full">
                    <div className="group h-full bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-brand-blue/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                      {/* Top subtle accent bar */}
                      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-blue to-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div>
                        {/* Top Row: Photo & Header Info */}
                        <div className="flex flex-col sm:flex-row gap-6 items-start mb-5">
                          {/* Real Portrait Photograph Container */}
                          <div className="relative w-full sm:w-48 h-64 sm:h-56 rounded-xl overflow-hidden shadow-md border border-slate-200/90 bg-slate-100 shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={encodeURI(leader.image)}
                              alt={leader.name}
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl pointer-events-none" />
                          </div>

                          {/* Title & Metadata */}
                          <div className="flex flex-col flex-1">
                            <span className="inline-flex items-center self-start px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-brand-orange/10 text-brand-orange border border-brand-orange/20 mb-2">
                              {leader.role}
                            </span>

                            <h3 className="text-2xl font-bold tracking-tight text-neutral-900 group-hover:text-brand-blue transition-colors mb-1">
                              {leader.name}
                            </h3>

                            <p className="text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-3 leading-snug">
                              {leader.title}
                            </p>

                            <div className="flex flex-wrap items-center gap-2">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                <Award className="w-3.5 h-3.5 text-brand-orange" />
                                <span>{leader.experienceBadge}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Credentials Callout */}
                        {leader.credentials && (
                          <div className="mb-4 p-3 sm:p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                            <GraduationCap className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                            <span className="leading-snug">{leader.credentials}</span>
                          </div>
                        )}

                        {/* Bio Paragraphs */}
                        <div className="space-y-3 text-[14px] sm:text-[14.5px] text-slate-600 leading-relaxed font-normal">
                          {leader.bio.map((para: string, pIdx: number) => (
                            <p key={pIdx}>{para}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Narrative Editorial Sections */}
      {narrative}

      {/* FAQ Accordion (Bottom Section) */}
      {page.faqs && page.faqs.length > 0 && (
        <FAQSection
          faqs={page.faqs}
          title={page.faqTitle || (page.category === 'home' ? 'Common Questions' : 'Frequently Asked Questions')}
          subtitle={page.faqSubtitle || 'Answers to key questions regarding our biologics development platform, regulatory alignment, and facility infrastructure.'}
          buttonText={page.faqButtonText}
          buttonLink={page.faqButtonLink}
        />
      )}

      {/* CTA */}
      {page.slug === 'careers' ? (
        <CommonCTA
          primaryButtonText="Explore Open Roles"
          primaryButtonHref="https://careers.lambda-cro.com/go/CDMO/752444/"
          primaryButtonTarget="_blank"
          primaryButtonRel="noopener noreferrer"
        />
      ) : (
        <CommonCTA />
      )}
    </>
  );
}
