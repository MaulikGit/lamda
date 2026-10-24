export interface FAQItemDetail {
  id: string;
  category: string;
  categoryLabel: string;
  question: string;
  answer: string;
  bullets?: string[];
  tags: string[];
}

export interface FAQCategoryConfig {
  id: string;
  label: string;
  iconName: string;
  description: string;
}

export const FAQ_CATEGORIES: FAQCategoryConfig[] = [
  {
    id: 'all',
    label: 'All Questions',
    iconName: 'HelpCircle',
    description: 'Explore comprehensive answers regarding Lambda CDMO’s facilities, services, and compliance.',
  },
  {
    id: 'facilities',
    label: 'Facilities & Locations',
    iconName: 'Building2',
    description: 'Details on our Ahmedabad, India cGMP facility and London, UK innovation facility.',
  },
  {
    id: 'upstream',
    label: 'Cell Line & Upstream',
    iconName: 'Dna',
    description: 'Stable clone development, high titers, microbioreactors, and single-use upstream scale-up.',
  },
  {
    id: 'downstream',
    label: 'Downstream Purification',
    iconName: 'Filter',
    description: 'Multi-modal chromatography, viral clearance validation, continuous PCC, and UF/DF.',
  },
  {
    id: 'manufacturing',
    label: 'cGMP Manufacturing',
    iconName: 'Factory',
    description: 'Clinical drug substance suites, robotic isolator fill-finish, and lyophilization.',
  },
  {
    id: 'analytics',
    label: 'Analytical Sciences & QTPP',
    iconName: 'Microscope',
    description: 'Intact LC-MS, bioassays, SPR/Octet binding, biosimilar comparability, and stability studies.',
  },
  {
    id: 'modalities',
    label: 'Therapeutic Modalities',
    iconName: 'Syringe',
    description: 'mAbs, Bispecific antibodies, ADCs, recombinant proteins, and synthetic peptides.',
  },
  {
    id: 'quality',
    label: 'Quality & Regulatory',
    iconName: 'ShieldCheck',
    description: 'US FDA, EMA, PMDA, and TGA alignment, CMC dossier authoring, and 21 CFR Part 11 compliance.',
  },
  {
    id: 'partnership',
    label: 'Tech Transfer & Partnering',
    iconName: 'Users',
    description: 'Engagement models, technology transfer roadmap, IP protection, and project governance.',
  },
];

