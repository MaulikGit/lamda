'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

interface HeroSectionProps {
    heading?: string;
    subtitle?: string;
    description?: string;
    videoSrc?: string;
    primaryCta?: { text: string; link: string };
    secondaryCta?: { text: string; link: string };
}

export function HeroSection({
    heading = 'Biologics Development and Manufacturing.',
    subtitle = 'Integrated from Cell Line Engineering to Clinical Supplies.',
    description = 'Supporting biopharmaceutical companies with integrated biologics development, from Gene to GMP – cell line engineering, process development of Drug substance and Drug product, analytical characterization, GMP manufacturing, and clinical supply capabilities to accelerate the journey from molecule to market.',
    videoSrc = '/videos/newhero.mp4',
    primaryCta = { text: 'Get in touch', link: '/contact' },
    secondaryCta = { text: 'Explore Services', link: '/services/cell-line' }
}: HeroSectionProps = {}) {
    return (
        <section className="relative w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4 min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-80px)] flex flex-col justify-center">
            <div className="relative w-full max-w-[1700px] mx-auto rounded-[10px] overflow-hidden border border-neutral-200 shadow-sm min-h-[calc(100vh-96px)] lg:min-h-[calc(100vh-120px)] flex items-center bg-brand-navy">
                {/* Background Video confined within container */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <video
                        key={videoSrc || '/videos/newhero.mp4'}
                        src={videoSrc || '/videos/newhero.mp4'}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover object-[75%_center] sm:object-[65%_center] md:object-center"
                    />
                    {/* Left-side blurry overlay: gradual decrease to half width (50%) */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 22%, rgba(0,0,0,0.4) 38%, rgba(0,0,0,0) 50%)',
                            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 22%, rgba(0,0,0,0.4) 38%, rgba(0,0,0,0) 50%)',
                        }}
                    />
                    {/* Left-side dark gradient scrim: gradual decrease to half width (50%) */}
                    <div
                        className="absolute inset-0 pointer-events-none hidden md:block"
                        style={{
                            background: 'linear-gradient(to right, rgba(15, 34, 49, 0.95) 0%, rgba(15, 34, 49, 0.85) 22%, rgba(15, 34, 49, 0.5) 36%, rgba(15, 34, 49, 0.15) 45%, rgba(15, 34, 49, 0) 50%)',
                        }}
                    />
                    {/* Mobile fallback scrim for small screens */}
                    <div
                        className="absolute inset-0 pointer-events-none md:hidden bg-gradient-to-r from-brand-navy/95 via-brand-navy/85 to-brand-navy/35"
                    />
                </div>

                <div className="relative z-10 w-full px-8 sm:px-12 md:px-16 lg:px-20 py-16 md:py-24 lg:py-28 flex items-center">
                    {/* Left: Text */}
                    <div className="text-left max-w-2xl">
                        <h1 className="text-[34px] sm:text-[46px] lg:text-[58px] font-normal tracking-tight text-white leading-[1.12] drop-shadow-sm">
                            {heading}
                            {subtitle && (
                                <span className="block text-white/95 text-2xl sm:text-3xl lg:text-4xl font-light mt-5 sm:mt-6">
                                    {subtitle}
                                </span>
                            )}
                        </h1>

                        <p className="text-[15px] sm:text-[17px] text-neutral-100 font-normal mt-8 sm:mt-10 max-w-xl leading-relaxed drop-shadow-sm">
                            {description}
                        </p>

                        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-start gap-4">
                            <Button
                                asChild
                                size="lg"
                                className="h-12 rounded-[10px] pl-6 pr-4 text-sm font-semibold uppercase tracking-wider bg-brand-yellow hover:bg-brand-yellow-hover text-black shadow-md hover:shadow-lg transition-all cursor-pointer">
                                <Link href={primaryCta?.link || '/contact'}>
                                    <span className="text-nowrap">{primaryCta?.text || 'Get in touch'}</span>
                                    <ChevronRight className="ml-1 w-4 h-4" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="h-12 rounded-[10px] px-6 text-sm font-semibold uppercase tracking-wider border-white/80 text-white bg-white/10 backdrop-blur-md hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all cursor-pointer">
                                <Link href={secondaryCta?.link || '/services/cell-line'}>
                                    <span className="text-nowrap">{secondaryCta?.text || 'Explore Services'}</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
