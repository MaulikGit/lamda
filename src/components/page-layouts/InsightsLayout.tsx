'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Download,
  FileText,
  Newspaper,
  Clock,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import CommonCTA from '@/components/CommonCTA';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';
import { insightsData, INSIGHT_TABS, type InsightItem } from '@/data/insightsData';

interface InsightsLayoutProps {
  page: CDMOPage;
  content: PageContent;
}

const TAB_ICONS = {
  BookOpen,
  FileText,
  Download,
  Newspaper,
  Calendar,
};

export default function InsightsLayout({ page }: InsightsLayoutProps) {
  // Active category slug derived or selected by user
  const [userSelectedTab, setUserSelectedTab] = useState<string | null>(null);
  const activeTab = userSelectedTab ?? (INSIGHT_TABS.some((t) => t.slug === page.slug) ? page.slug : 'blogs');
  const [liveData, setLiveData] = useState<Record<string, InsightItem[]>>(insightsData);

  // Fetch latest insights dynamically from storage
  useEffect(() => {
    fetch('/api/insights')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setLiveData(data.data);
        }
      })
      .catch((err) => console.log('Using local static insightsData:', err));
  }, []);

  // Switch tabs and update browser URL without full reload
  const handleTabChange = (slug: string) => {
    setUserSelectedTab(slug);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/insights/${slug}`);
    }
  };

  const currentTabConfig = INSIGHT_TABS.find((t) => t.slug === activeTab) || INSIGHT_TABS[0];
  const items = liveData[activeTab] || insightsData[activeTab] || [];
  const [featuredItem, ...supportingItems] = items;

  return (
    <div className="min-h-screen bg-neutral-50/50">
      {/* TOP HEADER & BREADCRUMBS */}
      <section className="pt-24 md:pt-28 pb-6 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 bg-white border-b border-neutral-200">
        <div className="w-full max-w-[1700px] mx-auto">
          {/* Breadcrumb path */}
          <div className="flex items-center gap-2 text-[12px] uppercase tracking-wider text-neutral-500 mb-6">
            <Link href="/" className="hover:text-black transition-colors font-medium">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-neutral-500 font-medium">Insights</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-brand-orange font-semibold">{currentTabConfig.label}</span>
          </div>

          {/* Title & Introduction */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/5 text-brand-navy text-[11px] font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                <span>Scientifically Proven Biologics Intelligence</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight leading-tight">
                Lambda <span className="font-normal text-brand-navy">Insights</span>
              </h1>
              <p className="mt-2 text-base md:text-lg text-slate-600 max-w-3xl font-normal leading-relaxed">
                {currentTabConfig.description}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Category
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-brand-navy text-white text-xs font-medium tracking-wide">
                Peer-Reviewed Dossiers
              </span>
            </div>
          </div>

          {/* 5 TABS NAVIGATION BAR */}
          <div className="pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
              {INSIGHT_TABS.map((tab) => {
                const IconComponent = TAB_ICONS[tab.icon as keyof typeof TAB_ICONS] || FileText;
                const isActive = activeTab === tab.slug;

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.slug)}
                    className={`group relative flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-xl text-sm sm:text-[15px] font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-brand-navy text-white shadow-md shadow-brand-navy/15 scale-[1.02]'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80 hover:text-black'
                    }`}
                  >
                    <IconComponent
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-brand-orange' : 'text-slate-500 group-hover:text-brand-blue'
                      }`}
                    />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA: 1 FEATURED STORY + 4 SUPPORTING CONTENT CARDS */}
      <main className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 md:py-16">
        <div className="w-full max-w-[1700px] mx-auto space-y-12">
          {/* SECTION 1: FEATURED STORY BANNER */}
          {featuredItem && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                  {currentTabConfig.label}
                </h2>
                <div className="w-12 h-0.5 bg-brand-orange mx-auto mt-2" />
              </div>

              <Link
                href={`/insights/${featuredItem.category}/${featuredItem.slug || featuredItem.id}`}
                className="group block relative bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                {/* Accent top gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-orange" />

                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Left Column: Featured Article Image */}
                  <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto min-h-[300px] lg:min-h-[440px] overflow-hidden bg-neutral-100">
                    <img
                      src={featuredItem.image}
                      alt={featuredItem.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-white/95 text-brand-navy shadow-md backdrop-blur-sm border border-white/50">
                        {featuredItem.badge}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Editorial metadata, title, and CTA */}
                  <div className="lg:col-span-7 p-8 sm:p-10 md:p-12 flex flex-col justify-between bg-gradient-to-br from-white via-white to-neutral-50/50">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-orange">
                          EDITORIAL
                        </span>
                        <span className="h-px flex-1 bg-neutral-200" />
                        <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5 text-brand-blue" />
                          {featuredItem.readTime}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.2] group-hover:text-brand-blue transition-colors">
                        {featuredItem.title}
                      </h3>

                      <p className="mt-4 text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed line-clamp-3">
                        {featuredItem.summary}
                      </p>

                      {/* Key Takeaways snippet */}
                      <div className="mt-6 pt-5 border-t border-neutral-100 space-y-2">
                        {featuredItem.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                            <span>{takeaway}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy font-semibold text-xs">
                          {featuredItem.author.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-neutral-900 leading-none">
                            {featuredItem.author.name}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">{featuredItem.author.role}</p>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue group-hover:text-brand-blue-hover transition-colors">
                        <span className="w-6 h-0.5 bg-brand-orange group-hover:w-10 transition-all duration-300" />
                        <span>Read the full story</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* SECTION 2: 4 SUPPORTING CONTENT CARDS (2x2 Grid) */}
          {supportingItems.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-neutral-200">
                <div>
                  <h2 className="text-xl sm:text-2xl font-normal text-neutral-900 tracking-tight">
                    More in {currentTabConfig.label}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Peer-reviewed methodologies and validated technical reports
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Technical Reports
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {supportingItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/insights/${item.category}/${item.slug || item.id}`}
                    className="group block relative bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-blue/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Top image */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/95 text-brand-navy shadow-md border border-white/40">
                          {item.badge}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-black/60 text-white backdrop-blur-sm">
                          {item.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                          <span>{item.date}</span>
                          <span>•</span>
                          <span className="text-brand-orange font-semibold">{item.author.name}</span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-light md:font-normal text-neutral-900 leading-snug group-hover:text-brand-blue transition-colors line-clamp-2">
                          {item.title}
                        </h3>

                        <p className="mt-3 text-sm text-slate-600 font-normal leading-relaxed line-clamp-3">
                          {item.summary}
                        </p>

                        {/* Top Key Takeaway */}
                        {item.keyTakeaways[0] && (
                          <div className="mt-4 p-3 rounded-lg bg-neutral-50 border border-neutral-100 text-xs text-slate-700 flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                            <span className="line-clamp-2 font-medium">{item.keyTakeaways[0]}</span>
                          </div>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 text-slate-600"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue group-hover:translate-x-1.5 transition-transform">
                          <span>Read full article</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* COMMON CTA */}
      <CommonCTA />
    </div>
  );
}