export const allFaqs: FAQItemDetail[] = [
  // ==================== FACILITIES & LOCATIONS ====================
  {
    id: 'fac-1',
    category: 'facilities',
    categoryLabel: 'Facilities & Locations',
    question: 'Where are Lambda CDMO’s development and manufacturing facilities located?',
    answer: 'Lambda CDMO operates two complementary, purpose-built facilities across India and the United Kingdom:',
    bullets: [
      'Ahmedabad, India Facility: Approximately 27,000 sqft facility integrating cell line development, process development, analytical characterization, upstream single-use suites (2x 200L), Grade C downstream suites, Grade A robotic isolator fill-finish (10,000 units/batch), and lyophilization.',
      'London, United Kingdom Facility: Dedicated process development and analytical characterization laboratory focused on upstream optimization, downstream purification design, biosimilar comparability, and advanced physicochemical analytics.',
    ],
    tags: ['Ahmedabad', 'London', 'Facility', 'Facilities', 'UK', 'India'],
  },
  {
    id: 'fac-2',
    category: 'facilities',
    categoryLabel: 'Facilities & Locations',
    question: 'Can prospective clients visit or tour the facilities?',
    answer: 'Yes. We welcome prospective sponsors and audit teams to visit both our Ahmedabad facility and London Innovation Facility. In addition, sponsors can access our interactive 360° Virtual Tour online at any time.',
    bullets: [
      'On-site facility audits and technical meetings can be scheduled through our business development team under an NDA.',
      'Virtual 360° facility tour allows remote stakeholders to inspect our cleanroom airlocks, isolator lines, bioreactor suites, and analytical laboratories.',
    ],
    tags: ['Tour', 'Virtual Tour', 'Site Visit', 'Audit'],
  },
  {
    id: 'fac-3',
    category: 'facilities',
    categoryLabel: 'Facilities & Locations',
    question: 'What cleanroom classifications and containment systems are maintained?',
    answer: 'Our manufacturing operations are designed with unidirectional material and personnel flows, pressure cascades, and segregated suites:',
    bullets: [
      'Grade A (ISO 5): Robotic isolator filling zones for sterile vials, pre-filled syringes, and cartridges.',
      'Grade B (ISO 7): Background cleanroom environments for aseptic interventions and formulation support.',
      'Grade C (ISO 7/8): Segregated pre-viral and post-viral downstream purification suites.',
      'Grade D (ISO 8): Media preparation, buffer preparation, and secondary packaging support zones.',
    ],
    tags: ['Cleanroom', 'Grade A', 'Isolator', 'Airflow', 'Containment'],
  },

  // ==================== CELL LINE & UPSTREAM ====================
  {
    id: 'up-1',
    category: 'upstream',
    categoryLabel: 'Cell Line & Upstream',
    question: 'What cell line expression platforms and host organisms do you support?',
    answer: 'We provide stable mammalian and microbial expression engineering utilizing proven, commercially viable host platforms:',
    bullets: [
      'Mammalian: CHO-DG44, CHO-K1, and CHO-S host platforms with glutamine synthetase (GS) and DHFR selection systems.',
      'Microbial: Escherichia coli (E. coli) systems for non-glycosylated recombinant proteins, enzymes, and peptide fragments.',
      'High-throughput single-cell cloning using automated CellCelector and clone verification with imaging-based monoclonality documentation.',
    ],
    tags: ['CHO', 'Cell Line', 'E. coli', 'Cloning', 'Titer', 'Monoclonality'],
  },
  {
    id: 'up-2',
    category: 'upstream',
    categoryLabel: 'Cell Line & Upstream',
    question: 'What bioreactor scales and process modes are available for upstream development?',
    answer: 'We offer scale-aligned bioreactor systems supporting high-throughput screening through pilot development and clinical manufacturing:',
    bullets: [
      'Screening & Optimization: Ambr 15 and Ambr 250 microbioreactors for high-throughput media/feed screening and DoE parameter mapping.',
      'Scale-Up Bioreactors: 2 L, 5 L, 10 L, and 50 L benchtop and pilot glass/single-use bioreactors.',
      'cGMP Manufacturing: 2x 200 L (400 L total capacity) single-use production bioreactors.',
      'Culture Modes: Fed-batch, intensified fed-batch, and continuous perfusion using ATF (Alternating Tangential Flow) cell retention systems.',
    ],
    tags: ['Ambr 15', 'Ambr 250', 'Bioreactor', 'Perfusion', 'ATF', 'Fed-batch'],
  },
  {
    id: 'up-3',
    category: 'upstream',
    categoryLabel: 'Cell Line & Upstream',
    question: 'Do you generate and characterize Research and Master Cell Banks?',
    answer: 'Yes. We provide complete cell banking services compliant with ICH Q5D guidelines, including Research Cell Banks (RCB) and cGMP Master Cell Banks (MCB) with comprehensive sterility, mycoplasma, adventitious viral agent testing, and genetic stability verification.',
    tags: ['MCB', 'RCB', 'Cell Banking', 'ICH Q5D', 'Mycoplasma'],
  },

  // ==================== DOWNSTREAM PURIFICATION ====================
  {
    id: 'down-1',
    category: 'downstream',
    categoryLabel: 'Downstream Purification',
    question: 'What chromatographic and purification capabilities are available?',
    answer: 'Our downstream platforms support bench-scale resin screening through 50 L harvest pilot batches and 200 L GMP campaigns:',
    bullets: [
      'Affinity Chromatography: Protein A, Protein L, and customized ligand affinity matrices.',
      'Ion Exchange & Mixed-Mode: Anion exchange (AEX), cation exchange (CEX), hydrophobic interaction (HIC), and multimodal resins (e.g., Capto adhere, Capto MMC).',
      'Continuous Purification: Periodic Counter-Current Chromatography (PCC) for intensified downstream processing.',
      'Ultrafiltration & Diafiltration (UF/DF): Tangential flow filtration (TFF) for high-concentration formulation and buffer exchange.',
    ],
    tags: ['Chromatography', 'Protein A', 'PCC', 'UF/DF', 'TFF', 'Purification'],
  },
  {
    id: 'down-2',
    category: 'downstream',
    categoryLabel: 'Downstream Purification',
    question: 'How is viral safety and clearance validation managed?',
    answer: 'Viral safety is integrated into our facility architecture and process validation:',
    bullets: [
      'Architectural Segregation: Dedicated pre-viral and post-viral cleanroom suites with separate air handling and strict physical barriers.',
      'Low pH Inactivation: Robust viral inactivation with automated neutralization skids.',
      'Viral Filtration: Validated 20 nm planova/nanofiltration membranes for enveloped and non-enveloped virus removal.',
      'Viral Clearance Studies: Scale-down model qualification and coordination of viral clearance spiking studies with certified testing facilities.',
    ],
    tags: ['Viral Clearance', 'Viral Filtration', 'Nanofiltration', 'Low pH', 'Safety'],
  },

  // ==================== cGMP MANUFACTURING ====================
  {
    id: 'mfg-1',
    category: 'manufacturing',
    categoryLabel: 'cGMP Manufacturing',
    question: 'What drug substance batch scales do you produce for clinical trials?',
    answer: 'Our cGMP Drug Substance manufacturing facility utilizes single-use bioreactor suites configured with 50 L seed bioreactors and 2x 200 L (400 L total) production bioreactors, supporting Phase I and Phase II clinical supply campaigns as well as toxicology batches.',
    tags: ['Drug Substance', '200L', 'GMP', 'Clinical Supply', 'Bioreactor'],
  },
  {
    id: 'mfg-2',
    category: 'manufacturing',
    categoryLabel: 'cGMP Manufacturing',
    question: 'What filling formats and throughput does your robotic drug product line support?',
    answer: 'Our drug product line operates inside an advanced Grade A robotic isolator, ensuring minimal human intervention and high aseptic compliance:',
    bullets: [
      'Batch Capacity: Up to 10,000 units per batch.',
      'Containers: Ready-to-Use (RTU) Vials (2R to 50R), Pre-Filled Syringes (PFS: 1.0 mL to 3.0 mL), and Cartridges (1.5 mL to 3.0 mL).',
      'Pump Technology: High-precision peristaltic and rotary piston filling heads to prevent protein shear.',
      'Visual Inspection: Dedicated inspection suite and secondary bulk packaging suites.',
    ],
    tags: ['Fill-Finish', 'Isolator', 'Vials', 'PFS', 'Cartridges', 'Robotic'],
  },
  {
    id: 'mfg-3',
    category: 'manufacturing',
    categoryLabel: 'cGMP Manufacturing',
    question: 'What lyophilization capabilities are available for sensitive biologics?',
    answer: 'We provide cycle development and clinical lyophilization utilizing a development freeze-dryer equipped with 0.5 m² shelf area, Pirani pressure sensors, and controlled nucleation technology to establish optimized sublimation curves and preserve cake elegance and reconstitution kinetics.',
    tags: ['Lyophilization', 'Freeze Drying', 'Pirani', 'Controlled Nucleation'],
  },

  // ==================== ANALYTICAL SCIENCES & QTPP ====================
  {
    id: 'ana-1',
    category: 'analytics',
    categoryLabel: 'Analytical Sciences & QTPP',
    question: 'How is the Quality Target Product Profile (QTPP) integrated into development?',
    answer: 'Our analytical sciences platform maps all development stages against pre-defined Critical Quality Attributes (CQAs) established in the sponsor’s QTPP. This ensures that clone selection, process parameter changes, and scale-up decisions are backed by orthogonal physicochemical and functional characterization data.',
    tags: ['QTPP', 'CQA', 'Analytical', 'Comparability', 'Characterization'],
  },
  {
    id: 'ana-2',
    category: 'analytics',
    categoryLabel: 'Analytical Sciences & QTPP',
    question: 'What high-resolution mass spectrometry and physicochemical methods do you run?',
    answer: 'We utilize advanced instrumentation for primary, secondary, and higher-order structure analysis:',
    bullets: [
      'Mass Spectrometry: Intact mass analysis, subunit analysis, peptide mapping, disulfide bond profiling, and glycan identification (LC-MS/MS).',
      'Chromatography: SEC-UPLC (aggregates/fragments), IEX-HPLC (charge variants), RP-HPLC, and HILIC.',
      'Capillary Electrophoresis: CE-SDS (reduced/non-reduced purity) and imaged capillary isoelectric focusing (icIEF).',
      'Biophysical Testing: Circular dichroism (CD), FTIR, Nano-DSF (thermal melting Tm/Tagg), and dynamic light scattering (DLS).',
    ],
    tags: ['LC-MS', 'SEC', 'icIEF', 'Peptide Mapping', 'Glycans', 'Nano-DSF'],
  },
  {
    id: 'ana-3',
    category: 'analytics',
    categoryLabel: 'Analytical Sciences & QTPP',
    question: 'What functional binding and cell-based bioassays are performed?',
    answer: 'Our bioassay laboratory delivers quantitative functional assessment including Surface Plasmon Resonance (SPR / Biacore) and Bio-Layer Interferometry (BLI / Octet) for binding kinetics (KD, ka, kd), FcRn / FcγR binding profiles, ELISA, and cell-based potency assays (e.g., ADCC, CDC, apoptosis).',
    tags: ['SPR', 'Biacore', 'Octet', 'Bioassay', 'Potency', 'ADCC', 'CDC'],
  },
  {
    id: 'ana-4',
    category: 'analytics',
    categoryLabel: 'Analytical Sciences & QTPP',
    question: 'Do you provide ICH-compliant stability testing?',
    answer: 'Yes. We maintain calibrated stability incubation chambers running under ICH Q1A(R2) conditions (real-time 2–8°C, accelerated 25°C/60% RH, and stressed 40°C/75% RH) as well as photostability chambers (ICH Q1B) and freeze-thaw challenge studies.',
    tags: ['Stability', 'ICH Q1A', 'Photostability', 'Freeze-Thaw'],
  },

  // ==================== THERAPEUTIC MODALITIES ====================
  {
    id: 'mod-1',
    category: 'modalities',
    categoryLabel: 'Therapeutic Modalities',
    question: 'What therapeutic modalities does Lambda CDMO support?',
    answer: 'Our multidisciplinary teams support a broad spectrum of complex biologics across all lifecycle phases:',
    bullets: [
      'Monoclonal Antibodies (mAbs): Canonical IgG1, IgG2, IgG4 antibodies and biosimilars.',
      'Bispecific Antibodies: Dual-targeting formats, asymmetric heterodimers, and scFv-based bispecific constructs.',
      'Antibody-Drug Conjugates (ADCs): Process development, linker-payload characterization, and Drug-to-Antibody Ratio (DAR) profiling.',
      'Recombinant Proteins & Peptides: Cytokines, growth factors, enzymes, and synthetic peptide therapeutics.',
    ],
    tags: ['mAbs', 'Bispecifics', 'ADCs', 'Recombinant Proteins', 'Peptides'],
  },
  {
    id: 'mod-2',
    category: 'modalities',
    categoryLabel: 'Therapeutic Modalities',
    question: 'How do you overcome bispecific antibody mispairing and aggregation challenges?',
    answer: 'Bispecific antibodies often suffer from homodimerization and heavy/light chain mispairing. We combine knob-into-hole or charge-pair expression optimization in upstream cell culture with high-resolution multi-modal chromatography and orthogonal analytical tools (icIEF, native SEC-MS) to resolve product-related impurities.',
    tags: ['Bispecifics', 'Mispairing', 'Knob-into-hole', 'Aggregation'],
  },

  // ==================== QUALITY & REGULATORY ====================
  {
    id: 'qual-1',
    category: 'quality',
    categoryLabel: 'Quality & Regulatory',
    question: 'Which global health authorities and cGMP regulations do your facilities adhere to?',
    answer: 'Our quality management system is designed to meet international standards across highly regulated markets, including the US Food and Drug Administration (FDA 21 CFR Parts 210/211/11), European Medicines Agency (EMA EudraLex Volume 4), Japan Pharmaceuticals and Medical Devices Agency (PMDA), and Australia Therapeutic Goods Administration (TGA).',
    tags: ['FDA', 'EMA', 'PMDA', 'TGA', 'cGMP', 'Compliance'],
  },
  {
    id: 'qual-2',
    category: 'quality',
    categoryLabel: 'Quality & Regulatory',
    question: 'Do you assist sponsors with CMC regulatory filings and dossiers?',
    answer: 'Yes. Our Regulatory Affairs team authors and reviews Chemistry, Manufacturing, and Controls (CMC) Module 3 documentation for Investigational New Drug (IND), Investigational Medicinal Product Dossier (IMPD), and Biologics License Application (BLA) submissions.',
    tags: ['CMC', 'IND', 'IMPD', 'BLA', 'Regulatory Affairs'],
  },

  // ==================== TECH TRANSFER & PARTNERING ====================
  {
    id: 'part-1',
    category: 'partnership',
    categoryLabel: 'Tech Transfer & Partnering',
    question: 'What is the typical technology transfer timeline to initiate a clinical batch?',
    answer: 'Timelines vary with process complexity and the scope of analytical qualification:',
    bullets: [
      'Document & Process Gap Assessment: 2 to 3 weeks following NDA execution.',
      'Pilot Development / Scale-Down Runs: 6 to 8 weeks.',
      'cGMP Clinical Drug Substance / Drug Product Campaign: 12 to 14 weeks from tech transfer kickoff.',
    ],
    tags: ['Tech Transfer', 'Timeline', 'Lead Time', 'Kickoff'],
  },
  {
    id: 'part-2',
    category: 'partnership',
    categoryLabel: 'Tech Transfer & Partnering',
    question: 'How does Lambda CDMO ensure intellectual property (IP) protection?',
    answer: 'Intellectual property protection is a core tenet of our operating philosophy. We maintain strict digital firewalls, isolated secure project directories with role-based access, 21 CFR Part 11 compliant audit trails, and strict confidentiality agreements across all staff.',
    tags: ['IP Protection', 'Confidentiality', 'Data Security', '21 CFR Part 11'],
  },
  {
    id: 'part-3',
    category: 'partnership',
    categoryLabel: 'Tech Transfer & Partnering',
    question: 'How do the London, UK and Ahmedabad, India sites collaborate during a project?',
    answer: 'Our London and Ahmedabad teams operate under a unified Quality Management System (QMS) and shared digital data repositories. Typically, early-stage upstream/downstream optimization and comparability studies can be executed in London, followed by seamless, risk-mitigated technology transfer into Ahmedabad cGMP manufacturing suites for clinical batch execution.',
    tags: ['Collaboration', 'UK', 'India', 'Unified QMS', 'Tech Transfer'],
  },
];
