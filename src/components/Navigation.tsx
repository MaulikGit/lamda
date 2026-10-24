'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, Building2, Users, Factory, Layers, ShieldCheck, Briefcase, Settings, Search, Beaker, Package, Microscope, Scale, HeartPulse, Bug, Target, GitMerge, Syringe, Dna, BookOpen, FileText, FileDown, Newspaper, Calendar, Compass, HelpCircle, MapPin, LucideIcon, ArrowRight, Check, Globe } from 'lucide-react';
import MobileMenu from './MobileMenu';
import NavSearchBar from './NavSearchBar';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href?: string;
  isExternal?: boolean;
  headline?: string;
  description?: string;
  columns?: { 
    title: string; 
    href?: string;
    links: { label: string; href: string; icon: LucideIcon; isExternal?: boolean; sublabel?: string }[] 
  }[];
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<'ahmedabad' | 'london'>('ahmedabad');
  const pathname = usePathname();

  const navigationItems: NavItem[] = [
    {
      label: 'Overview',
      headline: 'Biologics Development and Manufacturing. From Gene to Clinic.',
      description: 'Supporting biopharmaceutical companies with integrated biologics development, from Gene to GMP – cell line engineering, process development of Drug substance and Drug product, analytical characterization, GMP manufacturing, and clinical supply capabilities to accelerate the journey from molecule to market.',
      columns: [
        {
          title: 'Company',
          links: [
            { label: 'About Lambda CDMO', href: '/overview/about', icon: Building2 },
            { label: 'Leadership Team', href: '/overview/leadership', icon: Users },
          ],
        },
        {
          title: 'Commitment',
          links: [
            { label: 'Integrated development to manufacturing', href: '/overview/integrated', icon: Layers },
            { label: 'Quality and Compliance', href: '/overview/quality', icon: ShieldCheck },
            { label: 'Careers', href: '/overview/careers', icon: Briefcase },
          ],
        },
      ],
    },
    {
      label: 'Services',
      description: 'From cell line engineering to GMP manufacturing and QC testing.',
      columns: [
        {
          title: 'Development Services',
          href: '/services',
          links: [
            { label: 'Cell Line Development', href: '/services/cell-line', icon: Dna },
            { label: 'Process Development', href: '/services/process', icon: Settings },
            { label: 'Analytical Development', href: '/services/analytical', icon: Search },
          ],
        },
        {
          title: 'Manufacturing Services',
          href: '/manufacturing',
          links: [
            { label: 'Drug Substance Manufacturing', href: '/manufacturing/drug-substance', icon: Beaker },
            { label: 'Drug Product Manufacturing', href: '/manufacturing/drug-product', icon: Package },
          ],
        },
        {
          title: 'Analytical Characterization and Testing',
          href: '/characterization',
          links: [
            { label: 'Analytical Testing', href: '/characterization/analytical-testing', icon: Microscope },
            { label: 'Physicochemical Characterization', href: '/characterization/physicochemical', icon: Scale },
            { label: 'Bioassays & Immunogenicity Testing', href: '/characterization/bioassays', icon: HeartPulse },
            { label: 'Microbiological Testing', href: '/characterization/microbiological', icon: Bug },
          ],
        },
      ],
    },
    {
      label: 'Facility & Locations',
      headline: 'Biologics Development and Manufacturing Across India and Europe',
      description: 'Lambda CDMO operates across Ahmedabad, India, and London, UK, bringing together complementary capabilities in biologics development, analytical sciences, process development, and GMP manufacturing.',
      columns: [
        {
          title: 'CDMO Locations',
          href: '/facility&location',
          links: [
            { label: 'Ahmedabad, India', href: '/facility&location/India', icon: Factory, sublabel: 'Integrated Biomanufacturing Campus' },
            { label: 'London, UK', href: '/facility&location/UK', icon: Building2, sublabel: 'European Innovation Centre' },
          ],
        },
      ],
    },
    {
      label: 'Modalities',
      headline: 'Platform Capabilities for Next-Generation Biologics',
      description: 'Lambda CDMO brings together integrated development, analytical, and manufacturing capabilities to support diverse biologic modalities from early development through clinical supply.',
      columns: [
        {
          title: 'Molecule Types',
          links: [
            { label: 'Monoclonal Antibodies', href: '/modalities/mabs', icon: Target },
            { label: 'Bispecific Antibodies', href: '/modalities/bispecifics', icon: GitMerge },
          ],
        },
        {
          title: 'Advanced Therapeutics',
          links: [
            { label: 'Antibody-Drug Conjugates (ADCs)', href: '/modalities/adcs', icon: Syringe },
            { label: 'Proteins & Peptides', href: '/modalities/proteins-peptides', icon: Dna },
          ],
        },
      ],
    },
    {
      label: 'Insights',
      description: 'Publications, case studies, news, and FAQs.',
      columns: [
        {
          title: 'Knowledge',
          links: [
            { label: 'Blogs & Articles', href: '/insights/blogs', icon: BookOpen },
            { label: 'Case Studies', href: '/insights/case-studies', icon: FileText },
            { label: 'Brochures', href: '/insights/brochures', icon: FileDown },
          ],
        },
        {
          title: 'Media & Support',
          links: [
            { label: 'News & Press', href: '/insights/news', icon: Newspaper },
            { label: 'Events & Webinars', href: '/insights/events', icon: Calendar },
            { label: 'FAQs', href: '/insights/faqs', icon: HelpCircle },
          ],
        },
      ],
    },
  ];

  const isActive = (item: NavItem) => {
    if (item.href) return pathname === item.href;
    return item.columns?.some((col) => 
      (col.href && pathname === col.href) || 
      col.links.some((link) => pathname === link.href)
    );
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white border-b border-neutral-200 select-none px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="w-full max-w-[1700px] mx-auto h-16 lg:h-20 flex items-center justify-between">

          <Link
            href="/"
            className="flex items-center shrink-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0 border-none ring-0 select-none cursor-pointer"
          >
            <Image
              src="/images/lambda_novum_logo.png"
              alt="Lambda & Novum"
              width={2991}
              height={358}
              className="h-10 sm:h-11 md:h-12 w-auto max-w-[260px] sm:max-w-[320px] md:max-w-[360px] object-contain outline-none border-none select-none pointer-events-none"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation - centered */}
          <nav className="hidden xl:flex items-center justify-center flex-1 px-4">
            {navigationItems.map((item) => {
              const active = isActive(item);

              if (item.href) {
                if (item.isExternal || item.href.endsWith('.htm')) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative h-full flex items-center px-4 text-[17px] font-light md:font-normal tracking-tight transition-colors text-neutral-900 hover:text-brand-blue"
                    >
                      {item.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative h-full flex items-center px-4 text-[17px] font-light md:font-normal tracking-tight transition-colors ${
                      active ? 'text-brand-blue font-normal' : 'text-neutral-900 hover:text-brand-blue'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue" />
                    )}
                  </Link>
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`relative h-full flex items-center gap-1.5 px-4 text-[17px] font-light md:font-normal tracking-tight focus:outline-none transition-colors cursor-pointer ${active ? 'text-brand-blue font-normal' : 'text-neutral-900 hover:text-brand-blue'
                      }`}
                  >
                    {item.label}
                    <ChevronDown className={`w-[18px] h-[18px] transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue" />
                    )}
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18, ease: [0.25, 1, 0.5, 1] }}
                        className="absolute left-1/2 top-full -translate-x-1/2 pt-4"
                      >
                        <div className={`bg-white border border-neutral-200 shadow-2xl rounded-xl overflow-hidden min-w-[560px] max-w-[980px] ${
                          item.label === 'Facility & Locations' || (item.columns && item.columns.length >= 3)
                            ? 'w-[920px]'
                            : item.label === 'Overview' || item.label === 'Modalities'
                              ? 'w-[740px]'
                              : ''
                        }`}>
                          <div className="p-6">
                            <div className="mb-5 pb-4 border-b border-neutral-100">
                              {item.label === 'Facility & Locations' ? (
                                <>
                                  <Link
                                    href="/facility&location"
                                    className="group/top flex items-center justify-between text-brand-orange hover:text-brand-orange-hover text-[12px] font-semibold uppercase tracking-wider mb-1.5 transition-colors cursor-pointer"
                                  >
                                    <span>{item.label}</span>
                                    <span className="text-[11.5px] text-brand-blue font-semibold normal-case tracking-normal flex items-center gap-1 group-hover/top:translate-x-0.5 transition-transform">
                                      <span>Explore Overview</span>
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </span>
                                  </Link>
                                  {item.headline && (
                                    <Link 
                                      href="/facility&location"
                                      className="block text-[15px] sm:text-[16px] font-semibold text-neutral-900 hover:text-brand-blue leading-snug mb-1.5 transition-colors cursor-pointer"
                                    >
                                      {item.headline}
                                    </Link>
                                  )}
                                </>
                              ) : (
                                <>
                                  <span className="text-brand-orange text-[12px] font-semibold uppercase tracking-wider block mb-1.5">
                                    {item.label}
                                  </span>
                                  {item.headline && (
                                    <h4 className="text-[15px] sm:text-[16px] font-semibold text-neutral-900 leading-snug mb-1.5">
                                      {item.headline}
                                    </h4>
                                  )}
                                </>
                              )}
                              {item.description && (
                                <p className="text-[13.5px] sm:text-[14px] text-slate-600 font-normal leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            {item.label === 'Facility & Locations' ? (
                              <div className="grid grid-cols-12 gap-8 items-stretch">
                                {/* Left column: Locations list styled EXACTLY as other nav cards */}
                                <div className="col-span-5 flex flex-col justify-between pr-2">
                                  <div>
                                    <h4 className="text-[12px] font-semibold uppercase tracking-wider text-neutral-900 mb-3.5">
                                      CDMO Locations
                                    </h4>
                                    <ul className="space-y-2.5">
                                      <li>
                                        <Link
                                          href="/facility&location/India"
                                          onMouseEnter={() => setHoveredLocation('ahmedabad')}
                                          className={`text-[15px] font-light md:font-normal tracking-tight flex items-center justify-between transition-colors cursor-pointer ${
                                            hoveredLocation === 'ahmedabad'
                                              ? 'text-brand-blue font-normal'
                                              : 'text-neutral-800 hover:text-brand-blue'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2.5">
                                            <Factory className="w-[18px] h-[18px] text-brand-blue flex-shrink-0" />
                                            <span>Ahmedabad, India</span>
                                          </div>
                                        </Link>
                                      </li>

                                      <li>
                                        <Link
                                          href="/facility&location/UK"
                                          onMouseEnter={() => setHoveredLocation('london')}
                                          className={`text-[15px] font-light md:font-normal tracking-tight flex items-center justify-between transition-colors cursor-pointer ${
                                            hoveredLocation === 'london'
                                              ? 'text-brand-blue font-normal'
                                              : 'text-neutral-800 hover:text-brand-blue'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2.5">
                                            <Building2 className="w-[18px] h-[18px] text-brand-blue flex-shrink-0" />
                                            <span>London, UK</span>
                                          </div>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>

                                {/* Right column: Dynamic location details card */}
                                <div className="col-span-7">
                                  {hoveredLocation === 'ahmedabad' ? (
                                    <div className="bg-gradient-to-br from-blue-50/60 via-white to-slate-50 border border-blue-100/90 rounded-xl p-5 sm:p-6 flex flex-col justify-between h-full shadow-xs">
                                      <div>
                                        <div className="flex items-center justify-end mb-2.5">
                                          <span className="text-xs font-semibold text-neutral-600">Gujarat, India</span>
                                        </div>
                                        <h4 className="text-base font-bold text-neutral-900 mb-2 leading-snug">
                                          Integrated Biologics Development & GMP Manufacturing
                                        </h4>
                                        <p className="text-[13.5px] text-slate-600 leading-relaxed font-normal">
                                          Our Ahmedabad facility brings together cell line development, upstream and downstream process development, analytical development and characterization, drug product development, and GMP manufacturing within an integrated biologics development and manufacturing environment.
                                        </p>
                                      </div>
                                      <div className="mt-5 pt-3.5 border-t border-neutral-200/60 flex items-center justify-end">
                                        <Link 
                                          href="/facility&location/India" 
                                          className="text-xs font-semibold text-brand-blue hover:text-brand-blue-hover flex items-center gap-1.5 group"
                                        >
                                          <span>Ahmedabad Facility</span>
                                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                                        </Link>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="bg-gradient-to-br from-blue-50/60 via-white to-slate-50 border border-blue-100/90 rounded-xl p-5 sm:p-6 flex flex-col justify-between h-full shadow-xs">
                                      <div>
                                        <div className="flex items-center justify-end mb-2.5">
                                          <span className="text-xs font-semibold text-neutral-600">London, UK</span>
                                        </div>
                                        <h4 className="text-base font-bold text-neutral-900 mb-2 leading-snug">
                                          Biologics Development & Analytical Sciences
                                        </h4>
                                        <p className="text-[13.5px] text-slate-600 leading-relaxed font-normal">
                                          The London facility provides specialized capabilities in biologics development, process development, and analytical characterization, with a strong focus on biosimilar development and novel biologics.
                                        </p>
                                      </div>
                                      <div className="mt-5 pt-3.5 border-t border-neutral-200/60 flex items-center justify-end">
                                        <Link 
                                          href="/facility&location/UK" 
                                          className="text-xs font-semibold text-brand-blue hover:text-brand-blue-hover flex items-center gap-1.5 group"
                                        >
                                          <span>London Centre</span>
                                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                                        </Link>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className={`grid gap-12 ${item.columns && item.columns.length >= 3
                                ? 'grid-cols-3'
                                : item.columns && item.columns.length === 2
                                  ? 'grid-cols-2'
                                  : 'grid-cols-1'
                                }`}>
                                {item.columns?.map((column, colIdx) => (
                                  <div key={colIdx}>
                                    {column.href ? (
                                      <Link
                                        href={column.href}
                                        className="group/col inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-neutral-900 hover:text-brand-orange mb-3.5 transition-colors cursor-pointer"
                                      >
                                        <span>{column.title}</span>
                                        <ArrowRight className="w-3.5 h-3.5 text-brand-orange opacity-0 -translate-x-1 group-hover/col:opacity-100 group-hover/col:translate-x-0 transition-all" />
                                      </Link>
                                    ) : (
                                      <h4 className="text-[12px] font-semibold uppercase tracking-wider text-neutral-900 mb-3.5">
                                        {column.title}
                                      </h4>
                                    )}
                                    <ul className="space-y-2.5">
                                      {column.links.map((link) => {
                                        const isLinkActive = pathname === link.href;
                                        return (
                                          <li key={link.href}>
                                            {link.isExternal || link.href.endsWith('.htm') || link.href.startsWith('http') ? (
                                              <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`text-[15px] font-light md:font-normal tracking-tight flex items-center gap-2.5 transition-colors ${isLinkActive
                                                  ? 'text-brand-blue font-normal'
                                                  : 'text-neutral-800 hover:text-brand-blue'
                                                  }`}
                                              >
                                                <link.icon className="w-[18px] h-[18px] text-brand-blue flex-shrink-0" />
                                                {link.label}
                                              </a>
                                            ) : (
                                              <Link
                                                href={link.href}
                                                className={`text-[15px] font-light md:font-normal tracking-tight flex items-center gap-2.5 transition-colors ${isLinkActive
                                                  ? 'text-brand-blue font-normal'
                                                  : 'text-neutral-800 hover:text-brand-blue'
                                                  }`}
                                              >
                                                <link.icon className="w-[18px] h-[18px] text-brand-blue flex-shrink-0" />
                                                {link.label}
                                              </Link>
                                            )}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Right side - search, desktop CTAs, mobile hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Desktop Search Bar */}
            <div className="hidden xl:block">
              <NavSearchBar className="w-[140px] 2xl:w-[180px]" placeholder="Search..." />
            </div>

            {/* Desktop Virtual Tour CTA */}
            <a
              href="/virtual-tour/00%20MAIN%20BUILDING/index.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center justify-center px-5 py-2 rounded-full border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white text-[15px] font-light md:font-normal tracking-tight transition-all shadow-sm"
            >
              Virtual Tour
            </a>

            {/* Desktop Contact CTA */}
            <Link
              href="/contact"
              className="hidden xl:inline-flex items-center justify-center px-5 py-2 rounded-full border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white text-[15px] font-light md:font-normal tracking-tight transition-all"
            >
              Contact Us
            </Link>

            {/* Mobile/Tablet Search Button */}
            <div className="xl:hidden">
              <NavSearchBar className="px-2.5 py-1.5" placeholder="Search" />
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="flex xl:hidden items-center justify-center text-neutral-700 hover:text-brand-navy active:scale-95 cursor-pointer transition-colors p-1"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
