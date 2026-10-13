'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  FlaskConical,
  Factory,
  Microscope,
  Dna,
  Activity,
  HeartPulse,
  Bug,
  ShieldCheck,
  Gauge,
  BookOpen,
  FileText,
  Globe,
  Users,
  Building2,
  Search,
  Settings,
  Package,
  Scale,
  Calendar,
  Newspaper,
  FileDown,
  Beaker
} from 'lucide-react';
import { HeroSection } from '@/components/ui/hero-section-5';
import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import { articles } from '@/data/articles';
import { faqs as defaultFaqs } from '@/data/faqs';
import FAQSection from '@/components/FAQSection';
import CDMOLocationsMapSection from '@/components/CDMOLocationsMapSection';
import CommonCTA from '@/components/CommonCTA';
import CardImageCarousel from '@/components/CardImageCarousel';
import DynamicSectionRenderer, { resolveIcon } from '@/components/DynamicSectionRenderer';
import type { CDMOPage } from '@/data/cdmoData';

interface HomeClientViewProps {
  pageData?: CDMOPage | null;
}

export default function HomeClientView({ pageData }: HomeClientViewProps) {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const heroHeading = pageData?.heading || 'Accelerating Biologics from Gene to GMP.';
  const heroSubtitle = pageData?.subtitle || 'From Cell Line to Clinical Supply.';
  const heroDesc = pageData?.description || 'Supporting biopharmaceutical companies with integrated biologics development, cell line engineering, process development of Drug substance and Drug product, analytical characterization, GMP manufacturing, and clinical supply capabilities to accelerate the journey from molecule to market.';
  const heroVideo = pageData?.heroVideo || '/videos/newhero.mp4';
  const heroPrimaryCta = {
    text: pageData?.heroPrimaryCtaText || pageData?.primaryCta?.text || 'GET IN TOUCH',
    link: pageData?.heroPrimaryCtaLink || pageData?.primaryCta?.link || '/contact',
  };
  const heroSecondaryCta = {
    text: pageData?.heroSecondaryCtaText || pageData?.secondaryCta?.text || 'EXPLORE SERVICES',
    link: pageData?.heroSecondaryCtaLink || pageData?.secondaryCta?.link || '/services',
  };

  const defaultServiceCards = [
    {
      title: 'Development Services',
      step: '01 — Development',
      desc: 'Cell line engineering, upstream and downstream process development, and analytical development built for scale-up and regulatory readiness.',
      icon: FlaskConical,
      image: '/images/upstream/AMBR250.png',
      images: [
        '/images/upstream/AMBR250.png',
        '/images/upstream/Bioreactor_control.png',
        '/images/upstream/Biosaftey_cabinet.png',
        '/images/upstream/Carbon_di_Oxide_shaker_incubator.png',
        '/images/upstream/Cedex_automated_cell_counter.png',
      ],
      items: [
        { name: 'Cell Line Development', icon: Dna, href: '/services/cell-line' },
        { name: 'Process Development', icon: Activity, href: '/services/process' },
        { name: 'Analytical Development', icon: Search, href: '/services/analytical' },
      ],
      href: '/services',
    },
    {
      title: 'Manufacturing Services',
      step: '02 — Manufacturing',
      desc: 'cGMP drug substance and drug product manufacturing in purpose-built cleanroom suites, designed for clinical supply.',
      icon: Factory,
      image: '/images/down stream/AKTA Pilot.png',
      images: [
        '/images/down stream/AKTA Pilot.png',
        '/images/down stream/AKTA Pure 150_Akta Avant.png',
        '/images/down stream/Column Storage Rack.png',
        '/images/down stream/TFF System.png',
        '/images/down stream/Tecan Freedom EVO.png',
      ],
      items: [
        { name: 'Drug Substance Manufacturing', icon: Beaker, href: '/manufacturing/drug-substance' },
        { name: 'Drug Product Manufacturing', icon: Package, href: '/manufacturing/drug-product' },
      ],
      href: '/manufacturing',
    },
    {
      title: 'Analytical Characterization & Testing',
      step: '03 — Characterization',
      desc: 'Orthogonal physicochemical characterization, bioassays, and QC microbiology under a unified quality system.',
      icon: Microscope,
      image: '/images/Analytical/Biacore 8K+.png',
      images: [
        '/images/Analytical/Biacore 8K+.png',
        '/images/Analytical/Orbitrap.png',
        '/images/Analytical/Q ToF.png',
        '/images/Analytical/Maurice.png',
        '/images/Analytical/nanoDSF.png',
        '/images/Analytical/Octet.png',
        '/images/Analytical/UPLC.png',
      ],
      items: [
        { name: 'Analytical Testing', icon: Search, href: '/characterization/analytical-testing' },
        { name: 'Physicochemical Characterization', icon: Scale, href: '/characterization/physicochemical' },
        { name: 'Bioassays & Immunogenicity Testing', icon: HeartPulse, href: '/characterization/bioassays' },
        { name: 'Microbiological Testing', icon: Bug, href: '/characterization/microbiological' },
      ],
      href: '/characterization',
    },
  ];

  const defaultModalities = [
    {
      title: 'Monoclonal Antibodies',
      slug: 'mabs',
      desc: 'Platform capabilities for IgG1, IgG2, and IgG4 subclasses.',
      image: '/images/modalities/mAb.png',
    },
    {
      title: 'Bispecific Antibodies',
      slug: 'bispecifics',
      desc: 'Addressing chain pairing, homodimer, and mispairing challenges.',
      image: '/images/modalities/Bispecific_Antibody.png',
    },
    {
      title: 'Antibody-Drug Conjugates',
      slug: 'adcs',
      desc: 'Conjugation process development, DAR characterization, and GMP manufacturing.',
      image: '/images/modalities/Antibody–Drug_Conjugate.png',
    },
    {
      title: 'Proteins & Peptides',
      slug: 'proteins-peptides',
      desc: 'Recombinant proteins, fusion proteins, and synthetic peptides.',
      image: '/images/modalities/Proteins_and_Peptides.png',
    },
  ];

  const defaultAdvantages = [
    { title: 'Integrated biologics development, process and analytical sciences, and manufacturing capabilities', icon: Dna },
    { title: 'Extensive CDMO capabilities across India and Europe', icon: Globe },
    { title: 'Molecule-specific development approaches across cell line, upstream, downstream, drug product and analytical development', icon: FlaskConical },
    { title: 'Advanced analytical characterization supporting method development and validation, state of art characterisation, and comparative analytical assessment.', icon: Microscope },
    { title: 'Process development focused on scalability, robustness, and manufacturability.', icon: Gauge },
    { title: 'Quality and compliance systems supporting cGMP operations and global regulatory expectations', icon: ShieldCheck },
  ];

  // Dynamically resolve section configurations
  const servicesSection = pageData?.sections?.find(
    (s) => s.id === 'home-services' || s.title?.toLowerCase().includes('integrated partner')
  );
  const modalitiesSection = pageData?.sections?.find(
    (s) => s.id === 'home-modalities' || s.title?.toLowerCase().includes('next-generation biologics')
  );
  const advantagesSection = pageData?.sections?.find(
    (s) => s.id === 'home-advantage' || s.title?.toLowerCase().includes('advantage')
  );
  const locationsMapSection = pageData?.sections?.find(
    (s) => s.id === 'home-map' || s.style === 'locations-map'
  );

  const serviceCards = (servicesSection?.cards && servicesSection.cards.length > 0)
    ? servicesSection.cards.map((card, idx) => {
        const fallback = defaultServiceCards[idx] || defaultServiceCards[0];
        const iconComp = resolveIcon(card.icon, fallback.icon);
        const imagesList = (card.images && card.images.length > 0)
          ? card.images
          : (card.image ? [card.image] : fallback.images);

        const itemsList = (card.items && card.items.length > 0)
          ? card.items.map((it) => ({
              name: it.name,
              href: it.href,
              icon: resolveIcon(it.icon, Dna),
            }))
          : (fallback.items || []);

        return {
          title: card.title || fallback.title,
          step: card.badge || card.step || fallback.step,
          desc: card.description || fallback.desc,
          icon: iconComp,
          image: card.image || fallback.image,
          images: imagesList,
          items: itemsList,
          href: card.link || card.href || fallback.href,
        };
      })
    : defaultServiceCards;

  const modalities = (modalitiesSection?.cards && modalitiesSection.cards.length > 0)
    ? modalitiesSection.cards.map((modal, idx) => {
        const fallback = defaultModalities[idx] || defaultModalities[0];
        const slug = modal.link ? modal.link.replace('/modalities/', '') : fallback.slug;
        return {
          title: modal.title || fallback.title,
          slug: slug || fallback.slug,
          desc: modal.description || fallback.desc,
          image: modal.image || fallback.image,
        };
      })
    : defaultModalities;

  const advantages = (advantagesSection?.bullets && advantagesSection.bullets.length > 0)
    ? advantagesSection.bullets.map((b, idx) => {
        const fallback = defaultAdvantages[idx] || defaultAdvantages[0];
        return {
          title: b,
          icon: fallback.icon,
        };
      })
    : defaultAdvantages;

  const insightsSection = pageData?.sections?.find(
    (s) => s.id === 'home-insights' || s.title?.toLowerCase().includes('featured research')
  );

  const insightsTitle = insightsSection?.title || 'Featured Research and Insights';
  const insightsSubtitle = insightsSection?.subtitle || 'SCIENTIFIC PERSPECTIVES & NEWS';
  const insightsText = insightsSection?.text || 'Explore the latest perspectives from our scientists — blogs, news, and upcoming events.';
  const insightsImage = insightsSection?.image || '/images/working employee2.png';
  const insightsButtonText = insightsSection?.buttonText || 'VIEW ALL INSIGHTS';
  const insightsButtonLink = insightsSection?.buttonLink || '/insights/blogs';

  // Custom sections added via Admin Panel
  const defaultTitles = [
    'Global CDMO Capabilities Across India and Europe',
    'An Integrated Partner for Biologics Development and Manufacturing',
    'Platform Capabilities for Next-Generation Biologics',
    'Lambda CDMO Advantage',
    'Featured Research and Insights',
    'Frequently Asked Questions',
    'Common Questions',
    'Accelerate Your Biologics Journey Today',
    "Let's Advance Your Next Biologics Program"
  ];

  const customSections = (pageData?.sections || []).filter(
    (sec) =>
      !defaultTitles.includes(sec.title) &&
      sec.id !== 'home-map' &&
      sec.id !== 'home-services' &&
      sec.id !== 'home-modalities' &&
      sec.id !== 'home-advantage' &&
      sec.id !== 'home-insights' &&
      sec.id !== 'home-faq' &&
      sec.id !== 'home-cta'
  );

  const faqTitle = pageData?.faqTitle || 'Common Questions';
  const faqSubtitle = pageData?.faqSubtitle || 'Answers to questions about process, tech transfers, timelines, and facility validations.';
  const faqs = (pageData?.faqs && pageData.faqs.length > 0)
    ? pageData.faqs
    : defaultFaqs.slice(0, 5);

  const ctaTitle = pageData?.ctaTitle || "Accelerate Your Biologics Journey Today";
  const ctaSubtitle = pageData?.ctaSubtitle || "Connect directly with our senior scientific and technical experts in Ahmedabad and London to discuss your molecule specifications and timeline.";

  return (
    <div className="relative overflow-hidden pb-0 select-none">
      {/* HERO */}
      <HeroSection
        heading={heroHeading}
        subtitle={heroSubtitle}
        description={heroDesc}
        videoSrc={heroVideo}
        primaryCta={heroPrimaryCta}
        secondaryCta={heroSecondaryCta}
      />

      {/* GLOBAL CDMO CAPABILITIES ACROSS INDIA AND EUROPE - INTERACTIVE MAP */}
      <CDMOLocationsMapSection
        title={locationsMapSection?.title || 'Global CDMO Capabilities Across India and Europe'}
        subtitle={locationsMapSection?.subtitle || null}
      />

      {/* AN INTEGRATED PARTNER */}
      <section id="an-integrated-partner" className="scroll-mt-20 lg:scroll-mt-24 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-molecules">
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
              {servicesSection?.title || 'An Integrated Partner for Biologics Development and Manufacturing'}
            </h2>
            <p className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed max-w-3xl mx-auto mt-4">
              {servicesSection?.text || 'Integrated Services Across the Biologics Development Lifecycle - From cell line development to GMP manufacturing, our multidisciplinary teams work together to support every stage of biologics development.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-xl md:max-w-none mx-auto">
            {serviceCards.map((card, idx) => {
              const CardIcon = card.icon;
              const isThirdOnMd = idx === 2;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: idx * 0.12, ease: 'easeOut' }}
                  className={`h-full ${isThirdOnMd ? 'md:col-span-2 lg:col-span-1 md:max-w-[calc(50%-0.75rem)] md:mx-auto lg:max-w-none lg:mx-0 w-full' : 'w-full'}`}
                >
                  <div className="group h-full glass-card rounded-[10px] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between">
                    {/* Photo header Carousel */}
                    <CardImageCarousel
                      images={card.images}
                      alt={card.title}
                      href={card.href}
                    />
                    {/* Body */}
                    <div className="p-5 sm:p-6 lg:p-6 xl:p-7 flex flex-col flex-1 justify-between">
                      <div className="mb-4 flex flex-col">
                        <Link href={card.href} className="flex items-start gap-2.5 sm:gap-3 mb-2.5 group/header">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] bg-brand-blue/10 border border-brand-blue/25 flex items-center justify-center shrink-0 text-brand-blue group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue group-hover:shadow-md group-hover:shadow-brand-blue/20 transition-all duration-300 shadow-xs mt-0.5">
                            <CardIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />
                          </div>
                          <h3 className="text-lg sm:text-xl font-semibold text-black group-hover:text-brand-blue transition-colors leading-snug break-words">
                            {card.title}
                          </h3>
                        </Link>
                        <p className="text-[14px] sm:text-[15px] text-neutral-600 leading-relaxed min-h-[60px] sm:min-h-[72px] lg:min-h-[84px]">
                          {card.desc}
                        </p>
                      </div>
                      <ul className="border-t border-neutral-100 pt-1 mt-auto">
                        {card.items.map((item) => {
                          const ItemIcon = item.icon;
                          return (
                            <li key={item.name} className="border-b border-neutral-100 last:border-0">
                              <Link
                                href={item.href || '#'}
                                className="group/link flex items-center justify-between gap-2.5 sm:gap-3 py-2.5 text-xs sm:text-sm font-medium text-neutral-700 hover:text-brand-blue transition-colors"
                              >
                                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-[8px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover/link:bg-brand-blue group-hover/link:border-brand-blue transition-colors duration-200">
                                    <ItemIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-blue group-hover/link:text-white transition-colors duration-200" />
                                  </div>
                                  <span className="leading-snug text-neutral-800 group-hover/link:text-brand-blue transition-colors">
                                    {item.name}
                                  </span>
                                </div>
                                <ArrowRight className="w-4 h-4 flex-shrink-0 text-brand-blue group-hover/link:text-brand-blue-hover group-hover/link:translate-x-1 transition-all ml-1" />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SUPPORTING DIVERSE BIOLOGIC MODALITIES */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 border-y border-neutral-100">
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
              {modalitiesSection?.title || 'Platform Capabilities for Next-Generation Biologics'}
            </h2>
            <p className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed max-w-3xl mx-auto mt-4">
              {modalitiesSection?.text || 'Our integrated development and manufacturing platform is designed to support a range of biologic modalities with process sciences, analytical sciences and manufacturing capabilities tailored to each molecule.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {modalities.map((modal, idx) => (
              <motion.div
                key={modal.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link href={`/modalities/${modal.slug}`} className="group block h-full">
                  <div className="h-full glass-card rounded-[10px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#000a1c]">
                      <img
                        src={modal.image}
                        alt={modal.title}
                        className="w-full h-full object-fill transition-transform duration-700 group-hover:scale-105"
                        style={{ objectFit: 'fill' }}
                      />
                    </div>
                    <div className="p-5 flex-1 flex items-center">
                      <h3 className="text-lg font-semibold text-black group-hover:text-brand-blue transition-colors leading-snug">
                        {modal.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LAMBDA CDMO ADVANTAGE GRID */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-molecules border-y border-neutral-100">
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15] mb-4">
                {advantagesSection?.title || 'Lambda CDMO Advantage'}
              </h2>
              <p className="text-[15px] text-slate-500 font-normal leading-relaxed">
                {advantagesSection?.text || 'Our integrated CDMO platform brings together process sciences, analytical sciences, and manufacturing capabilities to support a range of biologic modalities, with solutions tailored to each molecule.'}
              </p>
            </div>

            <div className="lg:col-span-8 relative">
              <div className="absolute left-[21px] sm:left-[27px] top-2 bottom-2 w-0.5 bg-brand-blue/20" />
              <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
                {advantages.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={idx} delay={idx * 0.08}>
                      <div className="relative flex gap-3.5 sm:gap-6 md:gap-8 items-start">
                        <div className="relative z-10 w-11 h-11 sm:w-14 sm:h-14 rounded-[9px] sm:rounded-[10px] bg-white border-2 border-brand-blue flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Icon className="w-5.5 h-5.5 sm:w-7 sm:h-7 text-brand-blue" />
                        </div>
                        <div className="flex-1 min-w-0 glass-card rounded-[10px] p-4 sm:p-5 md:p-6 shadow-sm">
                          <h3 className="text-[15px] sm:text-lg md:text-xl font-semibold text-black leading-snug">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RENDER ANY CUSTOM SECTIONS ADDED FOR HOME PAGE */}
      {customSections.length > 0 && (
        <div className="divide-y divide-neutral-100">
          {customSections.map((section, idx) => (
            <DynamicSectionRenderer
              key={idx}
              section={section}
              index={idx}
              pageSlug="home"
              category="home"
            />
          ))}
        </div>
      )}

      {/* FEATURED RESEARCH AND INSIGHTS (Exact Bento Grid from Image 1) */}
      <section className="relative px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 border-y border-neutral-100 overflow-hidden bg-white select-none">
        <div className="relative w-full max-w-[1700px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-14">
            <Reveal>
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                  {insightsTitle || 'Featured Research and Insights'}
                </h2>
                <p className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed max-w-2xl mt-4">
                  {insightsText || 'Explore the latest perspectives from our scientists — blogs, news, and upcoming events.'}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href={insightsButtonLink || '/insights/blogs'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] border border-brand-blue text-brand-blue text-sm font-semibold hover:bg-brand-blue hover:text-white transition-all duration-300"
              >
                <span>{insightsButtonText || 'View all insights'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>

          {(() => {
            const bentoArticles = (insightsSection?.cards && insightsSection.cards.length >= 3)
              ? insightsSection.cards.map((c, cIdx) => ({
                  title: c.title,
                  subtitle: c.description,
                  category: c.badge || 'INSIGHTS',
                  image: c.image || '/images/default_scientist.png',
                  date: c.step || '8 min read',
                  readingTime: c.step || '',
                  link: c.link || '/insights/blogs',
                }))
              : articles.map((a) => ({
                  title: a.title,
                  subtitle: a.subtitle,
                  category: a.category,
                  image: a.image,
                  date: a.date,
                  readingTime: a.readingTime,
                  link: `/insights/blogs/${a.slug}`,
                }));

            const featuredArticle = bentoArticles[0];
            const secondaryArticles = bentoArticles.slice(1, 3);

            return (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Featured big card (Left) */}
                <motion.div
                  initial={{ opacity: 0, x: -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ y: -6 }}
                  className="h-full"
                >
                  <Link href={featuredArticle.link} className="group relative flex flex-col h-full glass-card rounded-[10px] overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-yellow scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-10" />
                    <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                      <img
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-6 md:p-8">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow mb-3">{featuredArticle.category}</div>
                      <h3 className="text-xl md:text-2xl font-semibold text-black mb-3 group-hover:text-brand-blue transition-colors leading-snug">
                        {featuredArticle.title}
                      </h3>
                      <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-6">{featuredArticle.subtitle}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xs text-neutral-500">{featuredArticle.date} {featuredArticle.readingTime ? `· ${featuredArticle.readingTime}` : ''}</span>
                        <span className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-black group-hover:bg-brand-yellow group-hover:border-brand-yellow group-hover:text-black transition-all duration-300">
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>

                {/* Two stacked horizontal cards (Right) */}
                <div className="flex flex-col gap-6">
                  {secondaryArticles.map((article, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 32 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, delay: 0.15 + idx * 0.12 }}
                      whileHover={{ y: -6 }}
                      className="flex-1"
                    >
                      <Link href={article.link} className="group relative flex h-full glass-card rounded-[10px] overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300">
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-yellow scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-10" />
                        <div className="relative w-2/5 overflow-hidden bg-neutral-100 flex-shrink-0">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-col flex-1 p-5 md:p-6">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow mb-2">{article.category}</div>
                          <h3 className="text-base md:text-lg font-semibold text-black mb-2 group-hover:text-brand-blue transition-colors leading-snug line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-4">{article.subtitle}</p>
                          <div className="mt-auto flex items-center justify-between">
                            <span className="text-xs text-neutral-500">{article.readingTime || article.date}</span>
                            <span className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-black group-hover:bg-brand-yellow group-hover:border-brand-yellow group-hover:text-black transition-all duration-300">
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        faqs={faqs}
        title={faqTitle}
        subtitle={faqSubtitle}
      />

      {/* CTA */}
      <CommonCTA
        title={ctaTitle}
        subtitle={ctaSubtitle}
        primaryButtonText={pageData?.primaryCta?.text || "Get in touch"}
        primaryButtonHref={pageData?.primaryCta?.link || "/contact"}
        secondaryButtonText={pageData?.secondaryCta?.text || "Virtual Tour"}
        secondaryButtonHref={pageData?.secondaryCta?.link || "/virtual-tour/00%20MAIN%20BUILDING/index.htm"}
      />
    </div>
  );
}
