'use client';

import React, { useState } from 'react';
import {
  X,
  FilePlus,
  ArrowRight,
  Globe,
  Layout,
  CheckCircle2,
  Sparkles,
  Layers,
  Dna,
  Factory,
  Microscope,
  Target,
  BookOpen
} from 'lucide-react';
import type { CDMOPage } from '@/data/cdmoData';

interface CreatePageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePage: (newPage: CDMOPage) => void;
  existingPages: CDMOPage[];
}

const TEMPLATE_PRESETS = [
  {
    id: 'services',
    name: 'Development Services Layout',
    icon: Dna,
    desc: 'Bespoke layout for cell line engineering, upstream, downstream, and process science offerings.',
    category: 'services',
    sampleSections: [
      {
        style: 'feature-split',
        title: 'High-Performance Process Sciences',
        subtitle: 'BENCH TO BIOREACTOR SCALE',
        text: 'Custom media optimization, feed strategies, and purification runs engineered for high product titer and critical quality attribute control.',
        image: '/images/upstream/AMBR250.png',
        imageSide: 'right' as const,
        bulletsTitle: 'CORE DEVELOPMENT CAPABILITIES',
        bullets: [
          'High-throughput clone isolation and monoclonality verification',
          'Intensified fed-batch and perfusion bioprocess optimization',
          'Multistep chromatographic impurity clearance protocols'
        ]
      },
      {
        style: 'process-steps',
        title: 'Gene-to-IND Development Pathway',
        subtitle: 'STRUCTURED MILESTONES',
        text: 'Streamlined development workflow tailored for speed and regulatory compliance.',
        steps: [
          { step: '01', title: 'Construct Optimization', description: 'Codon engineering and high-expression vector design.', icon: 'Dna' },
          { step: '02', title: 'Cell Line Generation', description: 'Transfection and stable CHO pool screening.', icon: 'FlaskConical' },
          { step: '03', title: 'Bioprocess Scale-Up', description: 'Optimizing parameters in automated bioreactor trains.', icon: 'Settings' },
          { step: '04', title: 'Analytical Release', description: 'ICH method validation and certificate of analysis.', icon: 'ShieldCheck' }
        ]
      },
      {
        style: 'cta-banner',
        title: 'Discuss Your Biologics Development Program',
        subtitle: 'DIRECT ACCESS TO SCIENTIFIC TEAMS',
        text: 'Connect with our upstream and downstream scientists to review your project scope and timelines.',
        buttonText: 'Contact Scientific Team',
        buttonLink: '/contact',
        secondaryButtonText: 'Virtual Tour',
        secondaryButtonLink: '/virtual-tour/00%20MAIN%20BUILDING/index.htm'
      }
    ]
  },
  {
    id: 'manufacturing',
    name: 'cGMP Manufacturing Layout',
    icon: Factory,
    desc: 'Purpose-built for drug substance & drug product cleanroom suites, fill-finish, and clinical batch release.',
    category: 'manufacturing',
    sampleSections: [
      {
        style: 'feature-split',
        title: 'cGMP Cleanroom Biomanufacturing',
        subtitle: 'GRADE A/B/C PRODUCTION SUITES',
        text: 'Advanced single-use bioreactor facilities and automated isolator filling systems built to produce clinical and commercial biologics under strict cGMP compliance.',
        image: '/images/down stream/AKTA Pilot.png',
        imageSide: 'left' as const,
        bulletsTitle: 'MANUFACTURING HIGHLIGHTS',
        bullets: [
          'Single-use bioreactor trains from 50 L to 500 L working volume',
          'Automated robotic Grade A isolator vial filling and stoppering',
          'Full 21 CFR Part 11 electronic batch records and audit logs'
        ]
      },
      {
        style: 'technical-specs',
        title: 'Cleanroom Classifications & Capacity',
        subtitle: 'FACILITY SPECIFICATIONS',
        text: 'Key operational parameters and environmental monitoring standards.',
        specs: [
          { label: 'Cleanroom Grades', value: 'Grade A isolators, Grade B/C processing suites' },
          { label: 'Bioreactor Volume', value: '50 L, 200 L, 500 L Single-Use Bioreactors' },
          { label: 'Fill-Finish Capability', value: 'Liquid and lyophilized vials with 100% CCIT' },
          { label: 'Regulatory Scope', value: 'US FDA, EMA, PMDA, and WHO cGMP guidance' }
        ]
      }
    ]
  },
  {
    id: 'characterization',
    name: 'Analytical Characterization Layout',
    icon: Microscope,
    desc: 'Tailored for physicochemical testing, bioassays, mass spec, and QC microbiology.',
    category: 'characterization',
    sampleSections: [
      {
        style: 'feature-split',
        title: 'Orthogonal Analytical Characterization',
        subtitle: 'HIGH-RESOLUTION ATTRIBUTE PROFILING',
        text: 'State-of-the-art mass spectrometry, surface plasmon resonance, and capillary electrophoresis delivering comprehensive structural, functional, and purity insights.',
        image: '/images/Analytical/Orbitrap.png',
        imageSide: 'right' as const,
        bullets: [
          'Intact mass, peptide mapping, and glycan profiling via Orbitrap LC-MS/MS',
          'Binding kinetics and active concentration assays on Biacore 8K+ SPR',
          'Charge heterogeneity and purity determination via Maurice cIEF and CE-SDS'
        ]
      },
      {
        style: 'stats-metrics',
        title: 'Analytical Precision & Compliance',
        subtitle: 'STANDARDS OF EXCELLENCE',
        text: 'Validated testing workflows satisfying international regulatory requirements.',
        stats: [
          { value: '99.9%', label: 'Analytical Resolution', sublabel: 'Resolved using high-resolution chromatography variants.' },
          { value: 'ICH Q2', label: 'Validation Standard', sublabel: 'Methods verified to satisfy international guidelines.' },
          { value: '21 CFR', label: 'Part 11 Compliant', sublabel: 'Secure electronic data records and log tracking.' }
        ]
      }
    ]
  },
  {
    id: 'overview',
    name: 'Overview & Corporate Layout',
    icon: Layout,
    desc: 'Editorial storytelling layout for company about, facility details, leadership, or custom initiatives.',
    category: 'overview',
    sampleSections: [
      {
        style: 'feature-split',
        title: 'Developing Tomorrow\'s Biologics',
        subtitle: 'COLLABORATIVE SCIENTIFIC EXCELLENCE',
        text: 'Lambda CDMO brings together integrated process development, analytical sciences, and GMP manufacturing to accelerate the journey from molecule to market.',
        image: '/images/development.jpg',
        imageSide: 'right' as const,
        bullets: [
          'Integrated end-to-end services across India and European innovation hubs',
          'Dedicated multidisciplinary scientific teams assigned to each program',
          'Transparent governance, real-time data sharing, and robust IP protection'
        ]
      },
      {
        style: 'cards-grid',
        title: 'Our Core Pillars of Excellence',
        subtitle: 'FOUNDATIONS OF QUALITY',
        text: 'Guided by scientific rigor, operational discipline, and sponsor commitment.',
        cards: [
          { title: 'Scientific Rigor', description: 'Deep technical domain knowledge in complex recombinant proteins and antibodies.', icon: 'Dna' },
          { title: 'Operational Agility', description: 'Flexible capacity and responsive communication to meet compressed clinical timelines.', icon: 'Zap' },
          { title: 'Quality by Design', description: 'Proactive quality risk management ensuring compliance with FDA and EMA expectations.', icon: 'ShieldCheck' }
        ]
      }
    ]
  },
  {
    id: 'modalities',
    name: 'Modality & Molecule Layout',
    icon: Target,
    desc: 'Specialized for mAbs, bispecific antibodies, ADCs, and next-generation recombinant proteins.',
    category: 'modalities',
    sampleSections: [
      {
        style: 'feature-split',
        title: 'Specialized Biologic Modality Platform',
        subtitle: 'MOLECULE-SPECIFIC EXPERTISE',
        text: 'Tailored expression and purification strategies designed to address molecule-specific challenges such as aggregation, chain pairing, and stability.',
        image: '/images/modalities/mAb.png',
        imageSide: 'left' as const,
        bullets: [
          'High specific productivity in stable mammalian expression lineages',
          'Platform purification methods minimizing product-related impurities',
          'Orthogonal structural verification and in vitro potency validation'
        ]
      }
    ]
  },
  {
    id: 'universal',
    name: 'Blank Custom Modular Layout',
    icon: Sparkles,
    desc: 'Clean starter page ready for you to build completely custom sections from scratch.',
    category: 'services',
    sampleSections: [
      {
        style: 'feature-split',
        title: 'Introduction to This Capability',
        subtitle: 'OVERVIEW & HIGHLIGHTS',
        text: 'Add your custom text, replace images, and add any layout sections to customize this page.',
        image: '/images/hero_cleanroom.png',
        imageSide: 'right' as const,
        bullets: [
          'Key feature or scientific capability point 1',
          'Key feature or scientific capability point 2',
          'Key feature or scientific capability point 3'
        ]
      }
    ]
  }
];

