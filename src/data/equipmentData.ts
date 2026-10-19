export interface EquipmentItem {
  src: string;
  title: string;
  subtitle: string;
  tag?: string;
}

export const CELL_DEV_EQUIPMENT: EquipmentItem[] = [
  {
    src: '/images/celldev/AMBR15.png',
    title: 'Ambr® 15 Automated Microbioreactor',
    subtitle: 'High-throughput micro-scale cell culture screening with automated sampling and feedback control.',
    tag: 'Cell Line Screening',
  },
  {
    src: '/images/celldev/Biosafety_Cabinet.png',
    title: 'Class II Type A2 Biosafety Cabinet',
    subtitle: 'Certified sterile environment for cell line transfection, single-cell cloning, and aseptic manipulation.',
    tag: 'Aseptic Processing',
  },
  {
    src: '/images/celldev/CLD_Lab.png',
    title: 'Cell Line Development Suite',
    subtitle: 'Integrated laboratory with high-throughput clone screening, automated liquid handling, and cell banking.',
    tag: 'Facility Suite',
  },
];

export const UPSTREAM_EQUIPMENT: EquipmentItem[] = [
  {
    src: '/images/upstream/AMBR250.png',
    title: 'Ambr® 250 High-Throughput Bioreactor',
    subtitle: 'Automated 24-way parallel mini-bioreactor system for DoE process optimization and scale-down modeling.',
    tag: 'Process Optimization',
  },
  {
    src: '/images/upstream/Bioreactor_control.png',
    title: 'Automated Bioreactor Control & Skid System',
    subtitle: 'Precision process automation for pH, dissolved oxygen, gas mixing, nutrient feed, and temperature loops.',
    tag: 'Process Control',
  },
  {
    src: '/images/upstream/Biosaftey_cabinet.png',
    title: 'Upstream Biosafety Cabinet Suite',
    subtitle: 'Dedicated Grade B/C containment for sterile inoculum prep, vial thawing, and seed train expansion.',
    tag: 'Inoculum Prep',
  },
  {
    src: '/images/upstream/Carbon_di_Oxide_shaker_incubator.png',
    title: 'CO2 Shaker Incubator',
    subtitle: 'High-capacity orbital shaking incubator with precise humidity and CO2 regulation for suspension cultures.',
    tag: 'Suspension Culture',
  },
  {
    src: '/images/upstream/Cedex_automated_cell_counter.png',
    title: 'Cedex Automated Cell Counter & Analyzer',
    subtitle: 'High-resolution trypan blue image analysis for viable cell density, viability percentage, and aggregation index.',
    tag: 'Cell Analytics',
  },
];

