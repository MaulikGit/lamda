'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Video } from 'lucide-react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import Reveal from '@/components/Reveal';

interface LocationData {
  key: 'amd' | 'lon';
  name: string;
  short: string;
  role: string;
  desc: string;
  cta: string;
  href: string;
  color: string;
  surfaceColor: string;
  coordinates: [number, number]; // [lng, lat]
  coordStr: string;
  caps: string[];
  tourHref?: string;
  photo: string;
}

const DEFAULT_LOCATIONS: Record<'amd' | 'lon', LocationData> = {
  amd: {
    key: 'amd',
    name: 'Ahmedabad, India',
    short: 'Ahmedabad',
    role: 'Primary Biomanufacturing Campus',
    desc: 'Integrated development with Process and Analytical Sciences, combined with cGMP manufacturing for both drug substance and drug product.',
    cta: 'Explore Ahmedabad Facility',
    href: '/facility&location/India',
    color: '#00A3E8',
    surfaceColor: '#EEF9FE',
    coordinates: [72.5714, 23.0225],
    coordStr: '23.02° N, 72.57° E',
    caps: [
      'Process Sciences',
      'Analytical Sciences',
      'cGMP Drug Substance',
      'cGMP Drug Product'
    ],
    tourHref: 'https://lmada-cdmo.onrender.com/virtual-tour/00%20MAIN%20BUILDING/index.htm',
    photo: '/images/ahmedabadsite.jpg'
  },
  lon: {
    key: 'lon',
    name: 'London, UK',
    short: 'London',
    role: 'European Innovation Centre',
    desc: 'Biologics development capabilities supporting drug substance process & analytical development and process characterisation studies.',
    cta: 'Explore London Centre',
    href: '/facility&location/UK',
    color: '#F6914B',
    surfaceColor: '#FFF5EE',
    coordinates: [-0.1276, 51.5072],
    coordStr: '51.51° N, 0.13° W',
    caps: [
      'Drug Substance Process Development',
      'Analytical Development',
      'Process Characterisation'
    ],
    photo: '/images/uk/uksite.png'
  }
};

const VIEWS: Record<'amd' | 'lon', { rot: [number, number, number]; scale: number }> = {
  amd: {
    rot: [-DEFAULT_LOCATIONS.amd.coordinates[0] - 6, -DEFAULT_LOCATIONS.amd.coordinates[1] + 4, 0],
    scale: 260
  },
  lon: {
    rot: [-DEFAULT_LOCATIONS.lon.coordinates[0] - 4, -DEFAULT_LOCATIONS.lon.coordinates[1] + 6, 0],
    scale: 260
  }
};

interface CDMOLocationsMapSectionProps {
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string | null;
  cards?: {
    title?: string;
    description?: string;
    badge?: string;
    buttonText?: string;
    link?: string;
    href?: string;
  }[];
}

