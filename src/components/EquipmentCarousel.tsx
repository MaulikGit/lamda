'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X
} from 'lucide-react';
import type { EquipmentItem } from '@/data/equipmentData';

interface EquipmentCarouselProps {
  items: EquipmentItem[];
  sectionTitle?: string;
  autoPlayInterval?: number;
  className?: string;
  aspectRatio?: string;
}

export default function EquipmentCarousel({
  items,
  sectionTitle,
  autoPlayInterval = 4500,
  className = '',
  aspectRatio = 'aspect-[4/3]',
}: EquipmentCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextSlide = useCallback(() => {
    if (items.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    if (items.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused || items.length <= 1 || isLightboxOpen) return;
    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, autoPlayInterval, items.length, nextSlide, isLightboxOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape' && isLightboxOpen) setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isLightboxOpen]);

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <>
      <div
        className={`relative ${aspectRatio} w-full overflow-hidden rounded-[10px] border border-neutral-200/90 shadow-sm bg-neutral-900 group select-none ${className}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        role="region"
        aria-label={`${sectionTitle || 'Equipment'} Showcase Carousel`}
      >
        {/* Full Image Container - Edge to Edge Full Fit */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full cursor-pointer bg-neutral-900"
            onClick={() => setIsLightboxOpen(true)}
          >
            {/* Foreground Main Image: object-cover perfectly fits panel edge to edge */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={encodeURI(currentItem.src)}
              alt={currentItem.title || sectionTitle || 'Equipment'}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle Gradient Overlays for Navigation and Indicator Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none z-10" />
          </motion.div>
        </AnimatePresence>

        {/* Top-Right Floating Slide Counter & Fullscreen Zoom Button */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
          {/* Slide Counter */}
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wider shadow-sm">
            {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>

          {/* Fullscreen Expand Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            aria-label="View full resolution image"
            className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
            title="Expand image"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Left / Right Navigation Arrows */}
        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-neutral-800 backdrop-blur-md shadow-md hover:shadow-lg border border-white/40 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer opacity-90 hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5 -translate-x-0.5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-neutral-800 backdrop-blur-md shadow-md hover:shadow-lg border border-white/40 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer opacity-90 hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5 translate-x-0.5" />
            </button>
          </>
        )}

        {/* Bottom Floating Navigation Dots */}
        {items.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 h-2 bg-brand-blue shadow-xs'
                    : 'w-2 h-2 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full bg-neutral-950 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Top Bar */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/50">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-white/70 bg-white/10 px-3 py-1 rounded-full">
                    {currentIndex + 1} / {items.length}
                  </span>
                  {currentItem.title && (
                    <span className="text-sm font-medium text-white/90 truncate max-w-md hidden sm:inline">
                      {currentItem.title}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Close modal"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Image View */}
              <div className="relative flex-1 w-full min-h-[350px] sm:min-h-[500px] p-4 sm:p-8 flex items-center justify-center bg-black/40 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={encodeURI(currentItem.src)}
                  alt={currentItem.title || 'Equipment Preview'}
                  className="max-h-[70vh] max-w-full object-contain drop-shadow-2xl"
                />

                {/* Modal Arrows */}
                {items.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevSlide}
                      aria-label="Previous image"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-neutral-900 shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      <ChevronLeft className="w-6 h-6 -translate-x-0.5" />
                    </button>
                    <button
                      type="button"
                      onClick={nextSlide}
                      aria-label="Next image"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-neutral-900 shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      <ChevronRight className="w-6 h-6 translate-x-0.5" />
                    </button>
                  </>
                )}
              </div>

              {/* Lightbox Bottom Thumbnail Bar */}
              {items.length > 1 && (
                <div className="p-3 bg-black/60 border-t border-white/10 flex items-center gap-2 overflow-x-auto justify-center">
                  {items.map((thumb, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => goToSlide(idx)}
                      className={`relative w-16 h-12 rounded-lg border-2 overflow-hidden shrink-0 bg-neutral-900 transition-all cursor-pointer ${
                        currentIndex === idx
                          ? 'border-brand-blue ring-2 ring-brand-blue/40 scale-105 opacity-100'
                          : 'border-white/20 opacity-50 hover:opacity-90'
                      }`}
                      title={thumb.title}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={encodeURI(thumb.src)}
                        alt={thumb.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