export const UPSTREAM_GMP_EQUIPMENT: EquipmentItem[] = [
  {
    src: '/images/upstream_GMP/549A7821.png',
    title: 'cGMP Upstream Cleanroom Suite',
    subtitle: 'Grade C classified upstream production suite featuring closed single-use processing line architecture.',
    tag: 'Cleanroom Suite',
  },
  {
    src: '/images/upstream_GMP/GMP Production bioreactor.png',
    title: 'GMP Production Bioreactor (200 L)',
    subtitle: 'Single-use production bioreactor train for clinical and commercial-ready biologic drug substance manufacturing.',
    tag: '200L SUB',
  },
  {
    src: '/images/upstream_GMP/GMP Seed bioreactor.png',
    title: 'GMP Seed Bioreactor (50 L)',
    subtitle: 'Intermediate scale-up bioreactor with automated feed and perfusion integration.',
    tag: '50L Seed Train',
  },
  {
    src: '/images/upstream_GMP/GMP Wave Bioreactor.png',
    title: 'GMP Wave Bioreactor System',
    subtitle: 'Low-shear rocking motion cultivation system for gentle seed train amplification and cell expansion.',
    tag: 'Seed Expansion',
  },
  {
    src: '/images/upstream_GMP/GMP Automated Bioanalyzer.png',
    title: 'GMP Automated Bioanalyzer',
    subtitle: 'Rapid multi-parameter metabolite testing (glucose, lactate, glutamine, electrolytes) for in-process monitoring.',
    tag: 'In-Process Testing',
  },
  {
    src: '/images/upstream_GMP/GMP Automated cell counter.png',
    title: 'GMP Automated Cell Counter',
    subtitle: 'Validated 21 CFR Part 11 compliant automated cell count and viability assessment in cleanroom environments.',
    tag: 'Cleanroom QC',
  },
  {
    src: '/images/upstream_GMP/GMP Bentch top centrifuge.png',
    title: 'GMP Benchtop Centrifuge',
    subtitle: 'High-speed refrigerated benchtop centrifuge for sample clarification and in-process cell pelleting.',
    tag: 'Centrifugation',
  },
  {
    src: '/images/upstream_GMP/GMP CO2 shaker incubator.png',
    title: 'GMP Cleanroom CO2 Shaker Incubator',
    subtitle: 'Grade C cleanroom incubator train supporting initial vial thaw and shake flask seed progression.',
    tag: 'Vial Thaw',
  },
  {
    src: '/images/upstream_GMP/GMP Cell bank storage system.png',
    title: 'GMP Cryogenic Cell Bank Storage',
    subtitle: 'Monitored vapor-phase liquid nitrogen storage for Master (MCB) and Working (WCB) cell banks.',
    tag: 'Cryo Banking',
  },
  {
    src: '/images/upstream_GMP/GMP Depth filter holder.png',
    title: 'GMP Depth Filtration Harvest Skid',
    subtitle: 'Single-use multi-stage depth filter system for high-efficiency primary clarification of biologic harvests.',
    tag: 'Harvest Clarification',
  },
  {
    src: '/images/upstream_GMP/GMP Inverted Microscope.png',
    title: 'GMP Inverted Phase Contrast Microscope',
    subtitle: 'High-optical-resolution morphological evaluation and sterility check during seed train cultivation.',
    tag: 'Morphology QC',
  },
  {
    src: '/images/upstream_GMP/GMP Overhead stirrer.png',
    title: 'GMP Overhead Stirrer & Media Prep Tank',
    subtitle: 'Homogeneous sterile media and buffer preparation with continuous impeller speed control.',
    tag: 'Media Compounding',
  },
  {
    src: '/images/upstream_GMP/GMP Quattroflow pump.png',
    title: 'GMP Quattroflow Diaphragm Pump',
    subtitle: 'Four-piston low-shear diaphragm pump ensuring zero product degradation during delicate biologic fluid transfer.',
    tag: 'Fluid Transfer',
  },
  {
    src: '/images/upstream_GMP/50 L Single use mixer (SUM)(DSP25-0106).png',
    title: '50 L Single-Use Mixer (SUM)',
    subtitle: 'Closed single-use mixing system for sterile media hydration, buffer compounding, and harvest conditioning.',
    tag: 'Single-Use Mixer',
  },
];

export const DOWNSTREAM_GMP_EQUIPMENT: EquipmentItem[] = [
  {
    src: '/images/downstream_GMP/300X300 Axichrom column(DSP25-0222).png',
    title: '300x300 AxiChrom Chromatography Column',
    subtitle: 'Automated hydraulic axial compression column for reproducible, scalable GMP purification cycles.',
    tag: 'Axial Compression',
  },
  {
    src: '/images/downstream_GMP/AKTA Pilot Chromatography system(DSP25-0116).png',
    title: 'ÄKTA Pilot Chromatography Skid',
    subtitle: 'Sanitary bioprocess chromatography system supporting pre-clinical and Phase I/II clinical batch purification.',
    tag: 'GMP Skid',
  },
  {
    src: '/images/downstream_GMP/Automated TFF system with SUM(DSP25-0117).png',
    title: 'Automated TFF System with SUM',
    subtitle: 'Automated ultrafiltration and diafiltration system paired with single-use mixers for final drug substance concentration.',
    tag: 'UF/DF System',
  },
  {
    src: '/images/downstream_GMP/Axichrom column controller(DSP25-0230).png',
    title: 'AxiChrom Column Intelligent Controller',
    subtitle: 'Automated bed height calculation, bed pressure sensing, and verified packing efficiency diagnostics.',
    tag: 'Column Control',
  },
  {
    src: '/images/downstream_GMP/HiScale Column.png',
    title: 'HiScale High-Resolution Column',
    subtitle: 'Biocompatible pressure-rated glass column for pilot-scale affinity, IEX, and HIC purification polishing.',
    tag: 'Column Hardware',
  },
];

