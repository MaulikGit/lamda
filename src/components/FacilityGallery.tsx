'use client';

import React from 'react';
import Reveal from '@/components/Reveal';

const equipment = [
  {
    name: 'ÄKTA Process (Cytiva)',
    image: '/images/Akta%20Process%20(Cytiva).jpeg',
  },
  {
    name: 'Batch Centrifuge',
    image: '/images/Batch_Centrifuge.jpeg',
  },
  {
    name: 'ChromXact Chromatography Column',
    image: '/images/ChromXact_Chromatography_Column.jpeg',
  },
  {
    name: 'Spray Dryer',
    image: '/images/Spray_Dryer.jpeg',
  },
  {
    name: '2×7 Litres Fermenters',
    image: '/images/2X7_Litres_Fermenters.jpeg',
  },
];

/**
 * Expanding equipment gallery for Ahmedabad Campus —
 * five vertical strips that expand on hover.
 */
export default function FacilityGallery() {
  return (
    <section className="px-6 py-12 md:py-20">
      <div className="w-full">
        <Reveal>
          <div className="mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
              Inside the Facility
            </h2>
            <p className="text-[15px] sm:text-[17px] text-neutral-600 leading-relaxed max-w-2xl mt-4">
              Purpose-built process and analytical equipment supporting development through GMP manufacturing.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col md:flex-row gap-4 md:h-[440px]">
            {equipment.map((item) => (
              <div
                key={item.name}
                className="group relative h-72 md:h-full flex-1 md:hover:flex-[2.75] transition-all duration-500 ease-out rounded-[10px] overflow-hidden shadow-sm hover:shadow-2xl bg-neutral-900 select-none"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/15 to-transparent" />

                {/* Label */}
                <span className="absolute bottom-4 left-4 right-4 text-white font-semibold text-sm md:text-base leading-snug drop-shadow-md">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
