'use client';

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Columns,
  LayoutGrid,
  ListOrdered,
  TrendingUp,
  Sliders,
  HelpCircle,
  MapPin,
  Target,
  FileSpreadsheet,
  Film,
  Megaphone,
  AlignLeft,
  CheckCircle2,
  Layers,
  Newspaper,
  Users,
  HeartPulse,
  Microscope,
  Quote
} from 'lucide-react';
import type { CDMOSection } from '@/data/cdmoData';

export interface SectionLayoutOption {
  id: string;
  name: string;
  category: 'content' | 'visual' | 'data' | 'conversion';
  icon: React.ElementType;
  tag: string;
  description: string;
  bestFor: string;
  sampleData: Partial<CDMOSection>;
}

export const SECTION_LAYOUTS: SectionLayoutOption[] = [
  {
    id: 'leadership-grid',
    name: 'Executive & Scientific Leadership Team Grid',
    category: 'content',
    icon: Users,
    tag: 'Team Grid',
    description: '2x2 executive leadership card grid with portrait photo, role badge, title, experience counter, academic credentials, and full bio.',
    bestFor: 'Leadership team, scientific advisory board, executive bios',
    sampleData: {
      style: 'leadership-grid',
      title: 'Executive & Scientific Team',
      subtitle: 'SCIENTIFIC LEADERSHIP',
      text: 'Led by experienced biopharma leaders across technical product development, process sciences, analytical characterization, and global regulatory execution.',
      dark: false,
      cards: [
        {
          title: 'Dr. M.S. Ramakrishnan',
          link: 'EXECUTIVE VICE PRESIDENT - CDMO',
          badge: 'EXECUTIVE LEADERSHIP',
          step: '25+ Years Experience',
          icon: 'Ph.D. in Biochemistry (University of Mysore) | Post-doctoral fellow (Howard Hughes Medical Institute, University of Chicago)',
          description: 'Dr. M. S. Ramakrishnan is a biopharmaceutical development leader with more than 25 years of experience spanning technical product development and in vitro and in vivo pharmacology. His experience includes the development of novel biologics and biosimilars, with a focus on advancing complex biologic programs through the development pipeline.\n\nPreviously, Dr. Ramakrishnan served as Vice President of Research and Development at Biocon Biologics Limited, where he contributed to the development of analytical characterization technologies for novel and biosimilar monoclonal antibodies, with a focus on product quality, safety, and efficacy.\n\nHe holds a Ph.D. in Biochemistry from the University of Mysore and completed post-doctoral research at the Howard Hughes Medical Institute, University of Chicago. As Executive Vice President – CDMO, he provides strategic leadership for the CDMO business, with a focus on strengthening service capabilities and aligning development and manufacturing offerings with global industry requirements.',
          image: '/images/team/MS Ramaki.jpg'
        },
        {
          title: 'Jagannathan Sundaram',
          link: 'VICE PRESIDENT - PROCESS SCIENCES (INDIA)',
          badge: 'PROCESS SCIENCES (INDIA)',
          step: '20+ Years Experience',
          icon: 'Master’s in Engineering in Bio-Process Technology | B.Tech in Chemical & Bio-Chemical Engineering - Tech',
          description: 'Jagannathan Sundaram is Vice President of Process Sciences at Lambda CDMO, leading bioprocess engineering, upstream cell culture development, downstream purification, and technology transfer for biologics and biosimilars.\n\nWith extensive expertise across biopharmaceutical process development and scale-up, he oversees the development of scalable single-use bioreactor systems and multi-modal downstream purification suites from bench scale through clinical and commercial cGMP biomanufacturing suites at Lambda’s Ahmedabad campus.\n\nHis leadership ensures robust tech transfer protocols, critical process parameter (CPP) control, high process yields, and full alignment with global US FDA, EMA, and WHO regulatory manufacturing expectations.',
          image: '/images/team/Jagannathan.jpg'
        },
        {
          title: 'Dr. Abhishek Kulshrestha',
          link: 'ASSOCIATE VICE PRESIDENT - ANALYTICAL SCIENCES (INDIA)',
          badge: 'ANALYTICAL SCIENCES (INDIA)',
          step: '20+ Years Experience',
          icon: 'Ph.D. in Biochemistry (University of Delhi) | M.Sc. in Biotechnology (JNU) | B.Sc. in Life Sciences (Composite Honors)',
          description: 'Dr. Abhishek Kulshrestha is Associate Vice President and Head of Analytical Sciences for the CDMO vertical at Lambda Therapeutic Research, with more than 20 years of experience in the biopharmaceutical industry. His expertise spans analytical sciences, quality control, and regulatory lifecycle management of complex biologics.\n\nAt Lambda, he leads analytical development and characterization for therapeutic antibodies and large-molecule bioanalytical services supporting domestic and international sponsors. His technical experience includes cell line development, orthogonal analytical and immunological strategies, process impurity clearance, asset evaluation, and immunogenicity risk assessment.\n\nPreviously, Dr. Kulshrestha served as General Manager and Head of Immunology at Biocon Biologics and as a Research Leader at Reliance Life Sciences. He has also contributed to regulatory interactions and preparation of dossier-related packages involving global health authorities. He holds a Ph.D. in Biochemistry from the University of Delhi, an M.Sc. in Biotechnology from Jawaharlal Nehru University (JNU). He is a co-inventor on granted European and US patents related to antibody drug detection methods, and has published research in peer-reviewed journals.',
          image: '/images/team/Abhishek.png'
        },
        {
          title: 'Bhargav Parla',
          link: 'HEAD OF TECHNICAL DEVELOPMENT, BIOPHARMA R&D (HARROW)',
          badge: 'EUROPEAN R&D (HARROW, UK)',
          step: '20+ Years Experience',
          icon: 'Qualified Chemist and Biologist | Qualified QP (QP Status) | US FDA, EMA, TGA, & Health Canada Regulatory Programs',
          description: 'Bhargav Parla is a biopharmaceutical CMC and technical development leader with 20 years of experience across biologics and biosimilars. His expertise spans drug substance and drug product development, technology transfer, scale-up, product lifecycle management, CDMO management, and cross-development partnerships.\n\nHis experience includes developing and implementing development strategies, applying platform technologies, and coordinating internal and external capabilities to support biologics programs. He has worked across technical, regulatory, and operational functions to address complex development challenges and align program execution with business requirements.\n\nBhargav has supported regulatory programs involving EMA, FDA, TGA, and Health Canada, with experience in development strategies leading to regulatory outcomes. He also has extensive experience in building high-performing teams, scientific mentoring, resource management, and cross-functional governance.',
          image: '/images/team/Bhargav.jpg'
        }
      ]
    }
  },
  {
    id: 'capabilities-grid',
    name: 'The Lambda Advantage (9-Card White Grid)',
    category: 'content',
    icon: LayoutGrid,
    tag: 'Advantage Grid',
    description: 'White 9-card capability grid with central quote icon, introductory narrative text, WHAT SETS US APART badge, and distinct capability cards matching live site.',
    bestFor: 'Why partner with us, competitive advantages, core pillars, corporate credentials',
    sampleData: {
      style: 'cards-grid',
      title: 'The Lambda Advantage',
      subtitle: 'WHAT SETS US APART',
      text: 'Every biologic program has its own process, analytical, manufacturing, and regulatory requirements. Lambda CDMO brings together an integrated approach for process and analytical development, cGMP manufacturing, adequately supported by a quality management system to support programs from early development through clinical supplies.\n\nOur approach combines flexible development strategies, scalable processes, and quality systems designed to support evolving program requirements and global regulatory expectations.',
      dark: false,
      cards: [
        { title: 'Integrated biologics development, analytical, and manufacturing capabilities', description: '', icon: 'Workflow' },
        { title: 'Extensive biologics development capabilities across India and Europe', description: '', icon: 'Globe' },
        { title: 'Molecule-specific development approaches across cell line engineering, process development for Drug substance (upstream cell culture, downstream purification) and Drug product, and analytical development', description: '', icon: 'Dna' },
        { title: 'Advanced analytical characterization supporting method development and validation, product understanding, and comparative analytical assessment.', description: '', icon: 'Microscope' },
        { title: 'Process development focused on scalability, robustness, and manufacturability.', description: '', icon: 'TrendingUp' },
        { title: 'Process characterisation studies to support process validation for both Drug Substance and Drug Product.', description: '', icon: 'Factory' },
        { title: 'GMP manufacturing capabilities and flexible capacity supporting development batches through clinical supplies', description: '', icon: 'Package' },
        { title: 'Quality and compliance systems supporting GMP operations and regulatory requirements', description: '', icon: 'ShieldCheck' },
        { title: 'The above biologics development capabilities is well integrated with Lambda and Novum’s clinical research and regulated bioanalytical capabilities for peptides and biologics.', description: '', icon: 'Users' }
      ]
    }
  },
  {
    id: 'feature-split',
    name: 'Feature Split (50/50 Media & Text)',
    category: 'content',
    icon: Columns,
    tag: 'Editorial',
    description: 'Side-by-side layout pairing high-res scientific imagery or cleanroom video with structured paragraphs and key checkmark capabilities.',
    bestFor: 'Platform overview, technical capability highlights, facility focus',
    sampleData: {
      style: 'feature-split',
      title: 'Advanced Bioprocess Development Platform',
      subtitle: 'SCIENTIFIC RIGOR & ROBUST SCALE-UP',
      text: 'Our multidisciplinary team optimizes upstream mammalian cell culture and downstream purification sequences to maximize yield, ensure batch consistency, and de-risk tech transfer into clinical and commercial production.',
      image: '/images/hero_cleanroom.png',
      imageSide: 'right',
      dark: false,
      bulletsTitle: 'KEY PLATFORM ATTRIBUTES',
      bullets: [
        'Automated high-throughput screening and clone selection in CHO expression lines',
        'Parameter optimization and DoE studies across benchtop and pilot scale bioreactors',
        'Multistep chromatographic impurity clearance targeting host cell proteins and DNA',
        'ICH Q2(R1) method development, qualification, and analytical dossier release'
      ],
      buttonText: 'Explore Platform Specifications',
      buttonLink: '/services'
    }
  },
  {
    id: 'cards-grid',
    name: 'Interactive Bento & Cards Grid',
    category: 'content',
    icon: LayoutGrid,
    tag: 'Bento Grid',
    description: 'Grid of 2, 3, or 4 highlight cards with custom icons, badge tags, descriptions, and direct deep-dive links.',
    bestFor: 'Service suites, departmental pillars, core competencies',
    sampleData: {
      style: 'cards-grid',
      title: 'Comprehensive Development & Manufacturing Services',
      subtitle: 'END-TO-END CAPABILITIES',
      text: 'From cell line engineering to aseptic fill-finish and global regulatory release, explore our integrated core services.',
      dark: false,
      cards: [
        {
          title: 'Cell Line Engineering',
          description: 'High-titer CHO-K1 / CHO-S clonal lineages engineered for robust growth kinetics, high specific productivity, and stability.',
          icon: 'Dna',
          badge: '01 — Gene to Clone',
          link: '/services/cell-line',
          image: '/images/celldev/CLD_Lab.png'
        },
        {
          title: 'Process Sciences & Scale-Up',
          description: 'Fed-batch and intensified perfusion process optimization with full DoE characterization for seamless scale-up.',
          icon: 'Settings',
          badge: '02 — Upstream & Downstream',
          link: '/services/process',
          image: '/images/upstream/AMBR250.png'
        },
        {
          title: 'cGMP Manufacturing Suites',
          description: 'State-of-the-art cleanroom facilities supporting Phase I–III clinical supply with single-use bioreactor trains.',
          icon: 'Factory',
          badge: '03 — GMP Production',
          link: '/manufacturing/drug-substance',
          image: '/images/down stream/AKTA Pilot.png'
        }
      ]
    }
  },
  {
    id: 'process-steps',
    name: 'Workflow & Process Timeline',
    category: 'visual',
    icon: ListOrdered,
    tag: 'Numbered Steps',
    description: 'Sequential 01–04 numbered step cards showing program progression from concept through QA lot release.',
    bestFor: 'Stage-gate workflows, project onboarding, tech transfer phases',
    sampleData: {
      style: 'process-steps',
      title: 'Structured Program Execution Workflow',
      subtitle: 'SYSTEMATIC PROJECT MILESTONES',
      text: 'A transparent, milestone-driven framework designed to deliver regulatory-compliant batches on compressed clinical timelines.',
      dark: false,
      steps: [
        { step: '01', title: 'Target Definition & NDA Scoping', description: 'Reviewing amino acid sequence files, critical quality attributes (CQAs), and clinical delivery milestones.', icon: 'Search' },
        { step: '02', title: 'Method Development & Feasibility', description: 'Developing orthogonal chromatographic gradients, bioassays, and custom culture media formulations.', icon: 'FlaskConical' },
        { step: '03', title: 'Process Engineering & Verification', description: 'Executing pilot bioreactor runs and downstream filtration campaigns under scalable GMP protocols.', icon: 'Activity' },
        { step: '04', title: 'cGMP Production & QA Release', description: 'Full batch manufacturing, sterile fill-finish, and comprehensive regulatory documentation package.', icon: 'ShieldCheck' }
      ]
    }
  },
  {
    id: 'stats-metrics',
    name: 'Key Metrics & Impact Counter Grid',
    category: 'data',
    icon: TrendingUp,
    tag: 'Metrics',
    description: 'Prominent numerical stats and milestone counters with bold numbers, primary labels, and supporting context.',
    bestFor: 'Corporate milestones, facility metrics, yield statistics, compliance figures',
    sampleData: {
      style: 'stats-metrics',
      title: 'Facility Infrastructure & Operational Scale',
      subtitle: 'PROVEN CAPACITY & TRACK RECORD',
      text: 'Demonstrated infrastructure, quality compliance, and leadership expertise supporting worldwide biopharma programs.',
      dark: false,
      stats: [
        { value: '27,000', label: 'Sqft Biomanufacturing Campus', sublabel: 'Purpose-built biologics development and GMP cleanroom suites in Ahmedabad, India.' },
        { value: '25+', label: 'Years Group Legacy', sublabel: 'Backed by Lambda Therapeutic Research international clinical and bioanalytical heritage.' },
        { value: '99.9%', label: 'Analytical Resolution', sublabel: 'High-resolution orthogonal mass spectrometry and chromatographic purity analysis.' },
        { value: '100%', label: 'Regulatory Readiness', sublabel: 'Full alignment with US FDA, EMA, PMDA, and global regulatory submission dossiers.' }
      ]
    }
  },
  {
    id: 'capabilities-checklist',
    name: 'Capabilities Checklist & Focus Areas',
    category: 'content',
    icon: Sliders,
    tag: 'Checklist',
    description: 'Two-column sticky header with a structured, high-contrast checkmark list of technical points and advantages.',
    bestFor: 'Competitive advantages, regulatory adherence, technical specifications summary',
    sampleData: {
      style: 'capabilities-checklist',
      title: 'The Lambda CDMO Strategic Advantage',
      subtitle: 'WHY SPONSORS TRUST US',
      text: 'Our integrated CDMO platform brings together process sciences, analytical sciences, and manufacturing capabilities to support a range of biologic modalities.',
      dark: false,
      bullets: [
        'Integrated biologics development, process sciences, and GMP manufacturing capabilities under a single quality system',
        'Extensive CDMO capabilities across India and Europe providing global continuity and cost-effective delivery',
        'Molecule-specific development approaches across cell line engineering, upstream cell culture, downstream purification, and formulation',
        'Advanced analytical characterization supporting method validation, structural elucidation, and comparative biosimilar assessments',
        'Scalable bioreactor and single-use technologies designed for flexible batch volumes and rapid campaign changeovers',
        'Full cGMP compliance and quality assurance systems aligned with global regulatory authorities'
      ]
    }
  },
  {
    id: 'modalities-grid',
    name: 'Modality & Molecule Cards Grid',
    category: 'visual',
    icon: Target,
    tag: 'Molecules',
    description: 'Visual cards with subtle scientific color grade overlay, tailored for therapeutic modalities like mAbs, ADCs, and bispecifics.',
    bestFor: 'Therapeutic modalities, molecule classes, target product profiles',
    sampleData: {
      style: 'modalities-grid',
      title: 'Platform Capabilities for Next-Generation Biologics',
      subtitle: 'MOLECULE-TAILORED STRATEGIES',
      text: 'Our integrated development and manufacturing platform is tailored to the specific biochemical and biophysical properties of each molecule.',
      dark: false,
      cards: [
        { title: 'Monoclonal Antibodies', description: 'Platform capabilities for IgG1, IgG2, and IgG4 subclasses with high titers and purity.', link: '/modalities/mabs', image: '/images/modalities/mAb.png' },
        { title: 'Bispecific Antibodies', description: 'Overcoming chain pairing, homodimer formation, and mispairing with tailored purification.', link: '/modalities/bispecifics', image: '/images/modalities/Bispecific_Antibody.png' },
        { title: 'Antibody-Drug Conjugates (ADCs)', description: 'Conjugation process development, drug-to-antibody ratio (DAR) optimization, and aseptic manufacturing.', link: '/modalities/adcs', image: '/images/modalities/Antibody-Drug_Conjugate.png' },
        { title: 'Proteins & Peptides', description: 'Recombinant proteins, fusion constructs, and synthetic peptides produced with high purity.', link: '/modalities/proteins-peptides', image: '/images/modalities/Proteins_and_Peptides.png' }
      ]
    }
  },
  {
    id: 'equipment-carousel',
    name: 'Equipment & Technology Showcase',
    category: 'visual',
    icon: Layers,
    tag: 'Instruments',
    description: 'Dynamic slider/showcase displaying laboratory equipment, bioreactor systems, and mass spectrometry instruments.',
    bestFor: 'Laboratory instruments, cleanroom hardware, analytical equipment lists',
    sampleData: {
      style: 'equipment-carousel',
      title: 'State-of-the-Art Analytical & Process Equipment',
      subtitle: 'CUTTING-EDGE INFRASTRUCTURE',
      text: 'Equipped with industry-standard bioreactors, chromatography skids, and high-resolution mass spectrometers for uncompromised accuracy.',
      dark: false
    }
  },
  {
    id: 'technical-specs',
    name: 'Technical Specifications Table',
    category: 'data',
    icon: FileSpreadsheet,
    tag: 'Specs Table',
    description: 'Clean, structured table displaying technical specifications, cleanroom grades, analytical tolerances, and standard operating limits.',
    bestFor: 'Regulatory limits, cleanroom classifications, formulation specs, lot release criteria',
    sampleData: {
      style: 'technical-specs',
      title: 'Key Technical & Facility Specifications',
      subtitle: 'OPERATIONAL PARAMETERS',
      text: 'Comprehensive overview of facility classifications, bioreactor capacities, and analytical instrumentation.',
      specs: [
        { label: 'Expression Host Lineages', value: 'CHO-K1, CHO-S, HEK293 suspension lineages' },
        { label: 'Bioreactor Volume Range', value: 'Benchtop 250 mL Ambr to 500 L Single-Use Bioreactors (SUB)' },
        { label: 'Cleanroom Classifications', value: 'Grade A / ISO 5 fill-finish, Grade C processing suites' },
        { label: 'Primary Analytical Platforms', value: 'Orbitrap LC-MS/MS, Biacore 8K+ SPR, Maurice cIEF, UPLC' },
        { label: 'Regulatory Compliance', value: 'US FDA, EU EMA, PMDA, and WHO cGMP guidance' }
      ]
    }
  },

  {
    id: 'video-hero-banner',
    name: 'Cinematic Video & Media Banner',
    category: 'visual',
    icon: Film,
    tag: 'Cinematic',
    description: 'Full-width atmospheric dark banner with ambient background video, glowing typography, and call-to-action buttons.',
    bestFor: 'Mid-page visual breaks, facility virtual tours, brand statements',
    sampleData: {
      style: 'video-hero-banner',
      title: 'Precision Science Meets Manufacturing Excellence',
      subtitle: 'DISCOVER OUR FACILITY',
      text: 'Experience our 27,000 sqft biologics campus in Ahmedabad with automated single-use cleanroom suites and advanced analytical laboratories.',
      video: '/cta-bg-video.mp4',
      buttonText: 'Schedule a Virtual Facility Tour',
      buttonLink: '/contact'
    }
  },
  {
    id: 'cta-banner',
    name: 'Conversion Call-to-Action Banner',
    category: 'conversion',
    icon: Megaphone,
    tag: 'CTA Banner',
    description: 'Eye-catching branded closing banner designed to convert visitors into technical inquiries and consultations.',
    bestFor: 'Page footer CTAs, consultation invites, RFP submissions',
    sampleData: {
      style: 'cta-banner',
      title: 'Accelerate Your Molecule from Gene to Clinic',
      subtitle: 'PARTNER WITH LAMBDA CDMO',
      text: 'Speak directly with our senior scientific leaders and bioprocess engineers to discuss molecule specifications, timelines, and custom proposals.',
      buttonText: 'Contact Our Technical Team',
      buttonLink: '/contact',
      secondaryButtonText: 'Virtual Tour',
      secondaryButtonLink: '/virtual-tour/00%20MAIN%20BUILDING/index.htm'
    }
  },
  {
    id: 'rich-text',
    name: 'Editorial Rich Text & Prose Section',
    category: 'content',
    icon: AlignLeft,
    tag: 'Article Style',
    description: 'Clean editorial reading layout with formatted paragraphs, key takeaways, and structured subheadings.',
    bestFor: 'Scientific explanations, compliance philosophy, corporate narratives',
    sampleData: {
      style: 'rich-text',
      title: 'Commitment to Scientific Rigor and Regulatory Integrity',
      subtitle: 'OUR QUALITY PHILOSOPHY',
      text: 'Every biopharmaceutical program demands an uncompromising focus on quality, process understanding, and patient safety.\n\nOur Quality Management System (QMS) operates as a unified framework spanning analytical development, process validation, cGMP manufacturing, and lot release. With automated audit trails and 21 CFR Part 11 electronic data integrity, we ensure that every milestone produces bulletproof regulatory filings for worldwide submissions.'
    }
  },
  {
    id: 'bioassays-suites',
    name: 'Bioassay & Immunogenicity Testing Suites',
    category: 'data',
    icon: HeartPulse,
    tag: 'Testing Suites',
    description: 'Dual testing suites for cell-based bioassays (potency, reporter gene) and anti-drug antibody (ADA) immunogenicity assays.',
    bestFor: 'Bioanalytical characterization, potency assays, immunogenicity assessment',
    sampleData: {
      style: 'bioassays-suites'
    }
  },
  {
    id: 'analytical-technologies',
    name: 'Analytical Technologies Matrix',
    category: 'data',
    icon: Microscope,
    tag: 'Instrumentation',
    description: 'Comprehensive grid of analytical methods and instrumentation (HPLC, LC-MS/MS, cIEF, SPR) with method categories.',
    bestFor: 'Analytical instrumentation, physicochemical testing, characterization methods',
    sampleData: {
      style: 'analytical-technologies'
    }
  },
  {
    id: 'regulatory-callout',
    name: 'Platform Summary & Regulatory Callout',
    category: 'content',
    icon: Quote,
    tag: 'Callout Note',
    description: 'Prominent regulatory callout banner summarizing platform compliance, regulatory alignments, or scientific conclusions.',
    bestFor: 'ICH regulatory declarations, compliance summaries, platform conclusions',
    sampleData: {
      style: 'regulatory-callout'
    }
  },
  {
    id: 'faq-accordion',
    name: 'Frequently Asked Questions (FAQ Accordion)',
    category: 'content',
    icon: HelpCircle,
    tag: 'FAQ Accordion',
    description: 'Interactive question and answer accordion list with expandable answers and contact link.',
    bestFor: 'Technical FAQs, process requirements, regulatory questions',
    sampleData: {
      style: 'faq-accordion'
    }
  }
];