export const DOWNSTREAM_EQUIPMENT: EquipmentItem[] = [
  {
    src: '/images/down stream/AKTA Pilot.png',
    title: 'ÄKTA Pilot System',
    subtitle: 'Pilot-scale purification system bridging laboratory benchtop development and full cGMP commercial processing.',
    tag: 'Pilot Purification',
  },
  {
    src: '/images/down stream/AKTA Pure 150_Akta Avant.png',
    title: 'ÄKTA Pure 150 & ÄKTA Avant Systems',
    subtitle: 'High-speed automated chromatography for resin screening, DoE method development, and impurity clearance.',
    tag: 'Method Development',
  },
  {
    src: '/images/down stream/Tecan Freedom EVO.png',
    title: 'Tecan Freedom EVO Liquid Handler',
    subtitle: 'Robotic high-throughput liquid handling workstation for 96-well microscale chromatography resin plate screening.',
    tag: 'High-Throughput DSP',
  },
  {
    src: '/images/down stream/TFF System.png',
    title: 'Tangential Flow Filtration (TFF) System',
    subtitle: 'Precision lab and pilot-scale cassette ultrafiltration & diafiltration for product concentration and buffer exchange.',
    tag: 'UF/DF Skid',
  },
  {
    src: '/images/down stream/Column Storage Rack.png',
    title: 'Sanitized Column Storage & Handling Rack',
    subtitle: 'Dedicated cleanroom storage rack maintaining sanitized, pressure-tested chromatography columns ready for operation.',
    tag: 'Column Management',
  },
];

export const DRUG_PRODUCT_EQUIPMENT: EquipmentItem[] = [
  {
    src: '/images/Drugproductdev/FDL Lab.png',
    title: 'Formulation & Drug Product (FDL) Laboratory',
    subtitle: 'State-of-the-art facility for formulation screening, excipient compatibility, and container closure integrity studies.',
    tag: 'Formulation Lab',
  },
  {
    src: '/images/Drugproductdev/Lyophilizer in FDL Lab.png',
    title: 'Development Lyophilizer (Freeze Dryer)',
    subtitle: 'Precision freeze-dryer equipped with 0.5 m² shelf area, Pirani gauge vacuum sensors, and controlled nucleation.',
    tag: 'Lyophilization',
  },
  {
    src: '/images/Drugproductdev/Cooling Chamber in FDL Lab.png',
    title: 'Precision Temperature & Cooling Chamber',
    subtitle: 'ICH Q1A stability chambers for real-time, accelerated, and freeze-thaw thermal stability evaluations.',
    tag: 'Stability Chamber',
  },
];