export default function CDMOLocationsMapSection({
  id = 'our-cdmo-locations',
  className = '',
  title = 'Global CDMO Capabilities Across India and Europe',
  subtitle = 'Bespoke Biologics Infrastructure',
  cards = []
}: CDMOLocationsMapSectionProps = {}) {
  const [activeKey, setActiveKey] = useState<'amd' | 'lon'>('amd');
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const spinFnRef = useRef<((to: [number, number, number], scale: number) => void) | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Merge any dynamic custom cards if provided
  const locations: Record<'amd' | 'lon', LocationData> = {
    amd: {
      ...DEFAULT_LOCATIONS.amd,
      name: cards?.[0]?.title || DEFAULT_LOCATIONS.amd.name,
      role: cards?.[0]?.badge || DEFAULT_LOCATIONS.amd.role,
      desc: cards?.[0]?.description || DEFAULT_LOCATIONS.amd.desc,
      cta: cards?.[0]?.buttonText || DEFAULT_LOCATIONS.amd.cta,
      href: cards?.[0]?.href || cards?.[0]?.link || DEFAULT_LOCATIONS.amd.href
    },
    lon: {
      ...DEFAULT_LOCATIONS.lon,
      name: cards?.[1]?.title || DEFAULT_LOCATIONS.lon.name,
      role: cards?.[1]?.badge || DEFAULT_LOCATIONS.lon.role,
      desc: cards?.[1]?.description || DEFAULT_LOCATIONS.lon.desc,
      cta: cards?.[1]?.buttonText || DEFAULT_LOCATIONS.lon.cta,
      href: cards?.[1]?.href || cards?.[1]?.link || DEFAULT_LOCATIONS.lon.href
    }
  };

  const activeLoc = locations[activeKey];

  // Helper function to switch location and animate globe
  const handleSelectLocation = useCallback(
    (key: 'amd' | 'lon') => {
      setActiveKey(key);
      setProgressKey((prev) => prev + 1);
      if (spinFnRef.current) {
        spinFnRef.current(VIEWS[key].rot, VIEWS[key].scale);
      }
    },
    []
  );

  // Auto-advance every 7s unless paused
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const nextKey = activeKey === 'amd' ? 'lon' : 'amd';
      handleSelectLocation(nextKey);
    }, 7000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeKey, isPaused, handleSelectLocation]);

  // Initialize D3 3D Globe with Orthographic projection
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    let isMounted = true;
    let animTimer: d3.Timer | null = null;

    function rw(g: any) {
      const f = g.type === 'Feature' ? g.geometry : g;
      const rev = (p: any[]) => p.map((r: any) => r.slice().reverse());
      if (f.type === 'Polygon') {
        if (d3.geoArea(f) > 2 * Math.PI) f.coordinates = rev(f.coordinates);
      } else if (f.type === 'MultiPolygon') {
        f.coordinates = f.coordinates.map((p: any) =>
          d3.geoArea({ type: 'Polygon', coordinates: p }) > 2 * Math.PI ? rev(p) : p
        );
      }
      return g;
    }

    Promise.all([
      fetch('/data/countries-110m.json').then((r) => r.json()),
      fetch('/data/india.json').then((r) => r.json())
    ])
      .then(([t, it]) => {
        if (!isMounted || !svgRef.current) return;

        const w = topojson.feature(t, t.objects.countries as any) as any;
        const st = topojson.feature(it, it.objects.states as any) as any;
        st.features.forEach(rw);

        const inOutline = rw(topojson.merge(it, it.objects.states.geometries as any));
        const inMesh = topojson.mesh(it, it.objects.states as any, (a: any, b: any) => a !== b);

        const fc = {
          type: 'FeatureCollection',
          features: w.features
            .filter((f: any) => f.id !== '356')
            .concat([{ type: 'Feature', id: '356', properties: {}, geometry: inOutline }])
        };

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const defs = svg.append('defs');

        // Radial sea gradient
        const rg = defs
          .append('radialGradient')
          .attr('id', 'bSea')
          .attr('cx', '38%')
          .attr('cy', '32%');
        rg.append('stop').attr('offset', '0%').attr('stop-color', '#FFFFFF');
        rg.append('stop').attr('offset', '100%').attr('stop-color', '#E3EEF8');

        // Sphere drop shadow filter for realistic 3D appearance
        const filter = defs
          .append('filter')
          .attr('id', 'globeShadow')
          .attr('x', '-20%')
          .attr('y', '-20%')
          .attr('width', '140%')
          .attr('height', '140%');
        filter
          .append('feDropShadow')
          .attr('dx', '0')
          .attr('dy', '18')
          .attr('stdDeviation', '24')
          .attr('flood-color', '#0f2231')
          .attr('flood-opacity', '0.08');

        const R = 260;
        let rot: [number, number, number] = [...VIEWS[activeKey].rot];
        const proj = d3
          .geoOrthographic()
          .scale(R)
          .translate([280, 280])
          .clipAngle(90)
          .precision(0.4);
        proj.rotate(rot);

        const path = d3.geoPath(proj);

        // Background ocean sphere
        svg
          .append('circle')
          .attr('cx', 280)
          .attr('cy', 280)
          .attr('r', 260)
          .attr('fill', 'url(#bSea)')
          .attr('stroke', '#D9E4F0')
          .attr('stroke-width', 0.8)
          .attr('filter', 'url(#globeShadow)');

        // Graticule lines
        const grat = svg
          .append('path')
          .datum(d3.geoGraticule10())
          .attr('fill', 'none')
          .attr('stroke', '#D9E4F0')
          .attr('stroke-width', 0.6);

        // Landmasses (all countries except India and UK colored neutral, UK colored orange)
        const land = svg
          .append('g')
          .selectAll('path')
          .data(fc.features.filter((f: any) => f.id !== '356'))
          .join('path')
          .attr('fill', (d: any) => (d.id === '826' ? DEFAULT_LOCATIONS.lon.color : '#B9CCE3'))
          .attr('stroke', '#ffffff')
          .attr('stroke-width', 0.5);

        // India outline (colored brand blue)
        const inF = svg.append('path').datum(inOutline).attr('fill', DEFAULT_LOCATIONS.amd.color);

        // India internal state borders
        const inM = svg
          .append('path')
          .datum(inMesh)
          .attr('fill', 'none')
          .attr('stroke', '#ffffff')
          .attr('stroke-width', 0.6)
          .attr('stroke-opacity', 0.9);

        // Site Pins
        const pins = Object.values(DEFAULT_LOCATIONS).map((s) => {
          const g = svg
            .append('g')
            .attr('class', `globe-pin pin-${s.key}`)
            .style('cursor', 'pointer');

          // Ripples
          g.append('circle').attr('r', 6).attr('fill', s.color).attr('class', 'ripple');
          g.append('circle').attr('r', 6).attr('fill', s.color).attr('class', 'ripple d2');

          // Outer ring & dot
          g.append('circle')
            .attr('r', 8)
            .attr('fill', '#ffffff')
            .attr('stroke', s.color)
            .attr('stroke-width', 2.5);
          g.append('circle').attr('r', 3.5).attr('fill', s.color);

          // Desktop Floating Label Pill
          const lbl = g
            .append('g')
            .attr('class', 'plabel')
            .attr('transform', 'translate(14, -13)');

          const pillWidth = s.short.length * 7.5 + 24;
          lbl
            .append('rect')
            .attr('rx', 8)
            .attr('height', 26)
            .attr('width', pillWidth)
            .attr('fill', '#ffffff')
            .attr('stroke', '#E6EAF0')
            .attr('stroke-width', 1)
            .attr('filter', 'drop-shadow(0 2px 6px rgba(0,0,0,0.06))');

          lbl
            .append('circle')
            .attr('cx', 10)
            .attr('cy', 13)
            .attr('r', 3.5)
            .attr('fill', s.color);

          lbl
            .append('text')
            .text(s.short)
            .attr('x', 19)
            .attr('y', 17)
            .attr('font-size', 12)
            .attr('font-weight', 600)
            .attr('fill', '#14181F');

          // Make pin clickable
          g.on('click', () => {
            handleSelectLocation(s.key);
          });

          return { s, g };
        });

        function draw() {
          proj.rotate(rot);
          grat.attr('d', path as any);
          land.attr('d', path as any);
          inF.attr('d', path as any);
          inM.attr('d', path as any);

          pins.forEach(({ s, g }) => {
            const vis = d3.geoDistance(s.coordinates, [-rot[0], -rot[1]]) < 1.45;
            const p = proj(s.coordinates);
            if (p) {
              g.attr('transform', `translate(${p[0]},${p[1]})`).attr('opacity', vis ? 1 : 0);
            }
          });
        }

        draw();

        function spin(to: [number, number, number], scale: number) {
          const i = d3.interpolate(rot, to);
          const si = d3.interpolate(proj.scale(), scale);
          if (animTimer) animTimer.stop();

          animTimer = d3.timer((elapsed) => {
            const t = Math.min(1, elapsed / 1600);
            const e = d3.easeCubicInOut(t);
            rot = i(e);
            proj.scale(si(e));
            draw();
            if (t === 1) {
              animTimer?.stop();
              animTimer = null;
            }
          });
        }

        spinFnRef.current = spin;
      })
      .catch((err) => {
        console.error('Failed to load globe TopoJSON:', err);
      });

    return () => {
      isMounted = false;
      if (animTimer) animTimer.stop();
    };
  }, [handleSelectLocation]);

  return (
    <section
      id={id}
      className={`relative px-4 sm:px-6 md:px-10 lg:px-16 py-16 md:py-24 bg-white overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#E9EDF3 1px, transparent 1px)',
          backgroundSize: '22px 22px'
        }}
      />

      <div className="relative w-full max-w-[1280px] mx-auto">
        {/* Header Section */}
        <Reveal>
          <header className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
            <h2 className="font-light text-3xl sm:text-4xl lg:text-[44px] leading-tight tracking-tight text-neutral-900 mb-3 text-balance">
              {title}
            </h2>
            {subtitle && (
              <p className="text-neutral-500 text-sm sm:text-base font-normal">
                {subtitle}
              </p>
            )}
          </header>
        </Reveal>

        {/* Main Showcase Layout: 2 Columns on Desktop, Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 items-center">
          {/* Left Column: 3D Interactive Globe */}
          <Reveal delay={0.1}>
            <div className="relative flex justify-center items-center w-full max-w-[560px] mx-auto aspect-square">
              <svg
                ref={svgRef}
                viewBox="0 0 560 560"
                className="w-full h-auto aspect-square overflow-visible select-none"
              />
            </div>
          </Reveal>

          {/* Right Column: Facility Tabs & Information Card */}
          <Reveal delay={0.2}>
            <div className="w-full max-w-[560px] mx-auto lg:mx-0">
              {/* Segmented Facility Tabs */}
              <div className="flex gap-1 p-1 bg-[#F3F5F8] rounded-xl w-full sm:w-max mb-6 md:mb-7">
                {(['amd', 'lon'] as const).map((key) => {
                  const loc = locations[key];
                  const isOn = activeKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleSelectLocation(key)}
                      className={`relative flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200 cursor-pointer overflow-hidden ${
                        isOn
                          ? 'bg-white text-[#14181F] shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
                          : 'text-[#5B6472] hover:text-[#14181F]'
                      }`}
                      style={{ '--tab-color': loc.color } as React.CSSProperties}
                    >
                      <span className="relative z-10">{loc.name}</span>
                      {isOn && (
                        <span
                          key={`prog-${progressKey}`}
                          className="absolute left-2.5 right-2.5 bottom-1 h-[2px] rounded-full pointer-events-none tab-indicator-progress"
                          style={{ backgroundColor: loc.color }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Facility Details Panel with Animated Slide/Fade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeKey}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                  className="space-y-4"
                >
                  {/* Eyebrow with MapPin */}
                  <div
                    className="flex items-center gap-1.5 text-xs font-semibold tracking-wide"
                    style={{ color: activeLoc.color }}
                  >
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{activeLoc.role}</span>
                  </div>

                  {/* Title & Coordinates */}
                  <div>
                    <h3 className="text-3xl sm:text-[38px] font-light tracking-tight text-neutral-900 leading-tight">
                      {activeLoc.name}
                    </h3>
                    <p className="font-mono text-xs text-neutral-400 mt-1">
                      {activeLoc.coordStr}
                    </p>
                  </div>

                  {/* Facility Real Photo Slot */}
                  <div className="relative w-full h-[190px] sm:h-[220px] rounded-[14px] overflow-hidden border border-[#C9D2DE]/70 shadow-xs">
                    <Image
                      src={activeLoc.photo}
                      alt={`${activeLoc.name} Biologics Facility`}
                      fill
                      className="object-cover object-center transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 600px"
                      priority
                    />
                  </div>

                  {/* Facility Narrative Description */}
                  <p className="text-[14.5px] sm:text-[15px] text-[#5B6472] leading-relaxed max-w-[540px]">
                    {activeLoc.desc}
                  </p>

                  {/* Core Capabilities Pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 pb-2">
                    {activeLoc.caps.map((cap, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border border-[#E6EAF0] bg-white text-[13px] sm:text-[13.5px] font-medium text-[#14181F] shadow-xs"
                      >
                        <span
                          className="w-2 h-2 rounded-[2px] shrink-0"
                          style={{ backgroundColor: activeLoc.color }}
                        />
                        <span className="truncate">{cap}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTAs Row */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <Link
                      href={activeLoc.href}
                      className="inline-flex items-center justify-center gap-2 h-[42px] sm:h-[38px] px-5 rounded-lg text-[13px] font-semibold text-white transition-all shadow-xs hover:-translate-y-0.5 w-full sm:w-auto"
                      style={{ backgroundColor: activeLoc.color }}
                    >
                      <span>{activeLoc.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {activeLoc.tourHref && (
                      <a
                        href={activeLoc.tourHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 h-[42px] sm:h-[38px] px-4 rounded-lg text-[13px] font-semibold text-[#14181F] border border-[#E6EAF0] bg-white hover:border-[#14181F] transition-all shadow-xs hover:-translate-y-0.5 w-full sm:w-auto"
                      >
                        <Video className="w-4 h-4 text-neutral-600" />
                        <span>Virtual Tour</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Ripple Animation and Responsive Styles */}
      <style jsx global>{`
        @keyframes rip {
          0% {
            transform: scale(1);
            opacity: 0.55;
          }
          100% {
            transform: scale(5);
            opacity: 0;
          }
        }
        .ripple {
          transform-box: fill-box;
          transform-origin: center;
          animation: rip 2.6s ease-out infinite;
        }
        .ripple.d2 {
          animation-delay: 1.3s;
        }

        @keyframes tabProgress {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
        .tab-indicator-progress {
          transform-origin: left;
          animation: tabProgress 7s linear forwards;
        }

        /* Hide floating pin labels on mobile to keep globe pristine */
        @media (max-width: 768px) {
          .globe-pin .plabel {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