interface SectionLayoutGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLayout: (layout: SectionLayoutOption) => void;
  activeSectionIds?: string[];
}

export default function SectionLayoutGalleryModal({
  isOpen,
  onClose,
  onSelectLayout,
  activeSectionIds
}: SectionLayoutGalleryModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'content' | 'visual' | 'data' | 'conversion'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  if (!isOpen) return null;

  const filteredLayouts = SECTION_LAYOUTS.filter((layout) => {
    const matchesCategory = selectedCategory === 'all' || layout.category === selectedCategory;
    const matchesSearch =
      !searchFilter.trim() ||
      layout.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      layout.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      layout.bestFor.toLowerCase().includes(searchFilter.toLowerCase()) ||
      layout.tag.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">
                Choose a Section Layout
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Select any layout style from our design library to add a new section with starter content.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="px-6 py-3.5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Layouts' },
              { id: 'content', label: 'Content & Cards' },
              { id: 'visual', label: 'Visual & Media' },
              { id: 'data', label: 'Data & Specs' },
              { id: 'conversion', label: 'CTAs & Banners' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-brand-navy text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search layout styles..."
              className="w-full pl-3 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-neutral-900 focus:outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* Layout Cards Grid */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredLayouts.map((layout) => {
              const Icon = layout.icon;
              const isActive = Boolean(activeSectionIds?.includes(layout.id));

              return (
                <div
                  key={layout.id}
                  onClick={() => onSelectLayout(layout)}
                  className={`group relative bg-white rounded-xl border p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer text-left ${
                    isActive
                      ? 'border-emerald-300 ring-2 ring-emerald-500/20 hover:border-emerald-500'
                      : 'border-slate-200/80 hover:border-brand-blue'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors duration-300 ${
                        isActive
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
                          : 'bg-brand-blue/10 border-brand-blue/20 text-brand-blue group-hover:bg-brand-blue group-hover:text-white'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        {isActive && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>On Page</span>
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                          {layout.tag}
                        </span>
                      </div>
                    </div>

                    <h4 className={`text-sm sm:text-base font-bold transition-colors leading-snug mb-1.5 ${
                      isActive ? 'text-neutral-900 group-hover:text-emerald-700' : 'text-neutral-900 group-hover:text-brand-blue'
                    }`}>
                      {layout.name}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
                      {layout.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-medium text-slate-400 line-clamp-1">
                      {layout.bestFor}
                    </span>
                    <span className={`font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform ${
                      isActive ? 'text-emerald-600' : 'text-brand-orange'
                    }`}>
                      {isActive ? 'Configure →' : '+ Add Section'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
          <span>{filteredLayouts.length} layout styles available</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
