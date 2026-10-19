'use client';

import React from 'react';
import Reveal from '@/components/Reveal';

const ukEquipment = [
  {
    image: '/images/uk/xcell.png',
    alt: 'London Facility Equipment 1',
  },
  {
    image: '/images/uk/Screenshot%202026-09-26%20173413.png',
    alt: 'London Facility Equipment 2',
  },
  {
    image: '/images/uk/Screenshot%202026-09-26%20173425.png',
    alt: 'London Facility Equipment 3',
  },
  {
    image: '/images/uk/Screenshot%202026-09-26%20173433.png',
    alt: 'London Facility Equipment 4',
  },
  {
    image: '/images/uk/Screenshot%202026-09-26%20173453.png',
    alt: 'London Facility Equipment 5',
  },
  {
    image: '/images/uk/Screenshot%202026-09-26%20173506.png',
    alt: 'London Facility Equipment 6',
  },
  {
    image: '/images/uk/Screenshot%202026-09-26%20173524.png',
    alt: 'London Facility Equipment 7',
  },
  {
    image: '/images/uk/Screenshot%202026-09-26%20173552.png',
    alt: 'London Facility Equipment 8',
  },
  {
    image: '/images/uk/Screenshot%202026-09-26%20173605.png',
    alt: 'London Facility Equipment 9',
  },
  {
    image: '/images/uk/Screenshot%202026-09-26%20173622.png',
    alt: 'London Facility Equipment 10',
  },
];

/**
 * Expanding equipment gallery for London Innovation Centre —
 * renders clean image cards that expand on hover.
 */
export default function LondonFacilityGallery() {
  return (
    <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-neutral-50/50 border-b border-neutral-100">
      <div className="w-full max-w-[1700px] mx-auto">
        <Reveal>
          <div className="mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
              Inside the Facility
            </h2>
            <p className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed max-w-2xl mt-4">
              Purpose-built process development and analytical characterization equipment supporting programs in London, UK.
            </p>
          </div>
        </Reveal>

        {/* Row 1: First 5 images in expanding accordion strip */}
        <Reveal delay={0.1}>
          <div className="flex flex-col md:flex-row gap-3.5 md:h-[400px] mb-4">
            {ukEquipment.slice(0, 5).map((item, idx) => (
              <div
                key={idx}
                className="group relative h-64 md:h-full flex-1 md:hover:flex-[2.5] transition-all duration-500 ease-out rounded-[10px] overflow-hidden shadow-xs hover:shadow-2xl border border-neutral-200/80 bg-neutral-900 select-none"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </Reveal>

        {/* Row 2: Next 5 images in expanding accordion strip */}
        <Reveal delay={0.15}>
          <div className="flex flex-col md:flex-row gap-3.5 md:h-[400px]">
            {ukEquipment.slice(5, 10).map((item, idx) => (
              <div
                key={idx + 5}
                className="group relative h-64 md:h-full flex-1 md:hover:flex-[2.5] transition-all duration-500 ease-out rounded-[10px] overflow-hidden shadow-xs hover:shadow-2xl border border-neutral-200/80 bg-neutral-900 select-none"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
