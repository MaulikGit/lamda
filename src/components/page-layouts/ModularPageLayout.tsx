'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import CommonCTA from '@/components/CommonCTA';
import FAQSection from '@/components/FAQSection';
import DynamicSectionRenderer from '@/components/DynamicSectionRenderer';
import AboutHeroCarousel from '@/components/AboutHeroCarousel';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';

interface ModularPageLayoutProps {
  page: CDMOPage;
  content: PageContent;
}

export default function ModularPageLayout({ page, content }: ModularPageLayoutProps) {
  const heroImage = page.image || '/images/hero_cleanroom.png';
  const sections = (page.sections && page.sections.length > 0) ? page.sections : (content?.sections || []);
  const isHeroVideo = page.heroVideo || (page.image && /\.(mp4|webm|ogg|mov)$/i.test(page.image));

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      {/* HERO SECTION */}
      <section className="relative bg-molecules-hero overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 border-b border-neutral-100">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        
        <div className="relative w-full max-w-[1700px] mx-auto pt-16 pb-14 md:pt-20 md:pb-18">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500 mb-8 flex-wrap">
            <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-neutral-500 capitalize">{page.category.replace('&', ' & ')}</span>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-brand-orange font-semibold">{page.title || page.slug}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              {page.badge && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-orange/15 text-brand-orange border border-brand-orange/30 mb-6 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{page.badge}</span>
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.08] mb-6">
                <span className="text-neutral-900">{page.heading?.split(' ')[0]}</span>
                {` ${page.heading?.split(' ').slice(1).join(' ')}`}
              </h1>

              {page.subtitle && (
                <h2 className="text-lg sm:text-xl font-medium text-brand-blue mb-4 leading-relaxed">
                  {page.subtitle}
                </h2>
              )}

              {page.description && (
                <div className="space-y-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mb-8">
                  {page.description.split('\n\n').map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-4 flex-wrap">
                <Link
                  href={page.heroPrimaryCtaLink || '/contact'}
                  className="px-8 py-4 rounded-[10px] bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-xl active:scale-95 flex items-center gap-2"
                >
                  <span>{page.heroPrimaryCtaText || 'Request Technical Discussion'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {page.heroSecondaryCtaText && (
                  <Link
                    href={page.heroSecondaryCtaLink || '/services'}
                    className="px-8 py-4 rounded-[10px] border border-neutral-300 hover:border-brand-blue hover:text-brand-blue text-neutral-700 text-sm font-semibold uppercase tracking-wider transition-all"
                  >
                    {page.heroSecondaryCtaText}
                  </Link>
                )}
              </div>

              {/* Quick Stats in Hero */}
              {page.stats && page.stats.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-neutral-200/80">
                  {page.stats.slice(0, 3).map((stat, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="text-2xl sm:text-3xl font-bold text-neutral-900">{stat.value}</div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Media */}
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                {page.images && page.images.length > 1 ? (
                  <AboutHeroCarousel images={page.images} />
                ) : isHeroVideo ? (
                  <div className="relative aspect-[4/3] rounded-[14px] overflow-hidden bg-slate-950 border border-slate-200 shadow-xl">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={page.heroVideo || page.image} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <div className="relative aspect-[4/3] rounded-[14px] overflow-hidden bg-slate-950 border border-slate-200 shadow-xl">
                    <img
                      src={heroImage}
                      alt={page.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC SECTIONS IN ORDER */}
      {sections && sections.length > 0 && (
        <div className="divide-y divide-neutral-100">
          {sections.map((section, idx) => (
            <DynamicSectionRenderer
              key={idx}
              section={section}
              index={idx}
              pageSlug={page.slug}
              category={page.category}
            />
          ))}
        </div>
      )}

      {/* SPECS TABLE (IF ATTACHED AT PAGE ROOT) */}
      {page.specs && page.specs.length > 0 && !sections.some(s => s.style === 'technical-specs' || (s.specs && s.specs.length > 0)) && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-slate-50 border-y border-neutral-200/80">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange mb-2 block">
                Technical Specifications
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-tight">
                Platform Parameters & Standards
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
                  {page.specs.map((spec, sIdx) => (
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
      )}

      {/* FAQS (IF ATTACHED AT PAGE ROOT) */}
      {page.faqs && page.faqs.length > 0 && (
        <FAQSection
          faqs={page.faqs}
          title={page.faqTitle || 'Frequently Asked Questions'}
          subtitle={page.faqSubtitle || 'Answers to key questions regarding our biologics development platform, regulatory alignment, and facility infrastructure.'}
          buttonText={page.faqButtonText}
          buttonLink={page.faqButtonLink}
        />
      )}

      {/* FOOTER CTA BANNER */}
      <CommonCTA />
    </div>
  );
}
