'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const UK_FACILITY_IMAGES = [
  {
    src: '/images/uk/Screenshot%202026-09-26%20173413.png',
    alt: 'London Biologics Development Suite',
  },
  {
    src: '/images/uk/Screenshot%202026-09-26%20173649.png',
    alt: 'London Innovation Centre Laboratory Equipment',
  },
  {
    src: '/images/uk/Screenshot%202026-09-26%20173425.png',
    alt: 'London Upstream Process Development',
  },
  {
    src: '/images/uk/Screenshot%202026-09-26%20173433.png',
    alt: 'London Downstream Purification Skids',
  },
  {
    src: '/images/uk/Screenshot%202026-09-26%20173453.png',
    alt: 'London Analytical Characterization Instruments',
  },
  {
    src: '/images/uk/Screenshot%202026-09-26%20173506.png',
    alt: 'London Mass Spectrometry and HPLC Systems',
  },
  {
    src: '/images/uk/Screenshot%202026-09-26%20173524.png',
    alt: 'London Bioprocess Testing & Bioassays',
  },
  {
    src: '/images/uk/Screenshot%202026-09-26%20173552.png',
    alt: 'London Automated Liquid Handling & Chromatography',
  },
  {
    src: '/images/uk/Screenshot%202026-09-26%20173605.png',
    alt: 'London Bioreactors & Process Optimization',
  },
  {
    src: '/images/uk/Screenshot%202026-09-26%20173622.png',
    alt: 'London Physicochemical Characterization Lab',
  },
];

interface LondonHeroCarouselProps {
  images?: string[];
}

export default function LondonHeroCarousel({ images }: LondonHeroCarouselProps) {
  const imageList = (images && images.length > 0)
    ? images.map((img, idx) => ({
        src: img,
        alt: `London UK Biologics Facility Slide ${idx + 1}`,
      }))
    : UK_FACILITY_IMAGES;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % imageList.length);
  }, [imageList.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  }, [imageList.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const currentImage = imageList[currentIndex] || imageList[0];

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] border border-neutral-200 shadow-lg bg-neutral-900 group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Lambda CDMO London UK Facility Gallery Carousel"
    >
      {/* Animated Image Slide */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="w-full h-full object-cover"
          />
          {/* Bottom Vignette for Overlay Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 pointer-events-none z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-brand-navy shadow-md backdrop-blur-xs flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95 focus:outline-hidden"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-brand-navy shadow-md backdrop-blur-xs flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95 focus:outline-hidden"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Indicators & Slide Index */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <div className="flex items-center gap-1.5 pointer-events-auto bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
          {imageList.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === idx
                  ? 'w-5 h-1.5 bg-brand-yellow'
                  : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium border border-white/10">
          {currentIndex + 1} / {imageList.length}
        </div>
      </div>
    </div>
  );
}
