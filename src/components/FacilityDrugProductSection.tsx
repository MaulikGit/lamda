'use client';

import React from 'react';
import { 
  FlaskConical, 
  Snowflake, 
  Factory, 
  Activity, 
  Sparkles, 
  Cpu, 
  Scale, 
  Layers, 
  ShieldCheck, 
  Droplets, 
  Eye
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import EquipmentCarousel from '@/components/EquipmentCarousel';
import { DRUG_PRODUCT_EQUIPMENT } from '@/data/equipmentData';

interface FacilityDrugProductSectionProps {
  section?: {
    title: string;
    text: string;
    image?: string;
    formulationBullets?: string[];
    lyophilizationBullets?: string[];
    gmpManufacturingBullets?: string[];
  } | null;
}

export default function FacilityDrugProductSection({ section }: FacilityDrugProductSectionProps) {
  const formulationItems = [
    { name: 'Stability Incubation Chambers', icon: Activity },
    { name: 'Photostability Chambers', icon: Sparkles },
    { name: 'Filling Operations using Flexicon Pumps', icon: Cpu },
    { name: 'Thermal Characterization', icon: Scale },
    { name: 'Higher Order Structure (HOS) & Particle Size Distribution Analysis', icon: Layers },
    { name: 'Container Closure Integrity Testing', icon: ShieldCheck },
    { name: 'Residual Moisture Testing', icon: Droplets },
  ];

  const lyophilizationItems = [
    { 
      name: (
        <span>
          Development Lyophilizer <strong className="text-neutral-900 font-semibold">with 0.5 m² shelf area, Pirani sensors, and controlled nucleation</strong> to support optimization of drying cycles for lyophilized products.
        </span>
      ), 
      icon: Snowflake 
    },
  ];

  const gmpManufacturingItems = [
    { name: 'Formulation Suite for Formulation and Sterile Filtration', icon: FlaskConical },
    { name: 'Isolator-Based Filling Line for RTU Vials, PFS, and Cartridges (~10,000 units per batch)', icon: ShieldCheck },
    { name: 'Visual Inspection Suite and secondary packaging suite', icon: Eye },
  ];

  return (
    <section className="relative px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-gradient-to-b from-white via-slate-50/60 to-white border-b border-neutral-200/80 overflow-hidden">
      {/* Background Tech Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#00aeef_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.07] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-[1700px] mx-auto">
        {/* Section Header */}
        <Reveal>
          <div className="max-w-4xl mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-brand-navy leading-[1.15] mb-4">
              Drug Product Development &amp; Manufacturing
            </h2>
            <div className="space-y-2.5 text-[15px] sm:text-[16px] md:text-[17px] text-slate-700 leading-relaxed font-normal">
              <p>
                The drug product platform supports <strong className="text-neutral-900 font-semibold">formulation, process development, lyophilization, and clinical GMP manufacturing</strong>.
              </p>
              <p>
                <strong className="text-neutral-900 font-semibold">Drug Development:</strong> The drug product filling line is isolator based with robotic operations minimizing operator handling and ensuring a high degree of aseptic compliance. The line has a nominal ability to process 10,000 units per batch in vial, PFS or cartridge formats. The facility also has a visual inspection suite with manual inspection setup, and a suite for secondary packaging primarily for bulk packaging of filled units.
              </p>
            </div>
          </div>
        </Reveal>

        {/* 2-Column Grid: Left = Carousel of Drug Product & Formulation Equipment, Right = Capabilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Equipment Carousel */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <Reveal delay={0.1}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                    Formulation &amp; Drug Product Equipment
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">
                    {DRUG_PRODUCT_EQUIPMENT.length} Instruments
                  </span>
                </div>
                <EquipmentCarousel 
                  items={DRUG_PRODUCT_EQUIPMENT} 
                  sectionTitle="Drug Product & Formulation" 
                  aspectRatio="aspect-[4/3]"
                />
              </div>
            </Reveal>

            {/* Lyophilization Development Card */}
            <Reveal delay={0.18}>
              <div className="bg-white rounded-[10px] p-6 border border-neutral-200/90 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-[10px] bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center shrink-0 text-cyan-600 shadow-xs">
                    <Snowflake className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Lyophilization Development
                  </h3>
                </div>
                <div className="text-[14px] text-slate-700 leading-relaxed font-normal pt-1 border-t border-neutral-100">
                  {lyophilizationItems[0].name}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Formulation Development & Clinical GMP Manufacturing */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Card 1: Formulation Development */}
            <Reveal delay={0.14}>
              <div className="bg-white rounded-[10px] p-6 sm:p-7 border border-neutral-200/90 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-[10px] bg-brand-blue/10 border border-brand-blue/25 flex items-center justify-center shrink-0 text-brand-blue shadow-xs">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    Formulation Development
                  </h3>
                </div>

                <ul className="border-t border-neutral-100 pt-2 space-y-2.5">
                  {formulationItems.map((item, i) => {
                    const ItemIcon = item.icon;
                    return (
                      <li key={i} className="flex items-start gap-3 py-1 border-b border-neutral-100/70 last:border-0">
                        <div className="w-7 h-7 rounded-[7px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                          <ItemIcon className="w-3.5 h-3.5 text-brand-blue" />
                        </div>
                        <span className="text-[14px] text-slate-700 leading-snug font-normal">
                          {item.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

            {/* Card 2: Clinical GMP Manufacturing */}
            <Reveal delay={0.22}>
              <div className="bg-white rounded-[10px] p-6 sm:p-7 border border-neutral-200/90 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-[10px] bg-brand-orange/10 border border-brand-orange/25 flex items-center justify-center shrink-0 text-brand-orange shadow-xs">
                    <Factory className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    Clinical GMP Manufacturing
                  </h3>
                </div>

                <ul className="border-t border-neutral-100 pt-2 space-y-2.5">
                  {gmpManufacturingItems.map((item, i) => {
                    const ItemIcon = item.icon;
                    return (
                      <li key={i} className="flex items-start gap-3 py-1 border-b border-neutral-100/70 last:border-0">
                        <div className="w-7 h-7 rounded-[7px] bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0 mt-0.5">
                          <ItemIcon className="w-3.5 h-3.5 text-brand-orange" />
                        </div>
                        <span className="text-[14px] text-slate-700 leading-snug font-normal">
                          {item.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