export const ANALYTICAL_EQUIPMENT: EquipmentItem[] = [
  {
    src: '/images/Analytical/Orbitrap.png',
    title: 'Thermo Scientific™ Orbitrap™ Mass Spectrometer',
    subtitle: 'Ultra-high resolution mass spectrometry for intact mass analysis, subunit profiling, and disulfide bond mapping.',
    tag: 'High-Res MS',
  },
  {
    src: '/images/Analytical/Q ToF.png',
    title: 'Q-TOF High-Resolution LC-MS/MS System',
    subtitle: 'Comprehensive peptide mapping, PTM site localization, sequence confirmation, and glycan identification.',
    tag: 'Peptide Mapping',
  },
  {
    src: '/images/Analytical/Octet.png',
    title: 'Octet® Bio-Layer Interferometry (BLI)',
    subtitle: 'Label-free fluidic-free molecular interaction analysis for titer quantification and high-throughput binding screening.',
    tag: 'BLI Assay',
  },
  {
    src: '/images/Analytical/BIOPHASE.png',
    title: 'BioPhase 8800 Multi-Capillary Electrophoresis',
    subtitle: '8-capillary parallel CE-SDS and CIEF for high-throughput purity, size heterogeneity, and charge variant determination.',
    tag: 'Multi-Capillary CE',
  },
  {
    src: '/images/Analytical/Maurice.png',
    title: 'Maurice™ cIEF & CE-SDS System',
    subtitle: 'Automated capillary isoelectric focusing and CE-SDS delivering rapid charge heterogeneity profiling in under 10 minutes.',
    tag: 'cIEF & CE-SDS',
  },
  {
    src: '/images/Analytical/UPLC- Thermo.png',
    title: 'Thermo Scientific™ Vanquish™ Horizon UPLC',
    subtitle: 'Biocompatible binary and quaternary UPLC for high-resolution peptide mapping, glycan profiling, and intact mass coupling.',
    tag: 'UPLC Platform',
  },
  {
    src: '/images/Analytical/UPLC.png',
    title: 'Waters ACQUITY™ Arc / UPLC System',
    subtitle: 'Validated SEC-HPLC, IEX-HPLC, and reversed-phase methods for aggregation, purity, and batch release testing.',
    tag: 'Validated SEC/IEX',
  },
  {
    src: '/images/Analytical/Circular Dichroism.png',
    title: 'Circular Dichroism (CD) Spectrometer',
    subtitle: 'Far-UV and Near-UV CD spectroscopy for secondary (alpha-helix, beta-sheet) and tertiary higher order structure (HOS).',
    tag: 'HOS Spectroscopy',
  },
  {
    src: '/images/Analytical/FT-IR.png',
    title: 'FTIR Spectrometer with ATR Module',
    subtitle: 'Fourier Transform Infrared spectroscopy evaluating secondary structure conformational stability and protein folding.',
    tag: 'FTIR Structural',
  },
  {
    src: '/images/Analytical/nanoDSF.png',
    title: 'Prometheus nanoDSF Thermal Stability Analyzer',
    subtitle: 'High-precision intrinsic fluorescence measurement for thermal melting point (Tm), onset (Tonset), and aggregation (Tagg).',
    tag: 'nanoDSF Stability',
  },
  {
    src: '/images/Analytical/SoloVPE.png',
    title: 'SoloVPE Variable Pathlength Spectroscopy',
    subtitle: 'Rapid, direct protein concentration measurement without sample dilution via Slope Spectroscopy (Beer-Lambert law).',
    tag: 'SoloVPE',
  },
  {
    src: '/images/Analytical/Flow Cytometer.png',
    title: 'High-Performance Multi-Laser Flow Cytometer',
    subtitle: 'Multiparametric cell-based fluorescence analysis for target engagement, cellular binding, and ADCC/CDC bioassays.',
    tag: 'Flow Cytometry',
  },
  {
    src: '/images/Analytical/Multimode reader.png',
    title: 'Multimode Microplate Reader',
    subtitle: 'Fluorescence resonance energy transfer (FRET), luminescence, and absorbance for functional cell-based potency assays.',
    tag: 'Bioassay Reader',
  },
  {
    src: '/images/Analytical/Cell Celector.png',
    title: 'CellCelector Automated Single-Cell Picker',
    subtitle: 'Automated microscopic image-based selection and transfer of high-producing single clones with image audit trail.',
    tag: 'Clone Selection',
  },
  {
    src: '/images/Analytical/Liquid Handling System.png',
    title: 'Automated Robotic Liquid Handling System',
    subtitle: 'Precision multi-channel pipetting for high-throughput sample prep, ELISA assays, and automated serial dilutions.',
    tag: 'Robotic Liquid Handler',
  },
  {
    src: '/images/Analytical/RT-PCR.png',
    title: 'Real-Time Quantitative PCR (RT-qPCR) System',
    subtitle: 'High-sensitivity residual host cell DNA (HCD) quantitation and genetic stability evaluation for biologic drug substance.',
    tag: 'RT-qPCR Molecular',
  },
  {
    src: '/images/Analytical/AMBR15.png',
    title: 'Ambr® 15 Micro-Culture System',
    subtitle: 'Automated microbioreactor system supporting clone ranking, media evaluation, and analytical process sampling.',
    tag: 'Analytical Sampling',
  },
];

