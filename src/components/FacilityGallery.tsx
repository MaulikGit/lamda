'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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
 * five vertical strips that expand on hover, with clean floating image popup on click.
 */
export default function FacilityGallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const closeModal = useCallback(() => {
    setSelectedIdx(null);
  }, []);

  const nextImage = useCallback(() => {
    setSelectedIdx((prev) => (prev !== null ? (prev + 1) % equipment.length : null));
  }, []);

  const prevImage = useCallback(() => {
    setSelectedIdx((prev) => (prev !== null ? (prev - 1 + equipment.length) % equipment.length : null));
  }, []);

  // Keyboard controls & body scroll lock
  useEffect(() => {
    if (selectedIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIdx, closeModal, nextImage, prevImage]);

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
            {equipment.map((item, idx) => (
              <div
                key={item.name}
                onClick={() => setSelectedIdx(idx)}
                className="group relative h-72 md:h-full flex-1 md:hover:flex-[2.75] transition-all duration-500 ease-out rounded-[10px] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl bg-neutral-900 select-none"
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

      {/* Lightbox Modal Popup — Direct Floating Clean Image */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md cursor-zoom-out"
            onClick={closeModal}
          >
            {/* Floating Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 border border-white/20"
              aria-label="Close image popup"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Navigation Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/25 flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Right Navigation Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/25 flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Floating Image Container (No black box frame) */}
            <motion.div
              key={selectedIdx}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[90vh] max-w-[90vw] flex flex-col items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={equipment[selectedIdx].image}
                alt={equipment[selectedIdx].name}
                className="max-h-[84vh] max-w-[88vw] w-auto h-auto object-contain rounded-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10"
              />
              <div className="mt-3 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-xs sm:text-sm font-medium tracking-wide shadow-md">
                {equipment[selectedIdx].name}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
