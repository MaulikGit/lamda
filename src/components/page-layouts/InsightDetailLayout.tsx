'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  Share2,
  CheckCircle2,
  Sparkles,
  Tag,
  ChevronRight,
  ShieldCheck,
  FlaskConical,
  FileText,
  User,
  Check,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import CommonCTA from '@/components/CommonCTA';
import { INSIGHT_TABS, type InsightItem } from '@/data/insightsData';

interface InsightDetailLayoutProps {
  item: InsightItem;
  relatedItems: InsightItem[];
}

export default function InsightDetailLayout({ item, relatedItems }: InsightDetailLayoutProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const currentTab = INSIGHT_TABS.find((t) => t.slug === item.category) || {
    id: item.category,
    label: item.category.charAt(0).toUpperCase() + item.category.slice(1),
    slug: item.category,
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/60 selection:bg-brand-orange selection:text-white">
      {/* 1. TOP HEADER & BREADCRUMBS */}
      <section className="pt-24 md:pt-28 pb-8 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 bg-white border-b border-neutral-200/80">
        <div className="w-full max-w-[1280px] mx-auto">
          {/* Breadcrumb Path & Back Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center flex-wrap gap-2 text-[12px] uppercase tracking-wider text-neutral-500 font-medium">
              <Link href="/" className="hover:text-black transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <Link href={`/insights/${item.category}`} className="hover:text-black transition-colors">
                Insights
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <Link href={`/insights/${item.category}`} className="hover:text-brand-orange text-brand-orange font-semibold transition-colors">
                {currentTab.label}
              </Link>
            </div>

            <Link
              href={`/insights/${item.category}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-brand-navy hover:-translate-x-0.5 transition-all self-start sm:self-auto"
            >
              <ArrowLeft className="w-4 h-4 text-brand-orange" />
              <span>Back to all {currentTab.label}</span>
            </Link>
          </div>

          {/* Metadata Badges & Share */}
          <div className="flex items-center justify-between gap-4 flex-wrap pt-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-navy text-white shadow-sm">
                {item.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {item.date}
              </span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-brand-blue" />
                {item.readTime}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-neutral-200 text-slate-600 hover:text-neutral-900 hover:bg-neutral-100 hover:border-neutral-300 transition-all text-xs font-semibold cursor-pointer shadow-xs"
              title="Copy article link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>

          {/* Article Title & Subtitle */}
          <div className="mt-6 space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal text-neutral-900 tracking-tight leading-[1.15]">
              {item.title}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-4xl">
              {item.detailedContent.subtitle}
            </p>
          </div>

          {/* Author Credential Header Banner */}
          <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-brand-navy/10 shrink-0">
                {item.author.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900 leading-tight">
                  {item.author.name}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{item.author.role}</p>
                <p className="text-[10px] text-brand-orange font-bold uppercase tracking-wider mt-0.5">
                  Lambda CDMO Biologics Science & Technology
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 text-slate-600 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-brand-blue" />
              <span>Peer-Reviewed Technical Release</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN SCIENTIFIC BODY */}
      <main className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 md:py-16">
        <div className="w-full max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
          {/* LEFT / MAIN COLUMN: ARTICLE CONTENT */}
          <div className="lg:col-span-8 space-y-10">
            {/* Featured Hero Banner Image */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-neutral-200/90 shadow-md bg-neutral-100 group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs drop-shadow-md">
                <span className="font-medium bg-black/50 backdrop-blur-md px-3 py-1 rounded-md">
                  {item.badge}
                </span>
                <span className="font-light bg-black/50 backdrop-blur-md px-3 py-1 rounded-md">
                  Lambda Biologics Laboratory
                </span>
              </div>
            </div>

            {/* Executive Abstract Box */}
            <div className="p-7 sm:p-8 rounded-2xl bg-blue-50/70 border-l-4 border-brand-blue shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-blue" />
                Executive Abstract & Technical Scope
              </h3>
              <p className="text-base sm:text-[17px] text-slate-700 leading-relaxed font-normal">
                {item.detailedContent.abstract}
              </p>
            </div>

            {/* Key Quantitative Takeaways */}
            <div className="p-7 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-neutral-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                  Key Quantitative Takeaways
                </h3>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Data Highlights
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {item.keyTakeaways.map((takeaway, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-neutral-50/80 border border-neutral-200/60 flex items-start gap-3 text-xs sm:text-sm text-slate-700"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </div>
                    <span className="font-normal leading-snug">{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* In-depth Scientific Sections */}
            <div className="space-y-12">
              {item.detailedContent.sections.map((section, sIdx) => (
                <article key={sIdx} className="space-y-5 bg-white p-7 sm:p-10 rounded-2xl border border-neutral-200/80 shadow-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-1 bg-brand-orange rounded-full" />
                    <h2 className="text-2xl sm:text-3xl font-light md:font-normal text-neutral-900 tracking-tight leading-snug">
                      {section.heading}
                    </h2>
                  </div>

                  <div className="space-y-4 pt-2">
                    {section.body.map((p, pIdx) => (
                      <p key={pIdx} className="text-base sm:text-[17px] text-slate-700 font-normal leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Callout Box with Metric if present */}
                  {section.callout && (
                    <div className="my-6 p-6 rounded-xl bg-gradient-to-r from-brand-navy to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-sm">
                      <div>
                        <p className="text-xs uppercase font-bold tracking-wider text-brand-orange">
                          {section.callout.title}
                        </p>
                        <p className="text-sm sm:text-base text-neutral-200 mt-1 font-normal leading-relaxed">
                          {section.callout.text}
                        </p>
                      </div>
                      {section.callout.metric && (
                        <div className="shrink-0 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-2xl font-bold text-brand-orange tracking-tight text-center sm:text-right">
                          {section.callout.metric}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Scientific Data Table if present */}
                  {section.table && (
                    <div className="my-6 overflow-hidden rounded-xl border border-neutral-200 shadow-xs">
                      {section.table.caption && (
                        <div className="bg-neutral-100 px-5 py-3 text-xs font-bold text-neutral-800 border-b border-neutral-200 flex items-center justify-between">
                          <span>{section.table.caption}</span>
                          <span className="text-[10px] uppercase font-semibold text-slate-500">
                            Empirical Dataset
                          </span>
                        </div>
                      )}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                          <thead className="bg-neutral-50 text-neutral-900 uppercase font-semibold text-[11px] tracking-wider border-b border-neutral-200">
                            <tr>
                              {section.table.headers.map((h, hIdx) => (
                                <th key={hIdx} className="px-5 py-3.5">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-200">
                            {section.table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/60'}>
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`px-5 py-3.5 ${
                                      cIdx === 0 ? 'font-semibold text-neutral-900' : 'text-slate-600'
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* Validated Methodology & Instrumentation */}
            {item.detailedContent.methodologyHighlights &&
              item.detailedContent.methodologyHighlights.filter((m) => m && m.trim().length > 0).length > 0 && (
              <div className="p-7 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-brand-blue" />
                  Validated Methodology & Instrumentation Fleet
                </h3>
                <ul className="space-y-3 pt-2">
                  {item.detailedContent.methodologyHighlights
                    .filter((m) => m && m.trim().length > 0)
                    .map((method, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-brand-blue shrink-0 mt-2" />
                        <span className="leading-relaxed">{method}</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {/* Regulatory & Filing Significance */}
            {item.detailedContent.regulatoryImpact && item.detailedContent.regulatoryImpact.trim().length > 0 && (
              <div className="p-6 sm:p-7 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-amber-950 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-800" />
                  <h4 className="font-bold uppercase tracking-wider text-xs text-amber-900">
                    Regulatory & Global Filing Significance
                  </h4>
                </div>
                <p className="text-sm sm:text-base text-amber-900 font-normal leading-relaxed">
                  {item.detailedContent.regulatoryImpact}
                </p>
              </div>
            )}

            {/* Tags & Categorization */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider mr-2">
                <Tag className="w-3.5 h-3.5" />
                <span>Indexed Under:</span>
              </div>
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-neutral-100 text-slate-700 border border-neutral-200/70"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT / SIDEBAR COLUMN: AUTHOR BIO & PROGRAM INQUIRY */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Scientific Author Profile Card */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-neutral-100">
                <User className="w-4 h-4 text-brand-orange" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Lead Scientific Author
                </h3>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-lg shadow-md shrink-0">
                  {item.author.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div>
                  <h4 className="text-base font-semibold text-neutral-900">
                    {item.author.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.author.role}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Specializing in biologics process optimization, cell line stability, high-throughput characterization, and tech transfer at Lambda CDMO's Ahmedabad Center of Excellence.
              </p>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-medium text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 gap-2"
                >
                  <span>Connect with Dr. {item.author.name.split(' ').slice(-1)[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-orange" />
                </Link>
              </div>
            </div>

            {/* Quick Scientific Inquiry Box */}
            <div className="bg-gradient-to-br from-brand-navy to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-[11px] font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Confidential Scoping</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-light tracking-tight leading-snug">
                Have questions about your molecule's <span className="font-normal text-white">process or timeline?</span>
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                Our scientific leadership is available under NDA to discuss expression titers, analytical comparability protocols, or single-use manufacturing slots.
              </p>

              <div className="pt-2 space-y-3">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 gap-2"
                >
                  <span>Request Technical Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href="/virtual-tour/00%20MAIN%20BUILDING/index.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-white/30 text-white hover:bg-white hover:text-brand-navy font-semibold text-xs uppercase tracking-wider transition-all"
                >
                  Virtual Facility Tour
                </a>
              </div>
            </div>

            {/* Category Navigation Quick Links */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-100">
                Explore More Insights
              </h3>
              <div className="space-y-2">
                {INSIGHT_TABS.map((tab) => (
                  <Link
                    key={tab.id}
                    href={`/insights/${tab.slug}`}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all ${
                      tab.slug === item.category
                        ? 'bg-brand-orange/10 text-brand-orange font-semibold'
                        : 'text-slate-600 hover:bg-neutral-100 hover:text-black'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* 3. RELATED INSIGHTS SECTION */}
        {relatedItems.length > 0 && (
          <section className="w-full max-w-[1280px] mx-auto mt-20 pt-12 border-t border-neutral-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                  Continue Reading
                </span>
                <h2 className="text-2xl sm:text-3xl font-light md:font-normal text-neutral-900 tracking-tight mt-1">
                  More in {currentTab.label}
                </h2>
              </div>

              <Link
                href={`/insights/${item.category}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:text-brand-blue-hover transition-colors"
              >
                <span>View all {currentTab.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedItems.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/insights/${rel.category}/${rel.slug || rel.id}`}
                  className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-brand-blue/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/95 text-brand-navy shadow-sm">
                        {rel.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                        <span>{rel.date}</span>
                        <span>•</span>
                        <span>{rel.readTime}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-medium text-neutral-900 leading-snug group-hover:text-brand-blue transition-colors line-clamp-2">
                        {rel.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed line-clamp-2">
                        {rel.summary}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-brand-orange">
                        {rel.author.name}
                      </span>
                      <div className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue group-hover:translate-x-1 transition-transform">
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* 4. BOTTOM COMMON CTA BANNER */}
      <CommonCTA />
    </div>
  );
}