// ==========================================
// LONDON, UK FACILITY EQUIPMENT PLATFORMS
// ==========================================

export const UK_UPSTREAM_EQUIPMENT: EquipmentItem[] = [
  {
    src: '/images/uk/upstream/Ambr 250 High-Throughput Bioreactor System.png',
    title: 'Ambr® 250 High-Throughput Bioreactor',
    subtitle: 'Automated parallel mini-bioreactor system for upstream clone screening, media evaluation, and DoE process optimization.',
    tag: 'Ambr 250 HT',
  },
  {
    src: '/images/uk/upstream/Integrated ATF Perfusion Bioreactor System.png',
    title: 'Integrated ATF Perfusion Bioreactor',
    subtitle: 'Alternating Tangential Flow (ATF) perfusion system enabling high-density continuous cell culture intensification.',
    tag: 'ATF Perfusion',
  },
  {
    src: '/images/uk/upstream/Parallel 5 L Bench-Scale Bioreactor Platform for Upstream Process Development.jpg',
    title: 'Parallel 5L Bench-Scale Bioreactors',
    subtitle: 'Glass stirred-tank benchtop bioreactor array for parameter optimization, feed strategy, and scale-up studies.',
    tag: '5L Bioreactors',
  },
  {
    src: '/images/uk/upstream/Shake Flask Culture and Seed Train Development.jpg',
    title: 'Shake Flask & Seed Train Development Suite',
    subtitle: 'Controlled orbital shaking platforms for cell line revival, seed train scale-up, and clone expansion protocols.',
    tag: 'Seed Train Suite',
  },
  {
    src: '/images/uk/upstream/Automated Cell Viability and Cell Density Analysis.jpg',
    title: 'Automated Cell Viability & Density Analyzer',
    subtitle: 'High-throughput automated image-based cell viability, viable cell density (VCD), and diameter tracking.',
    tag: 'Cell Analytics',
  },
  {
    src: '/images/uk/upstream/Cell Culture Analytics and Process Monitoring.jpg',
    title: 'Cedex Bio Metabolite Analyzer',
    subtitle: 'Automated photometric analyzer for in-process monitoring of substrates, metabolites, and IgG titer.',
    tag: 'Metabolite Testing',
  },
  {
    src: '/images/uk/upstream/Automated Osmolality Measurement.png',
    title: 'Automated Osmometer System',
    subtitle: 'Precision freezing-point depression osmometer for cell culture media and feed osmolality verification.',
    tag: 'Osmometry',
  },
  {
    src: '/images/uk/upstream/Milli-Q Water Purification Platform.png',
    title: 'Milli-Q® Ultrapure Water Platform',
    subtitle: 'Validated Type 1 ultrapure water platform dedicated to cell culture media preparation and sterile buffer prep.',
    tag: 'Water Purification',
  },
];

export const UK_DOWNSTREAM_EQUIPMENT: EquipmentItem[] = [
  {
    src: '/images/uk/downstream/Akta Avant automated chromatography system.png',
    title: 'ÄKTA™ Avant Chromatography System',
    subtitle: 'High-performance automated chromatography system for fast, secure resin screening and robust DSP method development.',
    tag: 'ÄKTA Avant',
  },
  {
    src: '/images/uk/downstream/Akta Pure automated chromatography system.png',
    title: 'ÄKTA™ Pure Chromatography System',
    subtitle: 'Flexible automated liquid chromatography system for purification of proteins, peptides, and monoclonal antibodies.',
    tag: 'ÄKTA Pure',
  },
  {
    src: '/images/uk/downstream/Avant automated chromatography system.png',
    title: 'Automated Preparative Chromatography Skid',
    subtitle: 'Precision gradient and multi-wavelength monitoring for capture, intermediate purification, and polishing.',
    tag: 'Prep Chromatography',
  },
  {
    src: '/images/uk/downstream/Repligen automated Tangential flow filtration (TFF) system.png',
    title: 'Repligen Automated TFF System',
    subtitle: 'Automated tangential flow filtration system for ultrafiltration, diafiltration, and high-concentration UF/DF.',
    tag: 'Automated TFF',
  },
];