export default function CreatePageModal({
  isOpen,
  onClose,
  onCreatePage,
  existingPages
}: CreatePageModalProps) {
  const [pageName, setPageName] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('services');
  const [customCategory, setCustomCategory] = useState('');
  const [slug, setSlug] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('services');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setPageName(val);
    if (!title || title === `${pageName} — Lambda CDMO`) {
      setTitle(`${val} — Lambda CDMO`);
    }
    const autoSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlug(autoSlug);
  };

  const finalCategory = category === 'custom' ? customCategory.trim().toLowerCase() : category;
  const liveUrlPath = `/${finalCategory || 'services'}/${slug || 'page-slug'}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!pageName.trim()) {
      setError('Please provide a page name.');
      return;
    }

    if (!slug.trim()) {
      setError('Please provide a valid URL slug.');
      return;
    }

    if (!finalCategory) {
      setError('Please specify a category.');
      return;
    }

    // Check slug collision
    const collision = existingPages.find(
      (p) =>
        p.category.toLowerCase() === finalCategory.toLowerCase() &&
        p.slug.toLowerCase() === slug.trim().toLowerCase()
    );

    if (collision) {
      setError(`A page already exists at "${liveUrlPath}". Please use a unique slug.`);
      return;
    }

    const template = TEMPLATE_PRESETS.find((t) => t.id === selectedTemplate) || TEMPLATE_PRESETS[0];

    const newPage: CDMOPage = {
      slug: slug.trim().toLowerCase(),
      category: finalCategory,
      title: title.trim() || `${pageName.trim()} | Lambda CDMO`,
      metaTitle: `${pageName.trim()} | Lambda CDMO`,
      metaDesc:
        metaDesc.trim() ||
        `${pageName.trim()} — Integrated biologics development, analytical characterization, and GMP manufacturing services by Lambda CDMO.`,
      badge: finalCategory.toUpperCase(),
      heading: `${pageName.trim()} Services & Capabilities`,
      description: `Comprehensive ${pageName.trim()} solutions supporting biologics development from early research through clinical and commercial supply.`,
      image: '/images/hero_cleanroom.png',
      layoutTemplate: template.id,
      stats: [
        { value: '27k', label: 'Sqft Biologics Facility', sublabel: 'Dedicated cleanroom and lab suites in Ahmedabad.' },
        { value: 'ICH Q2', label: 'Quality Standard', sublabel: 'Fully validated regulatory workflows.' },
        { value: 'Global', label: 'Regulatory Support', sublabel: 'Supporting US FDA, EMA, and global filings.' }
      ],
      sections: JSON.parse(JSON.stringify(template.sampleSections))
    };

    onCreatePage(newPage);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold">
              <FilePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900">
                Create New Website Page
              </h3>
              <p className="text-xs text-slate-500">
                Define the page title, URL route, and select a starter layout template.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Page Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Page Display Name *
              </label>
              <input
                type="text"
                required
                value={pageName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Gene Therapy Manufacturing"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-neutral-900 focus:outline-none focus:border-brand-blue"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Used in navigation, dashboard, and header cards.
              </p>
            </div>

            {/* Page Title (SEO) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Browser Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Gene Therapy Manufacturing & CDMO Services | Lambda"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-neutral-900 focus:outline-none focus:border-brand-blue"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Appears in browser tabs and search engine results.
              </p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Page Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-neutral-900 focus:outline-none focus:border-brand-blue bg-white"
              >
                <option value="services">Services (/services/*)</option>
                <option value="manufacturing">Manufacturing (/manufacturing/*)</option>
                <option value="characterization">Characterization (/characterization/*)</option>
                <option value="overview">Overview (/overview/*)</option>
                <option value="facility&location">Facility & Locations (/facility&location/*)</option>
                <option value="modalities">Modalities (/modalities/*)</option>
                <option value="insights">Insights (/insights/*)</option>
                <option value="custom">+ Create Custom Category...</option>
              </select>

              {category === 'custom' && (
                <input
                  type="text"
                  required
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Enter custom category slug (e.g. technologies)"
                  className="w-full mt-2 px-3.5 py-2 border border-brand-orange rounded-xl text-xs font-medium text-neutral-900 focus:outline-none"
                />
              )}
            </div>

            {/* URL Slug */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) =>
                  setSlug(
                    e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-]/g, '')
                  )
                }
                placeholder="e.g. gene-therapy"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-neutral-900 focus:outline-none focus:border-brand-blue font-mono"
              />
              <div className="mt-1.5 flex items-center gap-1.5 text-xs text-brand-blue font-medium bg-blue-50/70 px-2.5 py-1 rounded-lg border border-blue-100">
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Live URL: {liveUrlPath}</span>
              </div>
            </div>
          </div>

          {/* Meta Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Meta Description (SEO)
            </label>
            <textarea
              rows={2}
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              placeholder="A concise summary of the page for search engines (150-160 characters)..."
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:border-brand-blue"
            />
          </div>

          {/* Choose Starter Layout Template */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Select Starter Layout Template
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {TEMPLATE_PRESETS.map((template) => {
                const Icon = template.icon;
                const isSelected = selectedTemplate === template.id;
                return (
                  <div
                    key={template.id}
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      if (category !== 'custom') {
                        setCategory(template.category);
                      }
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-brand-orange bg-orange-50/40 shadow-xs ring-2 ring-brand-orange/30'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isSelected
                              ? 'bg-brand-orange text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-neutral-900 mb-1">
                        {template.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {template.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Create Page & Open Editor</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
