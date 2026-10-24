'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  Building2,
  Cpu,
  Layers,
  FlaskConical,
  BookOpen,
  HelpCircle,
  CornerDownLeft,
  Flame,
} from 'lucide-react';
import { searchSite, SearchResultItem } from '@/lib/searchData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const CATEGORIES = [
  'All',
  'Services',
  'Manufacturing',
  'Facility & Locations',
  'Modalities',
  'Insights',
  'FAQs',
] as const;

const POPULAR_SEARCHES = [
  'Cell Line Development',
  'Drug Substance',
  'Ahmedabad Facility',
  'London Facility',
  'Monoclonal Antibodies',
  'Analytical Characterization',
  'Virtual Tour',
  'Bioreactor Capacity',
];

export default function SearchModal({ isOpen, onClose, initialQuery = '' }: SearchModalProps) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialQuery]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }
    const res = searchSite(query, selectedCategory);
    setResults(res);
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % results.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      }
    } else if (e.key === 'Enter') {
      if (results.length > 0 && results[selectedIndex]) {
        e.preventDefault();
        const selected = results[selectedIndex];
        onClose();
        if (selected.href.endsWith('.htm') || selected.href.startsWith('http')) {
          window.open(selected.href, '_blank');
        } else {
          router.push(selected.href);
        }
      }
    }
  };

  const getCategoryIcon = (category: SearchResultItem['category']) => {
    switch (category) {
      case 'Services':
        return <FlaskConical className="w-4 h-4 text-teal-600" />;
      case 'Manufacturing':
        return <Cpu className="w-4 h-4 text-indigo-600" />;
      case 'Facility & Locations':
        return <Building2 className="w-4 h-4 text-brand-orange" />;
      case 'Modalities':
        return <Layers className="w-4 h-4 text-purple-600" />;
      case 'Insights':
        return <BookOpen className="w-4 h-4 text-brand-blue" />;
      case 'FAQs':
        return <HelpCircle className="w-4 h-4 text-amber-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-slate-500" />;
    }
  };

  const getCategoryBadgeClass = (category: SearchResultItem['category']) => {
    switch (category) {
      case 'Services':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Manufacturing':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Facility & Locations':
        return 'bg-orange-50 text-brand-orange border-orange-200';
      case 'Modalities':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Insights':
        return 'bg-sky-50 text-brand-blue border-sky-200';
      case 'FAQs':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-neutral-200/90 overflow-hidden flex flex-col max-h-[80vh] z-10"
            onKeyDown={handleKeyDown}
          >
            {/* Top Search Input Row */}
            <div className="relative flex items-center px-4 sm:px-6 py-4 border-b border-neutral-100 bg-white">
              <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services, facilities, manufacturing, modalities, insights..."
                className="w-full bg-transparent text-neutral-900 placeholder:text-slate-400 text-base sm:text-lg font-light md:font-normal focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-neutral-100 mr-2 cursor-pointer transition-colors"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="px-2.5 py-1 text-xs font-medium text-slate-500 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 bg-neutral-50/80 border-b border-neutral-100 overflow-x-auto scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-brand-navy text-white shadow-sm'
                        : 'bg-white text-slate-600 hover:bg-neutral-200/60 border border-neutral-200/60'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Results Area */}
            <div className="overflow-y-auto flex-1 p-3 sm:p-4 divide-y divide-neutral-100">
              {query.trim() === '' ? (
                /* Empty query state: popular searches & quick links */
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    <Flame className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Popular Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {POPULAR_SEARCHES.map((item) => (
                      <button
                        key={item}
                        onClick={() => setQuery(item)}
                        className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-brand-blue/10 hover:text-brand-blue text-xs font-medium text-slate-700 transition-colors cursor-pointer"
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-neutral-100">
                    <Link
                      href="/services"
                      onClick={onClose}
                      className="group p-3 rounded-xl border border-neutral-100 bg-neutral-50/50 hover:bg-sky-50/50 hover:border-sky-200 transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-teal-100/60 flex items-center justify-center text-teal-700">
                          <FlaskConical className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-neutral-900 group-hover:text-brand-blue">
                            All Biologics Services
                          </div>
                          <div className="text-[11px] text-slate-500">Cell Line, Upstream & Downstream</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                    </Link>

                    <Link
                      href="/facility&location/India"
                      onClick={onClose}
                      className="group p-3 rounded-xl border border-neutral-100 bg-neutral-50/50 hover:bg-orange-50/50 hover:border-orange-200 transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-100/60 flex items-center justify-center text-brand-orange">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-neutral-900 group-hover:text-brand-orange">
                            Ahmedabad cGMP Facility
                          </div>
                          <div className="text-[11px] text-slate-500">Single-use Bioreactors & Suites</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                    </Link>
                  </div>
                </div>
              ) : results.length === 0 ? (
                /* No Results */
                <div className="py-12 px-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-medium text-neutral-900 mb-1">
                    No results found for &ldquo;{query}&rdquo;
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                    Try searching for broader terms such as cell line, bioreactor, formulation, mAbs, or facility.
                  </p>
                  <button
                    onClick={() => {
                      setQuery('');
                      setSelectedCategory('All');
                    }}
                    className="px-4 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-medium text-neutral-800 transition-colors cursor-pointer"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                /* Search Results List */
                <div className="space-y-1">
                  {results.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={onClose}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        target={item.href.endsWith('.htm') || item.href.startsWith('http') ? '_blank' : undefined}
                        className={`group block p-3.5 rounded-xl transition-all ${
                          isSelected
                            ? 'bg-brand-blue/10 border border-brand-blue/30 shadow-xs'
                            : 'hover:bg-neutral-50 border border-transparent'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200/80 shadow-2xs flex items-center justify-center shrink-0 mt-0.5">
                              {getCategoryIcon(item.category)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span
                                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getCategoryBadgeClass(
                                    item.category
                                  )}`}
                                >
                                  {item.category}
                                </span>
                                {item.badge && item.badge !== item.category && (
                                  <span className="text-[10px] font-medium text-slate-500 bg-neutral-100 px-2 py-0.5 rounded-md">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <h4
                                className={`text-sm sm:text-[15px] font-semibold text-neutral-900 group-hover:text-brand-blue transition-colors truncate ${
                                  isSelected ? 'text-brand-blue' : ''
                                }`}
                              >
                                {item.title}
                              </h4>
                              <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 font-normal">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center self-center pl-2">
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                                isSelected
                                  ? 'bg-brand-blue text-white shadow-xs'
                                  : 'text-slate-300 group-hover:text-brand-blue group-hover:translate-x-0.5'
                              }`}
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="px-4 sm:px-6 py-2.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded text-[10px] font-mono text-slate-600 shadow-2xs">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded text-[10px] font-mono text-slate-600 shadow-2xs">
                    ↓
                  </kbd>
                  <span className="ml-0.5">to navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded text-[10px] font-mono text-slate-600 shadow-2xs flex items-center">
                    <CornerDownLeft className="w-2.5 h-2.5" />
                  </kbd>
                  <span className="ml-0.5">to select</span>
                </span>
              </div>
              <div>
                {results.length > 0 ? (
                  <span>
                    {results.length} {results.length === 1 ? 'result' : 'results'}
                  </span>
                ) : (
                  <span>Lambda CDMO Knowledge Base</span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