export const UK_ANALYTICAL_EQUIPMENT: EquipmentItem[] = [
  {
    src: '/images/uk/analytical/LCMS system.jpg',
    title: 'High-Resolution LC-MS System',
    subtitle: 'Liquid chromatography-mass spectrometry platform for intact mass analysis, subunit profiling, and peptide mapping.',
    tag: 'High-Res LC-MS',
  },
  {
    src: '/images/uk/analytical/Advanced HPLC systems.jpg',
    title: 'Advanced Analytical HPLC Systems',
    subtitle: 'Multi-detector HPLC platforms for size-exclusion (SEC), ion-exchange (IEX), and reversed-phase (RP) analytics.',
    tag: 'SEC / IEX HPLC',
  },
  {
    src: '/images/uk/analytical/UPLC systems.jpg',
    title: 'Ultra-Performance Liquid Chromatography (UPLC)',
    subtitle: 'Sub-2-micron column UPLC for ultra-high resolution glycan profiling, peptide mapping, and purity testing.',
    tag: 'UPLC Platform',
  },
  {
    src: '/images/uk/analytical/Capillary Electrophoresis system.jpg',
    title: 'Capillary Electrophoresis (CE) System',
    subtitle: 'Automated CE-SDS and cIEF for rapid charge variant analysis, purity determination, and size heterogeneity.',
    tag: 'CE-SDS / cIEF',
  },
  {
    src: '/images/uk/analytical/HPLC systems with fraction collector.jpg',
    title: 'HPLC System with Automated Fraction Collector',
    subtitle: 'Preparative fraction collection for impurity isolation, post-translational modification analysis, and characterization.',
    tag: 'Fraction Collection',
  },
];

export const UK_BIOSIMILAR_EQUIPMENT: EquipmentItem[] = [
  {
    src: '/images/uk/biosimiler/Bio Safety Cabinet-BSC.jpg',
    title: 'Class II Biosafety Cabinet Suite',
    subtitle: 'Certified laminar flow sterile containment for reference product manipulation and clone screening.',
    tag: 'Biosafety Suite',
  },
  {
    src: '/images/uk/biosimiler/CO2 Incubators.jpg',
    title: 'Precision CO2 Shaker Incubators',
    subtitle: 'Controlled environment incubators for parallel biosimilar clone growth and comparability culture.',
    tag: 'CO2 Incubators',
  },
  {
    src: '/images/uk/biosimiler/Cell counter.jpg',
    title: 'Automated Cell Counter & Viability System',
    subtitle: 'High-throughput image cytometer for biosimilar cell line growth kinetics and viability monitoring.',
    tag: 'Cell Analytics',
  },
  {
    src: '/images/uk/biosimiler/Plate Reader.jpg',
    title: 'Multimode Microplate Reader',
    subtitle: 'Absorbance, fluorescence, and luminescence detection for biosimilar ELISA, binding, and functional potency bioassays.',
    tag: 'Bioassay Reader',
  },
  {
    src: '/images/uk/biosimiler/Centrifuge.jpg',
    title: 'Benchtop High-Speed Refrigerated Centrifuge',
    subtitle: 'Temperature-controlled centrifugation for sample preparation, cell harvesting, and clarified lysate isolation.',
    tag: 'Centrifugation',
  },
];

