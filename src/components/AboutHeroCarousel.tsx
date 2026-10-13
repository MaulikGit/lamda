'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CAROUSEL_IMAGES = [
  {
    src: '/images/innerstucture.jpg',
    alt: 'Lambda CDMO High-Tech Facility Inner Structure',
    title: 'Facility Infrastructure & Architecture',
  },
  {
    src: '/images/Screenshot%202026-09-11%20132518.png',
    alt: 'Lambda CDMO Advanced Cleanroom Suites',
    title: 'cGMP Cleanroom Bioprocess Suites',
  },
  {
    src: '/images/Screenshot%202026-09-11%20131810.png',
    alt: 'Lambda CDMO Biologics Laboratory Operations',
    title: 'Biologics Development Laboratories',
  },
  {
    src: '/images/Screenshot%202026-09-11%20131847.png',
    alt: 'Lambda CDMO Scientific Instrumentation & Analytics',
    title: 'Advanced Analytical & Quality Control',
  },
];

interface CarouselItem {
  src: string;
  alt?: string;
  title?: string;
}

interface AboutHeroCarouselProps {
  images?: (string | CarouselItem)[];
}

export default function AboutHeroCarousel({ images }: AboutHeroCarouselProps) {
  const activeImages: CarouselItem[] =
    images && images.length > 0
      ? images.map((img, idx) =>
          typeof img === 'string'
            ? { src: img, alt: `Facility Image ${idx + 1}`, title: `Facility View ${idx + 1}` }
            : { src: img.src, alt: img.alt || `Facility Image ${idx + 1}`, title: img.title }
        )
      : CAROUSEL_IMAGES;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % activeImages.length);
  }, [activeImages.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);
  }, [activeImages.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-advance every 5 seconds (5000ms)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const currentImage = activeImages[currentIndex] || activeImages[0];

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] border border-neutral-200 shadow-lg bg-neutral-900 group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="About Lambda CDMO Image Carousel"
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
            src={encodeURI(currentImage.src)}
            alt={currentImage.alt}
            className="w-full h-full object-cover"
          />
          {/* Subtle bottom vignette gradient for readable controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Left Navigation Arrow */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-neutral-800 backdrop-blur-md shadow-md hover:shadow-lg border border-white/40 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer opacity-90 hover:opacity-100"
      >
        <ChevronLeft className="w-5 h-5 -translate-x-0.5" />
      </button>

      {/* Right Navigation Arrow */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next image"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-neutral-800 backdrop-blur-md shadow-md hover:shadow-lg border border-white/40 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer opacity-90 hover:opacity-100"
      >
        <ChevronRight className="w-5 h-5 translate-x-0.5" />
      </button>

      {/* Top Floating Slide Counter Badge */}
      <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wider">
        {currentIndex + 1} / {activeImages.length}
      </div>

      {/* Bottom Floating Navigation Dots */}
      <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15">
        {activeImages.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              currentIndex === idx
                ? 'w-6 h-2 bg-[#f58634]'
                : 'w-2 h-2 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
