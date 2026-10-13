'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Check,
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
  Beaker,
  Layers,
  Sparkles,
  Zap,
  Target,
  GitMerge,
  Syringe,
  Boxes,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
  Droplets,
  LineChart,
  Atom,
  Clock,
  LucideIcon
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import CDMOLocationsMapSection from '@/components/CDMOLocationsMapSection';
import CardImageCarousel from '@/components/CardImageCarousel';
import EquipmentCarousel from '@/components/EquipmentCarousel';
import CommonCTA from '@/components/CommonCTA';
import FAQSection from '@/components/FAQSection';
import type { CDMOSection } from '@/data/cdmoData';
import { getSectionEquipment, ALL_EQUIPMENT_ITEMS } from '@/data/equipmentData';

// Map icon strings to Lucide components
const ICON_MAP: Record<string, LucideIcon> = {
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
  Beaker,
  Layers,
  Sparkles,
  Zap,
  Target,
  GitMerge,
  Syringe,
  Boxes,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
  Droplets,
  LineChart,
  Atom,
  Clock
};

export function resolveIcon(name?: string, fallback: LucideIcon = Sparkles): LucideIcon {
  if (!name) return fallback;
  return ICON_MAP[name] || fallback;
}

interface DynamicSectionRendererProps {
  section: CDMOSection;
  index?: number;
  pageSlug?: string;
  category?: string;
}