export function getSectionEquipment(sectionTitle: string, pageSlug?: string): EquipmentItem[] | null {
  const combined = `${sectionTitle} ${pageSlug || ''}`.toLowerCase();
  const slugLower = (pageSlug || '').toLowerCase();
  const isUK = slugLower === 'uk' || slugLower === 'london' || combined.includes('uk') || combined.includes('london');

  if (isUK) {
    if (combined.includes('upstream')) {
      return UK_UPSTREAM_EQUIPMENT;
    }
    if (combined.includes('downstream')) {
      return UK_DOWNSTREAM_EQUIPMENT;
    }
    if (combined.includes('analytical') || combined.includes('characterization')) {
      return UK_ANALYTICAL_EQUIPMENT;
    }
    if (combined.includes('biosimilar')) {
      return UK_BIOSIMILAR_EQUIPMENT;
    }
  }

  if (
    combined.includes('cell line') ||
    combined.includes('cld') ||
    combined.includes('cell-line') ||
    combined.includes('mammalian expression') ||
    combined.includes('clone')
  ) {
    return CELL_DEV_EQUIPMENT;
  }
  if (
    combined.includes('upstream cgmp') ||
    combined.includes('cgmp manufacturing') ||
    combined.includes('upstream production') ||
    combined.includes('drug-substance') ||
    combined.includes('drug substance') ||
    combined.includes('gmp transfer')
  ) {
    return UPSTREAM_GMP_EQUIPMENT;
  }
  if (combined.includes('upstream process') || combined.includes('upstream')) {
    return UPSTREAM_EQUIPMENT;
  }
  if (
    combined.includes('gmp downstream') ||
    combined.includes('downstream gmp') ||
    combined.includes('gmp purification') ||
    (combined.includes('downstream') && combined.includes('gmp'))
  ) {
    return DOWNSTREAM_GMP_EQUIPMENT;
  }
  if (combined.includes('downstream') || combined.includes('dsp') || combined.includes('purification')) {
    return DOWNSTREAM_EQUIPMENT;
  }
  if (combined.includes('drug product') || combined.includes('formulation') || combined.includes('lyophilization')) {
    return DRUG_PRODUCT_EQUIPMENT;
  }
  if (
    combined.includes('analytical') ||
    combined.includes('characterization') ||
    combined.includes('platforms') ||
    combined.includes('testing')
  ) {
    return ANALYTICAL_EQUIPMENT;
  }
  return null;
}

export function getPageEquipment(pageSlug: string): EquipmentItem[] | null {
  const lower = pageSlug.toLowerCase();
  if (lower === 'uk' || lower === 'london') {
    return [...UK_UPSTREAM_EQUIPMENT, ...UK_DOWNSTREAM_EQUIPMENT, ...UK_ANALYTICAL_EQUIPMENT, ...UK_BIOSIMILAR_EQUIPMENT];
  }
  if (lower.includes('cell-line') || lower.includes('cell line') || lower.includes('cld')) {
    return CELL_DEV_EQUIPMENT;
  }
  if (lower.includes('process')) {
    return [...UPSTREAM_EQUIPMENT, ...DOWNSTREAM_EQUIPMENT];
  }
  if (lower.includes('analytical') || lower.includes('characterization')) {
    return ANALYTICAL_EQUIPMENT;
  }
  if (lower.includes('drug-product')) {
    return DRUG_PRODUCT_EQUIPMENT;
  }
  if (lower.includes('drug-substance')) {
    return [...UPSTREAM_GMP_EQUIPMENT, ...DOWNSTREAM_GMP_EQUIPMENT];
  }
  return null;
}

export const ALL_EQUIPMENT_ITEMS: EquipmentItem[] = [
  ...CELL_DEV_EQUIPMENT,
  ...UPSTREAM_EQUIPMENT,
  ...UPSTREAM_GMP_EQUIPMENT,
  ...DOWNSTREAM_GMP_EQUIPMENT,
  ...DOWNSTREAM_EQUIPMENT,
  ...DRUG_PRODUCT_EQUIPMENT,
  ...ANALYTICAL_EQUIPMENT,
  ...UK_UPSTREAM_EQUIPMENT,
  ...UK_DOWNSTREAM_EQUIPMENT,
  ...UK_ANALYTICAL_EQUIPMENT,
  ...UK_BIOSIMILAR_EQUIPMENT,
];

