'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Building2,
  Dna,
  Filter,
  Factory,
  Microscope,
  Syringe,
  ShieldCheck,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MessageSquareText,
  Mail,
  SlidersHorizontal,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import { allFaqs, FAQ_CATEGORIES, FAQItemDetail } from '@/data/faqsData';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  all: HelpCircle,
  facilities: Building2,
  upstream: Dna,
  downstream: Filter,
  manufacturing: Factory,
  analytics: Microscope,
  modalities: Syringe,
  quality: ShieldCheck,
  partnership: Users,
};

export default function FAQPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(['fac-1', 'up-1', 'mfg-1', 'ana-1'])
  );

  // Filter FAQs based on category and search query
  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'all' || faq.category === selectedCategory;

      if (!searchQuery.trim()) return matchesCategory;

      const q = searchQuery.toLowerCase();
      const inQuestion = faq.question.toLowerCase().includes(q);
      const inAnswer = faq.answer.toLowerCase().includes(q);
      const inTags = faq.tags.some((tag) => tag.toLowerCase().includes(q));
      const inBullets = faq.bullets?.some((b) => b.toLowerCase().includes(q));

      return matchesCategory && (inQuestion || inAnswer || inTags || inBullets);
    });
  }, [selectedCategory, searchQuery]);

  // Category counts calculation
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allFaqs.length };
    allFaqs.forEach((faq) => {
      counts[faq.category] = (counts[faq.category] || 0) + 1;
    });
    return counts;
  }, []);

  const toggleFaq = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedIds(new Set(filteredFaqs.map((f) => f.id)));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  // Structured JSON-LD for Search Engines
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${faq.answer} ${faq.bullets ? faq.bullets.join(' ') : ''}`,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-neutral-50/50">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* HERO SECTION */}
      <section className="relative pt-24 md:pt-32 pb-14 md:pb-20 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 bg-white border-b border-neutral-200 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f223108_1px,transparent_1px),linear-gradient(to_bottom,#0f223108_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1700px] mx-auto">
          {/* Breadcrumb path */}
          <div className="flex items-center gap-2 text-[12px] uppercase tracking-wider text-neutral-500 mb-6">
            <Link href="/" className="hover:text-black transition-colors font-medium">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <Link href="/insights/blogs" className="hover:text-black transition-colors font-medium">
              Insights
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-brand-orange font-semibold">FAQs</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/5 text-brand-navy text-[11px] font-semibold uppercase tracking-wider mb-4 border border-brand-navy/10">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                <span>Technical Knowledge & Client Inquiries</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight leading-[1.1]">
                Frequently Asked <span className="font-normal text-brand-navy">Questions</span>
              </h1>
              <p className="mt-4 text-[16px] sm:text-[18px] text-slate-600 max-w-2xl font-normal leading-relaxed">
                Find clear, authoritative answers regarding our development pipelines, analytical characterization, cGMP manufacturing capacities, and regulatory compliance across India and the UK.
              </p>
            </div>

            {/* Quick Search Box */}
            <div className="lg:col-span-4 w-full">
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions, methods, scales..."
                  className="w-full pl-12 pr-10 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black p-1"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Category Filter Pills Bar */}
          <div className="mt-10 pt-6 border-t border-neutral-100">
            <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-none">
              {FAQ_CATEGORIES.map((cat) => {
                const Icon = CATEGORY_ICONS[cat.id] || HelpCircle;
                const isActive = selectedCategory === cat.id;
                const count = categoryCounts[cat.id] || 0;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`group relative flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-brand-navy text-white shadow-md shadow-brand-navy/15 scale-[1.02]'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80 hover:text-black'
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 transition-colors ${
                        isActive ? 'text-brand-orange' : 'text-slate-500 group-hover:text-brand-blue'
                      }`}
                    />
                    <span>{cat.label}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-white text-slate-600 border border-neutral-200/80'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN ACCORDION FAQS LIST */}
      <section className="py-12 md:py-16 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="w-full max-w-[1700px] mx-auto">
          {/* Controls bar: Results Count + Expand/Collapse */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-neutral-900">
                Showing {filteredFaqs.length} {filteredFaqs.length === 1 ? 'Question' : 'Questions'}
              </span>
              {searchQuery && (
                <span className="text-xs text-brand-orange font-medium bg-brand-orange/10 px-2.5 py-1 rounded-md">
                  Filtered by &quot;{searchQuery}&quot;
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold">
              <button
                onClick={expandAll}
                className="px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100 hover:text-black transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100 hover:text-black transition-colors cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Accordion Items List */}
          {filteredFaqs.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-2xl border border-neutral-200/80 p-8 shadow-xs">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <HelpCircle className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">No matching questions found</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                Try searching with different keywords or browse through our category filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-semibold uppercase tracking-wider hover:bg-brand-navy/90 transition-all cursor-pointer"
              >
                <span>Reset Filters</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, idx) => {
                const isExpanded = expandedIds.has(faq.id);

                return (
                  <Reveal key={faq.id} delay={Math.min(idx * 0.03, 0.3)}>
                    <div
                      className={`group bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md ${
                        isExpanded
                          ? 'border-brand-blue/40 ring-1 ring-brand-blue/20'
                          : 'border-neutral-200/90 hover:border-neutral-300'
                      }`}
                    >
                      {/* Accordion Question Header */}
                      <button
                        type="button"
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer select-none"
                        aria-expanded={isExpanded}
                      >
                        <div className="flex-1 pr-2">
                          <div className="flex items-center gap-2.5 mb-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-navy/5 text-brand-navy border border-brand-navy/10">
                              {faq.categoryLabel}
                            </span>
                          </div>
                          <h3
                            className={`text-base sm:text-lg font-semibold tracking-tight transition-colors ${
                              isExpanded ? 'text-brand-blue' : 'text-neutral-900 group-hover:text-brand-blue'
                            }`}
                          >
                            {faq.question}
                          </h3>
                        </div>

                        {/* Chevron Indicator */}
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isExpanded
                              ? 'bg-brand-blue text-white rotate-180'
                              : 'bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200'
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {/* Accordion Body Content */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-neutral-100">
                              <p className="text-[15px] sm:text-base text-neutral-600 leading-relaxed font-normal">
                                {faq.answer}
                              </p>

                              {faq.bullets && faq.bullets.length > 0 && (
                                <ul className="mt-4 space-y-2.5 pl-1">
                                  {faq.bullets.map((bullet, bIdx) => (
                                    <li key={bIdx} className="flex items-start gap-2.5">
                                      <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue" />
                                      </div>
                                      <span className="text-[14px] sm:text-[15px] text-neutral-700 leading-relaxed">
                                        {bullet}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {/* Tags Footer */}
                              {faq.tags && faq.tags.length > 0 && (
                                <div className="mt-5 pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-1.5">
                                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
                                    Tags:
                                  </span>
                                  {faq.tags.map((tag, tIdx) => (
                                    <button
                                      key={tIdx}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSearchQuery(tag);
                                      }}
                                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-neutral-100 hover:bg-brand-yellow hover:text-black text-neutral-600 font-medium transition-colors"
                                    >
                                      #{tag}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}

          {/* "STILL HAVE QUESTIONS?" CARD */}
          <Reveal delay={0.2}>
            <div className="mt-16 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy rounded-3xl p-8 sm:p-10 lg:p-12 text-white relative overflow-hidden shadow-xl border border-white/10">
              <div className="absolute right-0 top-0 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-[11px] font-bold uppercase tracking-wider mb-4 border border-white/15">
                    <MessageSquareText className="w-3.5 h-3.5" />
                    <span>Scientific Consultations & Custom Inquiries</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light tracking-tight leading-snug">
                    Can&apos;t find the specific answer for your <span className="font-semibold text-white">biologics program?</span>
                  </h3>
                  <p className="mt-3 text-base text-white/70 leading-relaxed font-normal">
                    Connect directly with our bioprocess engineers, bioanalytical chemists, and regulatory specialists. We provide tailored technical evaluations under confidentiality.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-brand-yellow hover:bg-brand-yellow-hover text-black font-semibold text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-all"
                  >
                    <span>Speak with a Scientist</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="mailto:BD@lambda-cro.com"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors border border-white/20"
                  >
                    <Mail className="w-4 h-4 text-brand-orange" />
                    <span>BD@lambda-cro.com</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