export default function DynamicSectionRenderer({
  section,
  index = 0,
  pageSlug = '',
  category = ''
}: DynamicSectionRendererProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const style = section.style || 'feature-split';
  const isDark = section.dark ?? false;

  // 1. LOCATIONS MAP SECTION
  if (style === 'locations-map') {
    return (
      <CDMOLocationsMapSection
        title={section.title || 'Global CDMO Capabilities Across India and Europe'}
        subtitle={section.subtitle}
      />
    );
  }

  // 2. CTA BANNER SECTION
  if (style === 'cta-banner') {
    return (
      <section className="relative px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00aeef]/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative w-full max-w-[1400px] mx-auto text-center space-y-6">
          <Reveal>
            <div className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-orange/20 text-brand-orange border border-brand-orange/30">
              {section.subtitle || 'Connect With Scientists'}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-white leading-tight max-w-4xl mx-auto">
              {section.title}
            </h2>
          </Reveal>
          {section.text && (
            <Reveal delay={0.1}>
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
                {section.text}
              </p>
            </Reveal>
          )}
          <Reveal delay={0.15}>
            {(() => {
              const secBtnText = section.secondaryButtonText || 'Virtual Tour';
              const secBtnLink = section.secondaryButtonLink || '/virtual-tour/00%20MAIN%20BUILDING/index.htm';
              const isPrimaryExternal = (section.buttonLink || '/contact').startsWith('http');
              const isSecExternal = secBtnLink.startsWith('http') || secBtnLink.includes('.htm');

              return (
                <div className="flex items-center justify-center gap-4 flex-wrap pt-4">
                  {isPrimaryExternal ? (
                    <a
                      href={section.buttonLink || '/contact'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 rounded-[10px] bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2"
                    >
                      <span>{section.buttonText || 'Schedule Discussion'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link
                      href={section.buttonLink || '/contact'}
                      className="px-8 py-4 rounded-[10px] bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2"
                    >
                      <span>{section.buttonText || 'Schedule Discussion'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}

                  {secBtnText && (
                    isSecExternal ? (
                      <a
                        href={secBtnLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 rounded-[10px] border border-white/30 hover:bg-white/10 text-white text-sm font-semibold uppercase tracking-wider transition-all backdrop-blur-xs"
                      >
                        {secBtnText}
                      </a>
                    ) : (
                      <Link
                        href={secBtnLink}
                        className="px-8 py-4 rounded-[10px] border border-white/30 hover:bg-white/10 text-white text-sm font-semibold uppercase tracking-wider transition-all backdrop-blur-xs"
                      >
                        {secBtnText}
                      </Link>
                    )
                  )}
                </div>
              );
            })()}
          </Reveal>
        </div>
      </section>
    );
  }

  // 3. STATS / METRICS COUNTERS GRID
  if (style === 'stats-metrics' || (section.stats && section.stats.length > 0 && !section.cards && !section.bullets)) {
    const statsList = section.stats || [];
    return (
      <section className={`px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 ${isDark ? 'bg-brand-navy text-white' : 'bg-slate-50 text-neutral-900'} border-y border-neutral-200/60`}>
        <div className="w-full max-w-[1700px] mx-auto">
          {(section.title || section.subtitle) && (
            <div className="text-center mb-10 md:mb-14">
              {section.subtitle && (
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange mb-2 block">
                  {section.subtitle}
                </span>
              )}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight leading-tight">
                {section.title}
              </h2>
              {section.text && (
                <p className={`text-base max-w-3xl mx-auto mt-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                  {section.text}
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {statsList.map((stat, sIdx) => (
              <motion.div
                key={sIdx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: sIdx * 0.1 }}
                className={`p-6 sm:p-8 rounded-[12px] ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-xs hover:shadow-md'} transition-all`}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-orange mb-2">
                  {stat.value}
                </div>
                <h3 className={`text-base sm:text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  {stat.label}
                </h3>
                {stat.sublabel && (
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {stat.sublabel}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 4. PROCESS FLOW / TIMELINE STEPS (01, 02, 03)
  if (style === 'process-steps' || (section.steps && section.steps.length > 0)) {
    const stepsList = section.steps || [
      { step: '01', title: 'Target Specification & Molecule Assessment', description: 'Comprehensive review of molecule structure, purity, and clinical phase timelines.' },
      { step: '02', title: 'Process & Analytical Development', description: 'Robust media screening, parameter optimization, and ICH method development.' },
      { step: '03', title: 'Scale-Up & Engineering Batches', description: 'Executing pilot and verification campaigns under scalable bioreactor protocols.' },
      { step: '04', title: 'cGMP Manufacturing & Release', description: 'Batch execution, Grade A fill-finish, and full QA regulatory dossier compilation.' },
    ];

    return (
      <section className={`px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 ${isDark ? 'bg-brand-navy text-white' : 'bg-white text-neutral-900'} border-y border-neutral-100`}>
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            {section.subtitle && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange mb-2 block">
                {section.subtitle}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight leading-tight">
              {section.title}
            </h2>
            {section.text && (
              <p className={`text-[15px] sm:text-[17px] max-w-3xl mx-auto mt-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                {section.text}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stepsList.map((step, idx) => {
              const StepIcon = resolveIcon(step.icon, WorkflowIconFallback(idx));
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`p-6 sm:p-7 rounded-[12px] flex flex-col justify-between ${
                    isDark
                      ? 'bg-white/5 border border-white/10 hover:border-brand-blue/50'
                      : 'glass-card border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1'
                  } transition-all duration-300`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold font-mono text-brand-orange">
                        {step.step || `0${idx + 1}`}
                      </span>
                      <div className="w-10 h-10 rounded-[10px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                        <StepIcon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2.5 leading-snug">
                      {step.title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // 4.5 BENTO INSIGHTS / FEATURED RESEARCH GRID
  if (style === 'bento-insights') {
    const cardsList = (section.cards && section.cards.length >= 3)
      ? section.cards
      : [
          {
            title: 'Accelerating Cell Line Development for Monoclonal Antibodies',
            description: 'How automated clone screening and stable CHO platforms shorten the path from gene to high-producing cell line.',
            badge: 'CELL LINE DEVELOPMENT',
            step: 'November 15, 2023 · 8 min read',
            image: '/images/cdn/unsplash-1614935151651-0bea6508db6b.jpg',
            link: '/insights/blogs/accelerating-cell-line-development-for-mabs'
          },
          {
            title: 'From DNA to Research Cell Bank in 16 Weeks',
            description: 'A look inside the streamlined gene-to-RCB pathway that de-risks early biologics development timelines.',
            badge: 'CELL LINE DEVELOPMENT',
            step: '6 min read',
            image: '/images/default_scientist.png',
            link: '/insights/blogs/from-dna-to-research-cell-bank-in-16-weeks'
          },
          {
            title: 'Upstream Process Optimization: Feed and Perfusion Strategies',
            description: 'How feed design, perfusion configurations, and scale-down models raise titers while protecting product quality.',
            badge: 'PROCESS DEVELOPMENT',
            step: '9 min read',
            image: '/images/cdn/unsplash-1606206873764-fd15e242df52.jpg',
            link: '/insights/blogs/upstream-process-optimization-feed-and-perfusion'
          }
        ];

    return (
      <section className={`relative px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 border-y border-neutral-100 overflow-hidden ${isDark ? 'bg-brand-navy text-white' : 'bg-white text-neutral-900'} select-none`}>
        <div className="relative w-full max-w-[1700px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-14">
            <Reveal>
              <div>
                {section.subtitle && (
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange mb-2 block">
                    {section.subtitle}
                  </span>
                )}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight leading-[1.15]">
                  {section.title || 'Featured Research and Insights'}
                </h2>
                {section.text && (
                  <p className={`text-[15px] sm:text-[17px] ${isDark ? 'text-slate-300' : 'text-slate-500'} font-normal leading-relaxed max-w-2xl mt-4`}>
                    {section.text}
                  </p>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href={section.buttonLink || '/insights/blogs'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] border border-brand-blue text-brand-blue text-sm font-semibold hover:bg-brand-blue hover:text-white transition-all duration-300"
              >
                <span>{section.buttonText || 'View all insights'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>

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
              <Link href={cardsList[0].link || '/insights/blogs'} className={`group relative flex flex-col h-full rounded-[10px] overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 ${isDark ? 'bg-slate-900 border border-slate-700' : 'glass-card border border-slate-200/80'}`}>
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-yellow scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-10" />
                <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                  <img
                    src={cardsList[0].image || '/images/cdn/unsplash-1614935151651-0bea6508db6b.jpg'}
                    alt={cardsList[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6 md:p-8">
                  {cardsList[0].badge && (
                    <div className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow mb-3">{cardsList[0].badge}</div>
                  )}
                  <h3 className={`text-xl md:text-2xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-black'} group-hover:text-brand-blue transition-colors leading-snug`}>
                    {cardsList[0].title}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-neutral-500'} leading-relaxed line-clamp-2 mb-6`}>{cardsList[0].description}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-neutral-500'}`}>{cardsList[0].step || 'November 15, 2023 · 8 min read'}</span>
                    <span className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-black group-hover:bg-brand-yellow group-hover:border-brand-yellow group-hover:text-black transition-all duration-300">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Two stacked horizontal cards (Right) */}
            <div className="flex flex-col gap-6">
              {cardsList.slice(1, 3).map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.15 + idx * 0.12 }}
                  whileHover={{ y: -6 }}
                  className="flex-1"
                >
                  <Link href={card.link || '/insights/blogs'} className={`group relative flex h-full rounded-[10px] overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 ${isDark ? 'bg-slate-900 border border-slate-700' : 'glass-card border border-slate-200/80'}`}>
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-yellow scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-10" />
                    <div className="relative w-2/5 overflow-hidden bg-neutral-100 flex-shrink-0">
                      <img
                        src={card.image || '/images/default_scientist.png'}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-5 md:p-6">
                      {card.badge && (
                        <div className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow mb-2">{card.badge}</div>
                      )}
                      <h3 className={`text-base md:text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'} group-hover:text-brand-blue transition-colors leading-snug line-clamp-2`}>
                        {card.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-neutral-500'} leading-relaxed line-clamp-2 mb-4`}>{card.description}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-neutral-500'}`}>{card.step || '6 min read'}</span>
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
        </div>
      </section>
    );
  }

  // 5. CARDS GRID / BENTO GRID
  if (style === 'cards-grid' && section.cards && section.cards.length > 0) {
    return (
      <section className={`px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 ${isDark ? 'bg-brand-navy text-white' : 'bg-molecules text-neutral-900'} border-y border-neutral-100`}>
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="text-center mb-10 md:mb-14">
            {section.subtitle && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange mb-2 block">
                {section.subtitle}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight leading-tight">
              {section.title}
            </h2>
            {section.text && (
              <p className={`text-[15px] sm:text-[17px] max-w-3xl mx-auto mt-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                {section.text}
              </p>
            )}
          </div>

          <div className={`grid grid-cols-1 ${section.cards.length === 2 ? 'md:grid-cols-2' : section.cards.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6 lg:gap-8`}>
            {section.cards.map((card, idx) => {
              const CardIcon = resolveIcon(card.icon, FlaskConical);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: idx * 0.1 }}
                  className="h-full"
                >
                  <div className={`group h-full rounded-[10px] overflow-hidden flex flex-col justify-between ${
                    isDark
                      ? 'bg-slate-900/80 border border-slate-700/60 shadow-lg'
                      : 'glass-card border border-slate-200/80 shadow-xs hover:shadow-2xl hover:-translate-y-1.5'
                  } transition-all duration-500`}>
                    {card.images && card.images.length > 0 ? (
                      <CardImageCarousel
                        images={card.images}
                        alt={card.title}
                        href={card.link || card.href}
                      />
                    ) : card.image ? (
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    ) : null}
                    <div className="p-5 sm:p-6 lg:p-6 xl:p-7 flex flex-col flex-1 justify-between">
                      <div className="mb-4 flex flex-col">
                        {(card.badge || card.step) && (
                          <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-brand-orange mb-2">
                            {card.badge || card.step}
                          </span>
                        )}
                        <div className="flex items-start gap-2.5 sm:gap-3 mb-2.5 group/header">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] bg-brand-blue/10 border border-brand-blue/25 flex items-center justify-center shrink-0 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 shadow-xs mt-0.5">
                            <CardIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />
                          </div>
                          <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 group-hover:text-brand-blue transition-colors leading-snug break-words">
                            {card.title}
                          </h3>
                        </div>
                        <p className="text-[14px] sm:text-[15px] text-neutral-600 leading-relaxed">
                          {card.description}
                        </p>
                      </div>

                      {/* Sub-links List */}
                      {card.items && card.items.length > 0 && (
                        <ul className="border-t border-neutral-100 pt-1 mt-auto">
                          {card.items.map((item, itIdx) => {
                            const ItemIcon = resolveIcon(item.icon, Dna);
                            return (
                              <li key={itIdx} className="border-b border-neutral-100 last:border-0">
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
                                  <ArrowRight className="w-4 h-4 shrink-0 text-brand-blue group-hover/link:text-brand-blue-hover group-hover/link:translate-x-1 transition-all ml-1" />
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      {(card.link || card.href) && (!card.items || card.items.length === 0) && (
                        <div className="pt-4 mt-auto border-t border-neutral-100">
                          <Link
                            href={card.link || card.href || '#'}
                            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-blue hover:text-brand-blue-hover transition-colors"
                          >
                            <span>Learn More</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // 6. MODALITIES GRID SECTION
  if (style === 'modalities-grid' || (section.cards && section.cards.some((c) => c.link?.includes('/modalities')))) {
    const modalitiesList = section.cards || [];
    return (
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 border-y border-neutral-100 bg-white">
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="text-center mb-10 md:mb-14">
            {section.subtitle && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange mb-2 block">
                {section.subtitle}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-tight">
              {section.title}
            </h2>
            {section.text && (
              <p className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed max-w-3xl mx-auto mt-4">
                {section.text}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {modalitiesList.map((modal, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link href={modal.link || '/modalities/mabs'} className="group block h-full">
                  <div className="h-full glass-card rounded-[10px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#000a1c]">
                      <img
                        src={modal.image || '/images/modalities/mAb.png'}
                        alt={modal.title}
                        className="w-full h-full object-fill transition-transform duration-700 group-hover:scale-105"
                        style={{ objectFit: 'fill' }}
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <h3 className="text-lg font-semibold text-black group-hover:text-brand-blue transition-colors leading-snug">
                        {modal.title}
                      </h3>
                      {modal.description && (
                        <p className="text-xs text-neutral-600 mt-2 line-clamp-2">
                          {modal.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 7. CAPABILITIES CHECKLIST / ADVANTAGE LIST
  if (style === 'capabilities-checklist' || (section.bullets && section.bullets.length > 0 && !section.image)) {
    const bullets = section.bullets || [];
    return (
      <section className={`px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 ${isDark ? 'bg-brand-navy text-white' : 'bg-molecules text-neutral-900'} border-y border-neutral-100`}>
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
              {section.subtitle && (
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange mb-2 block">
                  {section.subtitle}
                </span>
              )}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight leading-tight mb-4">
                {section.title}
              </h2>
              {section.text && (
                <p className={`text-[15px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                  {section.text}
                </p>
              )}
            </div>

            <div className="lg:col-span-8 relative">
              <div className="absolute left-[21px] sm:left-[27px] top-2 bottom-2 w-0.5 bg-brand-blue/20" />
              <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
                {bullets.map((bullet, idx) => (
                  <Reveal key={idx} delay={idx * 0.08}>
                    <div className="relative flex gap-3.5 sm:gap-6 md:gap-8 items-start">
                      <div className="relative z-10 w-11 h-11 sm:w-14 sm:h-14 rounded-[10px] bg-white border-2 border-brand-blue flex items-center justify-center shrink-0 shadow-sm text-brand-blue">
                        <Check className="w-5.5 h-5.5 sm:w-7 sm:h-7 stroke-[2.5]" />
                      </div>
                      <div className={`flex-1 min-w-0 p-4 sm:p-5 md:p-6 rounded-[10px] ${isDark ? 'bg-white/5 border border-white/10' : 'glass-card border border-slate-200/80'} shadow-sm`}>
                        <h3 className="text-[15px] sm:text-lg md:text-xl font-semibold leading-snug">
                          {bullet}
                        </h3>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 8. FAQ ACCORDION SECTION (Matching Image 1 Live Layout)
  if (style === 'faq-accordion' || (section.faqs && section.faqs.length > 0)) {
    const faqs = (section.faqs && section.faqs.length > 0)
      ? section.faqs
      : [
          { question: 'What modalities are supported at Lambda CDMO?', answer: 'We support Monoclonal Antibodies (mAbs), Bispecific Antibodies, Antibody-Drug Conjugates (ADCs), and Recombinant Proteins & Peptides across all development stages.' },
          { question: 'Where are Lambda CDMO facilities located?', answer: 'Lambda CDMO operates an integrated development and GMP manufacturing campus in Ahmedabad, India, and an advanced European Innovation Centre in London, UK.' },
          { question: 'How do you handle technical transfers and regulatory filings?', answer: 'We utilize standardized tech transfer protocols with comprehensive analytical comparability, process qualification packages, and QA documentation aligned with US FDA, EMA, PMDA, and TGA requirements.' }
        ];

    return (
      <FAQSection
        faqs={faqs}
        title={section.title || 'Common Questions'}
        subtitle={section.text || section.subtitle || 'Answers to questions about process, tech transfers, timelines, and facility validations.'}
      />
    );
  }

  // 9. TECHNICAL SPECIFICATIONS TABLE
  if (style === 'technical-specs' || (section.specs && section.specs.length > 0)) {
    const specsList = section.specs || [];
    return (
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-slate-50 border-y border-neutral-200/80">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="text-center mb-10 md:mb-14">
            {section.subtitle && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange mb-2 block">
                {section.subtitle}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-tight">
              {section.title}
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-xs border-b border-slate-200">
                <tr>
                  <th className="py-4 px-6 w-1/3">Specification Parameter</th>
                  <th className="py-4 px-6">Capability & Technical Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {specsList.map((spec, sIdx) => (
                  <tr key={sIdx} className="hover:bg-slate-50/70">
                    <td className="py-4 px-6 font-semibold text-neutral-900">
                      {spec.label}
                    </td>
                    <td className="py-4 px-6 text-neutral-600">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }

  // 10. CINEMATIC VIDEO HERO BANNER
  if (style === 'video-hero-banner') {
    return (
      <section className="relative px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-20 md:py-32 bg-slate-950 overflow-hidden text-white">
        {section.video && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          >
            <source src={section.video} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="relative w-full max-w-[1400px] mx-auto text-center space-y-6">
          {section.subtitle && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-blue/20 text-brand-blue border border-brand-blue/40">
              {section.subtitle}
            </span>
          )}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light md:font-normal tracking-tight leading-tight max-w-4xl mx-auto">
            {section.title}
          </h2>
          {section.text && (
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {section.text}
            </p>
          )}
          {section.buttonText && (
            <div className="pt-4">
              <Link
                href={section.buttonLink || '/contact'}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-[10px] bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
              >
                <span>{section.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }

  // 11. EQUIPMENT CAROUSEL SHOWCASE
  if (style === 'equipment-carousel') {
    const equipItems = getSectionEquipment(section.title, pageSlug);
    return (
      <section className={`py-12 md:py-20 ${isDark ? 'bg-brand-navy text-white' : 'bg-slate-50 text-neutral-900'} border-y border-neutral-100`}>
        <div className="w-full max-w-[1700px] mx-auto px-6 sm:px-8 md:px-12">
          <div className="text-center mb-10 md:mb-14">
            {section.subtitle && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange mb-2 block">
                {section.subtitle}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight leading-tight">
              {section.title || 'State-of-the-Art Analytical & Process Equipment'}
            </h2>
            {section.text && (
              <p className={`text-[15px] sm:text-[17px] max-w-3xl mx-auto mt-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                {section.text}
              </p>
            )}
          </div>
          {(() => {
            const displayItems = (section.images && section.images.length > 1)
              ? section.images.map((img: string, i: number) => {
                  const match = (equipItems || []).find((eq) => eq.src === img) ||
                    ALL_EQUIPMENT_ITEMS.find((eq) => eq.src === img);
                  return match || {
                    src: img,
                    title: `${section.title} Equipment ${i + 1}`,
                    subtitle: `${section.title} instrumentation suite.`,
                    tag: 'Equipment'
                  };
                })
              : equipItems;

            return displayItems && displayItems.length > 0 ? (
              <EquipmentCarousel
                items={displayItems}
                sectionTitle={section.title || 'Laboratory & Process Equipment'}
              />
            ) : (
              <div className="p-8 text-center text-slate-500">
                <p>Equipment showcase active.</p>
              </div>
            );
          })()}
        </div>
      </section>
    );
  }

  // 12. RICH TEXT / EDITORIAL PROSE
  if (style === 'rich-text') {
    return (
      <section className={`px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 ${isDark ? 'bg-brand-navy text-white' : 'bg-white text-neutral-900'} border-y border-neutral-100`}>
        <div className="w-full max-w-[1000px] mx-auto">
          {section.subtitle && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange mb-2 block">
              {section.subtitle}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight leading-tight mb-6">
            {section.title}
          </h2>
          <div className="h-1 w-12 bg-brand-blue rounded-full mb-8" />
          <div className={`space-y-5 text-base md:text-lg leading-relaxed font-normal ${isDark ? 'text-slate-300' : 'text-neutral-700'}`}>
            {section.text?.split('\n\n').map((para, pIdx) => (
              <p key={pIdx}>{para}</p>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 11. DEFAULT / FEATURE-SPLIT SECTION (50-50 Text & Media)
  const isImageLeft = section.imageSide === 'left';
  const hasBullets = section.bullets && section.bullets.length > 0;

  return (
    <section className={`px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 ${isDark ? 'bg-brand-navy text-white' : 'bg-white text-neutral-900'} border-y border-neutral-100`}>
      <div className="w-full max-w-[1700px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Media Column */}
          <Reveal className={`${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 border border-neutral-200 rounded-[10px] shadow-sm">
              {section.images && section.images.length > 1 ? (
                <CardImageCarousel images={section.images} alt={section.title} />
              ) : (section.mediaType === 'video' || /\.(mp4|webm|ogg|mov)$/i.test(section.video || section.image || '')) && (section.video || section.image) ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={section.video || section.image} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={section.image || '/images/hero_cleanroom.png'}
                  alt={section.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              )}
            </div>
          </Reveal>

          {/* Text Column */}
          <Reveal delay={0.1} className={`${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
            <div>
              {section.subtitle && (
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange mb-2 block">
                  {section.subtitle}
                </span>
              )}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight leading-[1.15] mb-5">
                {section.title}
              </h2>
              <div className="h-1 w-12 bg-brand-blue rounded-full mb-6" />

              <div className={`space-y-4 text-[15px] md:text-[17px] leading-relaxed font-normal ${isDark ? 'text-slate-300' : 'text-neutral-600'}`}>
                {section.text.split('\n\n').map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {hasBullets && (
                <div className="mt-8 space-y-3">
                  {section.bulletsTitle && (
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-3">
                      {section.bulletsTitle}
                    </h4>
                  )}
                  <ul className="space-y-2.5">
                    {section.bullets?.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-sm sm:text-base">
                        <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center shrink-0 mt-0.5 text-brand-blue">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {section.buttonText && (
                <div className="mt-8">
                  <Link
                    href={section.buttonLink || '/contact'}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-[10px] bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                  >
                    <span>{section.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WorkflowIconFallback(idx: number): LucideIcon {
  const icons: LucideIcon[] = [FlaskConical, Settings, ShieldCheck, Factory];
  return icons[idx % icons.length] || FlaskConical;
}
