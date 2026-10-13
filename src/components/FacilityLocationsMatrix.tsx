'use client';

import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle2,
  MapPin,
  Factory,
  Microscope
} from 'lucide-react';
import Reveal from '@/components/Reveal';

interface FacilityLocationsMatrixProps {
  id?: string;
  currentLocation?: 'ahmedabad' | 'india' | 'India' | 'london' | 'uk' | 'UK';
  className?: string;
  title?: string;
  subtitle?: string | null;
}

export default function FacilityLocationsMatrix({
  id = 'facility-locations-matrix',
  currentLocation,
  className = '',
  title = 'Biologics Development and Manufacturing Across India and Europe',
  subtitle = `Lambda CDMO operates across Ahmedabad, India, and London, UK, bringing together complementary capabilities in biologics development, analytical sciences, process development, and GMP manufacturing.

Our facilities support with a strong focus, different aspects of biologics development, with Ahmedabad providing an integrated development and GMP manufacturing platform and London providing specialized biologics development and analytical capabilities for drug substance process development and process characterisation.`,
}: FacilityLocationsMatrixProps) {
  const locations = [
    {
      id: 'India',
      name: 'Ahmedabad, India',
      headline: 'Ahmedabad Biomanufacturing Campus: Integrated Development & GMP Suites',
      categoryBadge: 'PRIMARY BIOMANUFACTURING CAMPUS',
      location: 'Gujarat, India',
      statHighlight: '27,000 sqft Campus',
      badge: 'India HQ',
      image: '/images/Lamdabuilding.jpg',
      href: '/facility&location/India',
      ctaText: 'Ahmedabad Facility',
      description:
        'Integrated development, comprehensive analytical characterization, and clinical GMP manufacturing platform under a unified quality framework.',
      primaryHighlight:
        '2x 200L single-use bioreactors with robotic isolator aseptic filling (10,000 units/batch in vials, PFS, cartridges).',
      tags: ['GMP Manufacturing', 'Robotic Isolator', 'US FDA / EMA Aligned'],
    },
    {
      id: 'UK',
      name: 'London, UK',
      headline: 'London Innovation Centre: Biologics Development & Intact Mass Spectrometry',
      categoryBadge: 'EUROPEAN INNOVATION CENTRE',
      location: 'London, United Kingdom',
      statHighlight: 'European Innovation Hub',
      badge: 'European Hub',
      image: '/images/development.jpg',
      href: '/facility&location/UK',
      ctaText: 'London Centre',
      description:
        'Biologics development capabilities that will support process and analytical development for drug substance followed by process characterisation studies.',
      primaryHighlight:
        'Advanced intact mass spectrometry (LC-MS), icIEF, and direct recipe transfer to Ahmedabad GMP suites.',
      tags: ['Process Development', 'LC-MS Analytics', 'Process Characterisation'],
    },
  ];

  return (
    <section id={id} className={`scroll-mt-20 lg:scroll-mt-24 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-molecules ${className}`}>
      <div className="w-full max-w-[1700px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14 max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
              {title}
            </h2>
            {subtitle && (
              <div className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed max-w-3xl mx-auto mt-4 space-y-3">
                {subtitle.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
          </Reveal>
        </div>

        {/* Dual Location Cards Grid matching Image 2, aligned with Nav */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full">
          {locations.map((loc, idx) => {
            const isSelected = currentLocation === loc.id;

            return (
              <Reveal key={loc.id} delay={idx * 0.1}>
                <Link
                  href={loc.href}
                  className={`group block relative bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-blue/40 transition-all duration-300 flex flex-col justify-between h-full ${
                    isSelected ? 'ring-2 ring-brand-blue/50' : ''
                  }`}
                >
                  {/* Orange accent line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-orange scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-20" />

                  {/* Top image matching Image 2 */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
                    <img
                      src={loc.image}
                      alt={loc.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/95 text-brand-navy shadow-md border border-white/40">
                        {loc.categoryBadge}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-black/60 text-white backdrop-blur-sm">
                        {loc.badge}
                      </span>
                    </div>
                  </div>

                  {/* Body matching Image 2 */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Meta Row with date/location & orange accent text */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {loc.location}
                        </span>
                        <span>•</span>
                        <span className="text-brand-orange font-semibold">{loc.statHighlight}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-light md:font-normal text-neutral-900 leading-snug group-hover:text-brand-blue transition-colors line-clamp-2">
                        {loc.headline}
                      </h3>

                      {/* Description */}
                      <p className="mt-3 text-sm text-slate-600 font-normal leading-relaxed">
                        {loc.description}
                      </p>

                      {/* Key Takeaway / Highlight Box with orange icon */}
                      <div className="mt-4 p-3.5 rounded-lg bg-neutral-50 border border-neutral-100 text-xs text-slate-700 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                        <span className="font-medium leading-relaxed">{loc.primaryHighlight}</span>
                      </div>
                    </div>

                    {/* Card Footer with tags and action link */}
                    <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {loc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 text-slate-600"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue group-hover:translate-x-1.5 transition-transform">
                        <span>{loc.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
