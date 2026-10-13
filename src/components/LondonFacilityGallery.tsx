'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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
 * renders clean image cards that expand on hover, with clean floating image popup on click.
 */
export default function LondonFacilityGallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const closeModal = useCallback(() => {
    setSelectedIdx(null);
  }, []);

  const nextImage = useCallback(() => {
    setSelectedIdx((prev) => (prev !== null ? (prev + 1) % ukEquipment.length : null));
  }, []);

  const prevImage = useCallback(() => {
    setSelectedIdx((prev) => (prev !== null ? (prev - 1 + ukEquipment.length) % ukEquipment.length : null));
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
                onClick={() => setSelectedIdx(idx)}
                className="group relative h-64 md:h-full flex-1 md:hover:flex-[2.5] transition-all duration-500 ease-out rounded-[10px] overflow-hidden cursor-pointer shadow-xs hover:shadow-2xl border border-neutral-200/80 bg-neutral-900 select-none"
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
                onClick={() => setSelectedIdx(idx + 5)}
                className="group relative h-64 md:h-full flex-1 md:hover:flex-[2.5] transition-all duration-500 ease-out rounded-[10px] overflow-hidden cursor-pointer shadow-xs hover:shadow-2xl border border-neutral-200/80 bg-neutral-900 select-none"
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
                src={ukEquipment[selectedIdx].image}
                alt={ukEquipment[selectedIdx].alt}
                className="max-h-[85vh] max-w-[88vw] w-auto h-auto object-contain rounded-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
