import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Overview & Facilities',
      links: [
        { name: 'About Lambda', href: '/overview/about' },
        { name: 'Leadership', href: '/overview/leadership' },
        { name: 'Facilities Overview', href: '/facility&location' },
        { name: 'Ahmedabad Facility', href: '/facility&location/India' },
        { name: 'London UK Facility', href: '/facility&location/UK' },
        { name: 'Virtual Tour', href: '/virtual-tour/00%20MAIN%20BUILDING/index.htm' },
        { name: 'Integrated Dev', href: '/overview/integrated' },
        { name: 'Careers', href: '/overview/careers' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Cell Line', href: '/services/cell-line' },
        { name: 'Process Dev', href: '/services/process' },
        { name: 'Analytical', href: '/services/analytical' },
        { name: 'Drug Substance', href: '/manufacturing/drug-substance' },
        { name: 'Drug Product', href: '/manufacturing/drug-product' },
      ],
    },
    {
      title: 'Characterization',
      links: [
        { name: 'Analytical Testing', href: '/characterization/analytical-testing' },
        { name: 'Physicochemical', href: '/characterization/physicochemical' },
        { name: 'Bioassays', href: '/characterization/bioassays' },
        { name: 'Microbiological', href: '/characterization/microbiological' },
      ],
    },
    {
      title: 'Modalities',
      links: [
        { name: 'Monoclonal Antibodies', href: '/modalities/mabs' },
        { name: 'Bispecifics', href: '/modalities/bispecifics' },
        { name: 'ADCs', href: '/modalities/adcs' },
        { name: 'Proteins & Peptides', href: '/modalities/proteins-peptides' },
      ],
    },
  ];

  return (
    <footer className="bg-white text-neutral-900 border-t border-neutral-200 select-none px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="w-full max-w-[1700px] mx-auto py-16 md:py-20">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20">
          
          {/* Left: Branding */}
          <div className="lg:shrink-0">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/images/lambda_novum_logo.png"
                alt="Lambda CDMO"
                width={2991}
                height={358}
                className="h-10 sm:h-12 w-auto max-w-[280px] sm:max-w-[340px] object-contain"
                unoptimized
              />
            </Link>
            <p className="text-sm text-neutral-500 leading-relaxed mb-6 lg:max-w-sm">
              Lambda CDMO is an integrated biologics solutions provider, accelerating therapeutic programs from cell line engineering to GMP drug product release.
            </p>
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/lambda-therapeutic-research/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-brand-blue hover:border-brand-blue hover:bg-brand-blue/5 transition-all duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z" />
                </svg>
              </a>

              {/* X */}
              <a
                href="https://x.com/lambdacro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-brand-blue hover:border-brand-blue hover:bg-brand-blue/5 transition-all duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/lambdacro/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-brand-blue hover:border-brand-blue hover:bg-brand-blue/5 transition-all duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/watch?v=AFcJBV5lMgo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-brand-blue hover:border-brand-blue hover:bg-brand-blue/5 transition-all duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => {
                    const isExternal = link.href.endsWith('.htm') || link.href.startsWith('http');
                    return (
                      <li key={link.name}>
                        {isExternal ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-neutral-500 hover:text-brand-blue transition-colors"
                          >
                            {link.name}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-sm text-neutral-500 hover:text-brand-blue transition-colors"
                          >
                            {link.name}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
            <div className="flex flex-col gap-2.5 text-sm text-neutral-500">
              <div className="flex items-start sm:items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-teal shrink-0 mt-0.5 sm:mt-0" />
                <span>Lambda House, Plot No. 38, Survey No. 388, Near Silver Oak University, S. G. Highway, Gota, Ahmedabad - 382481, Gujarat, India</span>
              </div>
              <div className="flex items-start sm:items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-teal shrink-0 mt-0.5 sm:mt-0" />
                <span>London, UK: 319 Sage House, Pinner Road, Harrow, London, HA1 4HF, UK</span>
              </div>
              <div className="flex flex-wrap items-center gap-6 pt-1">
                <a
                  href="tel:+917940202020"
                  className="flex items-center gap-2 hover:text-brand-blue transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>+91-79-40202020</span>
                </a>
                <a
                  href="mailto:BD@lambda-cro.com"
                  className="flex items-center gap-2 hover:text-brand-blue transition-colors"
                >
                  <Mail className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>BD@lambda-cro.com</span>
                </a>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-[10px] border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-medium text-xs uppercase tracking-wider shadow-sm hover:shadow active:scale-98 transition-all shrink-0"
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400">
            © {currentYear} Lambda CDMO. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/overview/quality" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
              Quality and Compliance
            </Link>
            <Link href="/insights/blogs" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
              Blog
            </Link>
            <Link href="/insights/faqs" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
              FAQs
            </Link>
            <Link href="/contact" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
