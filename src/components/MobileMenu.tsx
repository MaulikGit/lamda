'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  X, 
  ChevronDown, 
  Building2, 
  Users, 
  Factory, 
  Layers, 
  ShieldCheck, 
  Briefcase, 
  Settings, 
  Search, 
  Beaker, 
  Package, 
  Microscope, 
  Scale, 
  HeartPulse, 
  Bug, 
  Target, 
  GitMerge, 
  Syringe, 
  Dna, 
  BookOpen, 
  FileText, 
  FileDown, 
  Newspaper, 
  Calendar, 
  HelpCircle,
  Globe,
  ArrowRight,
  LucideIcon 
} from 'lucide-react';
import SearchModal from './SearchModal';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: -16,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const linkVariants: Variants = {
  closed: { opacity: 0, y: -8 },
  open: { opacity: 1, y: 0 },
};

interface MobileGroup {
  label: string;
  href?: string;
  isExternal?: boolean;
  headline?: string;
  description?: string;
  columns?: { 
    title: string; 
    href?: string;
    headline?: string;
    description?: string;
    links: { 
      label: string; 
      href: string; 
      icon: LucideIcon; 
      badge?: string; 
      isExternal?: boolean 
    }[] 
  }[];
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const groups: MobileGroup[] = [
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
      description: 'Integrated biologics development, clinical GMP manufacturing, and comprehensive analytical characterization.',
      columns: [
        {
          title: 'Development Services',
          href: '/services',
          headline: 'Development Designed for Manufacturing',
          description: 'Every development decision influences downstream manufacturing. Lambda CDMO brings together cell line development, upstream and downstream process development, and analytical development to establish robust processes, generate meaningful development data, and support efficient technology transfer into GMP manufacturing.',
          links: [
            { label: 'Cell Line Development', href: '/services/cell-line', icon: Dna },
            { label: 'Process Development', href: '/services/process', icon: Settings },
            { label: 'Analytical Development', href: '/services/analytical', icon: Search },
          ],
        },
        {
          title: 'Manufacturing Services',
          href: '/manufacturing',
          headline: 'From Process Development to Clinical Manufacturing. Delivered with Confidence.',
          description: 'Manufacturing success depends on process consistency, product quality, and effective technology transfer. Lambda CDMO provides integrated manufacturing capabilities for biologics, supporting the transition from development into GMP drug substance and drug product manufacturing for clinical supplies.',
          links: [
            { label: 'Drug Substance Manufacturing', href: '/manufacturing/drug-substance', icon: Beaker },
            { label: 'Drug Product Manufacturing', href: '/manufacturing/drug-product', icon: Package },
          ],
        },
        {
          title: 'Analytical Characterization and Testing',
          href: '/characterization',
          headline: 'Analytical Insights that Advance Biologics Development',
          description: 'Lambda CDMO provides analytical characterization and testing capabilities to support product understanding, process development, comparability, manufacturing, batch release, and stability assessment across biologics programs.',
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
            { label: 'Ahmedabad, India', href: '/facility&location/India', icon: Factory },
            { label: 'London, UK', href: '/facility&location/UK', icon: Building2 },
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

  const toggleGroup = (label: string) => {
    setOpenGroup(openGroup === label ? null : label);
  };

  const isActive = (group: MobileGroup) => {
    if (group.href) return pathname === group.href;
    return group.columns?.some((col) => 
      (col.href && pathname === col.href) ||
      col.links.some((link) => pathname === link.href)
    );
  };

  return (
    <>
      <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-x-0 top-0 bg-white border-b border-neutral-200 z-50 px-6 pt-24 pb-10 flex flex-col max-h-[95vh] overflow-y-auto shadow-2xl pointer-events-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="absolute top-5 right-6 w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 active:scale-95 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Mobile Search Button */}
          <motion.div variants={linkVariants} className="mb-4">
            <button
              onClick={() => {
                onClose();
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-slate-500 hover:text-neutral-900 transition-colors cursor-pointer text-sm"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search services, facilities, insights...</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-white text-slate-500 border border-neutral-200">
                Search
              </span>
            </button>
          </motion.div>

          {/* Links */}
          <nav className="flex flex-col gap-2 select-none">
            {groups.map((group) => {
              if (group.href) {
                const isExternal = group.isExternal || group.href.endsWith('.htm');
                if (isExternal) {
                  return (
                    <motion.div key={group.label} variants={linkVariants}>
                      <a
                        href={group.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="py-3 text-[17px] font-light md:font-normal tracking-tight transition-colors flex items-center justify-between text-neutral-900 hover:text-brand-blue"
                      >
                        <span>{group.label}</span>
                        <span className="px-2 py-0.5 text-xs font-medium rounded-sm bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
                          360° Tour
                        </span>
                      </a>
                    </motion.div>
                  );
                }

                const active = pathname === group.href;
                return (
                  <motion.div key={group.label} variants={linkVariants}>
                    <Link
                      href={group.href}
                      onClick={onClose}
                      className={`py-3 text-[17px] font-light md:font-normal tracking-tight transition-colors flex items-center justify-between ${
                        active ? 'text-brand-blue' : 'text-neutral-900 hover:text-brand-blue'
                      }`}
                    >
                      <span>{group.label}</span>
                    </Link>
                  </motion.div>
                );
              }

              const expanded = openGroup === group.label;
              const active = isActive(group);

              return (
                <motion.div key={group.label} variants={linkVariants} className="border-b border-neutral-100 pb-2">
                  <button
                    onClick={() => toggleGroup(group.label)}
                    className={`w-full py-3 flex items-center justify-between text-[17px] font-light md:font-normal tracking-tight transition-colors cursor-pointer focus:outline-none ${
                      active ? 'text-brand-blue font-normal' : 'text-neutral-900 hover:text-brand-blue'
                    }`}
                  >
                    <span>{group.label}</span>
                    <motion.div
                      animate={{ rotate: expanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className={`w-5 h-5 transition-colors ${expanded ? 'text-brand-blue' : 'text-neutral-400'}`} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden mt-1 pb-3"
                      >
                        {(group.description || group.headline) && (
                          <div className="mb-4 pb-2.5 border-b border-neutral-100">
                            <span className="text-brand-orange text-[11px] font-semibold uppercase tracking-wider block mb-1">
                              {group.label}
                            </span>
                            {group.headline && (
                              <h4 className="text-[13.5px] font-semibold text-neutral-900 leading-snug mb-1">
                                {group.headline}
                              </h4>
                            )}
                            {group.description && (
                              <p className="text-[12.5px] text-slate-500 font-normal leading-relaxed">
                                {group.description}
                              </p>
                            )}
                          </div>
                        )}

                        <div className={`grid gap-5 ${group.columns && group.columns.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                          {group.columns?.map((column) => (
                            <div key={column.title} className="space-y-2">
                              {column.href ? (
                                <Link
                                  href={column.href}
                                  onClick={onClose}
                                  className="group/col inline-flex items-center gap-1.5 text-[11px] font-semibold text-neutral-900 hover:text-brand-orange uppercase tracking-wider transition-colors cursor-pointer"
                                >
                                  <span>{column.title}</span>
                                  <ArrowRight className="w-3 h-3 text-brand-orange group-hover/col:translate-x-0.5 transition-transform" />
                                </Link>
                              ) : (
                                <h4 className="text-[11px] font-semibold text-neutral-900 uppercase tracking-wider">
                                  {column.title}
                                </h4>
                              )}
                              <ul className="space-y-2">
                                {column.links.map((link) => {
                                  const linkActive = pathname === link.href;
                                  const LinkIcon = link.icon;
                                  const isExternal = link.isExternal || link.href.startsWith('http') || link.href.endsWith('.htm');
                                  return (
                                    <li key={link.href}>
                                      {isExternal ? (
                                        <a
                                          href={link.href}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={onClose}
                                          className={`flex items-center justify-between py-1.5 text-[14.5px] font-light md:font-normal tracking-tight transition-colors ${
                                            linkActive 
                                              ? 'text-brand-blue font-normal' 
                                              : 'text-neutral-700 hover:text-brand-blue'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2.5">
                                            <LinkIcon className="w-4 h-4 text-brand-blue shrink-0" />
                                            <span>{link.label}</span>
                                          </div>
                                          {link.badge && (
                                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100/80 text-brand-blue">
                                              {link.badge}
                                            </span>
                                          )}
                                        </a>
                                      ) : (
                                        <Link
                                          href={link.href}
                                          onClick={onClose}
                                          className={`flex items-center justify-between py-1.5 text-[14.5px] font-light md:font-normal tracking-tight transition-colors ${
                                            linkActive 
                                              ? 'text-brand-blue font-normal' 
                                              : 'text-neutral-700 hover:text-brand-blue'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2.5">
                                            <LinkIcon className="w-4 h-4 text-brand-blue shrink-0" />
                                            <span>{link.label}</span>
                                          </div>
                                          {link.badge && (
                                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100/80 text-brand-blue">
                                              {link.badge}
                                            </span>
                                          )}
                                        </Link>
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </nav>

          {/* CTA */}
          <motion.div variants={linkVariants} className="mt-8 pt-6 border-t border-neutral-100 flex flex-col gap-3">
            <a
              href="/virtual-tour/00%20MAIN%20BUILDING/index.htm"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-semibold text-sm transition-all"
            >
              Virtual Tour
            </a>
            <Link
              href="/contact"
              onClick={onClose}
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-semibold text-sm transition-all"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
