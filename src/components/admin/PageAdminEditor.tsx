'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Eye,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Copy,
  Upload,
  Sparkles,
  LayoutGrid,
  Globe,
  Sliders,
  HelpCircle,
  FileSpreadsheet,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  Film,
  FolderOpen,
  Link as LinkIcon,
  Tag,
  ListTree,
  Images,
  Video,
  Check,
  MousePointerClick,
  Rocket,
  RotateCcw,
  Clock,
  ShieldAlert,
  Play,
  MapPin,
  Building2,
  Microscope,
  Factory,
  FlaskConical,
  Dna,
  Syringe,
  Activity,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Maximize2,
  X,
  Gauge,
  ShieldCheck,
  Target,
  Search,
  Settings,
  Beaker,
  Package,
  Scale,
  Quote,
  HeartPulse,
  Bug,
  Users,
  Award,
  GraduationCap,
  Workflow,
  TrendingUp
} from 'lucide-react';
import type { CDMOPage, CDMOSection } from '@/data/cdmoData';
import { getSectionEquipment, ALL_EQUIPMENT_ITEMS } from '@/data/equipmentData';
import SectionLayoutGalleryModal, {
  SectionLayoutOption,
  SECTION_LAYOUTS
} from './SectionLayoutGalleryModal';

// Preset Media Gallery with Categorized Tabs
export interface PresetMediaItem {
  label: string;
  url: string;
  type: 'image' | 'video';
  category: 'videos' | 'cleanroom' | 'upstream' | 'downstream' | 'analytical' | 'modalities';
  badge?: string;
}

export const PRESET_MEDIA_GALLERY: PresetMediaItem[] = [
  // 1. Cinematic Videos
  {
    label: 'Hero Bioprocess Flow Video',
    url: '/videos/newhero.mp4',
    type: 'video',
    category: 'videos',
    badge: 'Hero Video'
  },
  {
    label: 'Floating Protein Molecule Video',
    url: '/videos/Floating-Molecule-Video.mp4',
    type: 'video',
    category: 'videos',
    badge: '3D Molecule'
  },
  {
    label: 'DNA Double Helix Animation',
    url: '/videos/herodnavideo.mp4',
    type: 'video',
    category: 'videos',
    badge: 'Genomics'
  },
  {
    label: 'Cinematic CTA Cleanroom Footage',
    url: '/cta-bg-video.mp4',
    type: 'video',
    category: 'videos',
    badge: 'Cleanroom CTA'
  },
  {
    label: 'Medical Lab Footage (WebM)',
    url: '/videos/medical-lab-footage.webm',
    type: 'video',
    category: 'videos',
    badge: 'Lab Footage'
  },
  {
    label: 'Hero Cleanroom Ambient (WebM)',
    url: '/videos/hero2.webm',
    type: 'video',
    category: 'videos',
    badge: 'Cleanroom'
  },

  // 2. Cleanrooms & Facilities
  {
    label: 'Hero Cleanroom & Bioreactor Suite',
    url: '/images/hero_cleanroom.png',
    type: 'image',
    category: 'cleanroom',
    badge: 'cGMP Suite'
  },
  {
    label: 'Ahmedabad CDMO Campus (Blue Facade)',
    url: '/images/CDMOblue.png',
    type: 'image',
    category: 'cleanroom',
    badge: 'Campus'
  },
  {
    label: 'London Innovation Laboratory',
    url: '/images/Lab.jpg',
    type: 'image',
    category: 'cleanroom',
    badge: 'London Lab'
  },
  {
    label: 'Process Development Suites',
    url: '/images/development.jpg',
    type: 'image',
    category: 'cleanroom',
    badge: 'Development'
  },
  {
    label: 'cGMP Manufacturing Operations',
    url: '/images/cGMP.png',
    type: 'image',
    category: 'cleanroom',
    badge: 'Manufacturing'
  },
  {
    label: 'Lambda CDMO Headquarters Building',
    url: '/images/Lamdabuilding.jpg',
    type: 'image',
    category: 'cleanroom',
    badge: 'Exterior'
  },

  // 3. Upstream Bioprocess & cGMP Upstream Manufacturing
  {
    label: 'cGMP Upstream Cleanroom Suite (549A7821)',
    url: '/images/upstream_GMP/549A7821.png',
    type: 'image',
    category: 'upstream',
    badge: 'GMP Suite'
  },
  {
    label: 'GMP Production Bioreactor (200 L)',
    url: '/images/upstream_GMP/GMP Production bioreactor.png',
    type: 'image',
    category: 'upstream',
    badge: '200L SUB'
  },
  {
    label: 'GMP Seed Bioreactor (50 L)',
    url: '/images/upstream_GMP/GMP Seed bioreactor.png',
    type: 'image',
    category: 'upstream',
    badge: '50L Seed Train'
  },
  {
    label: 'GMP Wave Bioreactor System',
    url: '/images/upstream_GMP/GMP Wave Bioreactor.png',
    type: 'image',
    category: 'upstream',
    badge: 'Wave Bioreactor'
  },
  {
    label: 'GMP Automated Bioanalyzer',
    url: '/images/upstream_GMP/GMP Automated Bioanalyzer.png',
    type: 'image',
    category: 'upstream',
    badge: 'Bioanalyzer'
  },
  {
    label: 'GMP Automated Cell Counter',
    url: '/images/upstream_GMP/GMP Automated cell counter.png',
    type: 'image',
    category: 'upstream',
    badge: 'Cell Counter'
  },
  {
    label: 'GMP Refrigerated Benchtop Centrifuge',
    url: '/images/upstream_GMP/GMP Bentch top centrifuge.png',
    type: 'image',
    category: 'upstream',
    badge: 'Centrifuge'
  },
  {
    label: 'GMP Cleanroom CO2 Shaker Incubator',
    url: '/images/upstream_GMP/GMP CO2 shaker incubator.png',
    type: 'image',
    category: 'upstream',
    badge: 'Vial Thaw'
  },
  {
    label: 'GMP Cryogenic Cell Bank Storage System',
    url: '/images/upstream_GMP/GMP Cell bank storage system.png',
    type: 'image',
    category: 'upstream',
    badge: 'Cryo Banking'
  },
  {
    label: 'GMP Depth Filtration Harvest Skid',
    url: '/images/upstream_GMP/GMP Depth filter holder.png',
    type: 'image',
    category: 'upstream',
    badge: 'Depth Filter'
  },
  {
    label: 'GMP Inverted Phase Contrast Microscope',
    url: '/images/upstream_GMP/GMP Inverted Microscope.png',
    type: 'image',
    category: 'upstream',
    badge: 'Microscope'
  },
  {
    label: 'GMP Overhead Stirrer & Media Prep Tank',
    url: '/images/upstream_GMP/GMP Overhead stirrer.png',
    type: 'image',
    category: 'upstream',
    badge: 'Media Prep'
  },
  {
    label: 'GMP Quattroflow Diaphragm Fluid Transfer Pump',
    url: '/images/upstream_GMP/GMP Quattroflow pump.png',
    type: 'image',
    category: 'upstream',
    badge: 'Fluid Pump'
  },
  {
    label: '50 L Single-Use Mixer (SUM)',
    url: '/images/upstream_GMP/50 L Single use mixer (SUM)(DSP25-0106).png',
    type: 'image',
    category: 'upstream',
    badge: 'Single-Use Mixer'
  },
  {
    label: 'Ambr 250 High-Throughput Bioreactor',
    url: '/images/upstream/AMBR250.png',
    type: 'image',
    category: 'upstream',
    badge: 'Micro-Bioreactor'
  },
  {
    label: 'Bioreactor SCADA Control Skid',
    url: '/images/upstream/Bioreactor_control.png',
    type: 'image',
    category: 'upstream',
    badge: 'Automation'
  },
  {
    label: 'Biosafety Cabinet Grade A Workstation',
    url: '/images/upstream/Biosaftey_cabinet.png',
    type: 'image',
    category: 'upstream',
    badge: 'Sterile Culture'
  },
  {
    label: 'Carbon Dioxide Shaker Incubator',
    url: '/images/upstream/Carbon_di_Oxide_shaker_incubator.png',
    type: 'image',
    category: 'upstream',
    badge: 'Cell Shaker'
  },
  {
    label: 'Cedex Automated Cell Viability Counter',
    url: '/images/upstream/Cedex_automated_cell_counter.png',
    type: 'image',
    category: 'upstream',
    badge: 'Viability Analytics'
  },

  // 4. Downstream Chromatography & GMP Purification
  {
    label: '300x300 AxiChrom Chromatography Column (GMP)',
    url: '/images/downstream_GMP/300X300 Axichrom column(DSP25-0222).png',
    type: 'image',
    category: 'downstream',
    badge: 'AxiChrom Column'
  },
  {
    label: 'ÄKTA Pilot Chromatography Skid (GMP)',
    url: '/images/downstream_GMP/AKTA Pilot Chromatography system(DSP25-0116).png',
    type: 'image',
    category: 'downstream',
    badge: 'GMP Skid'
  },
  {
    label: 'Automated TFF System with SUM (GMP)',
    url: '/images/downstream_GMP/Automated TFF system with SUM(DSP25-0117).png',
    type: 'image',
    category: 'downstream',
    badge: 'UF/DF System'
  },
  {
    label: 'AxiChrom Column Intelligent Controller (GMP)',
    url: '/images/downstream_GMP/Axichrom column controller(DSP25-0230).png',
    type: 'image',
    category: 'downstream',
    badge: 'Column Control'
  },
  {
    label: 'Chromatography Skid Co-Prime (GMP)',
    url: '/images/downstream_GMP/Chromatography Skid, Co-prime (DSP25-0118).png',
    type: 'image',
    category: 'downstream',
    badge: 'Chromatography'
  },
  {
    label: 'HiScale High-Resolution Column (GMP)',
    url: '/images/downstream_GMP/HiScale Column.png',
    type: 'image',
    category: 'downstream',
    badge: 'Column Hardware'
  },
  {
    label: 'AKTA Pilot Chromatography Skid (Process Dev)',
    url: '/images/down stream/AKTA Pilot.png',
    type: 'image',
    category: 'downstream',
    badge: 'Purification Skid'
  },
  {
    label: 'AKTA Pure 150 & Avant Systems',
    url: '/images/down stream/AKTA Pure 150_Akta Avant.png',
    type: 'image',
    category: 'downstream',
    badge: 'FPLC Skid'
  },
  {
    label: 'Process Column Storage Rack',
    url: '/images/down stream/Column Storage Rack.png',
    type: 'image',
    category: 'downstream',
    badge: 'Columns'
  },
  {
    label: 'Tangential Flow Filtration (TFF) Skid',
    url: '/images/down stream/TFF System.png',
    type: 'image',
    category: 'downstream',
    badge: 'Ultrafiltration'
  },
  {
    label: 'Tecan Freedom EVO Liquid Handler',
    url: '/images/down stream/Tecan Freedom EVO.png',
    type: 'image',
    category: 'downstream',
    badge: 'Robotics'
  },

  // 5. Analytical Characterization
  {
    label: 'Biacore 8K+ Surface Plasmon Resonance',
    url: '/images/Analytical/Biacore 8K+.png',
    type: 'image',
    category: 'analytical',
    badge: 'Binding Kinetics'
  },
  {
    label: 'Thermo Orbitrap High-Resolution Mass Spec',
    url: '/images/Analytical/Orbitrap.png',
    type: 'image',
    category: 'analytical',
    badge: 'High-Res MS'
  },
  {
    label: 'Q-ToF Quadrupole Time-of-Flight Mass Spec',
    url: '/images/Analytical/Q ToF.png',
    type: 'image',
    category: 'analytical',
    badge: 'LC-MS/MS'
  },
  {
    label: 'Maurice cIEF & CE-SDS System',
    url: '/images/Analytical/Maurice.png',
    type: 'image',
    category: 'analytical',
    badge: 'Charge Heterogeneity'
  },
  {
    label: 'nanoDSF Conformational Stability Analyzer',
    url: '/images/Analytical/nanoDSF.png',
    type: 'image',
    category: 'analytical',
    badge: 'Thermal Shift'
  },
  {
    label: 'Octet Bio-Layer Interferometry (BLI)',
    url: '/images/Analytical/Octet.png',
    type: 'image',
    category: 'analytical',
    badge: 'Titer & Kinetics'
  },
  {
    label: 'Waters UPLC Orthogonal Chromatography',
    url: '/images/Analytical/UPLC.png',
    type: 'image',
    category: 'analytical',
    badge: 'Purity & SEC'
  },

  // 6. Therapeutic Modalities
  {
    label: 'Monoclonal Antibodies (mAbs)',
    url: '/images/modalities/mAb.png',
    type: 'image',
    category: 'modalities',
    badge: 'IgG1 / IgG4'
  },
  {
    label: 'Bispecific Antibodies & Dual Targeting',
    url: '/images/modalities/Bispecific_Antibody.png',
    type: 'image',
    category: 'modalities',
    badge: 'BsAb'
  },
  {
    label: 'Antibody-Drug Conjugates (ADCs)',
    url: '/images/modalities/Antibody-Drug_Conjugate.png',
    type: 'image',
    category: 'modalities',
    badge: 'Conjugates'
  },
  {
    label: 'Recombinant Proteins & Synthetic Peptides',
    url: '/images/modalities/Proteins_and_Peptides.png',
    type: 'image',
    category: 'modalities',
    badge: 'Fusion Proteins'
  }
];

const COMMON_ICONS = [
  'FlaskConical',
  'Factory',
  'Microscope',
  'Dna',
  'Beaker',
  'Package',
  'Search',
  'Activity',
  'Scale',
  'HeartPulse',
  'Bug',
  'ShieldCheck',
  'Globe',
  'Users',
  'Building2',
  'Gauge',
  'Layers',
  'Sparkles',
  'Target',
  'GitMerge',
  'Syringe',
  'Boxes',
  'Settings',
  'MapPin'
];

interface PageAdminEditorProps {
  initialPage: CDMOPage;
  onBack: () => void;
  onSaved: (savedPage: CDMOPage) => void;
}

/** Helper to check if a URL is a video */
function isVideoUrl(url?: string, mediaType?: string): boolean {
  if (!url) return false;
  if (mediaType === 'video') return true;
  const clean = url.toLowerCase().split('?')[0];
  return (
    clean.endsWith('.mp4') ||
    clean.endsWith('.webm') ||
    clean.endsWith('.ogg') ||
    clean.includes('/videos/')
  );
}

/**
 * Reusable Media Control with Live Playable Video Player or Image Thumbnail
 */
interface MediaControlWithPreviewProps {
  label: string;
  mediaUrl: string;
  mediaType?: 'image' | 'video';
  onChangeUrl: (url: string) => void;
  onChangeMediaType?: (type: 'image' | 'video') => void;
  onOpenPresetGallery: () => void;
  onUploadFile: (file: File) => void;
  uploading?: boolean;
  placeholder?: string;
  allowTypeToggle?: boolean;
  aspectRatioClass?: string;
  helperText?: string;
}

function MediaControlWithPreview({
  label,
  mediaUrl,
  mediaType,
  onChangeUrl,
  onChangeMediaType,
  onOpenPresetGallery,
  onUploadFile,
  uploading = false,
  placeholder = '/images/hero_cleanroom.png or /videos/newhero.mp4',
  allowTypeToggle = true,
  aspectRatioClass = 'aspect-[16/9]',
  helperText
}: MediaControlWithPreviewProps) {
  const isVideo = isVideoUrl(mediaUrl, mediaType);

  return (
    <div className="space-y-2.5 p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 shadow-2xs">
      {/* Header with Type selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
          {isVideo ? (
            <Video className="w-3.5 h-3.5 text-brand-orange" />
          ) : (
            <ImageIcon className="w-3.5 h-3.5 text-brand-blue" />
          )}
          <span>{label}</span>
        </label>

        {allowTypeToggle && onChangeMediaType && (
          <div className="flex items-center gap-3 text-xs bg-white px-2.5 py-1 rounded-lg border border-slate-200">
            <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700">
              <input
                type="radio"
                name={`mediaType-${label}`}
                checked={!isVideo}
                onChange={() => onChangeMediaType('image')}
                className="text-brand-blue focus:ring-brand-blue"
              />
              <span>Image</span>
            </label>
            <span className="text-slate-300">|</span>
            <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700">
              <input
                type="radio"
                name={`mediaType-${label}`}
                checked={isVideo}
                onChange={() => onChangeMediaType('video')}
                className="text-brand-orange focus:ring-brand-orange"
              />
              <span className="flex items-center gap-1">
                <Play className="w-3 h-3 text-brand-orange fill-current" />
                <span>Playable Video</span>
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Live Playable Video or Image Preview */}
      {mediaUrl && (
        <div className={`relative w-full ${aspectRatioClass} rounded-xl overflow-hidden bg-slate-950 border border-slate-200 shadow-xs group`}>
          {isVideo ? (
            <>
              <video
                key={mediaUrl}
                src={mediaUrl}
                controls
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-bold text-emerald-400 flex items-center gap-1.5 border border-emerald-500/30 pointer-events-none shadow-xs">
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>Playable Video Preview (Interactive Controls)</span>
              </div>
            </>
          ) : (
            <>
              <img
                src={mediaUrl}
                alt="Media Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-bold text-sky-300 flex items-center gap-1.5 border border-sky-500/30 pointer-events-none shadow-xs">
                <ImageIcon className="w-2.5 h-2.5" />
                <span>Image Preview</span>
              </div>
            </>
          )}

          {/* Quick Clear Button */}
          <button
            type="button"
            onClick={() => onChangeUrl('')}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/70 hover:bg-red-600 text-white text-xs transition-colors shadow-xs"
            title="Remove Media"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Input bar (Row 1) and Action buttons (Row 2) - Clean non-overflowing responsive grid */}
      <div className="space-y-2">
        <input
          type="text"
          value={mediaUrl || ''}
          onChange={(e) => onChangeUrl(e.target.value)}
          placeholder={placeholder}
          className="w-full min-w-0 px-3 py-2 border border-slate-200 rounded-xl text-xs font-mono text-neutral-900 focus:outline-none focus:border-brand-blue bg-white shadow-2xs"
        />

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onOpenPresetGallery}
            className="w-full min-w-0 px-2.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 shadow-2xs transition-all active:scale-95"
            title="Choose from media presets"
          >
            <FolderOpen className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <span className="truncate">Choose Preset</span>
          </button>

          <label
            className="w-full min-w-0 px-2.5 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95"
            title="Upload custom image or video"
          >
            <Upload className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{uploading ? 'Uploading...' : 'Upload'}</span>
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onUploadFile(file);
                }
                e.target.value = '';
              }}
            />
          </label>
        </div>
      </div>

      {helperText && (
        <p className="text-[11px] text-slate-500 italic mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
}

/**
 * Enhanced Photo Carousel Manager Component
 * Supports multiple file upload, preset selection, URL editing, reordering, and deleting.
 */
interface PhotoCarouselManagerProps {
  label?: string;
  images: string[];
  onChangeImages: (images: string[]) => void;
  onOpenPresetGallery?: () => void;
  onUploadMultipleFiles?: (files: FileList | File[]) => Promise<void>;
  uploading?: boolean;
}

function PhotoCarouselManager({
  label = 'Photo Carousel (Extra Images / Slides)',
  images = [],
  onChangeImages,
  onOpenPresetGallery,
  onUploadMultipleFiles,
  uploading = false
}: PhotoCarouselManagerProps) {
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleAddManualUrl = () => {
    if (!newImageUrl.trim()) return;
    onChangeImages([...images, newImageUrl.trim()]);
    setNewImageUrl('');
  };

  const handleRemove = (index: number) => {
    onChangeImages(images.filter((_, i) => i !== index));
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    const targetIdx = direction === 'left' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= images.length) return;
    const next = [...images];
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;
    onChangeImages(next);
  };

  const handleUpdateItem = (index: number, url: string) => {
    const next = [...images];
    next[index] = url;
    onChangeImages(next);
  };

  return (
    <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/90 space-y-3.5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
          <Images className="w-3.5 h-3.5 text-brand-orange" />
          <span>{label} ({images.length} {images.length === 1 ? 'image' : 'images'})</span>
        </label>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Preset Gallery Picker */}
          {onOpenPresetGallery && (
            <button
              type="button"
              onClick={onOpenPresetGallery}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 border border-slate-200 shadow-2xs cursor-pointer transition-all active:scale-95"
            >
              <FolderOpen className="w-3.5 h-3.5 text-brand-orange" />
              <span>Choose Preset</span>
            </button>
          )}

          {/* Multiple File Upload Portal */}
          <label className="px-3 py-1.5 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95">
            <Upload className="w-3.5 h-3.5" />
            <span>{uploading ? 'Uploading...' : '+ Upload Photo(s)'}</span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0 && onUploadMultipleFiles) {
                  onUploadMultipleFiles(e.target.files);
                }
                e.target.value = '';
              }}
            />
          </label>
        </div>
      </div>

      {/* Manual URL Input Bar */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddManualUrl();
            }
          }}
          placeholder="/images/example.png or paste image URL..."
          className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono text-neutral-900 focus:outline-none focus:border-brand-blue bg-white shadow-2xs"
        />
        <button
          type="button"
          onClick={handleAddManualUrl}
          disabled={!newImageUrl.trim()}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-black text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add URL</span>
        </button>
      </div>

      {/* Images Grid */}
      {images.length === 0 ? (
        <div className="p-4 rounded-lg border border-dashed border-slate-300 text-center text-xs text-slate-400 bg-white/50">
          No carousel images added. Click &quot;+ Upload Photo(s)&quot; or &quot;Choose Preset&quot; to build a multi-image carousel.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
          {images.map((photo, pIdx) => (
            <div
              key={pIdx}
              className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2 group hover:border-brand-blue/50 transition-all"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 border border-slate-100 group">
                <img src={photo} alt={`Carousel Slide ${pIdx + 1}`} className="w-full h-full object-cover" />
                
                {/* Slide Number Badge */}
                <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-bold border border-white/20">
                  #{pIdx + 1}
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => handleRemove(pIdx)}
                  className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/70 hover:bg-red-600 text-white text-xs transition-colors shadow-xs cursor-pointer"
                  title="Remove Image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Editable Path / URL */}
              <div className="space-y-1">
                <input
                  type="text"
                  value={photo}
                  onChange={(e) => handleUpdateItem(pIdx, e.target.value)}
                  placeholder="/images/photo.png"
                  className="w-full px-2 py-1 text-[11px] font-mono text-neutral-800 border border-slate-200 rounded-md bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-blue"
                  title="Edit image path"
                />
              </div>

              {/* Move Order Buttons */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-400">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={pIdx === 0}
                    onClick={() => handleMove(pIdx, 'left')}
                    className="p-1 rounded hover:bg-slate-100 text-slate-600 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    title="Move slide left"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={pIdx === images.length - 1}
                    onClick={() => handleMove(pIdx, 'right')}
                    className="p-1 rounded hover:bg-slate-100 text-slate-600 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    title="Move slide right"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="font-semibold text-slate-500">Slide {pIdx + 1} of {images.length}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PageAdminEditor({
  initialPage,
  onBack,
  onSaved
}: PageAdminEditorProps) {
  const [page, setPage] = useState<CDMOPage>(() => {
    const cloned: CDMOPage = JSON.parse(JSON.stringify(initialPage));
    if (cloned.category?.toLowerCase() === 'modalities') {
      cloned.sections = [];
    }
    if (cloned.sections) {
      cloned.sections = cloned.sections.filter(
        (s) =>
          s.id !== 'home-faq' &&
          s.id !== 'home-cta' &&
          s.style !== 'faq-accordion' &&
          s.style !== 'cta-banner' &&
          !s.id?.includes('faq') &&
          !s.id?.includes('cta') &&
          s.title !== 'Frequently Asked Questions' &&
          s.title !== 'Common Questions' &&
          s.title !== 'Accelerate Your Biologics Journey Today'
      );
    }
    return cloned;
  });
  const [activeTab, setActiveTab] = useState<'sections' | 'hero' | 'settings' | 'publish'>('sections');
  const [openSectionId, setOpenSectionId] = useState<number | null>(0);
  const [isLayoutModalOpen, setIsLayoutModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [gallerySelectedCategory, setGallerySelectedCategory] = useState<string>('all');
  const [gallerySearchFilter, setGallerySearchFilter] = useState<string>('');
  const [galleryTargetCallback, setGalleryTargetCallback] = useState<((url: string, type?: 'image' | 'video') => void) | null>(null);
  const [savingDraft, setSavingDraft] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [reverting, setReverting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [heroPreviewSlideIdx, setHeroPreviewSlideIdx] = useState(0);
  const [sectionSlideIdxs, setSectionSlideIdxs] = useState<Record<number, number>>({});
  const [isHeroCardOpen, setIsHeroCardOpen] = useState(false);
  const [isStatsCardOpen, setIsStatsCardOpen] = useState(true);
  const [isCapabilitiesCardOpen, setIsCapabilitiesCardOpen] = useState(true);
  const [isModalitiesCardOpen, setIsModalitiesCardOpen] = useState(true);
  const [isBioassaysCardOpen, setIsBioassaysCardOpen] = useState(true);
  const [isAnalyticsCardOpen, setIsAnalyticsCardOpen] = useState(true);
  const [isFooterNoteCardOpen, setIsFooterNoteCardOpen] = useState(true);
  const [isSpecsCardOpen, setIsSpecsCardOpen] = useState(true);
  const [isFaqCardOpen, setIsFaqCardOpen] = useState(true);
  const [isCtaCardOpen, setIsCtaCardOpen] = useState(true);
  const [openFaqItemIdx, setOpenFaqItemIdx] = useState<number | null>(0);
  const [faqPreviewActiveIdx, setFaqPreviewActiveIdx] = useState<number | null>(null);

  // Live URL
  const isHome = page.category === 'home' && page.slug === 'home';
  const isHub = page.slug === page.category;
  const liveUrl =
    isHome
      ? '/'
      : isHub
      ? `/${page.category}`
      : `/${page.category}/${page.slug}`;

  // Draft Preview URL
  const previewUrl = `${liveUrl}${liveUrl.includes('?') ? '&' : '?'}preview=true`;

  // Image & Video file upload helper
  const handleFileUpload = async (file: File, onDone: (url: string, isVideo: boolean) => void) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && data.url) {
        const isVideo = file.type.startsWith('video/') || isVideoUrl(data.url);
        onDone(data.url, isVideo);
        setToast({ type: 'success', message: `${isVideo ? 'Video' : 'Image'} uploaded successfully!` });
        setTimeout(() => setToast(null), 3500);
      } else {
        setToast({ type: 'error', message: data.error || 'Upload failed.' });
      }
    } catch (err: any) {
      setToast({ type: 'error', message: err?.message || 'Upload error.' });
    } finally {
      setUploading(false);
    }
  };

  // Multiple Images upload helper for carousels
  const handleMultipleFilesUpload = async (
    files: FileList | File[],
    onDone: (urls: string[]) => void
  ) => {
    setUploading(true);
    const uploadedUrls: string[] = [];
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        if (data.success && data.url) {
          uploadedUrls.push(data.url);
        }
      }
      if (uploadedUrls.length > 0) {
        onDone(uploadedUrls);
        setToast({
          type: 'success',
          message: `Uploaded ${uploadedUrls.length} ${uploadedUrls.length === 1 ? 'image' : 'images'} successfully!`
        });
        setTimeout(() => setToast(null), 3500);
      } else {
        setToast({ type: 'error', message: 'Upload failed for selected files.' });
      }
    } catch (err: any) {
      setToast({ type: 'error', message: err?.message || 'Error during file upload.' });
    } finally {
      setUploading(false);
    }
  };

  // Section Presence & Layout Support Checks (Only show sections with active content supported by page layout)
  const pageCategory = (page.category || '').toLowerCase();
  const pageSlug = (page.slug || '').toLowerCase();
  const standardCategories = ['facility&location', 'overview', 'services', 'manufacturing', 'characterization', 'modalities', 'insights'];
  const isCustomCategory = !standardCategories.includes(pageCategory);
  const isFullyCustom = Boolean(page.isCustom) || isCustomCategory;

  // Determine which specialized section types are actually supported and rendered by this page's layout template:
  const supportsStats = isFullyCustom;
  const supportsSpecs = isFullyCustom;
  const supportsModalities = pageCategory === 'services' || isFullyCustom;
  const supportsBioassays = (pageCategory === 'characterization' && pageSlug === 'bioassays') || isFullyCustom;
  const supportsAnalytics = (pageCategory === 'characterization' && pageSlug === 'physicochemical') || isFullyCustom;
  const supportsFooterNote = pageCategory === 'modalities' || (pageCategory === 'characterization' && pageSlug === 'bioassays') || isFullyCustom;
  const supportsCapabilities = (
    pageCategory === 'manufacturing' ||
    (pageCategory === 'characterization' && pageSlug !== 'bioassays') ||
    pageCategory === 'modalities' ||
    (pageCategory === 'overview' && pageSlug === 'integrated') ||
    isFullyCustom
  );
  const supportsFaqs = true;
  const supportsNarrativeSections = pageCategory !== 'modalities' || isFullyCustom;

  // Only show sections that are BOTH supported by this page's layout AND have existing content
  const hasStats = supportsStats && Boolean(page.stats && page.stats.length > 0);
  const hasCapabilities = supportsCapabilities && Boolean(page.capabilities && page.capabilities.length > 0);
  const hasModalities = supportsModalities && Boolean(page.applicableModalities && page.applicableModalities.length > 0);
  const hasBioassays = supportsBioassays && Boolean(
    (page.bioassayCapabilities && page.bioassayCapabilities.length > 0) ||
    (page.immunogenicityCapabilities && page.immunogenicityCapabilities.length > 0)
  );
  const hasAnalytics = supportsAnalytics && Boolean(page.analyticalTechnologies && page.analyticalTechnologies.length > 0);
  const hasFooterNote = supportsFooterNote && Boolean(page.footerNote && page.footerNote.trim().length > 0);
  const hasSpecs = supportsSpecs && Boolean(page.specs && page.specs.length > 0);
  const hasFaqs = supportsFaqs && Boolean(page.faqs && page.faqs.length > 0);

  // Active specialized layout IDs for the layout gallery modal
  const activeSpecializedLayoutIds: string[] = [];
  if (hasStats) activeSpecializedLayoutIds.push('stats-metrics');
  if (hasCapabilities) activeSpecializedLayoutIds.push('capabilities-checklist');
  if (hasModalities) activeSpecializedLayoutIds.push('modalities-grid');
  if (hasBioassays) activeSpecializedLayoutIds.push('bioassays-suites');
  if (hasAnalytics) activeSpecializedLayoutIds.push('analytical-technologies', 'analytical-matrix');
  if (hasFooterNote) activeSpecializedLayoutIds.push('regulatory-callout', 'footer-note');
  if (hasSpecs) activeSpecializedLayoutIds.push('technical-specs');
  if (hasFaqs) activeSpecializedLayoutIds.push('faq-accordion');

  // Dynamic sequential numbering for visible sections
  let secCounter = 1;
  const heroSecNum = secCounter++;
  const statsSecNum = hasStats ? secCounter++ : 0;
  const capabilitiesSecNum = hasCapabilities ? secCounter++ : 0;
  const modalitiesSecNum = hasModalities ? secCounter++ : 0;
  const bioassaysSecNum = hasBioassays ? secCounter++ : 0;
  const analyticsSecNum = hasAnalytics ? secCounter++ : 0;
  const narrativeSecNum = supportsNarrativeSections ? secCounter++ : 0;
  const footerNoteSecNum = hasFooterNote ? secCounter++ : 0;
  const specsSecNum = hasSpecs ? secCounter++ : 0;
  const faqsSecNum = hasFaqs ? secCounter++ : 0;
  const ctaSecNum = secCounter++;

  // Section operations
  const handleAddSectionFromLayout = (layout: SectionLayoutOption) => {
    // 1. Stats Bar
    if (layout.id === 'stats-metrics') {
      setIsLayoutModalOpen(false);
      if (hasStats) {
        setIsStatsCardOpen(true);
        setToast({ type: 'success', message: 'Platform Stats & Key Metrics Bar is already on this page.' });
        setTimeout(() => setToast(null), 3000);
        return;
      }
      if (supportsStats) {
        const initialStats = [
          { value: '2,000L', label: 'Bioreactor Scale', sublabel: 'Single-use SUB train' },
          { value: '99.5%', label: 'Purity Threshold', sublabel: 'Orthogonal HPLC clearance' },
          { value: 'ICH Q2', label: 'Validation Standard', sublabel: 'Regulatory-ready analytical methods' }
        ];
        setPage((prev) => ({
          ...prev,
          hasUnpublishedChanges: true,
          stats: initialStats
        }));
        setIsStatsCardOpen(true);
        setToast({ type: 'success', message: 'Added "Platform Stats & Key Metrics Bar" section to page.' });
        setTimeout(() => setToast(null), 3000);
        return;
      }
      // For standard pages, add modular stats into page.sections
      const newSecId = `sec-stats-${Date.now()}`;
      const newSection: CDMOSection = {
        id: newSecId,
        style: 'stats-metrics',
        title: 'Platform Key Metrics',
        subtitle: 'PERFORMANCE INDICATORS',
        text: 'Key operational capacities, quality thresholds, and turnaround benchmarks.',
        dark: false,
        stats: [
          { value: '2,000L', label: 'Bioreactor Scale', sublabel: 'Single-use SUB train' },
          { value: '99.5%', label: 'Purity Threshold', sublabel: 'Orthogonal HPLC clearance' },
          { value: 'ICH Q2', label: 'Validation Standard', sublabel: 'Regulatory-ready analytical methods' }
        ]
      };
      setPage((prev) => ({
        ...prev,
        hasUnpublishedChanges: true,
        sections: [...(prev.sections || []), newSection]
      }));
      setOpenSectionId(page.sections?.length || 0);
      setToast({ type: 'success', message: 'Added "Key Metrics" section to page.' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    // 2. Capabilities Checklist
    if (layout.id === 'capabilities-checklist') {
      setIsLayoutModalOpen(false);
      if (hasCapabilities) {
        setIsCapabilitiesCardOpen(true);
        setToast({ type: 'success', message: 'Platform Capabilities Checklist is already on this page.' });
        setTimeout(() => setToast(null), 3000);
        return;
      }
      const initialCaps = [
        'Integrated biologics development, process sciences, and GMP manufacturing',
        'Molecule-specific development across cell line engineering and upstream culture',
        'Advanced analytical characterization supporting method validation and biosimilars',
        'Full cGMP compliance and quality assurance systems aligned with global authorities'
      ];
      if (supportsCapabilities) {
        setPage((prev) => ({
          ...prev,
          hasUnpublishedChanges: true,
          capabilities: initialCaps
        }));
        setIsCapabilitiesCardOpen(true);
        setToast({ type: 'success', message: 'Added "Platform Capabilities Checklist" section to page.' });
        setTimeout(() => setToast(null), 3000);
        return;
      }
      // For pages where capabilities is rendered as cards-grid (like about), add cards-grid section
      const newSecId = `sec-capabilities-${Date.now()}`;
      const newSection: CDMOSection = {
        id: newSecId,
        style: 'cards-grid',
        title: 'Core Platform Capabilities',
        subtitle: 'WHAT SETS US APART',
        text: 'Integrated biologics development capabilities supporting programs from early development through clinical supplies.',
        dark: false,
        cards: initialCaps.map((cap) => ({
          title: cap,
          description: '',
          icon: 'ShieldCheck'
        }))
      };
      setPage((prev) => ({
        ...prev,
        hasUnpublishedChanges: true,
        sections: [...(prev.sections || []), newSection]
      }));
      setOpenSectionId(page.sections?.length || 0);
      setToast({ type: 'success', message: 'Added "Capabilities Grid" section to page.' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    // 3. Applicable Modalities
    if (layout.id === 'modalities-grid') {
      setIsLayoutModalOpen(false);
      if (hasModalities) {
        setIsModalitiesCardOpen(true);
        setToast({ type: 'success', message: 'Applicable Modalities section is already on this page.' });
        setTimeout(() => setToast(null), 3000);
        return;
      }
      const initialMods = [
        { title: 'Monoclonal Antibodies (mAbs)', link: '/modalities/mabs' },
        { title: 'Bispecific Antibodies', link: '/modalities/bispecifics' },
        { title: 'Antibody-Drug Conjugates (ADCs)', link: '/modalities/adcs' },
        { title: 'Recombinant Proteins & Peptides', link: '/modalities/proteins-peptides' }
      ];
      if (supportsModalities) {
        setPage((prev) => ({
          ...prev,
          hasUnpublishedChanges: true,
          applicableModalities: initialMods
        }));
        setIsModalitiesCardOpen(true);
        setToast({ type: 'success', message: 'Added "Applicable Modalities" section to page.' });
        setTimeout(() => setToast(null), 3000);
        return;
      }
      const newSecId = `sec-modalities-${Date.now()}`;
      const newSection: CDMOSection = {
        id: newSecId,
        style: 'cards-grid',
        title: 'Applicable Modalities',
        subtitle: 'THERAPEUTIC SCOPE',
        text: 'Comprehensive development and manufacturing capabilities across complex biologic modalities.',
        dark: false,
        cards: initialMods.map((mod) => ({
          title: mod.title,
          description: 'Platform capabilities and process workflows',
          icon: 'Dna'
        }))
      };
      setPage((prev) => ({
        ...prev,
        hasUnpublishedChanges: true,
        sections: [...(prev.sections || []), newSection]
      }));
      setOpenSectionId(page.sections?.length || 0);
      setToast({ type: 'success', message: 'Added "Applicable Modalities" section to page.' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    // 4. Bioassays & Immunogenicity Suites
    if (layout.id === 'bioassays-suites') {
      setIsLayoutModalOpen(false);
      if (hasBioassays) {
        setIsBioassaysCardOpen(true);
        setToast({ type: 'success', message: 'Bioassay & Immunogenicity Testing Suites is already on this page.' });
        setTimeout(() => setToast(null), 3000);
        return;
      }
      if (supportsBioassays) {
        setPage((prev) => ({
          ...prev,
          hasUnpublishedChanges: true,
          bioassayCapabilities: [
            'Reporter Gene & Cell Proliferation Assays',
            'Target Binding & Direct Cytotoxicity',
            'ADCC & CDC Effector Function Assays'
          ],
          immunogenicityCapabilities: [
            'Screening & Confirmatory ADA Assays',
            'Neutralizing Antibody (NAb) Assays',
            'Titer Determination & Isotyping'
          ]
        }));
        setIsBioassaysCardOpen(true);
        setToast({ type: 'success', message: 'Added "Bioassay & Immunogenicity Testing Suites" section to page.' });
        setTimeout(() => setToast(null), 3000);
        return;
      }
      const newSecId = `sec-bioassays-${Date.now()}`;
      const newSection: CDMOSection = {
        id: newSecId,
        style: 'cards-grid',
        title: 'Bioassay & Immunogenicity Testing',
        subtitle: 'FUNCTIONAL CHARACTERIZATION',
        text: 'Validated cellular and immunological assays to assess potency, biological activity, and immunogenicity.',
        dark: false,
        cards: [
          { title: 'Reporter Gene & Cell Proliferation Assays', description: '', icon: 'Activity' },
          { title: 'Target Binding & Direct Cytotoxicity', description: '', icon: 'Target' },
          { title: 'ADCC & CDC Effector Function Assays', description: '', icon: 'ShieldCheck' },
          { title: 'Anti-Drug Antibody (ADA) Screening', description: '', icon: 'ShieldAlert' }
        ]
      };
      setPage((prev) => ({
        ...prev,
        hasUnpublishedChanges: true,
        sections: [...(prev.sections || []), newSection]
      }));
      setOpenSectionId(page.sections?.length || 0);
      setToast({ type: 'success', message: 'Added "Bioassays & Immunogenicity" section to page.' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    // 5. Analytical Technologies Matrix
    if (layout.id === 'analytical-technologies' || layout.id === 'analytical-matrix') {
      setIsLayoutModalOpen(false);
      if (hasAnalytics) {
        setIsAnalyticsCardOpen(true);
        setToast({ type: 'success', message: 'Analytical Technologies Matrix is already on this page.' });
        setTimeout(() => setToast(null), 3000);
        return;
      }
      const initialTech = [
        { name: 'SEC-HPLC & UPLC', category: 'Purity & Aggregation', description: 'Size exclusion chromatography for monomer purity and high-molecular-weight aggregate quantification.' },
        { name: 'High-Resolution LC-MS/MS', category: 'Structural Elucidation', description: 'Intact mass analysis, peptide mapping, and post-translational modification profiling.' },
        { name: 'Capillary Isoelectric Focusing (cIEF)', category: 'Charge Heterogeneity', description: 'High-resolution charge variant analysis and acidic/basic isoform quantification.' },
        { name: 'Surface Plasmon Resonance (SPR / Biacore)', category: 'Binding Kinetics', description: 'Real-time affinity determination (Ka, Kd, KD) and Fc receptor binding kinetics.' }
      ];
      if (supportsAnalytics) {
        setPage((prev) => ({
          ...prev,
          hasUnpublishedChanges: true,
          analyticalTechnologies: initialTech
        }));
        setIsAnalyticsCardOpen(true);
        setToast({ type: 'success', message: 'Added "Analytical Technologies Matrix" section to page.' });
        setTimeout(() => setToast(null), 3000);
        return;
      }
      const newSecId = `sec-analytics-${Date.now()}`;
      const newSection: CDMOSection = {
        id: newSecId,
        style: 'cards-grid',
        title: 'Analytical Technologies & Methods',
        subtitle: 'ADVANCED INSTRUMENTATION',
        text: 'High-resolution analytical characterization platforms supporting ICH method validation.',
        dark: false,
        cards: initialTech.map((t) => ({
          title: t.name,
          description: t.description,
          icon: 'Microscope'
        }))
      };
      setPage((prev) => ({
        ...prev,
        hasUnpublishedChanges: true,
        sections: [...(prev.sections || []), newSection]
      }));
      setOpenSectionId(page.sections?.length || 0);
      setToast({ type: 'success', message: 'Added "Analytical Technologies" section to page.' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    // 6. Regulatory Callout (Footer Note)
    if (layout.id === 'regulatory-callout' || layout.id === 'footer-note') {
      setIsLayoutModalOpen(false);
      if (hasFooterNote) {
        setIsFooterNoteCardOpen(true);
        setToast({ type: 'success', message: 'Platform Summary & Regulatory Callout is already on this page.' });
        setTimeout(() => setToast(null), 3000);
        return;
      }
      const noteText = 'All analytical procedures and bioprocess methods are qualified in accordance with ICH Q2(R1) guidelines, with full audit trail compliance and regulatory readiness.';
      if (supportsFooterNote) {
        setPage((prev) => ({
          ...prev,
          hasUnpublishedChanges: true,
          footerNote: noteText
        }));
        setIsFooterNoteCardOpen(true);
        setToast({ type: 'success', message: 'Added "Platform Summary & Regulatory Callout" section to page.' });
        setTimeout(() => setToast(null), 3000);
        return;
      }
      const newSecId = `sec-callout-${Date.now()}`;
      const newSection: CDMOSection = {
        id: newSecId,
        style: 'quote-callout',
        title: 'Regulatory Alignment & Compliance',
        subtitle: 'QUALITY ASSURANCE',
        text: noteText,
        dark: false
      };
      setPage((prev) => ({
        ...prev,
        hasUnpublishedChanges: true,
        sections: [...(prev.sections || []), newSection]
      }));
      setOpenSectionId(page.sections?.length || 0);
      setToast({ type: 'success', message: 'Added "Regulatory Callout" section to page.' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    // 7. Technical Specifications Table
    if (layout.id === 'technical-specs') {
      setIsLayoutModalOpen(false);
      if (hasSpecs) {
        setIsSpecsCardOpen(true);
        setToast({ type: 'success', message: 'Technical Specifications Table is already on this page.' });
        setTimeout(() => setToast(null), 3000);
        return;
      }
      const initialSpecs = [
        { label: 'Bioreactor Volume Range', value: 'Benchtop 250 mL Ambr to 2,000 L Single-Use Bioreactors' },
        { label: 'Cleanroom Classifications', value: 'Grade A / ISO 5 fill-finish, Grade C processing suites' },
        { label: 'Primary Analytical Platforms', value: 'Orbitrap LC-MS/MS, Biacore 8K+ SPR, Maurice cIEF, UPLC' },
        { label: 'Regulatory Alignment', value: 'US FDA, EU EMA, PMDA, and WHO cGMP guidance' }
      ];
      if (supportsSpecs) {
        setPage((prev) => ({
          ...prev,
          hasUnpublishedChanges: true,
          specs: initialSpecs
        }));
        setIsSpecsCardOpen(true);
        setToast({ type: 'success', message: 'Added "Technical Specifications Table" section to page.' });
        setTimeout(() => setToast(null), 3000);
        return;
      }
      const newSecId = `sec-specs-${Date.now()}`;
      const newSection: CDMOSection = {
        id: newSecId,
        style: 'technical-specs',
        title: 'Technical Specifications',
        subtitle: 'PARAMETERS & STANDARDS',
        text: 'Structured matrix of operational parameters, tolerances, and quality criteria.',
        dark: false,
        specs: initialSpecs
      };
      setPage((prev) => ({
        ...prev,
        hasUnpublishedChanges: true,
        sections: [...(prev.sections || []), newSection]
      }));
      setOpenSectionId(page.sections?.length || 0);
      setToast({ type: 'success', message: 'Added "Technical Specifications" section to page.' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    // 8. FAQ Accordion
    if (layout.id === 'faq-accordion') {
      setIsLayoutModalOpen(false);
      if (hasFaqs) {
        setIsFaqCardOpen(true);
        setToast({ type: 'success', message: 'FAQ Accordion is already on this page.' });
        setTimeout(() => setToast(null), 3000);
        return;
      }
      setPage((prev) => ({
        ...prev,
        hasUnpublishedChanges: true,
        faqs: [
          { id: `faq-${Date.now()}-1`, question: 'What regulatory standards do your manufacturing suites comply with?', answer: 'Our facilities operate under full cGMP compliance aligned with US FDA, EMA, and WHO guidelines with automated 21 CFR Part 11 electronic records.' },
          { id: `faq-${Date.now()}-2`, question: 'What batch scales are supported for tech transfer and clinical supply?', answer: 'We support development and scale-up from laboratory benchtop scale up to 2,000 L single-use bioreactor systems.' }
        ]
      }));
      setIsFaqCardOpen(true);
      setToast({ type: 'success', message: 'Added "FAQ Accordion" section to page.' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    // 9. Standard Narrative Content Sections
    const newSec: CDMOSection = {
      id: `sec-${Date.now()}`,
      ...JSON.parse(JSON.stringify(layout.sampleData))
    };
    setPage((prev) => ({
      ...prev,
      hasUnpublishedChanges: true,
      sections: [...(prev.sections || []), newSec]
    }));
    setOpenSectionId(page.sections?.length || 0);
    setIsLayoutModalOpen(false);
    setToast({
      type: 'success',
      message: `Added "${layout.name}" section layout (Saved in Draft).`
    });
    setTimeout(() => setToast(null), 3000);
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    setPage((prev) => {
      const sections = [...(prev.sections || [])];
      const targetIdx = direction === 'up' ? index - 1 : index + 1;
      if (targetIdx < 0 || targetIdx >= sections.length) return prev;
      const temp = sections[index];
      sections[index] = sections[targetIdx];
      sections[targetIdx] = temp;
      return { ...prev, hasUnpublishedChanges: true, sections };
    });
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx >= 0 && targetIdx < (page.sections?.length || 0)) {
      setOpenSectionId(targetIdx);
    }
  };

  const handleDuplicateSection = (index: number) => {
    setPage((prev) => {
      const sections = [...(prev.sections || [])];
      const cloned = JSON.parse(JSON.stringify(sections[index]));
      cloned.id = `sec-${Date.now()}`;
      cloned.title = `${cloned.title} (Copy)`;
      sections.splice(index + 1, 0, cloned);
      return { ...prev, hasUnpublishedChanges: true, sections };
    });
    setOpenSectionId(index + 1);
  };

  const handleDeleteSection = (index: number) => {
    if (!window.confirm('Are you sure you want to remove this section?')) return;
    setPage((prev) => {
      const sections = [...(prev.sections || [])].filter((_, i) => i !== index);
      return { ...prev, hasUnpublishedChanges: true, sections };
    });
    if (openSectionId === index) setOpenSectionId(null);
  };

  const updateSectionFields = (index: number, updates: Partial<CDMOSection>) => {
    setPage((prev) => {
      const sections = [...(prev.sections || [])];
      sections[index] = { ...sections[index], ...updates };
      const updatedPage: CDMOPage = { ...prev, hasUnpublishedChanges: true, sections };
      if (updates.faqs) {
        updatedPage.faqs = updates.faqs;
      }
      return updatedPage;
    });
  };

  const updateSectionField = (index: number, field: keyof CDMOSection, value: any) => {
    updateSectionFields(index, { [field]: value });
  };

  const getBentoCards = (sec: Partial<CDMOSection>) => {
    const defaultBento = [
      {
        title: 'Accelerating Cell Line Development for Monoclonal Antibodies',
        description: 'How automated clone screening and stable CHO platforms shorten the path from gene to high-producing cell line.',
        badge: 'CELL LINE DEVELOPMENT',
        step: 'November 15, 2023 · 8 min read',
        image: '/images/cdn/unsplash-1614935151651-0bea6508db6b.jpg',
        link: '/insights/blogs/accelerating-cell-line-development-for-mabs'
      },
      {
        title: 'From DNA to Research Cell Bank in 16 Weeks',
        description: 'A look inside the streamlined gene-to-RCB pathway that de-risks early biologics development timelines.',
        badge: 'CELL LINE DEVELOPMENT',
        step: '6 min read',
        image: '/images/default_scientist.png',
        link: '/insights/blogs/from-dna-to-research-cell-bank-in-16-weeks'
      },
      {
        title: 'Upstream Process Optimization: Feed and Perfusion Strategies',
        description: 'How feed design, perfusion configurations, and scale-down models raise titers while protecting product quality.',
        badge: 'PROCESS DEVELOPMENT',
        step: '9 min read',
        image: '/images/cdn/unsplash-1606206873764-fd15e242df52.jpg',
        link: '/insights/blogs/upstream-process-optimization-feed-and-perfusion'
      }
    ];
    if (sec.cards && sec.cards.length >= 3) {
      return sec.cards;
    }
    return defaultBento;
  };

  const updateBentoCard = (secIdx: number, cardIdx: number, field: string, value: string) => {
    const sec = page.sections?.[secIdx];
    if (!sec) return;
    const currentCards = getBentoCards(sec).map((c) => ({ ...c }));
    currentCards[cardIdx] = {
      ...currentCards[cardIdx],
      [field]: value
    };
    updateSectionField(secIdx, 'cards', currentCards);
  };

  // Helper to ensure sections are clean of fake FAQ and CTA blocks
  const sanitizePageForSave = (p: CDMOPage): CDMOPage => {
    if (p.category?.toLowerCase() === 'modalities') {
      return {
        ...p,
        sections: []
      };
    }
    const cleanedSections = (p.sections || []).filter(
      (s) =>
        s.style !== 'faq-accordion' &&
        s.style !== 'cta-banner' &&
        !s.id?.includes('faq') &&
        !s.id?.includes('cta') &&
        s.id !== 'home-faq' &&
        s.id !== 'home-cta' &&
        s.title !== 'Frequently Asked Questions' &&
        s.title !== 'Common Questions' &&
        s.title !== 'Accelerate Your Biologics Journey Today'
    );
    return {
      ...p,
      sections: cleanedSections
    };
  };

  // FAQ Management Handlers (Directly edits page.faqs)
  const handleUpdateFaqItem = (faqIdx: number, field: 'question' | 'answer', value: string) => {
    const currentFaqs = [...(page.faqs || [])];
    if (!currentFaqs[faqIdx]) return;
    currentFaqs[faqIdx] = {
      ...currentFaqs[faqIdx],
      [field]: value
    };
    setPage((prev) => ({
      ...prev,
      hasUnpublishedChanges: true,
      faqs: currentFaqs
    }));
  };

  const handleAddFaqItem = () => {
    const currentFaqs = [...(page.faqs || [])];
    currentFaqs.push({
      id: `faq-${Date.now()}`,
      question: '',
      answer: ''
    });
    setPage((prev) => ({
      ...prev,
      hasUnpublishedChanges: true,
      faqs: currentFaqs
    }));
    setOpenFaqItemIdx(currentFaqs.length - 1);
  };

  const handleRemoveFaqItem = (faqIdx: number) => {
    const currentFaqs = (page.faqs || []).filter((_, i) => i !== faqIdx);
    setPage((prev) => ({
      ...prev,
      hasUnpublishedChanges: true,
      faqs: currentFaqs
    }));
  };

  const handleMoveFaqItem = (faqIdx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? faqIdx - 1 : faqIdx + 1;
    const currentFaqs = [...(page.faqs || [])];
    if (targetIdx < 0 || targetIdx >= currentFaqs.length) return;
    const temp = currentFaqs[faqIdx];
    currentFaqs[faqIdx] = currentFaqs[targetIdx];
    currentFaqs[targetIdx] = temp;
    setPage((prev) => ({
      ...prev,
      hasUnpublishedChanges: true,
      faqs: currentFaqs
    }));
    setOpenFaqItemIdx(targetIdx);
  };

  const handleUpdateFaqMeta = (
    field: 'faqTitle' | 'faqSubtitle' | 'faqButtonText' | 'faqButtonLink',
    value: string
  ) => {
    setPage((prev) => ({
      ...prev,
      hasUnpublishedChanges: true,
      [field]: value
    }));
  };

  // Stats Handlers
  const handleUpdateStat = (sIdx: number, field: 'value' | 'label' | 'sublabel', val: string) => {
    const stats = [...(page.stats || [])];
    if (!stats[sIdx]) return;
    stats[sIdx] = { ...stats[sIdx], [field]: val };
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, stats }));
  };

  const handleAddStat = () => {
    const stats = [...(page.stats || []), { value: '', label: '', sublabel: '' }];
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, stats }));
  };

  const handleRemoveStat = (sIdx: number) => {
    const stats = (page.stats || []).filter((_, i) => i !== sIdx);
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, stats }));
  };

  const handleMoveStat = (sIdx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? sIdx - 1 : sIdx + 1;
    const stats = [...(page.stats || [])];
    if (targetIdx < 0 || targetIdx >= stats.length) return;
    const temp = stats[sIdx];
    stats[sIdx] = stats[targetIdx];
    stats[targetIdx] = temp;
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, stats }));
  };

  // Capabilities Handlers
  const handleUpdateCapability = (cIdx: number, val: string) => {
    const capabilities = [...(page.capabilities || [])];
    capabilities[cIdx] = val;
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, capabilities }));
  };

  const handleAddCapability = () => {
    const capabilities = [...(page.capabilities || []), ''];
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, capabilities }));
  };

  const handleRemoveCapability = (cIdx: number) => {
    const capabilities = (page.capabilities || []).filter((_, i) => i !== cIdx);
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, capabilities }));
  };

  const handleMoveCapability = (cIdx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? cIdx - 1 : cIdx + 1;
    const capabilities = [...(page.capabilities || [])];
    if (targetIdx < 0 || targetIdx >= capabilities.length) return;
    const temp = capabilities[cIdx];
    capabilities[cIdx] = capabilities[targetIdx];
    capabilities[targetIdx] = temp;
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, capabilities }));
  };

  // Applicable Modalities Handlers
  const handleUpdateModality = (mIdx: number, field: string, val: string) => {
    const applicableModalities = [...(page.applicableModalities || [])];
    if (!applicableModalities[mIdx]) return;
    applicableModalities[mIdx] = { ...applicableModalities[mIdx], [field]: val };
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, applicableModalities }));
  };

  const handleAddModality = () => {
    const applicableModalities = [...(page.applicableModalities || []), { title: '', link: '/modalities/mabs' }];
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, applicableModalities }));
  };

  const handleRemoveModality = (mIdx: number) => {
    const applicableModalities = (page.applicableModalities || []).filter((_, i) => i !== mIdx);
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, applicableModalities }));
  };

  const handleMoveModality = (mIdx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? mIdx - 1 : mIdx + 1;
    const applicableModalities = [...(page.applicableModalities || [])];
    if (targetIdx < 0 || targetIdx >= applicableModalities.length) return;
    const temp = applicableModalities[mIdx];
    applicableModalities[mIdx] = applicableModalities[targetIdx];
    applicableModalities[targetIdx] = temp;
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, applicableModalities }));
  };

  // Bioassays & Immunogenicity Handlers
  const handleUpdateBioassayCap = (bIdx: number, val: string) => {
    const bioassayCapabilities = [...(page.bioassayCapabilities || [])];
    bioassayCapabilities[bIdx] = val;
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, bioassayCapabilities }));
  };

  const handleAddBioassayCap = () => {
    const bioassayCapabilities = [...(page.bioassayCapabilities || []), ''];
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, bioassayCapabilities }));
  };

  const handleRemoveBioassayCap = (bIdx: number) => {
    const bioassayCapabilities = (page.bioassayCapabilities || []).filter((_, i) => i !== bIdx);
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, bioassayCapabilities }));
  };

  const handleUpdateImmunogenicityCap = (iIdx: number, val: string) => {
    const immunogenicityCapabilities = [...(page.immunogenicityCapabilities || [])];
    immunogenicityCapabilities[iIdx] = val;
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, immunogenicityCapabilities }));
  };

  const handleAddImmunogenicityCap = () => {
    const immunogenicityCapabilities = [...(page.immunogenicityCapabilities || []), ''];
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, immunogenicityCapabilities }));
  };

  const handleRemoveImmunogenicityCap = (iIdx: number) => {
    const immunogenicityCapabilities = (page.immunogenicityCapabilities || []).filter((_, i) => i !== iIdx);
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, immunogenicityCapabilities }));
  };

  // Analytical Technologies Handlers
  const handleUpdateAnalyticalTech = (tIdx: number, field: 'name' | 'description' | 'category', val: string) => {
    const analyticalTechnologies = [...(page.analyticalTechnologies || [])];
    const item = analyticalTechnologies[tIdx];
    const techObj = typeof item === 'string' ? { name: item, description: '', category: 'Characterization' } : { ...item };
    techObj[field] = val;
    analyticalTechnologies[tIdx] = techObj;
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, analyticalTechnologies }));
  };

  const handleAddAnalyticalTech = () => {
    const analyticalTechnologies = [...(page.analyticalTechnologies || []), { name: '', description: '', category: 'Characterization' }];
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, analyticalTechnologies }));
  };

  const handleRemoveAnalyticalTech = (tIdx: number) => {
    const analyticalTechnologies = (page.analyticalTechnologies || []).filter((_, i) => i !== tIdx);
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, analyticalTechnologies }));
  };

  const handleMoveAnalyticalTech = (tIdx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? tIdx - 1 : tIdx + 1;
    const analyticalTechnologies = [...(page.analyticalTechnologies || [])];
    if (targetIdx < 0 || targetIdx >= analyticalTechnologies.length) return;
    const temp = analyticalTechnologies[tIdx];
    analyticalTechnologies[tIdx] = analyticalTechnologies[targetIdx];
    analyticalTechnologies[targetIdx] = temp;
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, analyticalTechnologies }));
  };

  // Technical Specs Handlers
  const handleUpdateSpec = (sIdx: number, field: 'label' | 'value', val: string) => {
    const specs = [...(page.specs || [])];
    if (!specs[sIdx]) return;
    specs[sIdx] = { ...specs[sIdx], [field]: val };
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, specs }));
  };

  const handleAddSpec = () => {
    const specs = [...(page.specs || []), { label: '', value: '' }];
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, specs }));
  };

  const handleRemoveSpec = (sIdx: number) => {
    const specs = (page.specs || []).filter((_, i) => i !== sIdx);
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, specs }));
  };

  const handleMoveSpec = (sIdx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? sIdx - 1 : sIdx + 1;
    const specs = [...(page.specs || [])];
    if (targetIdx < 0 || targetIdx >= specs.length) return;
    const temp = specs[sIdx];
    specs[sIdx] = specs[targetIdx];
    specs[targetIdx] = temp;
    setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, specs }));
  };

  // Footer CTA Handlers
  const handleUpdateCTA = (
    field: 'ctaTitle' | 'ctaSubtitle' | 'primaryText' | 'primaryLink' | 'secondaryText' | 'secondaryLink',
    val: string
  ) => {
    setPage((prev) => {
      const next: any = { ...prev, hasUnpublishedChanges: true };
      if (field === 'ctaTitle') next.ctaTitle = val;
      if (field === 'ctaSubtitle') next.ctaSubtitle = val;
      if (field === 'primaryText') {
        next.primaryCta = { ...(prev.primaryCta || {}), text: val, link: prev.primaryCta?.link || '/contact' };
      }
      if (field === 'primaryLink') {
        next.primaryCta = { ...(prev.primaryCta || {}), text: prev.primaryCta?.text || 'GET IN TOUCH', link: val };
      }
      if (field === 'secondaryText') {
        next.secondaryCta = { ...(prev.secondaryCta || {}), text: val, link: prev.secondaryCta?.link || '/services' };
      }
      if (field === 'secondaryLink') {
        next.secondaryCta = { ...(prev.secondaryCta || {}), text: prev.secondaryCta?.text || 'EXPLORE SERVICES', link: val };
      }
      return next;
    });
  };

  // 1. SAVE DRAFT (Does NOT change the live website)
  const handleSaveDraft = async () => {
    setSavingDraft(true);
    try {
      const pageToSave = sanitizePageForSave(page);

      const res = await fetch(`/api/admin/pages/${encodeURIComponent(page.category)}/${encodeURIComponent(page.slug)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: pageToSave, action: 'save_draft' })
      });
      const data = await res.json();
      if (data.success) {
        const updated = data.page || {
          ...pageToSave,
          hasUnpublishedChanges: true,
          status: page.isPublished === false ? 'draft' : 'modified',
          lastSavedAt: new Date().toISOString()
        };
        setPage(updated);
        setToast({
          type: 'success',
          message: 'Draft saved successfully. Live website remains UNCHANGED until published.'
        });
        onSaved(updated);
        setTimeout(() => setToast(null), 4000);
      } else {
        setToast({ type: 'error', message: data.error || 'Failed to save draft.' });
      }
    } catch (err: any) {
      setToast({ type: 'error', message: err?.message || 'Error occurred while saving draft.' });
    } finally {
      setSavingDraft(false);
    }
  };

  // 1b. PREVIEW DRAFT (Saves draft in background and opens preview in new tab without publishing)
  const handlePreviewDraft = async () => {
    setSavingDraft(true);
    try {
      const pageToSave = sanitizePageForSave(page);

      const res = await fetch(`/api/admin/pages/${encodeURIComponent(page.category)}/${encodeURIComponent(page.slug)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: pageToSave, action: 'save_draft' })
      });
      const data = await res.json();
      if (data.success) {
        const updated = data.page || {
          ...pageToSave,
          hasUnpublishedChanges: true,
          status: page.isPublished === false ? 'draft' : 'modified',
          lastSavedAt: new Date().toISOString()
        };
        setPage(updated);
        onSaved(updated);
      }
    } catch (err: any) {
      console.error('Error saving draft before preview:', err);
    } finally {
      setSavingDraft(false);
      window.open(previewUrl, '_blank');
    }
  };

  // 2. PUBLISH TO LIVE (Pushes draft changes to live website)
  const handlePublishToLive = async () => {
    setPublishing(true);
    try {
      const pageToPublish = sanitizePageForSave(page);

      const res = await fetch(`/api/admin/pages/${encodeURIComponent(page.category)}/${encodeURIComponent(page.slug)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: pageToPublish, action: 'publish' })
      });
      const data = await res.json();
      if (data.success) {
        const updated = data.page || {
          ...pageToPublish,
          isPublished: true,
          hasUnpublishedChanges: false,
          status: 'published',
          lastPublishedAt: new Date().toISOString()
        };
        setPage(updated);
        setToast({
          type: 'success',
          message: `"${page.title}" is now PUBLISHED and live for all website visitors!`
        });
        onSaved(updated);
        setTimeout(() => setToast(null), 4000);
      } else {
        setToast({ type: 'error', message: data.error || 'Failed to publish page.' });
      }
    } catch (err: any) {
      setToast({ type: 'error', message: err?.message || 'Error occurred while publishing.' });
    } finally {
      setPublishing(false);
    }
  };

  // 3. REVERT DRAFT (Discard unpublished changes and restore live version)
  const handleRevertDraft = async () => {
    if (!window.confirm('Discard all unpublished draft changes and revert to the live published version?')) {
      return;
    }
    setReverting(true);
    try {
      const res = await fetch(`/api/admin/pages/${encodeURIComponent(page.category)}/${encodeURIComponent(page.slug)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'revert' })
      });
      const data = await res.json();
      if (data.success && data.page) {
        setPage(data.page);
        setToast({
          type: 'success',
          message: 'Draft changes discarded. Reverted to live published version.'
        });
        onSaved(data.page);
        setTimeout(() => setToast(null), 3500);
      } else {
        setToast({ type: 'error', message: data.error || 'Failed to revert draft.' });
      }
    } catch (err: any) {
      setToast({ type: 'error', message: err?.message || 'Error reverting draft.' });
    } finally {
      setReverting(false);
    }
  };

  // 4. UNPUBLISH PAGE
  const handleUnpublishPage = async () => {
    if (!window.confirm(`Unpublish "${page.title}"? It will no longer be visible to regular website visitors.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/pages/${encodeURIComponent(page.category)}/${encodeURIComponent(page.slug)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'unpublish' })
      });
      const data = await res.json();
      if (data.success && data.page) {
        setPage(data.page);
        setToast({
          type: 'success',
          message: 'Page has been unpublished and taken offline.'
        });
        onSaved(data.page);
        setTimeout(() => setToast(null), 3500);
      }
    } catch (err: any) {
      setToast({ type: 'error', message: err?.message || 'Error unpublishing page.' });
    }
  };

  const isDraftOnly = page.isPublished === false;
  const hasUnpublished = Boolean(page.hasUnpublishedChanges);

  // Filter preset media
  const filteredPresets = PRESET_MEDIA_GALLERY.filter((item) => {
    const matchesCategory =
      gallerySelectedCategory === 'all' ||
      item.category === gallerySelectedCategory ||
      (gallerySelectedCategory === 'gmp' && (item.badge?.includes('GMP') || item.url.includes('GMP') || item.label.includes('GMP')));
    const matchesSearch =
      !gallerySearchFilter.trim() ||
      item.label.toLowerCase().includes(gallerySearchFilter.toLowerCase()) ||
      item.url.toLowerCase().includes(gallerySearchFilter.toLowerCase()) ||
      (item.badge && item.badge.toLowerCase().includes(gallerySearchFilter.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-neutral-900 pb-28">
      {/* 1. TOP STICKY BAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 sm:px-8 md:px-12 py-3.5 shadow-2xs">
        <div className="w-full max-w-[1700px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-xl text-slate-500 hover:text-neutral-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Back to Pages list"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
                  {page.category}
                </span>
                <span className="text-xs font-mono text-slate-500 truncate max-w-[180px] sm:max-w-xs">
                  {liveUrl}
                </span>

                {/* Status Indicator Badge */}
                {isDraftOnly ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                    <Clock className="w-3 h-3 text-amber-700" />
                    <span>Draft Only (Unpublished)</span>
                  </span>
                ) : hasUnpublished ? (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-300 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span>Unpublished Draft Changes</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Live & Published</span>
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 line-clamp-1">
                {page.title || 'Untitled Page'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Preview Draft button */}
            <button
              onClick={handlePreviewDraft}
              disabled={savingDraft || publishing}
              className="p-2.5 px-3.5 rounded-xl border border-amber-300 bg-amber-50/80 hover:bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95 disabled:opacity-50"
              title="Preview working draft in new tab without publishing to live website"
            >
              <Eye className="w-3.5 h-3.5 text-amber-700" />
              <span>Preview Draft</span>
            </button>

            {/* View Live button */}
            <Link
              href={liveUrl}
              target="_blank"
              className="p-2.5 px-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
              title="View currently published page on live website"
            >
              <ExternalLink className="w-3.5 h-3.5 text-brand-blue" />
              <span>View Live</span>
            </Link>

            {/* SAVE DRAFT BUTTON */}
            <button
              onClick={handleSaveDraft}
              disabled={savingDraft || publishing}
              className="p-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-2xs active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              title="Save draft without updating live website"
            >
              {savingDraft ? (
                <div className="w-4 h-4 border-2 border-slate-700 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4 text-slate-600" />
              )}
              <span>{savingDraft ? 'Saving Draft...' : 'Save Draft'}</span>
            </button>

            {/* PUBLISH TO LIVE BUTTON */}
            <button
              onClick={handlePublishToLive}
              disabled={publishing || savingDraft}
              className="p-2.5 px-5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              title="Publish current draft to live website"
            >
              {publishing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Rocket className="w-4 h-4" />
              )}
              <span>{publishing ? 'Publishing...' : 'Publish to Live'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3">
          <div
            className={`p-4 rounded-xl shadow-xl flex items-center gap-3 border text-xs font-semibold ${
              toast.type === 'success'
                ? 'bg-slate-900 text-white border-slate-700'
                : 'bg-red-900 text-white border-red-700'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-300 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Workspace */}
      <main className="w-full max-w-[1700px] mx-auto px-6 sm:px-8 md:px-12 py-8">
        {/* TAB CONTROLS */}
        <div className="flex items-center gap-2 mb-8 border-b border-slate-200 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('sections')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'sections'
                ? 'bg-brand-orange text-white shadow-xs'
                : 'text-slate-600 hover:text-neutral-900 hover:bg-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Full Page Sections (Hero to Footer)</span>
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'hero'
                ? 'bg-brand-orange text-white shadow-xs'
                : 'text-slate-600 hover:text-neutral-900 hover:bg-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Hero Section & Live Layout</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-brand-orange text-white shadow-xs'
                : 'text-slate-600 hover:text-neutral-900 hover:bg-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Page Settings & SEO</span>
          </button>

          {/* TAB 4: PUBLISH & REVIEW */}
          <button
            onClick={() => setActiveTab('publish')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'publish'
                ? 'bg-brand-navy text-white shadow-xs'
                : hasUnpublished
                ? 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                : 'text-slate-600 hover:text-neutral-900 hover:bg-white'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span>Publish & Live Review</span>
            {hasUnpublished && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse ml-1" />
            )}
          </button>

          {/* Quick Add Section Button */}
          {supportsNarrativeSections && (
            <button
              type="button"
              onClick={() => setIsLayoutModalOpen(true)}
              className="ml-auto px-4 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Section</span>
            </button>
          )}
        </div>

        {/* TAB 1: SECTIONS BUILDER WITH LIVE WEBSITE-MATCHING LAYOUTS */}
        {activeTab === 'sections' && (
          <div className="space-y-6">
            {/* =========================================================================
                SECTION 1: HERO SECTION & LIVE HEADER BANNER
               ========================================================================= */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
              <div
                onClick={() => setIsHeroCardOpen(!isHeroCardOpen)}
                className="p-5 sm:p-6 flex items-center justify-between gap-4 bg-gradient-to-r from-slate-50 via-orange-50/20 to-slate-50 border-b border-slate-200 cursor-pointer hover:bg-slate-100/80 transition-colors select-none"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-orange text-white shadow-2xs">
                        Section {heroSecNum} • Top Hero
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
                        {page.badge || 'Main Hero Banner'}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 truncate">
                      {heroSecNum}. Hero Section & Live Visual Header
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-slate-500 hidden sm:inline">
                    {isHeroCardOpen ? 'Click to collapse' : 'Click to edit Hero'}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-2xs">
                    {isHeroCardOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {isHeroCardOpen && (
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-200/80 text-xs text-slate-700 flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">Live Header Banner: </span>
                      The top visual section of this page. Features page category badge tag, H1 main heading, subtitle, introduction paragraph, and dual call-to-action buttons.
                    </div>
                  </div>

                  {/* Grid of Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-xl bg-slate-50/80 border border-slate-200/80">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-brand-orange" />
                        <span>Hero Badge Tag</span>
                      </label>
                      <input
                        type="text"
                        value={page.badge || ''}
                        onChange={(e) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, badge: e.target.value }))}
                        placeholder="e.g. INTEGRATED BIOLOGICS CDMO"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-brand-orange"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Hero Subtitle (h2)</span>
                      </label>
                      <input
                        type="text"
                        value={page.subtitle || ''}
                        onChange={(e) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, subtitle: e.target.value }))}
                        placeholder="e.g. From Cell Line to Clinical Supply"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-brand-blue"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                        <span>Hero Main Heading (H1)</span>
                      </label>
                      <input
                        type="text"
                        value={page.heading || ''}
                        onChange={(e) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, heading: e.target.value }))}
                        placeholder="e.g. Accelerating Biologics from Gene to GMP"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-neutral-900 focus:outline-none focus:border-brand-orange"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Hero Introduction Paragraph
                      </label>
                      <textarea
                        rows={3}
                        value={page.description || ''}
                        onChange={(e) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, description: e.target.value }))}
                        placeholder="Supporting biopharmaceutical companies with accelerated timelines..."
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-brand-blue"
                      />
                    </div>

                    {/* Media / Video URL */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Film className="w-3.5 h-3.5 text-brand-blue" />
                          <span>Hero Media / Background Video or Image</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setGalleryTargetCallback(() => (url: string) => {
                              setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, heroVideo: url, image: url }));
                            });
                            setIsGalleryModalOpen(true);
                          }}
                          className="text-[11px] text-brand-blue font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Images className="w-3 h-3" />
                          <span>Choose from Preset Gallery</span>
                        </button>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={page.heroVideo || page.image || ''}
                          onChange={(e) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, heroVideo: e.target.value, image: e.target.value }))}
                          placeholder="/videos/newhero.mp4 or /images/hero_cleanroom.png"
                          className="flex-1 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-brand-blue"
                        />
                        <label className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleFileUpload(f, (url) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, heroVideo: url, image: url })));
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Primary CTA */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <MousePointerClick className="w-3.5 h-3.5 text-brand-orange" />
                        <span>Primary CTA Button (Text & Link)</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={page.heroPrimaryCtaText || page.primaryCta?.text || ''}
                          onChange={(e) => setPage((prev) => ({
                            ...prev,
                            hasUnpublishedChanges: true,
                            heroPrimaryCtaText: e.target.value,
                            primaryCta: { ...(prev.primaryCta || {}), text: e.target.value, link: prev.heroPrimaryCtaLink || prev.primaryCta?.link || '/contact' }
                          }))}
                          placeholder="GET IN TOUCH"
                          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                        <input
                          type="text"
                          value={page.heroPrimaryCtaLink || page.primaryCta?.link || ''}
                          onChange={(e) => setPage((prev) => ({
                            ...prev,
                            hasUnpublishedChanges: true,
                            heroPrimaryCtaLink: e.target.value,
                            primaryCta: { ...(prev.primaryCta || {}), text: prev.heroPrimaryCtaText || prev.primaryCta?.text || 'GET IN TOUCH', link: e.target.value }
                          }))}
                          placeholder="/contact"
                          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                        />
                      </div>
                    </div>

                    {/* Secondary CTA */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <MousePointerClick className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Secondary CTA Button (Text & Link)</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={page.heroSecondaryCtaText || page.secondaryCta?.text || ''}
                          onChange={(e) => setPage((prev) => ({
                            ...prev,
                            hasUnpublishedChanges: true,
                            heroSecondaryCtaText: e.target.value,
                            secondaryCta: { ...(prev.secondaryCta || {}), text: e.target.value, link: prev.heroSecondaryCtaLink || prev.secondaryCta?.link || '/services' }
                          }))}
                          placeholder="EXPLORE SERVICES"
                          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                        <input
                          type="text"
                          value={page.heroSecondaryCtaLink || page.secondaryCta?.link || ''}
                          onChange={(e) => setPage((prev) => ({
                            ...prev,
                            hasUnpublishedChanges: true,
                            heroSecondaryCtaLink: e.target.value,
                            secondaryCta: { ...(prev.secondaryCta || {}), text: prev.heroSecondaryCtaText || prev.secondaryCta?.text || 'EXPLORE SERVICES', link: e.target.value }
                          }))}
                          placeholder="/services"
                          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Live Preview */}
                  <div className="pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                      Hero Live Visual Preview
                    </span>
                    <div className="relative rounded-2xl overflow-hidden bg-brand-navy p-8 text-white min-h-[220px] flex flex-col justify-between border border-slate-700 shadow-md">
                      {page.heroVideo ? (
                        <video src={page.heroVideo} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none" />
                      ) : page.image ? (
                        <img src={page.image} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none" />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-transparent pointer-events-none" />
                      <div className="relative z-10 max-w-xl space-y-2">
                        {page.badge && (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-orange text-black">
                            {page.badge}
                          </span>
                        )}
                        <h1 className="text-2xl sm:text-3xl font-light text-white leading-tight">
                          {page.heading || 'Hero Main Heading'}
                        </h1>
                        {page.subtitle && (
                          <p className="text-sm font-normal text-white/90">{page.subtitle}</p>
                        )}
                        {page.description && (
                          <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">{page.description}</p>
                        )}
                        <div className="pt-2 flex items-center gap-2">
                          <span className="px-3 py-1.5 rounded-lg bg-brand-yellow text-black text-xs font-bold">
                            {page.heroPrimaryCtaText || page.primaryCta?.text || 'GET IN TOUCH'}
                          </span>
                          {(page.heroSecondaryCtaText || page.secondaryCta?.text) && (
                            <span className="px-3 py-1.5 rounded-lg border border-white/40 text-white text-xs font-bold">
                              {page.heroSecondaryCtaText || page.secondaryCta?.text}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* =========================================================================
                SECTION 2: STATS BAR & KEY METRICS (LIVE STRIP)
               ========================================================================= */}
            {hasStats && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
                <div
                  onClick={() => setIsStatsCardOpen(!isStatsCardOpen)}
                  className="p-5 sm:p-6 flex items-center justify-between gap-4 bg-gradient-to-r from-slate-50 via-emerald-50/20 to-slate-50 border-b border-slate-200 cursor-pointer hover:bg-slate-100/80 transition-colors select-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-600 text-white shadow-2xs">
                          Section {statsSecNum} • Metrics
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
                          {(page.stats || []).length} Metric Pill{(page.stats || []).length === 1 ? '' : 's'}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 truncate">
                        {statsSecNum}. Platform Stats & Key Metrics Bar
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Remove Platform Stats Bar from this page? It will only appear if you add it back.')) {
                          setPage((prev) => ({ ...prev, stats: undefined, hasUnpublishedChanges: true }));
                          setToast({ type: 'success', message: 'Removed Platform Stats Bar from page.' });
                          setTimeout(() => setToast(null), 3000);
                        }
                      }}
                      className="p-1.5 px-2.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Remove section from page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Remove Section</span>
                    </button>
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      {isStatsCardOpen ? 'Click to collapse' : 'Click to edit Stats'}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-2xs">
                      {isStatsCardOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {isStatsCardOpen && (
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-xs text-slate-700 flex items-start gap-3">
                      <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900">Platform Performance Strip: </span>
                        Renders right beneath the hero banner on overview, manufacturing, and facility pages to highlight capacities, purity thresholds, regulatory approvals, and batch turnaround times.
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-3">
                        {(page.stats || []).map((stat, sIdx) => (
                          <div key={sIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center gap-3 justify-between">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 w-full">
                              <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">Value</label>
                                <input
                                  type="text"
                                  value={stat.value || ''}
                                  onChange={(e) => handleUpdateStat(sIdx, 'value', e.target.value)}
                                  placeholder="e.g. 2,000L or 99.2%"
                                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-neutral-900"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">Label</label>
                                <input
                                  type="text"
                                  value={stat.label || ''}
                                  onChange={(e) => handleUpdateStat(sIdx, 'label', e.target.value)}
                                  placeholder="e.g. Bioreactor Scale"
                                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">Sublabel (Optional)</label>
                                <input
                                  type="text"
                                  value={stat.sublabel || ''}
                                  onChange={(e) => handleUpdateStat(sIdx, 'sublabel', e.target.value)}
                                  placeholder="e.g. Scalable Upstream"
                                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-500"
                                />
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 self-end md:self-center shrink-0">
                              <button
                                type="button"
                                onClick={() => handleMoveStat(sIdx, 'up')}
                                disabled={sIdx === 0}
                                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                                title="Move up"
                              >
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMoveStat(sIdx, 'down')}
                                disabled={sIdx === (page.stats || []).length - 1}
                                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                                title="Move down"
                              >
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveStat(sIdx)}
                                className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer ml-1"
                                title="Delete stat"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <button
                          type="button"
                          onClick={handleAddStat}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Metric Stat</span>
                        </button>
                      </div>

                      {/* Live Preview */}
                      <div className="pt-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                          Stats Bar Live Preview
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 rounded-2xl bg-neutral-900 text-white">
                          {(page.stats || []).map((s, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                              <div className="text-xl sm:text-2xl font-bold text-brand-yellow">{s.value || '0'}</div>
                              <div className="text-xs font-medium text-white/90 mt-0.5">{s.label || 'Metric'}</div>
                              {s.sublabel && <div className="text-[10px] text-white/50">{s.sublabel}</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* =========================================================================
                SECTION 3: PLATFORM CAPABILITIES CHECKLIST
               ========================================================================= */}
            {hasCapabilities && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
                <div
                  onClick={() => setIsCapabilitiesCardOpen(!isCapabilitiesCardOpen)}
                  className="p-5 sm:p-6 flex items-center justify-between gap-4 bg-gradient-to-r from-slate-50 via-blue-50/20 to-slate-50 border-b border-slate-200 cursor-pointer hover:bg-slate-100/80 transition-colors select-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-blue text-white shadow-2xs">
                          Section {capabilitiesSecNum} • Capabilities
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
                          {(page.capabilities || []).length} Capabilit{(page.capabilities || []).length === 1 ? 'y' : 'ies'}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 truncate">
                        {capabilitiesSecNum}. Platform Capabilities Checklist
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Remove Platform Capabilities Checklist from this page? It will only appear if you add it back.')) {
                          setPage((prev) => ({ ...prev, capabilities: undefined, hasUnpublishedChanges: true }));
                          setToast({ type: 'success', message: 'Removed Platform Capabilities Checklist from page.' });
                          setTimeout(() => setToast(null), 3000);
                        }
                      }}
                      className="p-1.5 px-2.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Remove section from page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Remove Section</span>
                    </button>
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      {isCapabilitiesCardOpen ? 'Click to collapse' : 'Click to edit Capabilities'}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-2xs">
                      {isCapabilitiesCardOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {isCapabilitiesCardOpen && (
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs text-slate-700 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900">Platform Capabilities Checklist: </span>
                        Displays key technical capabilities as clean rounded badge cards across a responsive grid on characterization, modality, and manufacturing service pages.
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(page.capabilities || []).map((cap, cIdx) => (
                          <div key={cIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue text-[10px] font-bold flex items-center justify-center shrink-0">
                              {cIdx + 1}
                            </span>
                            <input
                              type="text"
                              value={cap}
                              onChange={(e) => handleUpdateCapability(cIdx, e.target.value)}
                              placeholder="e.g. SEC-HPLC & UPLC Purity Profiling"
                              className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-neutral-900"
                            />
                            <button
                              type="button"
                              onClick={() => handleMoveCapability(cIdx, 'up')}
                              disabled={cIdx === 0}
                              className="p-1 rounded hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                              title="Move up"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveCapability(cIdx, 'down')}
                              disabled={cIdx === (page.capabilities || []).length - 1}
                              className="p-1 rounded hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                              title="Move down"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveCapability(cIdx)}
                              className="p-1 rounded text-red-500 hover:bg-red-50 cursor-pointer"
                              title="Delete capability"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <button
                          type="button"
                          onClick={handleAddCapability}
                          className="px-4 py-2 bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Capability Item</span>
                        </button>
                      </div>

                      {/* Live Preview */}
                      <div className="pt-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                          Capabilities Live Preview
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                          {(page.capabilities || []).map((c, idx) => (
                            <div key={idx} className="p-3 rounded-lg bg-white border border-slate-200 flex items-center gap-3 shadow-2xs">
                              <div className="w-8 h-8 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0">
                                <Check className="w-4 h-4 text-brand-blue" />
                              </div>
                              <span className="text-xs font-medium text-neutral-900 line-clamp-1">{c || 'Capability item'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* =========================================================================
                SECTION 4: APPLICABLE MODALITIES
               ========================================================================= */}
            {hasModalities && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
                <div
                  onClick={() => setIsModalitiesCardOpen(!isModalitiesCardOpen)}
                  className="p-5 sm:p-6 flex items-center justify-between gap-4 bg-gradient-to-r from-slate-50 via-purple-50/20 to-slate-50 border-b border-slate-200 cursor-pointer hover:bg-slate-100/80 transition-colors select-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 shrink-0">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-600 text-white shadow-2xs">
                          Section {modalitiesSecNum} • Modalities
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
                          {(page.applicableModalities || []).length} Modalit{(page.applicableModalities || []).length === 1 ? 'y' : 'ies'}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 truncate">
                        {modalitiesSecNum}. Applicable Modalities
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Remove Applicable Modalities from this page? It will only appear if you add it back.')) {
                          setPage((prev) => ({ ...prev, applicableModalities: undefined, hasUnpublishedChanges: true }));
                          setToast({ type: 'success', message: 'Removed Applicable Modalities from page.' });
                          setTimeout(() => setToast(null), 3000);
                        }
                      }}
                      className="p-1.5 px-2.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Remove section from page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Remove Section</span>
                    </button>
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      {isModalitiesCardOpen ? 'Click to collapse' : 'Click to edit Modalities'}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-2xs">
                      {isModalitiesCardOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {isModalitiesCardOpen && (
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200/80 text-xs text-slate-700 flex items-start gap-3">
                      <Layers className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900">Supported Modalities: </span>
                        Highlights the therapeutic modalities supported by this service or facility, linking directly to modality pages (mAbs, bispecifics, recombinant proteins, etc.).
                      </div>
                    </div>

                    {(!page.applicableModalities || page.applicableModalities.length === 0) ? (
                      <div className="p-8 border border-dashed border-slate-300 rounded-xl text-center space-y-3">
                        <p className="text-xs text-slate-500">No applicable modalities configured on this page yet.</p>
                        <button
                          type="button"
                          onClick={handleAddModality}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add First Modality</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {(page.applicableModalities || []).map((mod, mIdx) => (
                            <div key={mIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Modality {mIdx + 1}</span>
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleMoveModality(mIdx, 'up')}
                                    disabled={mIdx === 0}
                                    className="p-1 rounded hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                                    title="Move up"
                                  >
                                    <ChevronUp className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleMoveModality(mIdx, 'down')}
                                    disabled={mIdx === (page.applicableModalities || []).length - 1}
                                    className="p-1 rounded hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                                    title="Move down"
                                  >
                                    <ChevronDown className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveModality(mIdx)}
                                    className="p-1 rounded text-red-500 hover:bg-red-50 cursor-pointer ml-1"
                                    title="Delete modality"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                              <input
                                type="text"
                                value={mod.title || ''}
                                onChange={(e) => handleUpdateModality(mIdx, 'title', e.target.value)}
                                placeholder="e.g. Monoclonal Antibodies (mAbs)"
                                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-neutral-900"
                              />
                              <input
                                type="text"
                                value={mod.link || ''}
                                onChange={(e) => handleUpdateModality(mIdx, 'link', e.target.value)}
                                placeholder="/modalities/mabs"
                                className="w-full px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <button
                            type="button"
                            onClick={handleAddModality}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add Modality Card</span>
                          </button>
                        </div>

                        {/* Live Preview */}
                        <div className="pt-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                            Modalities Live Preview
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 rounded-2xl bg-neutral-50 border border-slate-200">
                            {(page.applicableModalities || []).map((m, idx) => (
                              <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
                                <div className="w-9 h-9 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-3">
                                  <Dna className="w-4.5 h-4.5 text-brand-blue" />
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-semibold text-neutral-900">{m.title || 'Modality'}</span>
                                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* =========================================================================
                SECTION 5: BIOASSAYS & IMMUNOGENICITY SUITES
               ========================================================================= */}
            {hasBioassays && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
                <div
                  onClick={() => setIsBioassaysCardOpen(!isBioassaysCardOpen)}
                  className="p-5 sm:p-6 flex items-center justify-between gap-4 bg-gradient-to-r from-slate-50 via-rose-50/20 to-slate-50 border-b border-slate-200 cursor-pointer hover:bg-slate-100/80 transition-colors select-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-600 shrink-0">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-600 text-white shadow-2xs">
                          Section {bioassaysSecNum} • Testing Suites
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
                          {(page.bioassayCapabilities || []).length + (page.immunogenicityCapabilities || []).length} Methods
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 truncate">
                        {bioassaysSecNum}. Bioassay & Immunogenicity Testing Suites
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Remove Bioassay & Immunogenicity Testing Suites from this page? It will only appear if you add it back.')) {
                          setPage((prev) => ({
                            ...prev,
                            bioassayCapabilities: undefined,
                            immunogenicityCapabilities: undefined,
                            hasUnpublishedChanges: true,
                          }));
                          setToast({ type: 'success', message: 'Removed Bioassay & Immunogenicity Suites from page.' });
                          setTimeout(() => setToast(null), 3000);
                        }
                      }}
                      className="p-1.5 px-2.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Remove section from page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Remove Section</span>
                    </button>
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      {isBioassaysCardOpen ? 'Click to collapse' : 'Click to edit Bioassays'}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-2xs">
                      {isBioassaysCardOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {isBioassaysCardOpen && (
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200/80 text-xs text-slate-700 flex items-start gap-3">
                      <HeartPulse className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900">Potency & Safety Testing: </span>
                        Specialized biological activity suites for cell-based potency assays, mechanism-of-action characterization, and anti-drug antibody (ADA) immunogenicity.
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Bioassay Capabilities */}
                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                            <Activity className="w-3.5 h-3.5" />
                            <span>Bioassay Capabilities ({(page.bioassayCapabilities || []).length})</span>
                          </h4>
                          <button
                            type="button"
                            onClick={handleAddBioassayCap}
                            className="text-[11px] font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add</span>
                          </button>
                        </div>
                        {(!page.bioassayCapabilities || page.bioassayCapabilities.length === 0) ? (
                          <p className="text-xs text-slate-400 italic">No bioassay capabilities added.</p>
                        ) : (
                          <div className="space-y-2">
                            {(page.bioassayCapabilities || []).map((bio, bIdx) => (
                              <div key={bIdx} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={bio}
                                  onChange={(e) => handleUpdateBioassayCap(bIdx, e.target.value)}
                                  placeholder="e.g. Reporter Gene & Proliferation Assays"
                                  className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveBioassayCap(bIdx)}
                                  className="p-1 text-red-500 hover:bg-red-50 rounded cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Immunogenicity Capabilities */}
                      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Immunogenicity Testing ({(page.immunogenicityCapabilities || []).length})</span>
                          </h4>
                          <button
                            type="button"
                            onClick={handleAddImmunogenicityCap}
                            className="text-[11px] font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add</span>
                          </button>
                        </div>
                        {(!page.immunogenicityCapabilities || page.immunogenicityCapabilities.length === 0) ? (
                          <p className="text-xs text-slate-400 italic">No immunogenicity testing methods added.</p>
                        ) : (
                          <div className="space-y-2">
                            {(page.immunogenicityCapabilities || []).map((imm, iIdx) => (
                              <div key={iIdx} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={imm}
                                  onChange={(e) => handleUpdateImmunogenicityCap(iIdx, e.target.value)}
                                  placeholder="e.g. Anti-Drug Antibody (ADA) Screening"
                                  className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImmunogenicityCap(iIdx)}
                                  className="p-1 text-red-500 hover:bg-red-50 rounded cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* =========================================================================
                SECTION 6: ANALYTICAL TECHNOLOGIES MATRIX
               ========================================================================= */}
            {hasAnalytics && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
                <div
                  onClick={() => setIsAnalyticsCardOpen(!isAnalyticsCardOpen)}
                  className="p-5 sm:p-6 flex items-center justify-between gap-4 bg-gradient-to-r from-slate-50 via-amber-50/20 to-slate-50 border-b border-slate-200 cursor-pointer hover:bg-slate-100/80 transition-colors select-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shrink-0">
                      <Microscope className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-600 text-white shadow-2xs">
                          Section {analyticsSecNum} • Instrumentation
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
                          {(page.analyticalTechnologies || []).length} Technolog{(page.analyticalTechnologies || []).length === 1 ? 'y' : 'ies'}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 truncate">
                        {analyticsSecNum}. Analytical Technologies Matrix
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Remove Analytical Technologies Matrix from this page? It will only appear if you add it back.')) {
                          setPage((prev) => ({ ...prev, analyticalTechnologies: undefined, hasUnpublishedChanges: true }));
                          setToast({ type: 'success', message: 'Removed Analytical Technologies Matrix from page.' });
                          setTimeout(() => setToast(null), 3000);
                        }
                      }}
                      className="p-1.5 px-2.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Remove section from page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Remove Section</span>
                    </button>
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      {isAnalyticsCardOpen ? 'Click to collapse' : 'Click to edit Technologies'}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-2xs">
                      {isAnalyticsCardOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {isAnalyticsCardOpen && (
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-slate-700 flex items-start gap-3">
                      <Microscope className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900">Analytical Instrumentation Matrix: </span>
                        Displays the analytical methods (HPLC, LC-MS, Capillary Electrophoresis, FTIR, SPR, etc.) in a rich card grid on physicochemical characterization pages.
                      </div>
                    </div>

                    {(!page.analyticalTechnologies || page.analyticalTechnologies.length === 0) ? (
                      <div className="p-8 border border-dashed border-slate-300 rounded-xl text-center space-y-3">
                        <p className="text-xs text-slate-500">No analytical technologies configured on this page yet.</p>
                        <button
                          type="button"
                          onClick={handleAddAnalyticalTech}
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add First Analytical Technology</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {(page.analyticalTechnologies || []).map((tech, tIdx) => {
                            const name = typeof tech === 'string' ? tech : tech.name;
                            const desc = typeof tech === 'string' ? '' : tech.description;
                            const category = typeof tech === 'string' ? 'Characterization' : tech.category || 'Characterization';

                            return (
                              <div key={tIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                                    Technology {tIdx + 1}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      onClick={() => handleMoveAnalyticalTech(tIdx, 'up')}
                                      disabled={tIdx === 0}
                                      className="p-1 rounded hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                                      title="Move up"
                                    >
                                      <ChevronUp className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleMoveAnalyticalTech(tIdx, 'down')}
                                      disabled={tIdx === (page.analyticalTechnologies || []).length - 1}
                                      className="p-1 rounded hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                                      title="Move down"
                                    >
                                      <ChevronDown className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveAnalyticalTech(tIdx)}
                                      className="p-1 rounded text-red-500 hover:bg-red-50 cursor-pointer ml-1"
                                      title="Delete technology"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>

                                <div>
                                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">Name / Method</label>
                                  <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => handleUpdateAnalyticalTech(tIdx, 'name', e.target.value)}
                                    placeholder="e.g. LC-MS / MS Mass Spectrometry"
                                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-neutral-900"
                                  />
                                </div>

                                <div>
                                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">Category Badge</label>
                                  <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => handleUpdateAnalyticalTech(tIdx, 'category', e.target.value)}
                                    placeholder="e.g. Primary Structure or Purity"
                                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                                  />
                                </div>

                                <div>
                                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">Description</label>
                                  <textarea
                                    rows={2}
                                    value={desc}
                                    onChange={(e) => handleUpdateAnalyticalTech(tIdx, 'description', e.target.value)}
                                    placeholder="Intact mass analysis and peptide mapping for sequence confirmation..."
                                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <button
                            type="button"
                            onClick={handleAddAnalyticalTech}
                            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add Technology Card</span>
                          </button>
                        </div>

                        {/* Live Preview */}
                        <div className="pt-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                            Analytical Technologies Live Preview
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                            {(page.analyticalTechnologies || []).map((t, idx) => {
                              const title = typeof t === 'string' ? t : t.name;
                              const d = typeof t === 'string' ? '' : t.description;
                              const c = typeof t === 'string' ? '' : t.category;
                              return (
                                <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                                  <div className="flex items-center justify-between">
                                    <div className="w-8 h-8 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center">
                                      <Microscope className="w-4 h-4 text-brand-blue" />
                                    </div>
                                    {c && <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{c}</span>}
                                  </div>
                                  <div className="text-xs font-bold text-neutral-900">{title || 'Technology'}</div>
                                  {d && <div className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{d}</div>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* =========================================================================
                SECTION 7: NARRATIVE CONTENT SECTIONS (WYSIWYG CANVAS)
               ========================================================================= */}
            {supportsNarrativeSections && (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-blue text-white shadow-2xs">
                    Section {narrativeSecNum} • Core Layouts
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
                    {(page.sections || []).length} Section{(page.sections || []).length === 1 ? '' : 's'}
                  </span>
                </div>
                <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                  <Layers className="w-4.5 h-4.5 text-brand-blue" />
                  <span>{narrativeSecNum}. Narrative Content Sections (WYSIWYG Layout Canvas)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Every section renders in its exact live website structure (50/50 Feature Split, Dual Locations Map, Bento Cards Grid, Process Steps, Equipment Carousel, etc.).
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsLayoutModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs cursor-pointer active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Section (Choose Layout)</span>
              </button>
            </div>

            {/* List of Sections */}
            {(!page.sections || page.sections.length === 0) ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Layers className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-neutral-900">No sections added yet</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                    Click the button below to pick a layout style from our gallery and add your first section.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLayoutModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-brand-orange text-white text-xs font-bold inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Choose Section Layout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {page.sections.map((sec, idx) => {
                  const isOpen = openSectionId === idx;
                  const currentLayout =
                    SECTION_LAYOUTS.find((l) => l.id === (sec.style || 'feature-split')) ||
                    SECTION_LAYOUTS.find((l) => l.id === 'feature-split') ||
                    SECTION_LAYOUTS[0];
                  const isImageLeft = sec.imageSide === 'left';
                  const secMediaUrl = sec.image || sec.video || '';
                  const secIsVideo = isVideoUrl(secMediaUrl, sec.mediaType);

                  return (
                    <div
                      key={sec.id || idx}
                      className={`bg-white rounded-2xl border ${
                        isOpen ? 'border-brand-blue/60 shadow-md ring-2 ring-brand-blue/10' : 'border-slate-200/90 shadow-xs'
                      } overflow-hidden transition-all`}
                    >
                      {/* Section Accordion Header Bar */}
                      <div className="p-4 sm:p-5 flex items-center justify-between gap-3 bg-slate-50/70 border-b border-slate-100">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="w-7 h-7 rounded-lg bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
                                {currentLayout.name}
                              </span>
                              {(sec.subtitle || sec.badge) && (
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 truncate max-w-xs">
                                  Tag: {sec.subtitle || sec.badge}
                                </span>
                              )}
                              {secMediaUrl && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1 truncate max-w-xs">
                                  {secIsVideo ? <Play className="w-2.5 h-2.5 text-emerald-600 fill-current" /> : <ImageIcon className="w-2.5 h-2.5 text-sky-600" />}
                                  <span>{secMediaUrl.split('/').pop()}</span>
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-bold text-neutral-900 truncate mt-0.5">
                              {sec.title || 'Untitled Section'}
                            </h4>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleMoveSection(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-neutral-900 hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                            title="Move Up"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveSection(idx, 'down')}
                            disabled={idx === (page.sections?.length || 0) - 1}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-neutral-900 hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                            title="Move Down"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDuplicateSection(idx)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-blue-50 cursor-pointer"
                            title="Duplicate Section"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSection(idx)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                            title="Delete Section"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setOpenSectionId(isOpen ? null : idx)}
                            className={`p-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer ml-1 transition-all ${
                              isOpen ? 'bg-brand-navy text-white shadow-xs' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                            }`}
                          >
                            {isOpen ? 'Collapse' : 'Edit Layout'}
                          </button>
                        </div>
                      </div>

                      {/* Section Visual Layout Body */}
                      {isOpen && (
                        <div className="p-5 sm:p-7 space-y-6 animate-in fade-in duration-200">
                          {/* Layout Style & Tone Config Bar */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                            <div>
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                                Section Layout Style
                              </label>
                              <select
                                value={sec.style || 'feature-split'}
                                onChange={(e) => updateSectionField(idx, 'style', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold bg-white text-neutral-900 focus:outline-none focus:border-brand-blue"
                              >
                                {SECTION_LAYOUTS.map((layout) => (
                                  <option key={layout.id} value={layout.id}>
                                    {layout.name} ({layout.tag})
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                                Background Tone
                              </label>
                              <select
                                value={sec.dark ? 'dark' : 'light'}
                                onChange={(e) => updateSectionField(idx, 'dark', e.target.value === 'dark')}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold bg-white text-neutral-900 focus:outline-none focus:border-brand-blue"
                              >
                                <option value="light">Light (Clean White / Slate)</option>
                                <option value="dark">Dark (Deep Brand Navy)</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                                Media Alignment (50/50 Layout)
                              </label>
                              <select
                                value={sec.imageSide || 'right'}
                                onChange={(e) => updateSectionField(idx, 'imageSide', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold bg-white text-neutral-900 focus:outline-none focus:border-brand-blue"
                              >
                                <option value="right">Media on Right, Text on Left</option>
                                <option value="left">Media on Left, Text on Right</option>
                              </select>
                            </div>
                          </div>

                          {/* =========================================================================
                              LAYOUT 0: BENTO INSIGHTS / FEATURED RESEARCH GRID (MATCHING WEBSITE IMAGE)
                             ========================================================================= */}
                          {sec.style === 'bento-insights' ? (
                            <div className="space-y-6 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                              {/* Top Header of Bento Insights matching website */}
                              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-slate-200">
                                <div className="space-y-3 flex-1 max-w-2xl">
                                  <div className="flex items-center gap-2">
                                    <Tag className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                                    <input
                                      type="text"
                                      value={sec.subtitle || 'SCIENTIFIC PERSPECTIVES & NEWS'}
                                      onChange={(e) => updateSectionField(idx, 'subtitle', e.target.value)}
                                      placeholder="Tag / Subtitle (e.g. SCIENTIFIC PERSPECTIVES & NEWS)"
                                      className="text-xs font-bold text-brand-orange uppercase tracking-wider border border-slate-200 rounded-lg px-2.5 py-1 bg-white focus:outline-none focus:border-brand-blue w-full max-w-xs"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                      Section Main Heading (h2)
                                    </label>
                                    <input
                                      type="text"
                                      value={sec.title || 'Featured Research and Insights'}
                                      onChange={(e) => updateSectionField(idx, 'title', e.target.value)}
                                      placeholder="Section Heading (e.g. Featured Research and Insights)"
                                      className="text-xl sm:text-2xl font-bold text-neutral-900 border border-slate-200 rounded-xl p-2.5 bg-white w-full focus:outline-none focus:border-brand-blue"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                      Section Subtitle Description
                                    </label>
                                    <textarea
                                      rows={2}
                                      value={sec.text || 'Explore the latest perspectives from our scientists — blogs, news, and upcoming events.'}
                                      onChange={(e) => updateSectionField(idx, 'text', e.target.value)}
                                      placeholder="Explore the latest perspectives from our scientists..."
                                      className="text-xs sm:text-sm text-neutral-700 border border-slate-200 rounded-xl p-2.5 bg-white w-full focus:outline-none focus:border-brand-blue"
                                    />
                                  </div>
                                </div>

                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 shrink-0 sm:w-64">
                                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                                    Top-Right View All Button
                                  </label>
                                  <input
                                    type="text"
                                    value={sec.buttonText || 'View all insights'}
                                    onChange={(e) => updateSectionField(idx, 'buttonText', e.target.value)}
                                    placeholder="Button Text (View all insights)"
                                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold bg-white"
                                  />
                                  <input
                                    type="text"
                                    value={sec.buttonLink || '/insights/blogs'}
                                    onChange={(e) => updateSectionField(idx, 'buttonLink', e.target.value)}
                                    placeholder="Button Link (/insights/blogs)"
                                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-mono bg-white"
                                  />
                                  <div className="pt-1 flex items-center justify-center">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-blue text-brand-blue text-xs font-semibold">
                                      <span>{sec.buttonText || 'View all insights'}</span>
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* 3-Article Bento Grid Visual Layout matching website */}
                              {(() => {
                                const bentoCards = getBentoCards(sec);
                                return (
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                                    {/* LEFT COLUMN: Featured Large Article Card (Card 0) */}
                                    <div className="p-5 rounded-2xl border-2 border-brand-blue/30 bg-slate-50/70 space-y-4 shadow-sm flex flex-col justify-between">
                                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                        <span className="text-xs font-bold uppercase tracking-wider text-brand-blue flex items-center gap-1.5">
                                          <Sparkles className="w-3.5 h-3.5" />
                                          <span>Featured Big Card (Left)</span>
                                        </span>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-blue/10 text-brand-blue">
                                          Article 1
                                        </span>
                                      </div>

                                      <MediaControlWithPreview
                                        label="Article 1 Cover Photo"
                                        mediaUrl={bentoCards[0]?.image || '/images/cdn/unsplash-1614935151651-0bea6508db6b.jpg'}
                                        onChangeUrl={(url) => updateBentoCard(idx, 0, 'image', url)}
                                        onOpenPresetGallery={() => {
                                          setGalleryTargetCallback(() => (url: string) => {
                                            updateBentoCard(idx, 0, 'image', url);
                                          });
                                          setIsGalleryModalOpen(true);
                                        }}
                                        onUploadFile={(file) => {
                                          handleFileUpload(file, (url) => {
                                            updateBentoCard(idx, 0, 'image', url);
                                          });
                                        }}
                                        uploading={uploading}
                                        aspectRatioClass="aspect-[16/9]"
                                        allowTypeToggle={false}
                                      />

                                      <div className="space-y-2.5">
                                        <div>
                                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                            Category Tag
                                          </label>
                                          <input
                                            type="text"
                                            value={bentoCards[0]?.badge || 'CELL LINE DEVELOPMENT'}
                                            onChange={(e) => updateBentoCard(idx, 0, 'badge', e.target.value)}
                                            placeholder="e.g. CELL LINE DEVELOPMENT"
                                            className="w-full text-xs font-bold text-brand-orange border border-slate-200 rounded-lg px-2.5 py-1 bg-white focus:outline-none focus:border-brand-blue"
                                          />
                                        </div>

                                        <div>
                                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                            Article Title Heading
                                          </label>
                                          <input
                                            type="text"
                                            value={bentoCards[0]?.title || 'Accelerating Cell Line Development for Monoclonal Antibodies'}
                                            onChange={(e) => updateBentoCard(idx, 0, 'title', e.target.value)}
                                            placeholder="Article Title..."
                                            className="w-full text-base font-bold text-neutral-900 border border-slate-200 rounded-xl p-2 bg-white focus:outline-none focus:border-brand-blue"
                                          />
                                        </div>

                                        <div>
                                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                            Article Summary Subtitle
                                          </label>
                                          <textarea
                                            rows={2}
                                            value={bentoCards[0]?.description || 'How automated clone screening and stable CHO platforms shorten the path from gene to high-producing cell line.'}
                                            onChange={(e) => updateBentoCard(idx, 0, 'description', e.target.value)}
                                            placeholder="Article summary..."
                                            className="w-full text-xs text-neutral-800 border border-slate-200 rounded-xl p-2 bg-white focus:outline-none focus:border-brand-blue"
                                          />
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                          <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                              Date & Read Time
                                            </label>
                                            <input
                                              type="text"
                                              value={bentoCards[0]?.step || 'November 15, 2023 · 8 min read'}
                                              onChange={(e) => updateBentoCard(idx, 0, 'step', e.target.value)}
                                              placeholder="Date · Read Time"
                                              className="w-full text-xs border border-slate-200 rounded-lg p-1.5 bg-white"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                              Article Link URL
                                            </label>
                                            <input
                                              type="text"
                                              value={bentoCards[0]?.link || '/insights/blogs/accelerating-cell-line-development-for-mabs'}
                                              onChange={(e) => updateBentoCard(idx, 0, 'link', e.target.value)}
                                              placeholder="/insights/blogs/..."
                                              className="w-full text-xs font-mono border border-slate-200 rounded-lg p-1.5 bg-white"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* RIGHT COLUMN: 2 Stacked Horizontal Article Cards (Card 1 & Card 2) */}
                                    <div className="flex flex-col gap-6">
                                      {/* Card 1 (Top Right) */}
                                      <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3 shadow-sm">
                                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                                            <span>Horizontal Article Card (Top Right)</span>
                                          </span>
                                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                                            Article 2
                                          </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                                          <div className="sm:col-span-5">
                                            <MediaControlWithPreview
                                              label="Photo"
                                              mediaUrl={bentoCards[1]?.image || '/images/default_scientist.png'}
                                              onChangeUrl={(url) => updateBentoCard(idx, 1, 'image', url)}
                                              onOpenPresetGallery={() => {
                                                setGalleryTargetCallback(() => (url: string) => {
                                                  updateBentoCard(idx, 1, 'image', url);
                                                });
                                                setIsGalleryModalOpen(true);
                                              }}
                                              onUploadFile={(file) => {
                                                handleFileUpload(file, (url) => {
                                                  updateBentoCard(idx, 1, 'image', url);
                                                });
                                              }}
                                              uploading={uploading}
                                              aspectRatioClass="aspect-[4/3]"
                                              allowTypeToggle={false}
                                            />
                                          </div>
                                          <div className="sm:col-span-7 space-y-2">
                                            <input
                                              type="text"
                                              value={bentoCards[1]?.badge || 'CELL LINE DEVELOPMENT'}
                                              onChange={(e) => updateBentoCard(idx, 1, 'badge', e.target.value)}
                                              placeholder="Category Tag"
                                              className="w-full text-[11px] font-bold text-brand-orange border border-slate-200 rounded px-2 py-1 bg-white"
                                            />
                                            <input
                                              type="text"
                                              value={bentoCards[1]?.title || 'From DNA to Research Cell Bank in 16 Weeks'}
                                              onChange={(e) => updateBentoCard(idx, 1, 'title', e.target.value)}
                                              placeholder="Article Title..."
                                              className="w-full text-xs sm:text-sm font-bold text-neutral-900 border border-slate-200 rounded-lg p-1.5 bg-white"
                                            />
                                            <textarea
                                              rows={2}
                                              value={bentoCards[1]?.description || 'A look inside the streamlined gene-to-RCB pathway that de-risks early biologics development timelines.'}
                                              onChange={(e) => updateBentoCard(idx, 1, 'description', e.target.value)}
                                              placeholder="Article summary..."
                                              className="w-full text-xs text-neutral-700 border border-slate-200 rounded-lg p-1.5 bg-white"
                                            />
                                            <div className="grid grid-cols-2 gap-1.5">
                                              <input
                                                type="text"
                                                value={bentoCards[1]?.step || '6 min read'}
                                                onChange={(e) => updateBentoCard(idx, 1, 'step', e.target.value)}
                                                placeholder="Read Time"
                                                className="w-full text-[11px] border border-slate-200 rounded p-1 bg-white"
                                              />
                                              <input
                                                type="text"
                                                value={bentoCards[1]?.link || '/insights/blogs/from-dna-to-research-cell-bank-in-16-weeks'}
                                                onChange={(e) => updateBentoCard(idx, 1, 'link', e.target.value)}
                                                placeholder="Link URL"
                                                className="w-full text-[11px] font-mono border border-slate-200 rounded p-1 bg-white"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Card 2 (Bottom Right) */}
                                      <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3 shadow-sm">
                                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                                            <span>Horizontal Article Card (Bottom Right)</span>
                                          </span>
                                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                                            Article 3
                                          </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                                          <div className="sm:col-span-5">
                                            <MediaControlWithPreview
                                              label="Photo"
                                              mediaUrl={bentoCards[2]?.image || '/images/cdn/unsplash-1606206873764-fd15e242df52.jpg'}
                                              onChangeUrl={(url) => updateBentoCard(idx, 2, 'image', url)}
                                              onOpenPresetGallery={() => {
                                                setGalleryTargetCallback(() => (url: string) => {
                                                  updateBentoCard(idx, 2, 'image', url);
                                                });
                                                setIsGalleryModalOpen(true);
                                              }}
                                              onUploadFile={(file) => {
                                                handleFileUpload(file, (url) => {
                                                  updateBentoCard(idx, 2, 'image', url);
                                                });
                                              }}
                                              uploading={uploading}
                                              aspectRatioClass="aspect-[4/3]"
                                              allowTypeToggle={false}
                                            />
                                          </div>
                                          <div className="sm:col-span-7 space-y-2">
                                            <input
                                              type="text"
                                              value={bentoCards[2]?.badge || 'PROCESS DEVELOPMENT'}
                                              onChange={(e) => updateBentoCard(idx, 2, 'badge', e.target.value)}
                                              placeholder="Category Tag"
                                              className="w-full text-[11px] font-bold text-brand-orange border border-slate-200 rounded px-2 py-1 bg-white"
                                            />
                                            <input
                                              type="text"
                                              value={bentoCards[2]?.title || 'Upstream Process Optimization: Feed and Perfusion Strategies'}
                                              onChange={(e) => updateBentoCard(idx, 2, 'title', e.target.value)}
                                              placeholder="Article Title..."
                                              className="w-full text-xs sm:text-sm font-bold text-neutral-900 border border-slate-200 rounded-lg p-1.5 bg-white"
                                            />
                                            <textarea
                                              rows={2}
                                              value={bentoCards[2]?.description || 'How feed design, perfusion configurations, and scale-down models raise titers while protecting product quality.'}
                                              onChange={(e) => updateBentoCard(idx, 2, 'description', e.target.value)}
                                              placeholder="Article summary..."
                                              className="w-full text-xs text-neutral-700 border border-slate-200 rounded-lg p-1.5 bg-white"
                                            />
                                            <div className="grid grid-cols-2 gap-1.5">
                                              <input
                                                type="text"
                                                value={bentoCards[2]?.step || '9 min read'}
                                                onChange={(e) => updateBentoCard(idx, 2, 'step', e.target.value)}
                                                placeholder="Read Time"
                                                className="w-full text-[11px] border border-slate-200 rounded p-1 bg-white"
                                              />
                                              <input
                                                type="text"
                                                value={bentoCards[2]?.link || '/insights/blogs/upstream-process-optimization-feed-and-perfusion'}
                                                onChange={(e) => updateBentoCard(idx, 2, 'link', e.target.value)}
                                                placeholder="Link URL"
                                                className="w-full text-[11px] font-mono border border-slate-200 rounded p-1 bg-white"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          ) : sec.style === 'locations-map' ? (
                            <div className="space-y-6 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                              {/* Section Title & Subtitle Header */}
                              <div className="text-center max-w-3xl mx-auto space-y-2">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider">
                                  <Tag className="w-3.5 h-3.5" />
                                  <input
                                    type="text"
                                    value={sec.subtitle || 'INTEGRATED CDMO NETWORK'}
                                    onChange={(e) => updateSectionField(idx, 'subtitle', e.target.value)}
                                    placeholder="Subtitle / Tag"
                                    className="bg-transparent border-none text-center focus:outline-none focus:ring-1 focus:ring-brand-orange rounded px-1 w-56 font-bold"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                    Locations Section Heading (Image 5)
                                  </label>
                                  <input
                                    type="text"
                                    value={sec.title || 'Global CDMO Capabilities Across India and Europe'}
                                    onChange={(e) => updateSectionField(idx, 'title', e.target.value)}
                                    className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-neutral-900 w-full p-2 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-blue"
                                  />
                                </div>
                              </div>

                              {/* 2-Column Responsive Grid matching Image 5 */}
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-2">
                                {/* Left Column: 2 Separate Location Cards */}
                                <div className="lg:col-span-6 flex flex-col gap-5">
                                  {/* Card 1: India Campus */}
                                  <div className="p-5 rounded-2xl border-2 border-brand-blue/60 bg-sky-50/20 space-y-3 relative shadow-xs">
                                    <div className="flex items-center justify-between">
                                      <div className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue bg-sky-100 px-2.5 py-0.5 rounded-md border border-sky-200">
                                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                                        <input
                                          type="text"
                                          value={sec.cards?.[0]?.badge ?? 'India Campus'}
                                          onChange={(e) => {
                                            const cards = [...(sec.cards || [
                                              { badge: 'India Campus', title: 'Ahmedabad, India', description: 'Integrated development with Process and Analytical Sciences, combined with cGMP manufacturing for both drug substance and drug product.', buttonText: 'Explore Ahmedabad Facility', link: '/facility&location/India' },
                                              { badge: 'UK Centre', title: 'London, UK', description: 'Biologics development capabilities supporting drug substance process & analytical development and process characterisation studies.', buttonText: 'Explore London Centre', link: '/facility&location/UK' }
                                            ])];
                                            cards[0] = { ...cards[0], badge: e.target.value };
                                            updateSectionField(idx, 'cards', cards);
                                          }}
                                          placeholder="India Campus"
                                          className="bg-transparent border-none text-xs font-bold text-brand-blue focus:outline-none focus:ring-0 p-0 w-28"
                                        />
                                      </div>
                                      <div className="w-8 h-8 rounded-lg bg-sky-100 text-brand-blue flex items-center justify-center">
                                        <Building2 className="w-4 h-4" />
                                      </div>
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                        Campus Title / City
                                      </label>
                                      <input
                                        type="text"
                                        value={sec.cards?.[0]?.title ?? 'Ahmedabad, India'}
                                        onChange={(e) => {
                                          const cards = [...(sec.cards || [
                                            { badge: 'India Campus', title: 'Ahmedabad, India', description: 'Integrated development with Process and Analytical Sciences, combined with cGMP manufacturing for both drug substance and drug product.', buttonText: 'Explore Ahmedabad Facility', link: '/facility&location/India' },
                                            { badge: 'UK Centre', title: 'London, UK', description: 'Biologics development capabilities supporting drug substance process & analytical development and process characterisation studies.', buttonText: 'Explore London Centre', link: '/facility&location/UK' }
                                          ])];
                                          cards[0] = { ...cards[0], title: e.target.value };
                                          updateSectionField(idx, 'cards', cards);
                                        }}
                                        placeholder="Ahmedabad, India"
                                        className="text-base font-bold text-neutral-900 w-full p-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-brand-blue"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                        Description Text
                                      </label>
                                      <textarea
                                        rows={2}
                                        value={sec.cards?.[0]?.description ?? 'Integrated development with Process and Analytical Sciences, combined with cGMP manufacturing for both drug substance and drug product.'}
                                        onChange={(e) => {
                                          const cards = [...(sec.cards || [
                                            { badge: 'India Campus', title: 'Ahmedabad, India', description: 'Integrated development with Process and Analytical Sciences, combined with cGMP manufacturing for both drug substance and drug product.', buttonText: 'Explore Ahmedabad Facility', link: '/facility&location/India' },
                                            { badge: 'UK Centre', title: 'London, UK', description: 'Biologics development capabilities supporting drug substance process & analytical development and process characterisation studies.', buttonText: 'Explore London Centre', link: '/facility&location/UK' }
                                          ])];
                                          cards[0] = { ...cards[0], description: e.target.value };
                                          updateSectionField(idx, 'cards', cards);
                                        }}
                                        placeholder="Description text..."
                                        className="text-xs text-slate-700 leading-relaxed w-full p-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-brand-blue"
                                      />
                                    </div>
                                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                                      <div className="flex items-center gap-1.5 flex-1 min-w-[140px]">
                                        <span className="text-[10px] font-bold text-slate-400">Route:</span>
                                        <input
                                          type="text"
                                          value={sec.cards?.[0]?.link || (sec.cards?.[0] as any)?.href || '/facility&location/India'}
                                          onChange={(e) => {
                                            const cards = [...(sec.cards || [
                                              { badge: 'India Campus', title: 'Ahmedabad, India', description: 'Integrated development with Process and Analytical Sciences, combined with cGMP manufacturing for both drug substance and drug product.', buttonText: 'Explore Ahmedabad Facility', link: '/facility&location/India' },
                                              { badge: 'UK Centre', title: 'London, UK', description: 'Biologics development capabilities supporting drug substance process & analytical development and process characterisation studies.', buttonText: 'Explore London Centre', link: '/facility&location/UK' }
                                            ])];
                                            cards[0] = { ...cards[0], link: e.target.value };
                                            updateSectionField(idx, 'cards', cards);
                                          }}
                                          placeholder="/facility&location/India"
                                          className="text-xs font-mono border border-slate-200 rounded px-2 py-1 bg-white w-full"
                                        />
                                      </div>
                                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-blue text-white text-xs font-bold shadow-2xs">
                                        <input
                                          type="text"
                                          value={sec.cards?.[0]?.buttonText ?? 'Explore Ahmedabad Facility'}
                                          onChange={(e) => {
                                            const cards = [...(sec.cards || [
                                              { badge: 'India Campus', title: 'Ahmedabad, India', description: 'Integrated development with Process and Analytical Sciences, combined with cGMP manufacturing for both drug substance and drug product.', buttonText: 'Explore Ahmedabad Facility', link: '/facility&location/India' },
                                              { badge: 'UK Centre', title: 'London, UK', description: 'Biologics development capabilities supporting drug substance process & analytical development and process characterisation studies.', buttonText: 'Explore London Centre', link: '/facility&location/UK' }
                                            ])];
                                            cards[0] = { ...cards[0], buttonText: e.target.value };
                                            updateSectionField(idx, 'cards', cards);
                                          }}
                                          placeholder="Explore Ahmedabad Facility"
                                          className="bg-transparent border-none text-white text-xs font-bold focus:outline-none focus:ring-0 p-0 text-right w-44"
                                        />
                                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Card 2: UK Campus */}
                                  <div className="p-5 rounded-2xl border-2 border-brand-orange/60 bg-orange-50/20 space-y-3 relative shadow-xs">
                                    <div className="flex items-center justify-between">
                                      <div className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange bg-orange-100 px-2.5 py-0.5 rounded-md border border-orange-200">
                                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                                        <input
                                          type="text"
                                          value={sec.cards?.[1]?.badge ?? 'UK Centre'}
                                          onChange={(e) => {
                                            const cards = [...(sec.cards || [
                                              { badge: 'India Campus', title: 'Ahmedabad, India', description: 'Integrated development with Process and Analytical Sciences, combined with cGMP manufacturing for both drug substance and drug product.', buttonText: 'Explore Ahmedabad Facility', link: '/facility&location/India' },
                                              { badge: 'UK Centre', title: 'London, UK', description: 'Biologics development capabilities supporting drug substance process & analytical development and process characterisation studies.', buttonText: 'Explore London Centre', link: '/facility&location/UK' }
                                            ])];
                                            cards[1] = { ...cards[1], badge: e.target.value };
                                            updateSectionField(idx, 'cards', cards);
                                          }}
                                          placeholder="UK Centre"
                                          className="bg-transparent border-none text-xs font-bold text-brand-orange focus:outline-none focus:ring-0 p-0 w-28"
                                        />
                                      </div>
                                      <div className="w-8 h-8 rounded-lg bg-orange-100 text-brand-orange flex items-center justify-center">
                                        <Microscope className="w-4 h-4" />
                                      </div>
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                        Campus Title / City
                                      </label>
                                      <input
                                        type="text"
                                        value={sec.cards?.[1]?.title ?? 'London, UK'}
                                        onChange={(e) => {
                                          const cards = [...(sec.cards || [
                                            { badge: 'India Campus', title: 'Ahmedabad, India', description: 'Integrated development with Process and Analytical Sciences, combined with cGMP manufacturing for both drug substance and drug product.', buttonText: 'Explore Ahmedabad Facility', link: '/facility&location/India' },
                                            { badge: 'UK Centre', title: 'London, UK', description: 'Biologics development capabilities supporting drug substance process & analytical development and process characterisation studies.', buttonText: 'Explore London Centre', link: '/facility&location/UK' }
                                          ])];
                                          cards[1] = { ...cards[1], title: e.target.value };
                                          updateSectionField(idx, 'cards', cards);
                                        }}
                                        placeholder="London, UK"
                                        className="text-base font-bold text-neutral-900 w-full p-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-brand-blue"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                        Description Text
                                      </label>
                                      <textarea
                                        rows={2}
                                        value={sec.cards?.[1]?.description ?? 'Biologics development capabilities supporting drug substance process & analytical development and process characterisation studies.'}
                                        onChange={(e) => {
                                          const cards = [...(sec.cards || [
                                            { badge: 'India Campus', title: 'Ahmedabad, India', description: 'Integrated development with Process and Analytical Sciences, combined with cGMP manufacturing for both drug substance and drug product.', buttonText: 'Explore Ahmedabad Facility', link: '/facility&location/India' },
                                            { badge: 'UK Centre', title: 'London, UK', description: 'Biologics development capabilities supporting drug substance process & analytical development and process characterisation studies.', buttonText: 'Explore London Centre', link: '/facility&location/UK' }
                                          ])];
                                          cards[1] = { ...cards[1], description: e.target.value };
                                          updateSectionField(idx, 'cards', cards);
                                        }}
                                        placeholder="Description text..."
                                        className="text-xs text-slate-700 leading-relaxed w-full p-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-brand-blue"
                                      />
                                    </div>
                                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                                      <div className="flex items-center gap-1.5 flex-1 min-w-[140px]">
                                        <span className="text-[10px] font-bold text-slate-400">Route:</span>
                                        <input
                                          type="text"
                                          value={sec.cards?.[1]?.link || (sec.cards?.[1] as any)?.href || '/facility&location/UK'}
                                          onChange={(e) => {
                                            const cards = [...(sec.cards || [
                                              { badge: 'India Campus', title: 'Ahmedabad, India', description: 'Integrated development with Process and Analytical Sciences, combined with cGMP manufacturing for both drug substance and drug product.', buttonText: 'Explore Ahmedabad Facility', link: '/facility&location/India' },
                                              { badge: 'UK Centre', title: 'London, UK', description: 'Biologics development capabilities supporting drug substance process & analytical development and process characterisation studies.', buttonText: 'Explore London Centre', link: '/facility&location/UK' }
                                            ])];
                                            cards[1] = { ...cards[1], link: e.target.value };
                                            updateSectionField(idx, 'cards', cards);
                                          }}
                                          placeholder="/facility&location/UK"
                                          className="text-xs font-mono border border-slate-200 rounded px-2 py-1 bg-white w-full"
                                        />
                                      </div>
                                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-orange text-white text-xs font-bold shadow-2xs">
                                        <input
                                          type="text"
                                          value={sec.cards?.[1]?.buttonText ?? 'Explore London Centre'}
                                          onChange={(e) => {
                                            const cards = [...(sec.cards || [
                                              { badge: 'India Campus', title: 'Ahmedabad, India', description: 'Integrated development with Process and Analytical Sciences, combined with cGMP manufacturing for both drug substance and drug product.', buttonText: 'Explore Ahmedabad Facility', link: '/facility&location/India' },
                                              { badge: 'UK Centre', title: 'London, UK', description: 'Biologics development capabilities supporting drug substance process & analytical development and process characterisation studies.', buttonText: 'Explore London Centre', link: '/facility&location/UK' }
                                            ])];
                                            cards[1] = { ...cards[1], buttonText: e.target.value };
                                            updateSectionField(idx, 'cards', cards);
                                          }}
                                          placeholder="Explore London Centre"
                                          className="bg-transparent border-none text-white text-xs font-bold focus:outline-none focus:ring-0 p-0 text-right w-44"
                                        />
                                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Right Column: World Map Visual Graphic */}
                                <div className="lg:col-span-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0a1926] to-[#0f2231] p-6 text-white flex flex-col justify-between relative overflow-hidden min-h-[340px] border border-slate-700 shadow-md">
                                  <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
                                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                      <span>CDMO Global Network Map</span>
                                    </span>
                                    <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-300">
                                      <span className="px-2 py-0.5 rounded bg-brand-blue/30 border border-brand-blue/40 text-sky-200">Ahmedabad, India</span>
                                      <span className="px-2 py-0.5 rounded bg-brand-orange/30 border border-brand-orange/40 text-orange-200">London, UK</span>
                                    </div>
                                  </div>

                                  <div className="relative z-10 py-6 text-center space-y-3">
                                    <div className="w-16 h-16 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue mx-auto flex items-center justify-center shadow-lg">
                                      <Globe className="w-8 h-8" />
                                    </div>
                                    <p className="text-sm font-semibold text-slate-200 max-w-sm mx-auto">
                                      Interactive Vector World Map is rendered on the public website connecting both global sites with live pin coordinates.
                                    </p>
                                  </div>

                                  <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                                    <span>Vector File: /images/world-map.svg</span>
                                    <span className="text-brand-orange font-bold">Preview Active</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (sec.title?.toLowerCase().includes('advantage') || sec.subtitle?.toLowerCase().includes('what sets us apart') || sec.id === 'sec-about-advantage' || sec.style === 'capabilities-grid' || (page.slug === 'about' && (sec.id === 'sec-about-advantage' || sec.style === 'capabilities-checklist' || sec.style === 'capabilities-grid')) || (sec.style === 'cards-grid' && !sec.cards?.some((c) => c.image) && (sec.cards?.length || 0) >= 4)) ? (() => {
                            const defaultIcons = [Workflow, Globe, Dna, Microscope, TrendingUp, Factory, Package, ShieldCheck, Users];
                            const activeCards = (sec.cards && sec.cards.length > 0)
                              ? sec.cards
                              : (sec.bullets && sec.bullets.length > 0)
                              ? sec.bullets.map((b) => ({ title: b, description: '' }))
                              : (page.capabilities && page.capabilities.length > 0 && page.slug === 'about')
                              ? page.capabilities.map((c) => ({ title: c, description: '' }))
                              : [
                                  { title: 'Integrated biologics development, analytical, and manufacturing capabilities', description: '' },
                                  { title: 'Extensive biologics development capabilities across India and Europe', description: '' },
                                  { title: 'Molecule-specific development approaches across cell line engineering, process development for Drug substance (upstream cell culture, downstream purification) and Drug product, and analytical development', description: '' },
                                  { title: 'Advanced analytical characterization supporting method development and validation, product understanding, and comparative analytical assessment.', description: '' },
                                  { title: 'Process development focused on scalability, robustness, and manufacturability.', description: '' },
                                  { title: 'Process characterisation studies to support process validation for both Drug Substance and Drug Product.', description: '' },
                                  { title: 'GMP manufacturing capabilities and flexible capacity supporting development batches through clinical supplies', description: '' },
                                  { title: 'Quality and compliance systems supporting GMP operations and regulatory requirements', description: '' },
                                  { title: 'The above biologics development capabilities is well integrated with Lambda and Novum’s clinical research and regulated bioanalytical capabilities for peptides and biologics.', description: '' }
                                ];

                            const handleUpdateAdvantageCards = (newCards: Array<{ title: string; description?: string; icon?: string }>) => {
                              const sanitizedCards = newCards.map((c) => ({
                                title: c.title,
                                description: c.description || '',
                                icon: c.icon
                              }));
                              updateSectionFields(idx, {
                                cards: sanitizedCards,
                                bullets: sanitizedCards.map((c) => c.title)
                              });
                              if (page.category === 'overview' && page.slug === 'about') {
                                setPage((prev) => ({
                                  ...prev,
                                  hasUnpublishedChanges: true,
                                  capabilities: sanitizedCards.map((c) => c.title)
                                }));
                              }
                            };

                            return (
                              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-8">
                                {/* Header with Quote Icon Matching Image 2 / Live Website */}
                                <div className="text-center max-w-4xl mx-auto space-y-4">
                                  {/* Orange Quote Icon rounded square */}
                                  <div className="w-14 h-14 rounded-[10px] bg-brand-yellow flex items-center justify-center mx-auto shadow-xs text-black">
                                    <Quote className="w-7 h-7 text-black" />
                                  </div>

                                  {/* Section Main Heading (H2) */}
                                  <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                      Section Main Heading (H2)
                                    </label>
                                    <input
                                      type="text"
                                      value={sec.title || 'The Lambda Advantage'}
                                      onChange={(e) => updateSectionField(idx, 'title', e.target.value)}
                                      placeholder="The Lambda Advantage"
                                      className="text-2xl sm:text-3xl lg:text-4xl font-normal text-center text-neutral-900 w-full p-2 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-blue"
                                    />
                                  </div>

                                  {/* Introductory Narrative Text Paragraphs */}
                                  <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                      Introductory Narrative Text (Paragraphs)
                                    </label>
                                    <textarea
                                      rows={4}
                                      value={sec.text ?? 'Every biologic program has its own process, analytical, manufacturing, and regulatory requirements. Lambda CDMO brings together an integrated approach for process and analytical development, cGMP manufacturing, adequately supported by a quality management system to support programs from early development through clinical supplies.\n\nOur approach combines flexible development strategies, scalable processes, and quality systems designed to support evolving program requirements and global regulatory expectations.'}
                                      onChange={(e) => updateSectionField(idx, 'text', e.target.value)}
                                      placeholder="Every biologic program has its own process, analytical, manufacturing, and regulatory requirements..."
                                      className="text-xs sm:text-sm text-neutral-700 w-full p-3 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-blue leading-relaxed text-center"
                                    />
                                  </div>

                                  {/* Subtitle Badge Tag with Orange Accent (WHAT SETS US APART) */}
                                  <div className="pt-2 flex flex-col items-center justify-center">
                                    <div className="h-1 w-14 bg-brand-yellow rounded-full mb-3" />
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider">
                                      <Tag className="w-3.5 h-3.5" />
                                      <input
                                        type="text"
                                        value={sec.subtitle || 'WHAT SETS US APART'}
                                        onChange={(e) => updateSectionField(idx, 'subtitle', e.target.value)}
                                        placeholder="WHAT SETS US APART"
                                        className="bg-transparent border-none text-center focus:outline-none focus:ring-1 focus:ring-brand-orange rounded px-1 w-48 font-bold text-xs"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* 3x3 Capability White Cards Grid Matching Image 2 */}
                                <div className="pt-4 border-t border-slate-200">
                                  <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                                      <Sliders className="w-3.5 h-3.5 text-brand-blue" />
                                      <span>Advantage Cards Grid ({activeCards.length})</span>
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newCards = [
                                          ...activeCards,
                                          { title: 'New key platform advantage capability', description: '' }
                                        ];
                                        handleUpdateAdvantageCards(newCards);
                                      }}
                                      className="text-xs font-bold text-white bg-brand-blue hover:bg-brand-blue-hover px-3.5 py-1.5 rounded-lg flex items-center gap-1 shadow-xs cursor-pointer active:scale-95 transition-all"
                                    >
                                      <Plus className="w-3.5 h-3.5" />
                                      <span>Add Advantage Card</span>
                                    </button>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {activeCards.map((card, cIdx) => {
                                      const IconComp = defaultIcons[cIdx % defaultIcons.length];
                                      return (
                                        <div
                                          key={cIdx}
                                          className="p-5 rounded-[10px] bg-white border border-slate-200/90 shadow-xs hover:border-brand-orange/60 hover:shadow-md transition-all flex items-start gap-3.5 group relative"
                                        >
                                          {/* Blue Circular Icon Badge matching Live Site */}
                                          <div className="w-10 h-10 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 text-brand-blue mt-0.5 group-hover:bg-brand-yellow group-hover:border-brand-yellow group-hover:text-black transition-colors">
                                            <IconComp className="w-5 h-5" />
                                          </div>

                                          <div className="flex-1 min-w-0">
                                            <div className="text-[10px] font-mono font-bold text-slate-400 mb-1">
                                              Card {cIdx + 1}
                                            </div>
                                            <textarea
                                              rows={3}
                                              value={card.title}
                                              onChange={(e) => {
                                                const newCards = [...activeCards];
                                                newCards[cIdx] = { ...newCards[cIdx], title: e.target.value };
                                                handleUpdateAdvantageCards(newCards);
                                              }}
                                              placeholder="Advantage capability description..."
                                              className="w-full text-xs font-medium text-neutral-900 border border-slate-200 rounded-lg p-2.5 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-blue leading-relaxed"
                                            />
                                          </div>

                                          <button
                                            type="button"
                                            onClick={() => {
                                              const newCards = activeCards.filter((_, i) => i !== cIdx);
                                              handleUpdateAdvantageCards(newCards);
                                            }}
                                            className="p-1.5 text-slate-300 hover:text-red-600 rounded opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 right-3"
                                            title="Remove Card"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </button>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            );
                          })() : sec.style === 'capabilities-checklist' ? (
                            /* =========================================================================
                               LAYOUT 1: GENERIC CAPABILITIES CHECKLIST
                               ========================================================================= */
                            <div className={`p-6 rounded-2xl border ${sec.dark ? 'bg-brand-navy text-white border-slate-700' : 'bg-molecules text-neutral-900 border-slate-200'} shadow-xs space-y-6`}>
                              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                                <div className="flex items-center gap-2">
                                  <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue bg-sky-100 px-2.5 py-1 rounded-md border border-sky-200">
                                    <Sliders className="w-3.5 h-3.5" />
                                    <span>Capabilities Checklist Layout</span>
                                  </span>
                                </div>
                                <div className="text-xs text-slate-400 font-mono font-bold">
                                  {sec.bullets?.length || 0} Capabilities
                                </div>
                              </div>

                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                                <div className="lg:col-span-4 space-y-4">
                                  <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                      Section Tag / Subtitle
                                    </label>
                                    <input
                                      type="text"
                                      value={sec.subtitle || ''}
                                      onChange={(e) => updateSectionField(idx, 'subtitle', e.target.value)}
                                      placeholder="Section Subtitle Tag"
                                      className="w-full text-xs font-bold text-brand-orange border border-slate-200 rounded-lg p-2 bg-white focus:outline-none focus:border-brand-blue"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                      Section Main Heading (H2)
                                    </label>
                                    <input
                                      type="text"
                                      value={sec.title || ''}
                                      onChange={(e) => updateSectionField(idx, 'title', e.target.value)}
                                      placeholder="Section Title Heading..."
                                      className="w-full text-xl sm:text-2xl font-bold text-neutral-900 border border-slate-200 rounded-xl p-2.5 bg-white focus:outline-none focus:border-brand-blue"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                      Body Description Text
                                    </label>
                                    <textarea
                                      rows={5}
                                      value={sec.text || ''}
                                      onChange={(e) => updateSectionField(idx, 'text', e.target.value)}
                                      placeholder="Section description text..."
                                      className="w-full text-xs sm:text-sm font-normal leading-relaxed text-neutral-800 border border-slate-200 rounded-xl p-3 bg-white focus:outline-none focus:border-brand-blue"
                                    />
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      const bullets = [...(sec.bullets || []), 'New key technical capability'];
                                      updateSectionField(idx, 'bullets', bullets);
                                    }}
                                    className="w-full py-2.5 px-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                                  >
                                    <Plus className="w-4 h-4" />
                                    <span>Add Advantage Point</span>
                                  </button>
                                </div>

                                <div className="lg:col-span-8 space-y-3">
                                  {(sec.bullets || []).map((bullet, bIdx) => (
                                    <div key={bIdx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
                                      <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                                      <textarea
                                        rows={2}
                                        value={bullet}
                                        onChange={(e) => {
                                          const bullets = [...(sec.bullets || [])];
                                          bullets[bIdx] = e.target.value;
                                          updateSectionField(idx, 'bullets', bullets);
                                        }}
                                        placeholder="Capability description..."
                                        className="flex-1 text-xs sm:text-sm font-medium text-neutral-900 border-none p-0 focus:outline-none focus:ring-0 resize-none"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const bullets = (sec.bullets || []).filter((_, i) => i !== bIdx);
                                          updateSectionField(idx, 'bullets', bullets);
                                        }}
                                        className="p-1.5 text-slate-300 hover:text-red-600"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : sec.style === 'modalities-grid' ? (
                            /* =========================================================================
                               LAYOUT 2: MODALITIES & MOLECULE CARDS GRID
                               ========================================================================= */
                            <div className={`p-6 rounded-2xl border ${sec.dark ? 'bg-brand-navy text-white border-slate-700' : 'bg-white text-neutral-900 border-slate-200'} shadow-xs space-y-6`}>
                              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
                                <div className="space-y-2 flex-1">
                                  <div className="flex items-center gap-2">
                                    <Tag className="w-3.5 h-3.5 text-brand-orange" />
                                    <input
                                      type="text"
                                      value={sec.subtitle || 'MOLECULE-SPECIFIC TAILORED PLATFORMS'}
                                      onChange={(e) => updateSectionField(idx, 'subtitle', e.target.value)}
                                      placeholder="Tag / Subtitle"
                                      className="text-xs font-bold text-brand-orange uppercase tracking-wider border border-slate-200 rounded px-2 py-1 bg-white"
                                    />
                                  </div>
                                  <input
                                    type="text"
                                    value={sec.title || 'Platform Capabilities for Next-Generation Biologics'}
                                    onChange={(e) => updateSectionField(idx, 'title', e.target.value)}
                                    placeholder="Section Heading"
                                    className="text-xl sm:text-2xl font-bold text-neutral-900 w-full p-2 border border-slate-200 rounded-xl bg-white"
                                  />
                                  <textarea
                                    rows={2}
                                    value={sec.text || ''}
                                    onChange={(e) => updateSectionField(idx, 'text', e.target.value)}
                                    placeholder="Section description text..."
                                    className="text-xs sm:text-sm text-neutral-700 w-full p-2 border border-slate-200 rounded-xl bg-white"
                                  />
                                </div>

                                <button
                                  type="button"
                                  onClick={() => {
                                    const cards = [
                                      ...(sec.cards || []),
                                      {
                                        title: 'New Biologic Modality',
                                        description: 'Platform capabilities for next-gen therapeutic class.',
                                        link: '/modalities/mabs',
                                        image: '/images/modalities/mAb.png'
                                      }
                                    ];
                                    updateSectionField(idx, 'cards', cards);
                                  }}
                                  className="text-xs font-bold text-white bg-brand-blue hover:bg-brand-blue-hover px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm shrink-0"
                                >
                                  <Plus className="w-4 h-4" />
                                  <span>Add Molecule Card</span>
                                </button>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {(sec.cards || []).map((card, cIdx) => (
                                  <div key={cIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3 shadow-2xs flex flex-col justify-between">
                                    <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                                      <span className="text-[10px] font-bold text-brand-blue uppercase">Card {cIdx + 1}</span>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const cards = (sec.cards || []).filter((_, i) => i !== cIdx);
                                          updateSectionField(idx, 'cards', cards);
                                        }}
                                        className="p-1 text-slate-400 hover:text-red-600 rounded"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>

                                    <MediaControlWithPreview
                                      label="Modality Photo"
                                      mediaUrl={card.image || ''}
                                      onChangeUrl={(url) => {
                                        const cards = [...(sec.cards || [])];
                                        cards[cIdx] = { ...cards[cIdx], image: url };
                                        updateSectionField(idx, 'cards', cards);
                                      }}
                                      onOpenPresetGallery={() => {
                                        setGalleryTargetCallback(() => (url: string) => {
                                          const cards = [...(sec.cards || [])];
                                          cards[cIdx] = { ...cards[cIdx], image: url };
                                          updateSectionField(idx, 'cards', cards);
                                        });
                                        setIsGalleryModalOpen(true);
                                      }}
                                      onUploadFile={(file) => {
                                        handleFileUpload(file, (url) => {
                                          const cards = [...(sec.cards || [])];
                                          cards[cIdx] = { ...cards[cIdx], image: url };
                                          updateSectionField(idx, 'cards', cards);
                                        });
                                      }}
                                      uploading={uploading}
                                      aspectRatioClass="aspect-[4/3]"
                                      allowTypeToggle={false}
                                    />

                                    <div className="space-y-2">
                                      <input
                                        type="text"
                                        value={card.title}
                                        onChange={(e) => {
                                          const cards = [...(sec.cards || [])];
                                          cards[cIdx] = { ...cards[cIdx], title: e.target.value };
                                          updateSectionField(idx, 'cards', cards);
                                        }}
                                        placeholder="Molecule Title"
                                        className="w-full text-xs font-bold text-neutral-900 border border-slate-200 rounded p-1.5 bg-white"
                                      />
                                      <textarea
                                        rows={2}
                                        value={card.description}
                                        onChange={(e) => {
                                          const cards = [...(sec.cards || [])];
                                          cards[cIdx] = { ...cards[cIdx], description: e.target.value };
                                          updateSectionField(idx, 'cards', cards);
                                        }}
                                        placeholder="Molecule description..."
                                        className="w-full text-[11px] text-neutral-700 border border-slate-200 rounded p-1.5 bg-white"
                                      />
                                      <input
                                        type="text"
                                        value={card.link || ''}
                                        onChange={(e) => {
                                          const cards = [...(sec.cards || [])];
                                          cards[cIdx] = { ...cards[cIdx], link: e.target.value };
                                          updateSectionField(idx, 'cards', cards);
                                        }}
                                        placeholder="/modalities/..."
                                        className="w-full text-[11px] font-mono border border-slate-200 rounded p-1 bg-white"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : sec.style === 'leadership-grid' || sec.id === 'sec-leadership-team' || (sec.style === 'cards-grid' && (sec.title?.toLowerCase().includes('leadership') || sec.title?.toLowerCase().includes('executive') || page.slug === 'leadership')) ? (
                            /* =========================================================================
                               LAYOUT: EXECUTIVE & SCIENTIFIC LEADERSHIP TEAM GRID (MATCHING IMAGE 4)
                               ========================================================================= */
                            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
                              {/* Section Title & Subtitle Header */}
                              <div className="text-center max-w-3xl mx-auto space-y-3">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider">
                                  <Tag className="w-3.5 h-3.5" />
                                  <input
                                    type="text"
                                    value={sec.subtitle || 'SCIENTIFIC LEADERSHIP'}
                                    onChange={(e) => updateSectionField(idx, 'subtitle', e.target.value)}
                                    placeholder="SCIENTIFIC LEADERSHIP"
                                    className="bg-transparent border-none text-center focus:outline-none focus:ring-1 focus:ring-brand-orange rounded px-1 w-52 font-bold"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                    Section Main Heading (H2)
                                  </label>
                                  <input
                                    type="text"
                                    value={sec.title || 'Executive & Scientific Team'}
                                    onChange={(e) => updateSectionField(idx, 'title', e.target.value)}
                                    placeholder="Executive & Scientific Team"
                                    className="text-2xl sm:text-3xl font-bold text-center text-neutral-900 w-full p-2 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-blue"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                    Introductory / Subtitle Description
                                  </label>
                                  <textarea
                                    rows={2}
                                    value={sec.text ?? sec.subtitle ?? 'Led by experienced biopharma leaders across technical product development, process sciences, analytical characterization, and global regulatory execution.'}
                                    onChange={(e) => updateSectionField(idx, 'text', e.target.value)}
                                    placeholder="Led by experienced biopharma leaders..."
                                    className="text-xs sm:text-sm text-neutral-700 w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-blue leading-relaxed"
                                  />
                                </div>
                              </div>

                              {/* Leadership Profiles Grid Header Toolbar */}
                              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                                  <Users className="w-4 h-4 text-brand-blue" />
                                  <span>Leader Profiles ({sec.cards?.length || 0})</span>
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const cards = [
                                      ...(sec.cards || []),
                                      {
                                        title: 'New Leader Name',
                                        link: 'Designation / Title',
                                        badge: 'Executive Leadership',
                                        step: '20+ Years Experience',
                                        icon: 'Education & Key Credentials',
                                        description: 'Detailed professional biography paragraphs...',
                                        image: '/images/team/MS Ramaki.jpg'
                                      }
                                    ];
                                    updateSectionField(idx, 'cards', cards);
                                  }}
                                  className="text-xs font-bold text-white bg-brand-blue hover:bg-brand-blue-hover px-3.5 py-1.5 rounded-lg flex items-center gap-1 shadow-xs cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>Add Leader Profile</span>
                                </button>
                              </div>

                              {/* 2x2 Grid Matching Image 4 */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                                {(sec.cards || []).map((card, cIdx) => (
                                  <div
                                    key={cIdx}
                                    className="group rounded-2xl border border-slate-200/90 p-5 sm:p-6 bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
                                  >
                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-blue to-brand-orange opacity-60" />

                                    <div className="space-y-4">
                                      {/* Top Row: Photo & Header Inputs */}
                                      <div className="flex flex-col sm:flex-row gap-5 items-start">
                                        {/* Photograph Container */}
                                        <div className="w-full sm:w-40 shrink-0">
                                          <MediaControlWithPreview
                                            label="Portrait Photo"
                                            mediaUrl={card.image || '/images/team/MS Ramaki.jpg'}
                                            onChangeUrl={(url) => {
                                              const cards = [...(sec.cards || [])];
                                              cards[cIdx] = { ...cards[cIdx], image: url };
                                              updateSectionField(idx, 'cards', cards);
                                            }}
                                            onOpenPresetGallery={() => {
                                              setGalleryTargetCallback(() => (url: string) => {
                                                const cards = [...(sec.cards || [])];
                                                cards[cIdx] = { ...cards[cIdx], image: url };
                                                updateSectionField(idx, 'cards', cards);
                                              });
                                              setIsGalleryModalOpen(true);
                                            }}
                                            onUploadFile={(file) => {
                                              handleFileUpload(file, (url) => {
                                                const cards = [...(sec.cards || [])];
                                                cards[cIdx] = { ...cards[cIdx], image: url };
                                                updateSectionField(idx, 'cards', cards);
                                              });
                                            }}
                                            uploading={uploading}
                                            aspectRatioClass="aspect-[4/5]"
                                            allowTypeToggle={false}
                                          />
                                        </div>

                                        {/* Name, Role Badge, Designation, Experience */}
                                        <div className="flex-1 min-w-0 space-y-2.5">
                                          <div className="flex items-center justify-between">
                                            <input
                                              type="text"
                                              value={card.badge || 'EXECUTIVE LEADERSHIP'}
                                              onChange={(e) => {
                                                const cards = [...(sec.cards || [])];
                                                cards[cIdx] = { ...cards[cIdx], badge: e.target.value };
                                                updateSectionField(idx, 'cards', cards);
                                              }}
                                              placeholder="ROLE BADGE"
                                              className="text-[10px] font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 px-2.5 py-0.5 rounded border border-brand-orange/20"
                                            />
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const cards = (sec.cards || []).filter((_, i) => i !== cIdx);
                                                updateSectionField(idx, 'cards', cards);
                                              }}
                                              className="p-1 text-slate-300 hover:text-red-600 rounded transition-colors"
                                              title="Remove Leader"
                                            >
                                              <Trash2 className="w-4 h-4" />
                                            </button>
                                          </div>

                                          <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                              Full Name
                                            </label>
                                            <input
                                              type="text"
                                              value={card.title || ''}
                                              onChange={(e) => {
                                                const cards = [...(sec.cards || [])];
                                                cards[cIdx] = { ...cards[cIdx], title: e.target.value };
                                                updateSectionField(idx, 'cards', cards);
                                              }}
                                              placeholder="e.g. Dr. M.S. Ramakrishnan"
                                              className="w-full text-base sm:text-lg font-bold text-neutral-900 border border-slate-200 rounded-lg p-1.5 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-blue"
                                            />
                                          </div>

                                          <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                              Designation / Role Title
                                            </label>
                                            <input
                                              type="text"
                                              value={card.link || card.href || ''}
                                              onChange={(e) => {
                                                const cards = [...(sec.cards || [])];
                                                cards[cIdx] = { ...cards[cIdx], link: e.target.value, href: e.target.value };
                                                updateSectionField(idx, 'cards', cards);
                                              }}
                                              placeholder="e.g. Executive Vice President – CDMO"
                                              className="w-full text-xs font-semibold text-brand-blue uppercase tracking-wider border border-slate-200 rounded-lg p-1.5 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-blue"
                                            />
                                          </div>

                                          <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                              Experience Tag
                                            </label>
                                            <input
                                              type="text"
                                              value={card.step || '20+ Years Experience'}
                                              onChange={(e) => {
                                                const cards = [...(sec.cards || [])];
                                                cards[cIdx] = { ...cards[cIdx], step: e.target.value };
                                                updateSectionField(idx, 'cards', cards);
                                              }}
                                              placeholder="e.g. 27+ Years Experience"
                                              className="w-full text-xs font-semibold text-slate-700 border border-slate-200 rounded-lg p-1.5 bg-slate-50/50 focus:bg-white focus:outline-none"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      {/* Credentials / Education */}
                                      <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                          Education &amp; Credentials Callout
                                        </label>
                                        <input
                                          type="text"
                                          value={card.icon || ''}
                                          onChange={(e) => {
                                            const cards = [...(sec.cards || [])];
                                            cards[cIdx] = { ...cards[cIdx], icon: e.target.value };
                                            updateSectionField(idx, 'cards', cards);
                                          }}
                                          placeholder="Ph.D. in Biochemistry (University of Mysore)..."
                                          className="w-full text-xs text-slate-800 border border-slate-200 rounded-lg p-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-blue"
                                        />
                                      </div>

                                      {/* Full Bio Paragraphs Textarea */}
                                      <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                                          Biography (Paragraphs)
                                        </label>
                                        <textarea
                                          rows={4}
                                          value={card.description || ''}
                                          onChange={(e) => {
                                            const cards = [...(sec.cards || [])];
                                            cards[cIdx] = { ...cards[cIdx], description: e.target.value };
                                            updateSectionField(idx, 'cards', cards);
                                          }}
                                          placeholder="Detailed leader biography..."
                                          className="w-full text-xs text-slate-700 leading-relaxed border border-slate-200 rounded-lg p-2.5 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-blue"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : sec.style === 'cards-grid' ? (
                            /* =========================================================================
                               LAYOUT 3B: INTERACTIVE BENTO & SERVICE CARDS GRID
                               ========================================================================= */
                            <div className={`p-6 rounded-2xl border ${sec.dark ? 'bg-brand-navy text-white border-slate-700' : 'bg-white text-neutral-900 border-slate-200'} shadow-xs space-y-6`}>
                              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
                                <div className="space-y-2 flex-1">
                                  <div className="flex items-center gap-2">
                                    <Tag className="w-3.5 h-3.5 text-brand-orange" />
                                    <input
                                      type="text"
                                      value={sec.subtitle || 'END-TO-END CAPABILITIES'}
                                      onChange={(e) => updateSectionField(idx, 'subtitle', e.target.value)}
                                      placeholder="Tag / Subtitle"
                                      className="text-xs font-bold text-brand-orange uppercase tracking-wider border border-slate-200 rounded px-2 py-1 bg-white"
                                    />
                                  </div>
                                  <input
                                    type="text"
                                    value={sec.title || 'Comprehensive Development & Manufacturing Services'}
                                    onChange={(e) => updateSectionField(idx, 'title', e.target.value)}
                                    placeholder="Section Heading"
                                    className="text-xl sm:text-2xl font-bold text-neutral-900 w-full p-2 border border-slate-200 rounded-xl bg-white"
                                  />
                                  <textarea
                                    rows={2}
                                    value={sec.text || ''}
                                    onChange={(e) => updateSectionField(idx, 'text', e.target.value)}
                                    placeholder="Section description..."
                                    className="text-xs sm:text-sm text-neutral-700 w-full p-2 border border-slate-200 rounded-xl bg-white"
                                  />
                                </div>

                                <button
                                  type="button"
                                  onClick={() => {
                                    const cards = [
                                      ...(sec.cards || []),
                                      {
                                        title: 'New Service Card',
                                        badge: `0${(sec.cards?.length || 0) + 1} — Service`,
                                        description: 'Detailed description of capability',
                                        icon: 'FlaskConical',
                                        link: '/services',
                                        image: '/images/upstream/AMBR250.png',
                                        images: ['/images/upstream/AMBR250.png'],
                                        items: [
                                          { name: 'Sub Capability 1', href: '/services', icon: 'Dna' }
                                        ]
                                      }
                                    ];
                                    updateSectionField(idx, 'cards', cards);
                                  }}
                                  className="text-xs font-bold text-white bg-brand-blue hover:bg-brand-blue-hover px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm shrink-0"
                                >
                                  <Plus className="w-4 h-4" />
                                  <span>Add Service Card</span>
                                </button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {(sec.cards || []).map((card, cIdx) => (
                                  <div
                                    key={cIdx}
                                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4 shadow-2xs flex flex-col justify-between"
                                  >
                                    <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200">
                                      <div className="flex items-center gap-2.5 flex-1">
                                        <span className="w-6 h-6 rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs flex items-center justify-center">
                                          {cIdx + 1}
                                        </span>
                                        <input
                                          type="text"
                                          value={card.title}
                                          onChange={(e) => {
                                            const cards = [...(sec.cards || [])];
                                            cards[cIdx] = { ...cards[cIdx], title: e.target.value };
                                            updateSectionField(idx, 'cards', cards);
                                          }}
                                          placeholder="Card Title"
                                          className="font-bold text-sm text-neutral-900 border border-slate-200 rounded-lg px-2.5 py-1 bg-white flex-1 focus:outline-none focus:border-brand-blue"
                                        />
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() => {
                                          const cards = (sec.cards || []).filter((_, i) => i !== cIdx);
                                          updateSectionField(idx, 'cards', cards);
                                        }}
                                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                                        title="Remove Card"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>

                                    <MediaControlWithPreview
                                      label="Card Primary Photo"
                                      mediaUrl={card.image || ''}
                                      onChangeUrl={(url) => {
                                        setPage((prev) => {
                                          const sections = [...(prev.sections || [])];
                                          const currentSec = sections[idx];
                                          const cards = [...(currentSec.cards || [])];
                                          cards[cIdx] = { ...cards[cIdx], image: url };
                                          sections[idx] = { ...currentSec, cards };
                                          return { ...prev, hasUnpublishedChanges: true, sections };
                                        });
                                      }}
                                      onOpenPresetGallery={() => {
                                        setGalleryTargetCallback(() => (url: string) => {
                                          setPage((prev) => {
                                            const sections = [...(prev.sections || [])];
                                            const currentSec = sections[idx];
                                            const cards = [...(currentSec.cards || [])];
                                            cards[cIdx] = { ...cards[cIdx], image: url };
                                            sections[idx] = { ...currentSec, cards };
                                            return { ...prev, hasUnpublishedChanges: true, sections };
                                          });
                                        });
                                        setIsGalleryModalOpen(true);
                                      }}
                                      onUploadFile={(file) => {
                                        handleFileUpload(file, (url) => {
                                          setPage((prev) => {
                                            const sections = [...(prev.sections || [])];
                                            const currentSec = sections[idx];
                                            const cards = [...(currentSec.cards || [])];
                                            cards[cIdx] = { ...cards[cIdx], image: url };
                                            sections[idx] = { ...currentSec, cards };
                                            return { ...prev, hasUnpublishedChanges: true, sections };
                                          });
                                        });
                                      }}
                                      uploading={uploading}
                                      aspectRatioClass="aspect-[16/10]"
                                      allowTypeToggle={false}
                                    />

                                    {/* Multi-Photo Carousel Manager for Card */}
                                    <PhotoCarouselManager
                                      label="Card Photo Carousel (Extra Slides)"
                                      images={card.images || []}
                                      onChangeImages={(imgs) => {
                                        setPage((prev) => {
                                          const sections = [...(prev.sections || [])];
                                          const currentSec = sections[idx];
                                          const cards = [...(currentSec.cards || [])];
                                          cards[cIdx] = { ...cards[cIdx], images: imgs };
                                          sections[idx] = { ...currentSec, cards };
                                          return { ...prev, hasUnpublishedChanges: true, sections };
                                        });
                                      }}
                                      onOpenPresetGallery={() => {
                                        setGalleryTargetCallback(() => (url: string) => {
                                          setPage((prev) => {
                                            const sections = [...(prev.sections || [])];
                                            const currentSec = sections[idx];
                                            const cards = [...(currentSec.cards || [])];
                                            const currentImgs = cards[cIdx].images || [];
                                            cards[cIdx] = { ...cards[cIdx], images: [...currentImgs, url] };
                                            sections[idx] = { ...currentSec, cards };
                                            return { ...prev, hasUnpublishedChanges: true, sections };
                                          });
                                        });
                                        setIsGalleryModalOpen(true);
                                      }}
                                      onUploadMultipleFiles={async (files) => {
                                        await handleMultipleFilesUpload(files, (urls) => {
                                          setPage((prev) => {
                                            const sections = [...(prev.sections || [])];
                                            const currentSec = sections[idx];
                                            const cards = [...(currentSec.cards || [])];
                                            const currentImgs = cards[cIdx].images || [];
                                            cards[cIdx] = { ...cards[cIdx], images: [...currentImgs, ...urls] };
                                            sections[idx] = { ...currentSec, cards };
                                            return { ...prev, hasUnpublishedChanges: true, sections };
                                          });
                                        });
                                      }}
                                      uploading={uploading}
                                    />

                                    <div className="space-y-3">
                                      <div className="flex items-center gap-2">
                                        <Tag className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                                        <input
                                          type="text"
                                          value={card.badge || card.step || ''}
                                          onChange={(e) => {
                                            const cards = [...(sec.cards || [])];
                                            cards[cIdx] = { ...cards[cIdx], badge: e.target.value, step: e.target.value };
                                            updateSectionField(idx, 'cards', cards);
                                          }}
                                          placeholder="Card Tag (e.g. 01 — UPSTREAM)"
                                          className="w-full px-2.5 py-1 border border-slate-200 rounded-lg text-xs font-semibold bg-white"
                                        />
                                      </div>

                                      <textarea
                                        rows={2}
                                        value={card.description}
                                        onChange={(e) => {
                                          const cards = [...(sec.cards || [])];
                                          cards[cIdx] = { ...cards[cIdx], description: e.target.value };
                                          updateSectionField(idx, 'cards', cards);
                                        }}
                                        placeholder="Card summary description..."
                                        className="w-full text-xs text-neutral-800 border border-slate-200 rounded-lg p-2.5 bg-white focus:outline-none focus:border-brand-blue"
                                      />
                                    </div>

                                    {/* Sub-links List */}
                                    <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2">
                                      <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                                          <ListTree className="w-3 h-3 text-brand-blue" />
                                          <span>Sub-Links ({card.items?.length || 0})</span>
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const cards = [...(sec.cards || [])];
                                            const items = [
                                              ...(cards[cIdx].items || []),
                                              { name: 'Sub-Service Link', href: '/services', icon: 'Dna' }
                                            ];
                                            cards[cIdx].items = items;
                                            updateSectionField(idx, 'cards', cards);
                                          }}
                                          className="text-[10px] font-bold text-brand-blue hover:underline flex items-center gap-1"
                                        >
                                          <Plus className="w-3 h-3" />
                                          <span>Add Link</span>
                                        </button>
                                      </div>

                                      {card.items?.map((item, sIdx) => (
                                        <div key={sIdx} className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 border border-slate-200">
                                          <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => {
                                              const cards = [...(sec.cards || [])];
                                              const items = [...(cards[cIdx].items || [])];
                                              items[sIdx] = { ...items[sIdx], name: e.target.value };
                                              cards[cIdx].items = items;
                                              updateSectionField(idx, 'cards', cards);
                                            }}
                                            placeholder="Link Name"
                                            className="w-1/2 px-2 py-1 text-xs border border-slate-200 rounded bg-white font-semibold"
                                          />
                                          <input
                                            type="text"
                                            value={item.href}
                                            onChange={(e) => {
                                              const cards = [...(sec.cards || [])];
                                              const items = [...(cards[cIdx].items || [])];
                                              items[sIdx] = { ...items[sIdx], href: e.target.value };
                                              cards[cIdx].items = items;
                                              updateSectionField(idx, 'cards', cards);
                                            }}
                                            placeholder="/url"
                                            className="flex-1 px-2 py-1 text-xs border border-slate-200 rounded bg-white font-mono"
                                          />
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const cards = [...(sec.cards || [])];
                                              cards[cIdx].items = (cards[cIdx].items || []).filter((_, i) => i !== sIdx);
                                              updateSectionField(idx, 'cards', cards);
                                            }}
                                            className="p-1 text-slate-400 hover:text-red-600"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : sec.style === 'faq-accordion' ? (
                            /* =========================================================================
                               LAYOUT 4: FAQ COLLAPSIBLE ACCORDION (MATCHING IMAGE 1 LIVE LAYOUT)
                               ========================================================================= */
                            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50/70 border border-slate-200/90 shadow-xs space-y-6">
                              {/* Header & Add Button */}
                              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                                <div className="flex items-center gap-2">
                                  <span className="px-2.5 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue text-[11px] font-bold uppercase tracking-wider">
                                    FAQ Accordion Section (Live 2-Column Format)
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const faqs = [
                                      ...(sec.faqs || []),
                                      { question: 'New Technical Question?', answer: 'Detailed response and explanation.' }
                                    ];
                                    updateSectionField(idx, 'faqs', faqs);
                                  }}
                                  className="text-xs font-bold text-white bg-brand-blue hover:bg-brand-blue-hover px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
                                >
                                  <Plus className="w-4 h-4" />
                                  <span>Add FAQ Item</span>
                                </button>
                              </div>

                              {/* 2-Column Live Visual Layout matching Image 1 */}
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                {/* Left Column (5 cols): Title, Subtitle, and Contact CTA link */}
                                <div className="lg:col-span-5 space-y-4">
                                  <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                                      Section Main Heading
                                    </label>
                                    <input
                                      type="text"
                                      value={sec.title || 'Common Questions'}
                                      onChange={(e) => updateSectionField(idx, 'title', e.target.value)}
                                      placeholder="Common Questions"
                                      className="w-full text-2xl font-semibold text-neutral-900 border border-slate-200 rounded-xl p-3 bg-white focus:outline-none focus:border-brand-blue shadow-2xs"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                                      Subtitle / Explanatory Description
                                    </label>
                                    <textarea
                                      rows={3}
                                      value={sec.text ?? sec.subtitle ?? 'Answers to questions about process, tech transfers, timelines, and facility validations.'}
                                      onChange={(e) => {
                                        updateSectionField(idx, 'text', e.target.value);
                                        updateSectionField(idx, 'subtitle', e.target.value);
                                      }}
                                      placeholder="Answers to questions about process, tech transfers, timelines, and facility validations."
                                      className="w-full text-sm text-slate-600 border border-slate-200 rounded-xl p-3 bg-white focus:outline-none focus:border-brand-blue shadow-2xs"
                                    />
                                  </div>

                                  {/* Contact CTA Link Preview matching Image 1 */}
                                  <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-2 shadow-2xs">
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                      Still Have Questions Link Text & Route
                                    </label>
                                    <div className="flex items-center gap-2">
                                      <span className="w-6 h-0.5 bg-brand-orange shrink-0" />
                                      <input
                                        type="text"
                                        value={sec.buttonText || 'Still have questions? Talk to us'}
                                        onChange={(e) => updateSectionField(idx, 'buttonText', e.target.value)}
                                        placeholder="Still have questions? Talk to us"
                                        className="flex-1 text-xs font-semibold text-brand-blue border-b border-dashed border-brand-blue/40 pb-0.5 focus:outline-none"
                                      />
                                      <ArrowRight className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                                    </div>
                                    <div className="flex items-center gap-2 pt-1">
                                      <span className="text-[10px] font-bold text-slate-400">Target URL:</span>
                                      <input
                                        type="text"
                                        value={sec.buttonLink || '/contact'}
                                        onChange={(e) => updateSectionField(idx, 'buttonLink', e.target.value)}
                                        placeholder="/contact"
                                        className="flex-1 text-xs font-mono text-slate-700 border border-slate-200 rounded-md px-2 py-1 bg-slate-50"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Right Column (7 cols): Glass Accordion Container matching Image 1 */}
                                <div className="lg:col-span-7 space-y-3">
                                  <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                      Accordion Q&amp;A List ({sec.faqs?.length || 0})
                                    </label>
                                    <span className="text-[10px] text-slate-400 font-medium">Click trash to remove</span>
                                  </div>

                                  {(!sec.faqs || sec.faqs.length === 0) ? (
                                    <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 bg-white space-y-2">
                                      <p className="text-xs text-slate-500">No FAQ items yet. Click &quot;Add FAQ Item&quot; above to create one.</p>
                                    </div>
                                  ) : (
                                    <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/50 via-white to-slate-50 p-4 sm:p-5 shadow-sm space-y-3.5 divide-y divide-slate-100">
                                      {sec.faqs.map((faq, fIdx) => (
                                        <div key={fIdx} className="pt-3.5 first:pt-0 space-y-2">
                                          <div className="flex items-center gap-2.5">
                                            <input
                                              type="text"
                                              value={faq.question}
                                              onChange={(e) => {
                                                const faqs = [...(sec.faqs || [])];
                                                faqs[fIdx] = { ...faqs[fIdx], question: e.target.value };
                                                updateSectionField(idx, 'faqs', faqs);
                                              }}
                                              placeholder="e.g. What modalities are supported at Lambda CDMO?"
                                              className="flex-1 text-xs sm:text-sm font-bold text-neutral-900 border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-brand-blue shadow-2xs"
                                            />

                                            {/* Cyan Plus Badge matching Image 1 */}
                                            <div className="w-8 h-8 rounded-lg bg-brand-blue text-white flex items-center justify-center shrink-0 shadow-2xs">
                                              <Plus className="w-4 h-4" />
                                            </div>

                                            {/* Delete FAQ button */}
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const faqs = (sec.faqs || []).filter((_, i) => i !== fIdx);
                                                updateSectionField(idx, 'faqs', faqs);
                                              }}
                                              className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
                                              title="Delete this FAQ"
                                            >
                                              <Trash2 className="w-4 h-4" />
                                            </button>
                                          </div>

                                          <div className="pl-1">
                                            <textarea
                                              rows={2}
                                              value={faq.answer}
                                              onChange={(e) => {
                                                const faqs = [...(sec.faqs || [])];
                                                faqs[fIdx] = { ...faqs[fIdx], answer: e.target.value };
                                                updateSectionField(idx, 'faqs', faqs);
                                              }}
                                              placeholder="Answer explanation shown when accordion expands on live page..."
                                              className="w-full text-xs text-slate-600 leading-relaxed border border-slate-200 rounded-lg p-2.5 bg-white focus:outline-none focus:border-brand-blue shadow-2xs"
                                            />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : sec.style === 'cta-banner' || sec.style === 'video-hero-banner' ? (
                            /* =========================================================================
                               LAYOUT 5: CONVERSION CTA & VIDEO HERO BANNER
                               ========================================================================= */
                            <div className="p-6 rounded-2xl bg-brand-navy text-white border border-slate-700 shadow-md space-y-6">
                              <div className="max-w-2xl mx-auto text-center space-y-4">
                                <div className="inline-flex items-center gap-2">
                                  <Tag className="w-3.5 h-3.5 text-brand-orange" />
                                  <input
                                    type="text"
                                    value={sec.subtitle || 'PARTNER WITH LAMBDA CDMO'}
                                    onChange={(e) => updateSectionField(idx, 'subtitle', e.target.value)}
                                    placeholder="Tag / Subtitle"
                                    className="text-xs font-bold text-brand-orange uppercase tracking-wider bg-black/40 border border-brand-orange/40 rounded px-2.5 py-1 text-center"
                                  />
                                </div>
                                <input
                                  type="text"
                                  value={sec.title || 'Accelerate Your Molecule from Gene to Clinic'}
                                  onChange={(e) => updateSectionField(idx, 'title', e.target.value)}
                                  placeholder="Section Main Heading"
                                  className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center w-full bg-black/30 border border-white/20 rounded-xl p-2.5"
                                />
                                <textarea
                                  rows={3}
                                  value={sec.text || ''}
                                  onChange={(e) => updateSectionField(idx, 'text', e.target.value)}
                                  placeholder="Section description text..."
                                  className="text-xs sm:text-sm text-slate-300 text-center w-full bg-black/30 border border-white/20 rounded-xl p-2.5"
                                />

                                {/* Dual Action Buttons: Primary CTA & Secondary CTA (Virtual Tour) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10 text-left">
                                  {/* Primary CTA (Contact) */}
                                  <div className="space-y-2 p-3.5 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                                      Primary CTA Button
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                        CTA Button Text
                                      </label>
                                      <input
                                        type="text"
                                        value={sec.buttonText || 'Contact Technical Team'}
                                        onChange={(e) => updateSectionField(idx, 'buttonText', e.target.value)}
                                        placeholder="Contact Technical Team"
                                        className="w-full px-2.5 py-1.5 rounded-lg bg-brand-orange text-white text-xs font-bold text-center"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                        CTA Button Link
                                      </label>
                                      <input
                                        type="text"
                                        value={sec.buttonLink || '/contact'}
                                        onChange={(e) => updateSectionField(idx, 'buttonLink', e.target.value)}
                                        placeholder="/contact"
                                        className="w-full px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-mono text-center"
                                      />
                                    </div>
                                  </div>

                                  {/* Secondary CTA (Virtual Tour) */}
                                  <div className="space-y-2 p-3.5 rounded-xl bg-white/5 border border-white/10">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                                      Secondary CTA Button (Virtual Tour)
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                        Secondary Button Text
                                      </label>
                                      <input
                                        type="text"
                                        value={sec.secondaryButtonText ?? 'Virtual Tour'}
                                        onChange={(e) => updateSectionField(idx, 'secondaryButtonText', e.target.value)}
                                        placeholder="Virtual Tour"
                                        className="w-full px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/30 text-white text-xs font-bold text-center hover:bg-white/20"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                        Secondary Button Link
                                      </label>
                                      <input
                                        type="text"
                                        value={sec.secondaryButtonLink ?? '/virtual-tour/00%20MAIN%20BUILDING/index.htm'}
                                        onChange={(e) => updateSectionField(idx, 'secondaryButtonLink', e.target.value)}
                                        placeholder="/virtual-tour/00%20MAIN%20BUILDING/index.htm"
                                        className="w-full px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-mono text-center"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : sec.style === 'stats-metrics' ? (
                            /* =========================================================================
                               LAYOUT 6: STATS & METRICS COUNTERS GRID
                               ========================================================================= */
                            <div className={`p-6 rounded-2xl border ${sec.dark ? 'bg-brand-navy text-white border-slate-700' : 'bg-white text-neutral-900 border-slate-200'} shadow-xs space-y-6`}>
                              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
                                <div className="space-y-2 flex-1">
                                  <input
                                    type="text"
                                    value={sec.subtitle || 'PROVEN CAPACITY & TRACK RECORD'}
                                    onChange={(e) => updateSectionField(idx, 'subtitle', e.target.value)}
                                    placeholder="Tag / Subtitle"
                                    className="text-xs font-bold text-brand-orange uppercase tracking-wider border border-slate-200 rounded px-2 py-1 bg-white"
                                  />
                                  <input
                                    type="text"
                                    value={sec.title || 'Facility Infrastructure & Operational Scale'}
                                    onChange={(e) => updateSectionField(idx, 'title', e.target.value)}
                                    placeholder="Section Heading"
                                    className="text-xl sm:text-2xl font-bold text-neutral-900 w-full p-2 border border-slate-200 rounded-xl bg-white"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const stats = [
                                      ...(sec.stats || []),
                                      { value: '100%', label: 'Key Metric Label', sublabel: 'Supporting explanation details' }
                                    ];
                                    updateSectionField(idx, 'stats', stats);
                                  }}
                                  className="text-xs font-bold text-white bg-brand-blue hover:bg-brand-blue-hover px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm shrink-0"
                                >
                                  <Plus className="w-4 h-4" />
                                  <span>Add Metric</span>
                                </button>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {(sec.stats || []).map((st, sIdx) => (
                                  <div key={sIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 shadow-2xs">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-bold text-brand-orange uppercase">Stat {sIdx + 1}</span>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const stats = (sec.stats || []).filter((_, i) => i !== sIdx);
                                          updateSectionField(idx, 'stats', stats);
                                        }}
                                        className="p-1 text-slate-400 hover:text-red-600 rounded"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                    <input
                                      type="text"
                                      value={st.value}
                                      onChange={(e) => {
                                        const stats = [...(sec.stats || [])];
                                        stats[sIdx] = { ...stats[sIdx], value: e.target.value };
                                        updateSectionField(idx, 'stats', stats);
                                      }}
                                      placeholder="Value (e.g. 27,000)"
                                      className="text-xl font-bold text-brand-blue border border-slate-200 rounded p-1.5 bg-white w-full"
                                    />
                                    <input
                                      type="text"
                                      value={st.label}
                                      onChange={(e) => {
                                        const stats = [...(sec.stats || [])];
                                        stats[sIdx] = { ...stats[sIdx], label: e.target.value };
                                        updateSectionField(idx, 'stats', stats);
                                      }}
                                      placeholder="Label..."
                                      className="text-xs font-bold text-neutral-900 border border-slate-200 rounded p-1.5 bg-white w-full"
                                    />
                                    <textarea
                                      rows={2}
                                      value={st.sublabel || ''}
                                      onChange={(e) => {
                                        const stats = [...(sec.stats || [])];
                                        stats[sIdx] = { ...stats[sIdx], sublabel: e.target.value };
                                        updateSectionField(idx, 'stats', stats);
                                      }}
                                      placeholder="Sublabel description..."
                                      className="text-[11px] text-neutral-600 border border-slate-200 rounded p-1.5 bg-white w-full"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : sec.style === 'process-steps' ? (
                            /* =========================================================================
                               LAYOUT 7: WORKFLOW PROCESS STEPS TIMELINE
                               ========================================================================= */
                            <div className={`p-6 rounded-2xl border ${sec.dark ? 'bg-brand-navy text-white border-slate-700' : 'bg-white text-neutral-900 border-slate-200'} shadow-xs space-y-6`}>
                              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
                                <div className="space-y-2 flex-1">
                                  <input
                                    type="text"
                                    value={sec.subtitle || 'SYSTEMATIC PROJECT MILESTONES'}
                                    onChange={(e) => updateSectionField(idx, 'subtitle', e.target.value)}
                                    placeholder="Tag / Subtitle"
                                    className="text-xs font-bold text-brand-orange uppercase tracking-wider border border-slate-200 rounded px-2 py-1 bg-white"
                                  />
                                  <input
                                    type="text"
                                    value={sec.title || 'Structured Program Execution Workflow'}
                                    onChange={(e) => updateSectionField(idx, 'title', e.target.value)}
                                    placeholder="Section Heading"
                                    className="text-xl sm:text-2xl font-bold text-neutral-900 w-full p-2 border border-slate-200 rounded-xl bg-white"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const steps = [
                                      ...(sec.steps || []),
                                      { step: `0${(sec.steps?.length || 0) + 1}`, title: 'New Process Step', description: 'Step description details' }
                                    ];
                                    updateSectionField(idx, 'steps', steps);
                                  }}
                                  className="text-xs font-bold text-white bg-brand-blue hover:bg-brand-blue-hover px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm shrink-0"
                                >
                                  <Plus className="w-4 h-4" />
                                  <span>Add Step</span>
                                </button>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {(sec.steps || []).map((st, sIdx) => (
                                  <div key={sIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 shadow-2xs">
                                    <div className="flex items-center justify-between">
                                      <input
                                        type="text"
                                        value={st.step}
                                        onChange={(e) => {
                                          const steps = [...(sec.steps || [])];
                                          steps[sIdx] = { ...steps[sIdx], step: e.target.value };
                                          updateSectionField(idx, 'steps', steps);
                                        }}
                                        className="w-12 px-1.5 py-1 border border-slate-200 rounded font-mono font-bold text-xs text-brand-orange text-center bg-white"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const steps = (sec.steps || []).filter((_, i) => i !== sIdx);
                                          updateSectionField(idx, 'steps', steps);
                                        }}
                                        className="p-1 text-slate-400 hover:text-red-600 rounded"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                    <input
                                      type="text"
                                      value={st.title}
                                      onChange={(e) => {
                                        const steps = [...(sec.steps || [])];
                                        steps[sIdx] = { ...steps[sIdx], title: e.target.value };
                                        updateSectionField(idx, 'steps', steps);
                                      }}
                                      placeholder="Step Title"
                                      className="w-full px-2 py-1.5 border border-slate-200 rounded font-bold text-xs bg-white"
                                    />
                                    <textarea
                                      rows={3}
                                      value={st.description}
                                      onChange={(e) => {
                                        const steps = [...(sec.steps || [])];
                                        steps[sIdx] = { ...steps[sIdx], description: e.target.value };
                                        updateSectionField(idx, 'steps', steps);
                                      }}
                                      placeholder="Step description..."
                                      className="w-full px-2 py-1.5 border border-slate-200 rounded text-xs bg-white"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : sec.style === 'technical-specs' ? (
                            /* =========================================================================
                               LAYOUT 8: TECHNICAL SPECIFICATIONS TABLE
                               ========================================================================= */
                            <div className={`p-6 rounded-2xl border ${sec.dark ? 'bg-brand-navy text-white border-slate-700' : 'bg-white text-neutral-900 border-slate-200'} shadow-xs space-y-6`}>
                              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
                                <div className="space-y-2 flex-1">
                                  <input
                                    type="text"
                                    value={sec.subtitle || 'OPERATIONAL PARAMETERS'}
                                    onChange={(e) => updateSectionField(idx, 'subtitle', e.target.value)}
                                    placeholder="Tag / Subtitle"
                                    className="text-xs font-bold text-brand-orange uppercase tracking-wider border border-slate-200 rounded px-2 py-1 bg-white"
                                  />
                                  <input
                                    type="text"
                                    value={sec.title || 'Key Technical & Facility Specifications'}
                                    onChange={(e) => updateSectionField(idx, 'title', e.target.value)}
                                    placeholder="Section Heading"
                                    className="text-xl sm:text-2xl font-bold text-neutral-900 w-full p-2 border border-slate-200 rounded-xl bg-white"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const specs = [
                                      ...(sec.specs || []),
                                      { label: 'Specification Parameter', value: 'Standard operating tolerance value' }
                                    ];
                                    updateSectionField(idx, 'specs', specs);
                                  }}
                                  className="text-xs font-bold text-white bg-brand-blue hover:bg-brand-blue-hover px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm shrink-0"
                                >
                                  <Plus className="w-4 h-4" />
                                  <span>Add Spec Row</span>
                                </button>
                              </div>

                              <div className="space-y-2">
                                {(sec.specs || []).map((sp, sIdx) => (
                                  <div key={sIdx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 items-center">
                                    <div className="sm:col-span-5">
                                      <input
                                        type="text"
                                        value={sp.label}
                                        onChange={(e) => {
                                          const specs = [...(sec.specs || [])];
                                          specs[sIdx] = { ...specs[sIdx], label: e.target.value };
                                          updateSectionField(idx, 'specs', specs);
                                        }}
                                        placeholder="Parameter Name"
                                        className="w-full text-xs font-bold text-neutral-900 border border-slate-200 rounded px-2 py-1.5 bg-white"
                                      />
                                    </div>
                                    <div className="sm:col-span-6">
                                      <input
                                        type="text"
                                        value={sp.value}
                                        onChange={(e) => {
                                          const specs = [...(sec.specs || [])];
                                          specs[sIdx] = { ...specs[sIdx], value: e.target.value };
                                          updateSectionField(idx, 'specs', specs);
                                        }}
                                        placeholder="Specification Value"
                                        className="w-full text-xs text-neutral-800 border border-slate-200 rounded px-2 py-1.5 bg-white"
                                      />
                                    </div>
                                    <div className="sm:col-span-1 flex justify-end">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const specs = (sec.specs || []).filter((_, i) => i !== sIdx);
                                          updateSectionField(idx, 'specs', specs);
                                        }}
                                        className="p-1 text-slate-400 hover:text-red-600 rounded"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : sec.style === 'equipment-carousel' ? (
                            /* =========================================================================
                               LAYOUT 10: EQUIPMENT & TECHNOLOGY SHOWCASE SLIDER
                               ========================================================================= */
                            <div className={`p-6 rounded-2xl border ${sec.dark ? 'bg-brand-navy text-white border-slate-700' : 'bg-white text-neutral-900 border-slate-200'} shadow-xs space-y-6`}>
                              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
                                <div className="space-y-2 flex-1">
                                  <div className="flex items-center gap-2">
                                    <Tag className="w-3.5 h-3.5 text-brand-orange" />
                                    <input
                                      type="text"
                                      value={sec.subtitle || 'CUTTING-EDGE INFRASTRUCTURE'}
                                      onChange={(e) => updateSectionField(idx, 'subtitle', e.target.value)}
                                      placeholder="Tag / Subtitle"
                                      className="text-xs font-bold text-brand-orange uppercase tracking-wider border border-slate-200 rounded px-2 py-1 bg-white"
                                    />
                                  </div>
                                  <input
                                    type="text"
                                    value={sec.title || 'State-of-the-Art Analytical & Process Equipment'}
                                    onChange={(e) => updateSectionField(idx, 'title', e.target.value)}
                                    placeholder="Section Heading"
                                    className="text-xl sm:text-2xl font-bold text-neutral-900 w-full p-2 border border-slate-200 rounded-xl bg-white"
                                  />
                                  <textarea
                                    rows={2}
                                    value={sec.text || ''}
                                    onChange={(e) => updateSectionField(idx, 'text', e.target.value)}
                                    placeholder="Equipped with industry-standard bioreactors, chromatography skids, and high-resolution mass spectrometers for uncompromised accuracy."
                                    className="text-xs sm:text-sm text-neutral-700 w-full p-2 border border-slate-200 rounded-xl bg-white"
                                  />
                                </div>

                                <button
                                  type="button"
                                  onClick={() => {
                                    const cards = [
                                      ...(sec.cards || []),
                                      {
                                        title: 'New Analytical Instrument',
                                        badge: 'Spectrometry',
                                        description: 'High-resolution mass spectrometer with automated autosampler.',
                                        image: '/images/Analytical/Orbitrap.png',
                                        link: '/characterization'
                                      }
                                    ];
                                    updateSectionField(idx, 'cards', cards);
                                  }}
                                  className="text-xs font-bold text-white bg-brand-blue hover:bg-brand-blue-hover px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer"
                                >
                                  <Plus className="w-4 h-4" />
                                  <span>Add Custom Equipment</span>
                                </button>
                              </div>

                              {/* Custom Equipment List or Default Note */}
                              {(!sec.cards || sec.cards.length === 0) ? (
                                <div className="p-5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-brand-blue space-y-1">
                                  <div className="font-bold flex items-center gap-1.5">
                                    <Layers className="w-4 h-4" />
                                    <span>Live Equipment Showcase Active</span>
                                  </div>
                                  <p className="text-slate-600">
                                    This section automatically displays curated high-res equipment suites (Ambr 250, Orbitrap LC-MS, AKTA Pilot skids, Maurice cIEF, etc.) tailored to the page modality/service. You can also click &quot;Add Custom Equipment&quot; above to add molecule-specific instruments.
                                  </p>
                                </div>
                              ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {sec.cards.map((card, cIdx) => (
                                    <div key={cIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3 shadow-2xs">
                                      <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-brand-blue uppercase">Equipment {cIdx + 1}</span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const cards = (sec.cards || []).filter((_, i) => i !== cIdx);
                                            updateSectionField(idx, 'cards', cards);
                                          }}
                                          className="p-1 text-slate-400 hover:text-red-600 rounded"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>

                                      <MediaControlWithPreview
                                        label="Equipment Photo"
                                        mediaUrl={card.image || ''}
                                        onChangeUrl={(url) => {
                                          const cards = [...(sec.cards || [])];
                                          cards[cIdx] = { ...cards[cIdx], image: url };
                                          updateSectionField(idx, 'cards', cards);
                                        }}
                                        onOpenPresetGallery={() => {
                                          setGalleryTargetCallback(() => (url: string) => {
                                            const cards = [...(sec.cards || [])];
                                            cards[cIdx] = { ...cards[cIdx], image: url };
                                            updateSectionField(idx, 'cards', cards);
                                          });
                                          setIsGalleryModalOpen(true);
                                        }}
                                        onUploadFile={(file) => {
                                          handleFileUpload(file, (url) => {
                                            const cards = [...(sec.cards || [])];
                                            cards[cIdx] = { ...cards[cIdx], image: url };
                                            updateSectionField(idx, 'cards', cards);
                                          });
                                        }}
                                        uploading={uploading}
                                        aspectRatioClass="aspect-[4/3]"
                                        allowTypeToggle={false}
                                      />

                                      <div className="space-y-2">
                                        <input
                                          type="text"
                                          value={card.title}
                                          onChange={(e) => {
                                            const cards = [...(sec.cards || [])];
                                            cards[cIdx] = { ...cards[cIdx], title: e.target.value };
                                            updateSectionField(idx, 'cards', cards);
                                          }}
                                          placeholder="Instrument Name (e.g. Orbitrap Exploris)"
                                          className="w-full text-xs font-bold text-neutral-900 border border-slate-200 rounded p-1.5 bg-white"
                                        />
                                        <input
                                          type="text"
                                          value={card.badge || ''}
                                          onChange={(e) => {
                                            const cards = [...(sec.cards || [])];
                                            cards[cIdx] = { ...cards[cIdx], badge: e.target.value };
                                            updateSectionField(idx, 'cards', cards);
                                          }}
                                          placeholder="Category / Tag (e.g. Mass Spectrometry)"
                                          className="w-full text-[11px] font-bold text-brand-orange border border-slate-200 rounded p-1 bg-white"
                                        />
                                        <textarea
                                          rows={2}
                                          value={card.description}
                                          onChange={(e) => {
                                            const cards = [...(sec.cards || [])];
                                            cards[cIdx] = { ...cards[cIdx], description: e.target.value };
                                            updateSectionField(idx, 'cards', cards);
                                          }}
                                          placeholder="Key technical capability or resolution..."
                                          className="w-full text-[11px] text-neutral-700 border border-slate-200 rounded p-1.5 bg-white"
                                        />
                                        <input
                                          type="text"
                                          value={card.link || ''}
                                          onChange={(e) => {
                                            const cards = [...(sec.cards || [])];
                                            cards[cIdx] = { ...cards[cIdx], link: e.target.value };
                                            updateSectionField(idx, 'cards', cards);
                                          }}
                                          placeholder="/characterization or link"
                                          className="w-full text-[11px] font-mono border border-slate-200 rounded p-1 bg-white"
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : sec.style === 'rich-text' ? (
                            /* =========================================================================
                               LAYOUT 11: EDITORIAL RICH TEXT & PROSE SECTION
                               ========================================================================= */
                            <div className={`p-6 rounded-2xl border ${sec.dark ? 'bg-brand-navy text-white border-slate-700' : 'bg-white text-neutral-900 border-slate-200'} shadow-xs space-y-5`}>
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue flex items-center gap-1.5">
                                  <FileSpreadsheet className="w-3.5 h-3.5" />
                                  <span>Editorial Rich Text &amp; Prose Section</span>
                                </span>
                                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={Boolean(sec.dark)}
                                    onChange={(e) => updateSectionField(idx, 'dark', e.target.checked)}
                                    className="rounded text-brand-navy focus:ring-brand-blue"
                                  />
                                  <span>Dark Navy Background</span>
                                </label>
                              </div>

                              <div className="space-y-4 max-w-3xl">
                                <div>
                                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                    Section Tag / Subtitle
                                  </label>
                                  <input
                                    type="text"
                                    value={sec.subtitle || ''}
                                    onChange={(e) => updateSectionField(idx, 'subtitle', e.target.value)}
                                    placeholder="e.g. SCIENTIFIC & REGULATORY PHILOSOPHY"
                                    className="w-full text-xs font-bold text-brand-orange border border-slate-200 rounded-lg p-2 bg-white focus:outline-none focus:border-brand-blue"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                    Section Main Heading (H2)
                                  </label>
                                  <input
                                    type="text"
                                    value={sec.title || ''}
                                    onChange={(e) => updateSectionField(idx, 'title', e.target.value)}
                                    placeholder="Heading..."
                                    className="w-full text-xl font-bold text-neutral-900 border border-slate-200 rounded-xl p-2.5 bg-white focus:outline-none focus:border-brand-blue"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                    Editorial Paragraphs (Separate multiple paragraphs with blank lines)
                                  </label>
                                  <textarea
                                    rows={8}
                                    value={sec.text || ''}
                                    onChange={(e) => updateSectionField(idx, 'text', e.target.value)}
                                    placeholder="Enter full editorial prose. Separate paragraphs with an empty line..."
                                    className="w-full text-sm leading-relaxed text-neutral-800 border border-slate-200 rounded-xl p-3 bg-white focus:outline-none focus:border-brand-blue"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            /* =========================================================================
                               LAYOUT 9: 50/50 FEATURE SPLIT (EDITORIAL / DEFAULT FALLBACK)
                               ========================================================================= */
                            <div className={`p-6 rounded-2xl border ${sec.dark ? 'bg-brand-navy text-white border-slate-700' : 'bg-white text-neutral-900 border-slate-200'} shadow-xs space-y-6`}>
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                {/* Media Column (Interactive Multi-Photo Carousel or Playable Video / Image Preview) */}
                                <div className={`${isImageLeft ? 'lg:order-1' : 'lg:order-2'} space-y-4`}>
                                  {(() => {
                                    const isVideo = isVideoUrl(sec.video || sec.image, sec.mediaType);
                                    const equipItems = getSectionEquipment(sec.title || '', page.slug);
                                    const defaultEquipImages = equipItems ? equipItems.map((item) => item.src) : [];

                                    // Resolve active slides for this section:
                                    const activeSectionSlides: string[] =
                                      (sec.images && sec.images.length > 0)
                                        ? sec.images
                                        : (!isVideo && defaultEquipImages.length > 0)
                                        ? defaultEquipImages
                                        : (sec.image ? [sec.image] : []);

                                    const isMultiSlide = !isVideo && activeSectionSlides.length > 1;
                                    const currentSlideIdx = (sectionSlideIdxs[idx] || 0) % (activeSectionSlides.length || 1);
                                    const currentSlideUrl = activeSectionSlides[currentSlideIdx] || activeSectionSlides[0] || sec.image || '';
                                    const currentEquipMeta =
                                      (equipItems && equipItems.find((e) => e.src === currentSlideUrl)) ||
                                      ALL_EQUIPMENT_ITEMS.find((eq) => eq.src === currentSlideUrl) ||
                                      (equipItems && equipItems[currentSlideIdx]);

                                    return (
                                      <>
                                        {/* If multi-slide carousel is active, show the rich interactive Equipment / Section Carousel Canvas preview */}
                                        {isMultiSlide ? (
                                          <div className="space-y-2.5 p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 shadow-2xs">
                                            <div className="flex items-center justify-between gap-2">
                                              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                                                <Images className="w-3.5 h-3.5 text-brand-orange" />
                                                <span>Section Photo Carousel Live Preview ({activeSectionSlides.length} Slides)</span>
                                              </label>
                                              <div className="flex items-center gap-1.5">
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
                                                  Live Website Layout
                                                </span>
                                              </div>
                                            </div>

                                            {/* Interactive Carousel Box (Matching EquipmentCarousel on the live website) */}
                                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-neutral-800 shadow-md bg-neutral-900 group select-none">
                                              <img
                                                src={encodeURI(currentSlideUrl)}
                                                alt={sec.title || 'Section Equipment'}
                                                className="relative z-10 w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                                              />
                                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35 pointer-events-none z-10" />

                                              {/* Top-Right Counter Pill */}
                                              <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                                                <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wider shadow-sm">
                                                  {String(currentSlideIdx + 1).padStart(2, '0')} / {String(activeSectionSlides.length).padStart(2, '0')}
                                                </span>
                                              </div>

                                              {/* Equipment tag / subtitle caption if available */}
                                              {currentEquipMeta && (
                                                <div className="absolute bottom-9 left-3 right-3 z-20 pointer-events-none">
                                                  {currentEquipMeta.tag && (
                                                    <span className="px-2 py-0.5 rounded-md bg-brand-blue/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider mb-1 inline-block shadow-xs">
                                                      {currentEquipMeta.tag}
                                                    </span>
                                                  )}
                                                  {currentEquipMeta.title && (
                                                    <p className="text-xs font-semibold text-white truncate drop-shadow-md">
                                                      {currentEquipMeta.title}
                                                    </p>
                                                  )}
                                                </div>
                                              )}

                                              {/* Navigation Chevrons Left & Right */}
                                              <button
                                                type="button"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setSectionSlideIdxs((prev) => ({
                                                    ...prev,
                                                    [idx]: (currentSlideIdx - 1 + activeSectionSlides.length) % activeSectionSlides.length
                                                  }));
                                                }}
                                                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-neutral-800 shadow-md flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
                                                title="Previous Slide"
                                              >
                                                <ChevronLeft className="w-4 h-4" />
                                              </button>

                                              <button
                                                type="button"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setSectionSlideIdxs((prev) => ({
                                                    ...prev,
                                                    [idx]: (currentSlideIdx + 1) % activeSectionSlides.length
                                                  }));
                                                }}
                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-neutral-800 shadow-md flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
                                                title="Next Slide"
                                              >
                                                <ChevronRight className="w-4 h-4" />
                                              </button>

                                              {/* Bottom Navigation Dots */}
                                              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
                                                {activeSectionSlides.map((_, dIdx) => (
                                                  <button
                                                    key={dIdx}
                                                    type="button"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      setSectionSlideIdxs((prev) => ({ ...prev, [idx]: dIdx }));
                                                    }}
                                                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                                                      currentSlideIdx === dIdx
                                                        ? 'w-5 h-1.5 bg-brand-blue'
                                                        : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
                                                    }`}
                                                  />
                                                ))}
                                              </div>
                                            </div>
                                          </div>
                                        ) : (
                                          <MediaControlWithPreview
                                            label="Primary Section Media (Video or Image)"
                                            mediaUrl={sec.image || sec.video || ''}
                                            mediaType={sec.mediaType || 'image'}
                                            onChangeUrl={(url) => {
                                              updateSectionFields(idx, { image: url, video: url });
                                            }}
                                            onChangeMediaType={(type) => updateSectionField(idx, 'mediaType', type)}
                                            onOpenPresetGallery={() => {
                                              setGalleryTargetCallback(() => (url: string, isVid?: 'image' | 'video') => {
                                                updateSectionFields(idx, {
                                                  image: url,
                                                  video: url,
                                                  mediaType: isVid || (isVideoUrl(url) ? 'video' : 'image')
                                                });
                                              });
                                              setIsGalleryModalOpen(true);
                                            }}
                                            onUploadFile={(file) => {
                                              handleFileUpload(file, (url, isVideo) => {
                                                updateSectionFields(idx, {
                                                  image: url,
                                                  video: url,
                                                  mediaType: isVideo ? 'video' : 'image'
                                                });
                                              });
                                            }}
                                            uploading={uploading}
                                            aspectRatioClass="aspect-[4/3]"
                                            helperText="Videos (.mp4, .webm) will play continuously with high-contrast scientific color grade on the website."
                                          />
                                        )}

                                        {/* Multi-Photo Carousel Manager with File Upload Portal */}
                                        <PhotoCarouselManager
                                          label="Section Photo Carousel Slides (Add, Reorder, Replace)"
                                          images={activeSectionSlides}
                                          onChangeImages={(imgs) => {
                                            updateSectionFields(idx, {
                                              images: imgs,
                                              image: imgs[0] || sec.image
                                            });
                                          }}
                                          onOpenPresetGallery={() => {
                                            setGalleryTargetCallback(() => (url: string) => {
                                              const currentImgs = activeSectionSlides;
                                              updateSectionFields(idx, {
                                                images: [...currentImgs, url],
                                                image: currentImgs[0] || url
                                              });
                                            });
                                            setIsGalleryModalOpen(true);
                                          }}
                                          onUploadMultipleFiles={async (files) => {
                                            await handleMultipleFilesUpload(files, (urls) => {
                                              const currentImgs = activeSectionSlides;
                                              updateSectionFields(idx, {
                                                images: [...currentImgs, ...urls],
                                                image: currentImgs[0] || urls[0]
                                              });
                                            });
                                          }}
                                          uploading={uploading}
                                        />
                                      </>
                                    );
                                  })()}
                                </div>

                                {/* Text Column (Direct In-Place Editable Content) */}
                                <div className={`${isImageLeft ? 'lg:order-2' : 'lg:order-1'} space-y-4`}>
                                  {/* Tag / Subtitle */}
                                  <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                                      <Tag className="w-3 h-3 text-brand-orange" />
                                      <span>Tag / Subtitle</span>
                                    </label>
                                    <input
                                      type="text"
                                      value={sec.subtitle || sec.badge || ''}
                                      onChange={(e) => {
                                        updateSectionField(idx, 'subtitle', e.target.value);
                                        updateSectionField(idx, 'badge', e.target.value);
                                      }}
                                      placeholder="e.g. 01 — BIOPROCESS DEVELOPMENT"
                                      className="w-full text-xs font-bold text-brand-orange border border-slate-200 rounded-lg p-2 bg-white focus:outline-none focus:border-brand-blue"
                                    />
                                  </div>

                                  {/* Section Title */}
                                  <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                      Section Main Heading (h2)
                                    </label>
                                    <input
                                      type="text"
                                      value={sec.title || ''}
                                      onChange={(e) => updateSectionField(idx, 'title', e.target.value)}
                                      placeholder="Section Title Heading..."
                                      className="w-full text-lg sm:text-xl font-bold text-neutral-900 border border-slate-200 rounded-xl p-2.5 bg-white focus:outline-none focus:border-brand-blue"
                                    />
                                  </div>

                                  {/* Body Description Text */}
                                  <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                      Body Description Text (Paragraphs)
                                    </label>
                                    <textarea
                                      rows={4}
                                      value={sec.text || ''}
                                      onChange={(e) => updateSectionField(idx, 'text', e.target.value)}
                                      placeholder="Enter descriptive paragraphs explaining this capability..."
                                      className="w-full text-xs sm:text-sm font-normal leading-relaxed text-neutral-800 border border-slate-200 rounded-xl p-3 bg-white focus:outline-none focus:border-brand-blue"
                                    />
                                  </div>

                                  {/* Section Bullets & Grouped Sub-Sections */}
                                  <div className="space-y-4 pt-3 border-t border-slate-200">
                                    {/* Standard Bullets */}
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                                            Key Capabilities Checklist ({sec.bullets?.length || 0})
                                          </label>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const bullets = [...(sec.bullets || []), 'New key technical capability'];
                                            updateSectionField(idx, 'bullets', bullets);
                                          }}
                                          className="text-[11px] font-bold text-brand-blue hover:underline flex items-center gap-1 cursor-pointer"
                                        >
                                          <Plus className="w-3.5 h-3.5" />
                                          <span>Add Bullet</span>
                                        </button>
                                      </div>

                                      <div className="space-y-1.5">
                                        <input
                                          type="text"
                                          value={sec.bulletsTitle || ''}
                                          onChange={(e) => updateSectionField(idx, 'bulletsTitle', e.target.value)}
                                          placeholder="Bullets Header Title (e.g., Key capabilities include:)"
                                          className="w-full px-2.5 py-1 text-[11px] font-bold text-brand-orange uppercase border border-slate-200 rounded-md bg-white focus:outline-none focus:border-brand-blue"
                                        />
                                        {sec.bullets?.map((b, bIdx) => (
                                          <div key={bIdx} className="flex items-center gap-2">
                                            <span className="w-5 h-5 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-[10px] flex items-center justify-center shrink-0">
                                              ✓
                                            </span>
                                            <input
                                              type="text"
                                              value={b}
                                              onChange={(e) => {
                                                const bullets = [...(sec.bullets || [])];
                                                bullets[bIdx] = e.target.value;
                                                updateSectionField(idx, 'bullets', bullets);
                                              }}
                                              className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-neutral-900 bg-white"
                                            />
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const bullets = (sec.bullets || []).filter((_, i) => i !== bIdx);
                                                updateSectionField(idx, 'bullets', bullets);
                                              }}
                                              className="p-1 text-slate-400 hover:text-red-600 rounded cursor-pointer"
                                            >
                                              <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Dual-Stage Bullets (e.g. UK London Facility) */}
                                    {(sec.earlyStageBullets || sec.lateStageBullets) && (
                                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                          <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                                            Early vs. Late Stage Bioprocess Bullets
                                          </span>
                                        </div>

                                        {/* Early Stage */}
                                        <div className="space-y-2">
                                          <div className="flex items-center justify-between">
                                            <label className="text-[11px] font-bold text-brand-orange uppercase">
                                              Early-Stage Development Bullets ({(sec.earlyStageBullets || []).length})
                                            </label>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const bullets = [...(sec.earlyStageBullets || []), 'New early-stage capability'];
                                                updateSectionField(idx, 'earlyStageBullets', bullets);
                                              }}
                                              className="text-[10px] font-bold text-brand-blue hover:underline flex items-center gap-1 cursor-pointer"
                                            >
                                              <Plus className="w-3 h-3" />
                                              <span>Add</span>
                                            </button>
                                          </div>
                                          <div className="space-y-1.5">
                                            {sec.earlyStageBullets?.map((b: string, bIdx: number) => (
                                              <div key={bIdx} className="flex items-center gap-2">
                                                <input
                                                  type="text"
                                                  value={b}
                                                  onChange={(e) => {
                                                    const bullets = [...(sec.earlyStageBullets || [])];
                                                    bullets[bIdx] = e.target.value;
                                                    updateSectionField(idx, 'earlyStageBullets', bullets);
                                                  }}
                                                  className="flex-1 px-2.5 py-1 border border-slate-200 rounded text-xs bg-white"
                                                />
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    const bullets = (sec.earlyStageBullets || []).filter((_: any, i: number) => i !== bIdx);
                                                    updateSectionField(idx, 'earlyStageBullets', bullets);
                                                  }}
                                                  className="p-1 text-slate-400 hover:text-red-600 rounded"
                                                >
                                                  <Trash2 className="w-3 h-3" />
                                                </button>
                                              </div>
                                            ))}
                                          </div>
                                        </div>

                                        {/* Late Stage */}
                                        <div className="space-y-2">
                                          <div className="flex items-center justify-between">
                                            <label className="text-[11px] font-bold text-brand-orange uppercase">
                                              Late-Stage Development Bullets ({(sec.lateStageBullets || []).length})
                                            </label>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const bullets = [...(sec.lateStageBullets || []), 'New late-stage capability'];
                                                updateSectionField(idx, 'lateStageBullets', bullets);
                                              }}
                                              className="text-[10px] font-bold text-brand-blue hover:underline flex items-center gap-1 cursor-pointer"
                                            >
                                              <Plus className="w-3 h-3" />
                                              <span>Add</span>
                                            </button>
                                          </div>
                                          <div className="space-y-1.5">
                                            {sec.lateStageBullets?.map((b: string, bIdx: number) => (
                                              <div key={bIdx} className="flex items-center gap-2">
                                                <input
                                                  type="text"
                                                  value={b}
                                                  onChange={(e) => {
                                                    const bullets = [...(sec.lateStageBullets || [])];
                                                    bullets[bIdx] = e.target.value;
                                                    updateSectionField(idx, 'lateStageBullets', bullets);
                                                  }}
                                                  className="flex-1 px-2.5 py-1 border border-slate-200 rounded text-xs bg-white"
                                                />
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    const bullets = (sec.lateStageBullets || []).filter((_: any, i: number) => i !== bIdx);
                                                    updateSectionField(idx, 'lateStageBullets', bullets);
                                                  }}
                                                  className="p-1 text-slate-400 hover:text-red-600 rounded"
                                                >
                                                  <Trash2 className="w-3 h-3" />
                                                </button>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    {/* Triple-Stage Formulation & GMP Bullets (e.g. India Ahmedabad Section 7) */}
                                    {(sec.formulationBullets || sec.lyophilizationBullets || sec.gmpManufacturingBullets) && (
                                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                                        <span className="text-xs font-bold uppercase tracking-wider text-brand-navy block border-b border-slate-200 pb-2">
                                          Formulation, Lyophilization & Clinical GMP Bullets
                                        </span>

                                        {/* Formulation */}
                                        <div className="space-y-1.5">
                                          <div className="flex items-center justify-between">
                                            <label className="text-[11px] font-bold text-brand-orange uppercase">Formulation Development ({(sec.formulationBullets || []).length})</label>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const bullets = [...(sec.formulationBullets || []), 'New formulation bullet'];
                                                updateSectionField(idx, 'formulationBullets', bullets);
                                              }}
                                              className="text-[10px] font-bold text-brand-blue hover:underline cursor-pointer"
                                            >+ Add</button>
                                          </div>
                                          {sec.formulationBullets?.map((b: string, bIdx: number) => (
                                            <div key={bIdx} className="flex items-center gap-2">
                                              <input
                                                type="text"
                                                value={b}
                                                onChange={(e) => {
                                                  const bullets = [...(sec.formulationBullets || [])];
                                                  bullets[bIdx] = e.target.value;
                                                  updateSectionField(idx, 'formulationBullets', bullets);
                                                }}
                                                className="flex-1 px-2.5 py-1 border border-slate-200 rounded text-xs bg-white"
                                              />
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const bullets = (sec.formulationBullets || []).filter((_: any, i: number) => i !== bIdx);
                                                  updateSectionField(idx, 'formulationBullets', bullets);
                                                }}
                                                className="p-1 text-slate-400 hover:text-red-600 rounded"
                                              ><Trash2 className="w-3 h-3" /></button>
                                            </div>
                                          ))}
                                        </div>

                                        {/* Lyophilization */}
                                        <div className="space-y-1.5">
                                          <div className="flex items-center justify-between">
                                            <label className="text-[11px] font-bold text-brand-orange uppercase">Lyophilization Cycle Development ({(sec.lyophilizationBullets || []).length})</label>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const bullets = [...(sec.lyophilizationBullets || []), 'New lyophilization bullet'];
                                                updateSectionField(idx, 'lyophilizationBullets', bullets);
                                              }}
                                              className="text-[10px] font-bold text-brand-blue hover:underline cursor-pointer"
                                            >+ Add</button>
                                          </div>
                                          {sec.lyophilizationBullets?.map((b: string, bIdx: number) => (
                                            <div key={bIdx} className="flex items-center gap-2">
                                              <input
                                                type="text"
                                                value={b}
                                                onChange={(e) => {
                                                  const bullets = [...(sec.lyophilizationBullets || [])];
                                                  bullets[bIdx] = e.target.value;
                                                  updateSectionField(idx, 'lyophilizationBullets', bullets);
                                                }}
                                                className="flex-1 px-2.5 py-1 border border-slate-200 rounded text-xs bg-white"
                                              />
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const bullets = (sec.lyophilizationBullets || []).filter((_: any, i: number) => i !== bIdx);
                                                  updateSectionField(idx, 'lyophilizationBullets', bullets);
                                                }}
                                                className="p-1 text-slate-400 hover:text-red-600 rounded"
                                              ><Trash2 className="w-3 h-3" /></button>
                                            </div>
                                          ))}
                                        </div>

                                        {/* GMP Manufacturing */}
                                        <div className="space-y-1.5">
                                          <div className="flex items-center justify-between">
                                            <label className="text-[11px] font-bold text-brand-orange uppercase">Clinical GMP Manufacturing ({(sec.gmpManufacturingBullets || []).length})</label>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const bullets = [...(sec.gmpManufacturingBullets || []), 'New GMP bullet'];
                                                updateSectionField(idx, 'gmpManufacturingBullets', bullets);
                                              }}
                                              className="text-[10px] font-bold text-brand-blue hover:underline cursor-pointer"
                                            >+ Add</button>
                                          </div>
                                          {sec.gmpManufacturingBullets?.map((b: string, bIdx: number) => (
                                            <div key={bIdx} className="flex items-center gap-2">
                                              <input
                                                type="text"
                                                value={b}
                                                onChange={(e) => {
                                                  const bullets = [...(sec.gmpManufacturingBullets || [])];
                                                  bullets[bIdx] = e.target.value;
                                                  updateSectionField(idx, 'gmpManufacturingBullets', bullets);
                                                }}
                                                className="flex-1 px-2.5 py-1 border border-slate-200 rounded text-xs bg-white"
                                              />
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const bullets = (sec.gmpManufacturingBullets || []).filter((_: any, i: number) => i !== bIdx);
                                                  updateSectionField(idx, 'gmpManufacturingBullets', bullets);
                                                }}
                                                className="p-1 text-slate-400 hover:text-red-600 rounded"
                                              ><Trash2 className="w-3 h-3" /></button>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Triple-Stage Analytical Characterization Bullets (e.g. India Ahmedabad Section 8) */}
                                    {(sec.physicochemicalBullets || sec.structuralBullets || sec.functionalBullets) && (
                                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                                        <span className="text-xs font-bold uppercase tracking-wider text-brand-navy block border-b border-slate-200 pb-2">
                                          Analytical Sciences Characterization Bullets
                                        </span>

                                        {/* Physicochemical */}
                                        <div className="space-y-1.5">
                                          <div className="flex items-center justify-between">
                                            <label className="text-[11px] font-bold text-brand-orange uppercase">Physicochemical Characterization ({(sec.physicochemicalBullets || []).length})</label>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const bullets = [...(sec.physicochemicalBullets || []), 'New physicochemical bullet'];
                                                updateSectionField(idx, 'physicochemicalBullets', bullets);
                                              }}
                                              className="text-[10px] font-bold text-brand-blue hover:underline cursor-pointer"
                                            >+ Add</button>
                                          </div>
                                          {sec.physicochemicalBullets?.map((b: string, bIdx: number) => (
                                            <div key={bIdx} className="flex items-center gap-2">
                                              <input
                                                type="text"
                                                value={b}
                                                onChange={(e) => {
                                                  const bullets = [...(sec.physicochemicalBullets || [])];
                                                  bullets[bIdx] = e.target.value;
                                                  updateSectionField(idx, 'physicochemicalBullets', bullets);
                                                }}
                                                className="flex-1 px-2.5 py-1 border border-slate-200 rounded text-xs bg-white"
                                              />
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const bullets = (sec.physicochemicalBullets || []).filter((_: any, i: number) => i !== bIdx);
                                                  updateSectionField(idx, 'physicochemicalBullets', bullets);
                                                }}
                                                className="p-1 text-slate-400 hover:text-red-600 rounded"
                                              ><Trash2 className="w-3 h-3" /></button>
                                            </div>
                                          ))}
                                        </div>

                                        {/* Structural */}
                                        <div className="space-y-1.5">
                                          <div className="flex items-center justify-between">
                                            <label className="text-[11px] font-bold text-brand-orange uppercase">Structural Elucidation & HOS ({(sec.structuralBullets || []).length})</label>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const bullets = [...(sec.structuralBullets || []), 'New structural bullet'];
                                                updateSectionField(idx, 'structuralBullets', bullets);
                                              }}
                                              className="text-[10px] font-bold text-brand-blue hover:underline cursor-pointer"
                                            >+ Add</button>
                                          </div>
                                          {sec.structuralBullets?.map((b: string, bIdx: number) => (
                                            <div key={bIdx} className="flex items-center gap-2">
                                              <input
                                                type="text"
                                                value={b}
                                                onChange={(e) => {
                                                  const bullets = [...(sec.structuralBullets || [])];
                                                  bullets[bIdx] = e.target.value;
                                                  updateSectionField(idx, 'structuralBullets', bullets);
                                                }}
                                                className="flex-1 px-2.5 py-1 border border-slate-200 rounded text-xs bg-white"
                                              />
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const bullets = (sec.structuralBullets || []).filter((_: any, i: number) => i !== bIdx);
                                                  updateSectionField(idx, 'structuralBullets', bullets);
                                                }}
                                                className="p-1 text-slate-400 hover:text-red-600 rounded"
                                              ><Trash2 className="w-3 h-3" /></button>
                                            </div>
                                          ))}
                                        </div>

                                        {/* Functional */}
                                        <div className="space-y-1.5">
                                          <div className="flex items-center justify-between">
                                            <label className="text-[11px] font-bold text-brand-orange uppercase">Functional Potency & Target Binding ({(sec.functionalBullets || []).length})</label>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const bullets = [...(sec.functionalBullets || []), 'New functional bullet'];
                                                updateSectionField(idx, 'functionalBullets', bullets);
                                              }}
                                              className="text-[10px] font-bold text-brand-blue hover:underline cursor-pointer"
                                            >+ Add</button>
                                          </div>
                                          {sec.functionalBullets?.map((b: string, bIdx: number) => (
                                            <div key={bIdx} className="flex items-center gap-2">
                                              <input
                                                type="text"
                                                value={b}
                                                onChange={(e) => {
                                                  const bullets = [...(sec.functionalBullets || [])];
                                                  bullets[bIdx] = e.target.value;
                                                  updateSectionField(idx, 'functionalBullets', bullets);
                                                }}
                                                className="flex-1 px-2.5 py-1 border border-slate-200 rounded text-xs bg-white"
                                              />
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const bullets = (sec.functionalBullets || []).filter((_: any, i: number) => i !== bIdx);
                                                  updateSectionField(idx, 'functionalBullets', bullets);
                                                }}
                                                className="p-1 text-slate-400 hover:text-red-600 rounded"
                                              ><Trash2 className="w-3 h-3" /></button>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* QTPP Text */}
                                    {sec.qtppText !== undefined && (
                                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                                        <label className="text-[11px] font-bold text-slate-700 uppercase">
                                          Quality Target Product Profile (QTPP) Callout Text
                                        </label>
                                        <textarea
                                          rows={2}
                                          value={sec.qtppText || ''}
                                          onChange={(e) => updateSectionField(idx, 'qtppText', e.target.value)}
                                          placeholder="Enter QTPP alignment callout text..."
                                          className="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white"
                                        />
                                      </div>
                                    )}

                                    {/* Applications Cards */}
                                    {sec.applications && (
                                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                                        <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                                          <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                                            Application Cards ({sec.applications.length})
                                          </span>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const apps = [...(sec.applications || []), { title: 'New Application', description: '', icon: 'FlaskConical' }];
                                              updateSectionField(idx, 'applications', apps);
                                            }}
                                            className="text-[10px] font-bold text-brand-blue hover:underline cursor-pointer"
                                          >+ Add Application</button>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                          {sec.applications.map((app: any, aIdx: number) => (
                                            <div key={aIdx} className="p-2.5 bg-white border border-slate-200 rounded-lg space-y-1.5 shadow-2xs">
                                              <div className="flex items-center justify-between">
                                                <input
                                                  type="text"
                                                  value={app.title || ''}
                                                  onChange={(e) => {
                                                    const apps = [...(sec.applications || [])];
                                                    apps[aIdx] = { ...apps[aIdx], title: e.target.value };
                                                    updateSectionField(idx, 'applications', apps);
                                                  }}
                                                  placeholder="Card Title"
                                                  className="font-bold text-xs border-b border-slate-200 px-1 py-0.5 flex-1 mr-2"
                                                />
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    const apps = (sec.applications || []).filter((_: any, i: number) => i !== aIdx);
                                                    updateSectionField(idx, 'applications', apps);
                                                  }}
                                                  className="text-slate-400 hover:text-red-600"
                                                ><Trash2 className="w-3 h-3" /></button>
                                              </div>
                                              <textarea
                                                rows={2}
                                                value={app.description || ''}
                                                onChange={(e) => {
                                                  const apps = [...(sec.applications || [])];
                                                  apps[aIdx] = { ...apps[aIdx], description: e.target.value };
                                                  updateSectionField(idx, 'applications', apps);
                                                }}
                                                placeholder="Description..."
                                                className="w-full text-[11px] p-1.5 border border-slate-200 rounded bg-slate-50/50"
                                              />
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {/* Section CTA Button */}
                                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                                    <div>
                                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                        Button Text
                                      </label>
                                      <input
                                        type="text"
                                        value={sec.buttonText || ''}
                                        onChange={(e) => updateSectionField(idx, 'buttonText', e.target.value)}
                                        placeholder="e.g. Explore Capabilities"
                                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white font-semibold"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                        Button Link URL
                                      </label>
                                      <input
                                        type="text"
                                        value={sec.buttonLink || ''}
                                        onChange={(e) => updateSectionField(idx, 'buttonLink', e.target.value)}
                                        placeholder="/services"
                                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono bg-white"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
              </>
            )}

            {/* =========================================================================
                SECTION 8: PLATFORM SUMMARY / FOOTER NOTE CARD
               ========================================================================= */}
            {hasFooterNote && (
              <div className="mt-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
                <div
                  onClick={() => setIsFooterNoteCardOpen(!isFooterNoteCardOpen)}
                  className="p-5 sm:p-6 flex items-center justify-between gap-4 bg-gradient-to-r from-slate-50 via-indigo-50/20 to-slate-50 border-b border-slate-200 cursor-pointer hover:bg-slate-100/80 transition-colors select-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 shrink-0">
                      <Quote className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-600 text-white shadow-2xs">
                          Section {footerNoteSecNum} • Callout Banner
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
                          Active Callout
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 truncate">
                        {footerNoteSecNum}. Platform Summary & Regulatory Callout (Footer Note)
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Remove Platform Summary & Regulatory Callout from this page? It will only appear if you add it back.')) {
                          setPage((prev) => ({ ...prev, footerNote: undefined, hasUnpublishedChanges: true }));
                          setToast({ type: 'success', message: 'Removed Platform Summary & Regulatory Callout from page.' });
                          setTimeout(() => setToast(null), 3000);
                        }
                      }}
                      className="p-1.5 px-2.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Remove section from page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Remove Section</span>
                    </button>
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      {isFooterNoteCardOpen ? 'Click to collapse' : 'Click to edit Callout'}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-2xs">
                      {isFooterNoteCardOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {isFooterNoteCardOpen && (
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200/80 text-xs text-slate-700 flex items-start gap-3">
                      <Quote className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900">Platform Callout Banner: </span>
                        Renders as a prominent centered callout box above the FAQ and Footer CTA, summarizing key platform compliance, regulatory alignments, or scientific conclusions.
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Callout Text Content
                      </label>
                      <textarea
                        rows={4}
                        value={page.footerNote || ''}
                        onChange={(e) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, footerNote: e.target.value }))}
                        placeholder="All analytical procedures are qualified in accordance with ICH Q2(R1) guidelines, with full audit trail compliance..."
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    {page.footerNote && (
                      <div className="pt-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                          Callout Box Live Preview
                        </span>
                        <div className="bg-neutral-50 border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-xs text-center">
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                            "{page.footerNote}"
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* =========================================================================
                SECTION 9: TECHNICAL SPECIFICATIONS TABLE CARD
               ========================================================================= */}
            {hasSpecs && (
              <div className="mt-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
                <div
                  onClick={() => setIsSpecsCardOpen(!isSpecsCardOpen)}
                  className="p-5 sm:p-6 flex items-center justify-between gap-4 bg-gradient-to-r from-slate-50 via-teal-50/20 to-slate-50 border-b border-slate-200 cursor-pointer hover:bg-slate-100/80 transition-colors select-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 shrink-0">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-600 text-white shadow-2xs">
                          Section {specsSecNum} • Specs Matrix
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
                          {(page.specs || []).length} Specification{(page.specs || []).length === 1 ? '' : 's'}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 truncate">
                        {specsSecNum}. Technical Specifications Table (Parameters & Standards)
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Remove Technical Specifications Table from this page? It will only appear if you add it back.')) {
                          setPage((prev) => ({ ...prev, specs: undefined, hasUnpublishedChanges: true }));
                          setToast({ type: 'success', message: 'Removed Technical Specifications Table from page.' });
                          setTimeout(() => setToast(null), 3000);
                        }
                      }}
                      className="p-1.5 px-2.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Remove section from page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Remove Section</span>
                    </button>
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      {isSpecsCardOpen ? 'Click to collapse' : 'Click to edit Specs'}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-2xs">
                      {isSpecsCardOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {isSpecsCardOpen && (
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200/80 text-xs text-slate-700 flex items-start gap-3">
                      <FileSpreadsheet className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900">Technical Specifications Matrix: </span>
                        Renders a structured 2-column parameter & standard specification table for bioprocess tolerances, cleanroom classifications, or batch release parameters.
                      </div>
                    </div>

                    {(!page.specs || page.specs.length === 0) ? (
                      <div className="p-8 border border-dashed border-slate-300 rounded-xl text-center space-y-3">
                        <p className="text-xs text-slate-500">No technical specifications configured on this page yet.</p>
                        <button
                          type="button"
                          onClick={handleAddSpec}
                          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add First Specification</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2.5">
                          {(page.specs || []).map((sp, sIdx) => (
                            <div key={sIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                              <span className="w-6 h-6 rounded-full bg-teal-500/10 text-teal-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                                {sIdx + 1}
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                                <div>
                                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5 block">Parameter</label>
                                  <input
                                    type="text"
                                    value={sp.label || ''}
                                    onChange={(e) => handleUpdateSpec(sIdx, 'label', e.target.value)}
                                    placeholder="e.g. Bioreactor Working Volume"
                                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-neutral-900"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5 block">Standard / Specification</label>
                                  <input
                                    type="text"
                                    value={sp.value || ''}
                                    onChange={(e) => handleUpdateSpec(sIdx, 'value', e.target.value)}
                                    placeholder="e.g. 50L, 200L, 500L, 2,000L"
                                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-teal-800"
                                  />
                                </div>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleMoveSpec(sIdx, 'up')}
                                  disabled={sIdx === 0}
                                  className="p-1 rounded hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                                  title="Move up"
                                >
                                  <ChevronUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleMoveSpec(sIdx, 'down')}
                                  disabled={sIdx === (page.specs || []).length - 1}
                                  className="p-1 rounded hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                                  title="Move down"
                                >
                                  <ChevronDown className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveSpec(sIdx)}
                                  className="p-1 rounded text-red-500 hover:bg-red-50 cursor-pointer ml-1"
                                  title="Delete specification"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <button
                            type="button"
                            onClick={handleAddSpec}
                            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add Specification Row</span>
                          </button>
                        </div>

                        {/* Live Preview */}
                        <div className="pt-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                            Specifications Table Live Preview
                          </span>
                          <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs max-w-3xl">
                            <table className="w-full text-xs text-left">
                              <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                                <tr>
                                  <th className="py-2.5 px-4">Parameter / Capability</th>
                                  <th className="py-2.5 px-4">Standard / Specification</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {(page.specs || []).map((s, idx) => (
                                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                                    <td className="py-2.5 px-4 font-semibold text-neutral-900">{s.label || '—'}</td>
                                    <td className="py-2.5 px-4 text-slate-600 font-mono">{s.value || '—'}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* =========================================================================
                SECTION 10: DEDICATED PAGE FAQ ACCORDION (LIVE BOTTOM SECTION)
                Directly edits page.faqs array and page FAQ metadata
               ========================================================================= */}
            {hasFaqs && (
              <div className="mt-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
                {/* Card Header Bar */}
                <div
                  onClick={() => setIsFaqCardOpen(!isFaqCardOpen)}
                  className="p-5 sm:p-6 flex items-center justify-between gap-4 bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50 border-b border-slate-200 cursor-pointer hover:bg-slate-100/80 transition-colors select-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shrink-0">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-blue text-white shadow-2xs">
                          Section {faqsSecNum} • FAQ Accordion
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
                          {(page.faqs || []).length} Question{(page.faqs || []).length === 1 ? '' : 's'}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 truncate">
                        {faqsSecNum}. Frequently Asked Questions (FAQ Accordion)
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Remove FAQ Accordion from this page? It will only appear if you add it back.')) {
                          setPage((prev) => ({ ...prev, faqs: undefined, hasUnpublishedChanges: true }));
                          setToast({ type: 'success', message: 'Removed FAQ Accordion from page.' });
                          setTimeout(() => setToast(null), 3000);
                        }
                      }}
                      className="p-1.5 px-2.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Remove section from page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Remove Section</span>
                    </button>
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      {isFaqCardOpen ? 'Click to collapse' : 'Click to edit FAQs'}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-2xs">
                      {isFaqCardOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

              {isFaqCardOpen && (
                <div className="p-6 sm:p-8 space-y-8">
                  {/* Context Note */}
                  <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs text-slate-700 flex items-start gap-3">
                    <HelpCircle className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">Native Page Accordion: </span>
                      This FAQ section renders at the bottom of the live page (right above the conversion CTA). You can customize the section title, subtitle, contact link, and all questions & answers below.
                    </div>
                  </div>

                  {/* 1. Global FAQ Section Header Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-xl bg-slate-50/80 border border-slate-200/80">
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-brand-blue" />
                        <span>FAQ Section Title</span>
                      </label>
                      <input
                        type="text"
                        value={page.faqTitle || ''}
                        onChange={(e) => handleUpdateFaqMeta('faqTitle', e.target.value)}
                        placeholder={page.category === 'home' ? 'Common Questions' : 'Frequently Asked Questions'}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-neutral-900 focus:outline-none focus:border-brand-blue shadow-2xs"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <span>FAQ Subtitle / Introductory Text</span>
                      </label>
                      <textarea
                        rows={2}
                        value={page.faqSubtitle || ''}
                        onChange={(e) => handleUpdateFaqMeta('faqSubtitle', e.target.value)}
                        placeholder="Answers to key questions regarding our biologics development platform, regulatory alignment, and facility infrastructure."
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-brand-blue shadow-2xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <LinkIcon className="w-3.5 h-3.5 text-brand-orange" />
                        <span>Contact CTA Button Text</span>
                      </label>
                      <input
                        type="text"
                        value={page.faqButtonText || ''}
                        onChange={(e) => handleUpdateFaqMeta('faqButtonText', e.target.value)}
                        placeholder="Still have questions? Talk to us"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-brand-blue shadow-2xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <span>Contact CTA Route Target</span>
                      </label>
                      <input
                        type="text"
                        value={page.faqButtonLink || ''}
                        onChange={(e) => handleUpdateFaqMeta('faqButtonLink', e.target.value)}
                        placeholder="/contact"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-neutral-900 focus:outline-none focus:border-brand-blue shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* 2. Questions & Answers List */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                          <ListTree className="w-4 h-4 text-brand-blue" />
                          <span>Questions & Answers ({(page.faqs || []).length})</span>
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Click any question to edit its text and answer. Reorder or remove items as needed.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddFaqItem}
                        className="px-3.5 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Question</span>
                      </button>
                    </div>

                    {(!page.faqs || page.faqs.length === 0) ? (
                      <div className="p-8 rounded-xl border border-dashed border-slate-300 text-center space-y-3 bg-slate-50/50">
                        <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
                        <p className="text-xs font-semibold text-slate-600">
                          No FAQ items added to this page yet.
                        </p>
                        <button
                          type="button"
                          onClick={handleAddFaqItem}
                          className="px-4 py-2 rounded-xl bg-brand-orange text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add First Question</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {(page.faqs || []).map((faq, fIdx) => {
                          const isItemOpen = openFaqItemIdx === fIdx;
                          return (
                            <div
                              key={faq.id || fIdx}
                              className={`rounded-xl border ${
                                isItemOpen ? 'border-brand-blue/60 ring-2 ring-brand-blue/10 bg-white' : 'border-slate-200 bg-slate-50/60'
                              } overflow-hidden transition-all`}
                            >
                              {/* Item Header Bar */}
                              <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3 bg-white border-b border-slate-100">
                                <div
                                  onClick={() => setOpenFaqItemIdx(isItemOpen ? null : fIdx)}
                                  className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer select-none"
                                >
                                  <span className="w-6 h-6 rounded-lg bg-brand-blue/10 text-brand-blue font-bold text-xs flex items-center justify-center shrink-0">
                                    Q{fIdx + 1}
                                  </span>
                                  <span className="text-xs sm:text-sm font-bold text-neutral-900 truncate">
                                    {faq.question || <span className="text-slate-400 italic">Untitled Question (click to write)</span>}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                  {/* Move Up */}
                                  <button
                                    type="button"
                                    onClick={() => handleMoveFaqItem(fIdx, 'up')}
                                    disabled={fIdx === 0}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-neutral-900 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                                    title="Move up"
                                  >
                                    <ChevronUp className="w-4 h-4" />
                                  </button>

                                  {/* Move Down */}
                                  <button
                                    type="button"
                                    onClick={() => handleMoveFaqItem(fIdx, 'down')}
                                    disabled={fIdx === (page.faqs || []).length - 1}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-neutral-900 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                                    title="Move down"
                                  >
                                    <ChevronDown className="w-4 h-4" />
                                  </button>

                                  {/* Delete */}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveFaqItem(fIdx)}
                                    className="p-1.5 rounded-lg text-red-400 hover:text-red-700 hover:bg-red-50 cursor-pointer ml-1"
                                    title="Delete question"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>

                                  {/* Toggle */}
                                  <button
                                    type="button"
                                    onClick={() => setOpenFaqItemIdx(isItemOpen ? null : fIdx)}
                                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
                                  >
                                    {isItemOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                  </button>
                                </div>
                              </div>

                              {/* Item Form Inputs */}
                              {isItemOpen && (
                                <div className="p-4 sm:p-5 space-y-4 bg-white">
                                  <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                                      Question
                                    </label>
                                    <input
                                      type="text"
                                      value={faq.question}
                                      onChange={(e) => handleUpdateFaqItem(fIdx, 'question', e.target.value)}
                                      placeholder="e.g., How does the integrated model reduce risk?"
                                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-neutral-900 focus:outline-none focus:border-brand-blue bg-white shadow-2xs"
                                    />
                                  </div>

                                  <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                                      Answer Text
                                    </label>
                                    <textarea
                                      rows={3}
                                      value={faq.answer}
                                      onChange={(e) => handleUpdateFaqItem(fIdx, 'answer', e.target.value)}
                                      placeholder="Write comprehensive scientific/technical response..."
                                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-brand-blue bg-white leading-relaxed shadow-2xs"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* 3. Live WYSIWYG Interactive Preview */}
                  {page.faqs && page.faqs.length > 0 && (
                    <div className="pt-6 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-brand-blue" />
                          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            Live Accordion Preview (As it appears on the website)
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 italic">Interactive test accordion</span>
                      </div>

                      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                          {/* Left Column */}
                          <div className="lg:col-span-5 space-y-4">
                            <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white leading-tight">
                              {page.faqTitle || (page.category === 'home' ? 'Common Questions' : 'Frequently Asked Questions')}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                              {page.faqSubtitle || 'Answers to key questions regarding our biologics development platform, regulatory alignment, and facility infrastructure.'}
                            </p>
                            <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-blue pt-2">
                              <span className="w-6 h-0.5 bg-brand-yellow" />
                              <span>{page.faqButtonText || 'Still have questions? Talk to us'}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-brand-blue" />
                            </div>
                          </div>

                          {/* Right Column Accordion Items */}
                          <div className="lg:col-span-7 space-y-3">
                            {(page.faqs || []).map((faq, pIdx) => {
                              const isOpen = faqPreviewActiveIdx === pIdx;
                              return (
                                <div
                                  key={pIdx}
                                  onClick={() => setFaqPreviewActiveIdx(isOpen ? null : pIdx)}
                                  className="rounded-xl bg-slate-800/80 border border-slate-700/80 p-4 cursor-pointer hover:border-slate-600 transition-all"
                                >
                                  <div className="flex items-center justify-between gap-3">
                                    <span className="text-xs sm:text-sm font-semibold text-slate-100">
                                      {faq.question || 'Untitled Question'}
                                    </span>
                                    <div className="w-6 h-6 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm shrink-0">
                                      {isOpen ? '−' : '+'}
                                    </div>
                                  </div>
                                  {isOpen && (
                                    <div className="mt-3 pt-3 border-t border-slate-700/80 text-xs text-slate-300 leading-relaxed animate-in fade-in duration-200">
                                      {faq.answer || 'No answer provided yet.'}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

            {/* Quick Add Section Strip between Narrative/Specs/FAQs and CTA if no bottom sections exist */}
            {supportsNarrativeSections && !hasFooterNote && !hasSpecs && !hasFaqs && (
              <div className="py-2 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setIsLayoutModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-brand-blue/10 hover:border-brand-blue/30 border border-dashed border-slate-300 text-slate-600 hover:text-brand-blue text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Section (Callout, Specs Table, FAQs, or Layouts)</span>
                </button>
              </div>
            )}

            {/* =========================================================================
                SECTION 11: FOOTER CONVERSION CTA BANNER (COMMONCTA)
               ========================================================================= */}
            <div className="mt-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
              <div
                onClick={() => setIsCtaCardOpen(!isCtaCardOpen)}
                className="p-5 sm:p-6 flex items-center justify-between gap-4 bg-gradient-to-r from-slate-50 via-orange-50/20 to-slate-50 border-b border-slate-200 cursor-pointer hover:bg-slate-100/80 transition-colors select-none"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-orange text-white shadow-2xs">
                        Section {ctaSecNum} • Footer Banner
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
                        Conversion CTA
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 truncate">
                      {ctaSecNum}. Footer Conversion CTA Banner (CommonCTA)
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-slate-500 hidden sm:inline">
                    {isCtaCardOpen ? 'Click to collapse' : 'Click to edit CTA'}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-2xs">
                    {isCtaCardOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {isCtaCardOpen && (
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-200/80 text-xs text-slate-700 flex items-start gap-3">
                    <Rocket className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">Global Page Conversion CTA: </span>
                      Renders as the final full-width section at the bottom of every page directly above the website footer. Features cinematic background video, high-impact headline, subtext, and dual contact/tour buttons.
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-xl bg-slate-50/80 border border-slate-200/80">
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        CTA Headline Title
                      </label>
                      <input
                        type="text"
                        value={page.ctaTitle || ''}
                        onChange={(e) => handleUpdateCTA('ctaTitle', e.target.value)}
                        placeholder="Let's Advance Your Next Biologics Program"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-neutral-900"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        CTA Subtitle / Value Proposition
                      </label>
                      <textarea
                        rows={3}
                        value={page.ctaSubtitle || ''}
                        onChange={(e) => handleUpdateCTA('ctaSubtitle', e.target.value)}
                        placeholder="Whether you're developing an innovator biologic, biosimilar, or next-generation therapeutic, our team is ready to discuss your development and manufacturing requirements."
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm leading-relaxed"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <MousePointerClick className="w-3.5 h-3.5 text-brand-orange" />
                        <span>Primary CTA Button (Text & Link)</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={page.primaryCta?.text || ''}
                          onChange={(e) => handleUpdateCTA('primaryText', e.target.value)}
                          placeholder="Get in touch"
                          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                        <input
                          type="text"
                          value={page.primaryCta?.link || page.primaryCta?.href || ''}
                          onChange={(e) => handleUpdateCTA('primaryLink', e.target.value)}
                          placeholder="/contact"
                          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <MousePointerClick className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Secondary CTA Button (Text & Link)</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={page.secondaryCta?.text || ''}
                          onChange={(e) => handleUpdateCTA('secondaryText', e.target.value)}
                          placeholder="Virtual Tour"
                          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                        <input
                          type="text"
                          value={page.secondaryCta?.link || page.secondaryCta?.href || ''}
                          onChange={(e) => handleUpdateCTA('secondaryLink', e.target.value)}
                          placeholder="/virtual-tour/00%20MAIN%20BUILDING/index.htm"
                          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Live Preview */}
                  <div className="pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                      Footer CTA Live Visual Preview
                    </span>
                    <div className="relative rounded-2xl overflow-hidden bg-brand-navy p-8 sm:p-12 text-white text-center border border-slate-700 shadow-md">
                      <video
                        src="/videos/Floating-Molecule-Video.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-brand-navy/60 pointer-events-none" />
                      <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-light text-white leading-tight">
                          {page.ctaTitle || "Let's Advance Your Next Biologics Program"}
                        </h2>
                        <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto leading-relaxed">
                          {page.ctaSubtitle || "Whether you're developing an innovator biologic, biosimilar, or next-generation therapeutic, our team is ready to discuss your development and manufacturing requirements."}
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                          <span className="px-6 py-2.5 rounded-[10px] bg-brand-yellow text-black font-semibold text-xs uppercase tracking-wider shadow-md">
                            {page.primaryCta?.text || "Get in touch"}
                          </span>
                          <span className="px-6 py-2.5 rounded-[10px] border border-white/40 text-white font-semibold text-xs uppercase tracking-wider">
                            {page.secondaryCta?.text || "Virtual Tour"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: HERO SECTION & LIVE WYSIWYG CANVAS
           ========================================================================= */}
        {activeTab === 'hero' && (() => {
          const isHomePage =
            page.slug === 'home' || (page.category === 'home' && (!page.slug || page.slug === 'home'));

          if (isHomePage) {
            return (
              <div className="space-y-8">
                {/* Header info */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-brand-orange" />
                      <span>Hero Section Live Visual Canvas (Home Page Video Banner)</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Direct in-place visual layout with playable background video, heading, subtitle, paragraph, and dual CTA action buttons.
                    </p>
                  </div>
                </div>

                {/* LIVE HERO VISUAL CANVAS (HOME VIDEO) */}
                <div className="relative w-full rounded-[14px] overflow-hidden border border-slate-700 bg-brand-navy min-h-[480px] lg:min-h-[520px] shadow-2xl flex flex-col justify-between p-8 sm:p-12 lg:p-14 text-white">
                  {/* Background Video Confined in Container */}
                  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <video
                      key={page.heroVideo || page.image || '/videos/newhero.mp4'}
                      src={page.heroVideo || page.image || '/videos/newhero.mp4'}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover object-[75%_center] sm:object-center opacity-85"
                    />
                    {/* Dark gradient scrim on left for high contrast readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 sm:via-brand-navy/70 to-transparent pointer-events-none" />
                  </div>

                  {/* In-Place Editable Content Overlay */}
                  <div className="relative z-10 max-w-2xl space-y-4">
                    {/* Hero Badge Tag */}
                    <div className="inline-flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-brand-orange" />
                      <input
                        type="text"
                        value={page.badge || 'INTEGRATED BIOLOGICS CDMO'}
                        onChange={(e) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, badge: e.target.value }))}
                        placeholder="HERO BADGE TAG"
                        className="text-[11px] font-bold uppercase tracking-widest text-brand-orange bg-black/40 border border-brand-orange/40 rounded-md px-2.5 py-1 focus:outline-none focus:border-brand-blue backdrop-blur-xs w-64"
                      />
                    </div>

                    {/* Hero Main Heading (h1) */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1">
                        Hero Main Heading
                      </label>
                      <textarea
                        rows={2}
                        value={page.heading || 'Biologics Development and Manufacturing.'}
                        onChange={(e) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, heading: e.target.value }))}
                        placeholder="Hero Main Heading..."
                        className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white leading-tight w-full bg-black/30 border border-white/20 focus:border-brand-blue rounded-xl p-3 focus:outline-none backdrop-blur-xs shadow-inner"
                      />
                    </div>

                    {/* Hero Subtitle (h2) */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1">
                        Hero Subtitle
                      </label>
                      <input
                        type="text"
                        value={page.subtitle || 'Integrated from Cell Line Engineering to Clinical Supplies.'}
                        onChange={(e) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, subtitle: e.target.value }))}
                        placeholder="Hero Subtitle..."
                        className="text-lg sm:text-xl font-light text-white/95 w-full bg-black/30 border border-white/20 focus:border-brand-blue rounded-xl p-2.5 focus:outline-none backdrop-blur-xs"
                      />
                    </div>

                    {/* Hero Paragraph Description */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1">
                        Hero Description Paragraph
                      </label>
                      <textarea
                        rows={3}
                        value={page.description || ''}
                        onChange={(e) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, description: e.target.value }))}
                        placeholder="Supporting biopharmaceutical companies with..."
                        className="text-xs sm:text-sm text-neutral-100 font-normal leading-relaxed w-full bg-black/30 border border-white/20 focus:border-brand-blue rounded-xl p-3 focus:outline-none backdrop-blur-xs"
                      />
                    </div>

                    {/* Hero Action Buttons (Primary & Secondary CTA) */}
                    <div className="pt-3 space-y-2">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50">
                        Action Buttons (Primary & Secondary CTA)
                      </label>
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Primary Button Container */}
                        <div className="p-2 rounded-xl bg-brand-orange border border-brand-orange shadow-md flex items-center gap-2">
                          <input
                            type="text"
                            value={page.heroPrimaryCtaText || page.primaryCta?.text || 'GET IN TOUCH'}
                            onChange={(e) => setPage((prev) => ({
                              ...prev,
                              hasUnpublishedChanges: true,
                              heroPrimaryCtaText: e.target.value,
                              primaryCta: { text: e.target.value, link: prev.heroPrimaryCtaLink || prev.primaryCta?.link || '/contact' }
                            }))}
                            placeholder="GET IN TOUCH"
                            className="text-xs font-bold text-black uppercase bg-white/90 rounded px-2 py-1 w-28 text-center"
                          />
                          <input
                            type="text"
                            value={page.heroPrimaryCtaLink || page.primaryCta?.link || '/contact'}
                            onChange={(e) => setPage((prev) => ({
                              ...prev,
                              hasUnpublishedChanges: true,
                              heroPrimaryCtaLink: e.target.value,
                              primaryCta: { text: prev.heroPrimaryCtaText || prev.primaryCta?.text || 'GET IN TOUCH', link: e.target.value }
                            }))}
                            placeholder="/contact"
                            className="text-xs font-mono text-black bg-white/90 rounded px-2 py-1 w-24"
                          />
                          <ChevronRight className="w-4 h-4 text-black shrink-0" />
                        </div>

                        {/* Secondary Button Container */}
                        <div className="p-2 rounded-xl bg-white/10 border border-white/40 backdrop-blur-md shadow-md flex items-center gap-2">
                          <input
                            type="text"
                            value={page.heroSecondaryCtaText || page.secondaryCta?.text || 'EXPLORE SERVICES'}
                            onChange={(e) => setPage((prev) => ({
                              ...prev,
                              hasUnpublishedChanges: true,
                              heroSecondaryCtaText: e.target.value,
                              secondaryCta: { text: e.target.value, link: prev.heroSecondaryCtaLink || prev.secondaryCta?.link || '/services' }
                            }))}
                            placeholder="EXPLORE SERVICES"
                            className="text-xs font-bold text-white uppercase bg-black/40 rounded px-2 py-1 w-36 text-center"
                          />
                          <input
                            type="text"
                            value={page.heroSecondaryCtaLink || page.secondaryCta?.link || '/services'}
                            onChange={(e) => setPage((prev) => ({
                              ...prev,
                              hasUnpublishedChanges: true,
                              heroSecondaryCtaLink: e.target.value,
                              secondaryCta: { text: prev.heroSecondaryCtaText || prev.secondaryCta?.text || 'EXPLORE SERVICES', link: e.target.value }
                            }))}
                            placeholder="/services"
                            className="text-xs font-mono text-white bg-black/40 rounded px-2 py-1 w-24"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hero Media Selector */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
                  <h4 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                    <Video className="w-4.5 h-4.5 text-brand-orange" />
                    <span>Hero Background Video & Media Configuration</span>
                  </h4>

                  <MediaControlWithPreview
                    label="Hero Background Media (Playable Video or Image)"
                    mediaUrl={page.heroVideo || page.image || '/videos/newhero.mp4'}
                    mediaType={page.heroMediaType || 'video'}
                    onChangeUrl={(url) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, heroVideo: url, image: url }))}
                    onChangeMediaType={(type) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, heroMediaType: type }))}
                    onOpenPresetGallery={() => {
                      setGalleryTargetCallback(() => (url: string, type?: 'image' | 'video') => {
                        setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, heroVideo: url, image: url, heroMediaType: type || (isVideoUrl(url) ? 'video' : 'image') }));
                      });
                      setIsGalleryModalOpen(true);
                    }}
                    onUploadFile={(file) => {
                      handleFileUpload(file, (url, isVideo) => {
                        setPage((prev) => ({
                          ...prev,
                          hasUnpublishedChanges: true,
                          heroVideo: url,
                          image: url,
                          heroMediaType: isVideo ? 'video' : 'image'
                        }));
                      });
                    }}
                    uploading={uploading}
                    aspectRatioClass="aspect-[21/9]"
                    helperText="Videos (.mp4) autoplay seamlessly in the background with ambient bioprocess motion."
                  />
                </div>
              </div>
            );
          }

          // Editorial 50/50 Light Hero Canvas (About, Facility, Modalities & Other Inner Pages - Matching Image 1)
          const carouselSlides =
            (page.images && page.images.length > 0)
              ? page.images
              : (page.slug?.toLowerCase() === 'india' || page.title?.toLowerCase().includes('ahmedabad'))
              ? [
                  '/images/Screenshot 2026-09-11 131810.png',
                  '/images/Screenshot 2026-09-11 131847.png',
                  '/images/Screenshot 2026-09-11 132133.png',
                  '/images/Screenshot 2026-09-11 132304.png',
                  '/images/Screenshot 2026-09-11 132325.png',
                  '/images/Screenshot 2026-09-11 132518.png',
                  '/images/Screenshot 2026-09-11 131721.png',
                ]
              : (page.slug?.toLowerCase() === 'uk' || page.slug?.toLowerCase() === 'london' || page.title?.toLowerCase().includes('london'))
              ? [
                  '/images/uk/Screenshot 2026-09-26 173413.png',
                  '/images/uk/Screenshot 2026-09-26 173649.png',
                  '/images/uk/Screenshot 2026-09-26 173425.png',
                  '/images/uk/Screenshot 2026-09-26 173433.png',
                  '/images/uk/Screenshot 2026-09-26 173453.png',
                  '/images/uk/Screenshot 2026-09-26 173506.png',
                  '/images/uk/Screenshot 2026-09-26 173524.png',
                  '/images/uk/Screenshot 2026-09-26 173552.png',
                  '/images/uk/Screenshot 2026-09-26 173605.png',
                  '/images/uk/Screenshot 2026-09-26 173622.png',
                ]
              : (page.image ? [page.image] : ['/images/about/about-hero-1.png', '/images/about/about-hero-2.png', '/images/about/about-hero-3.png', '/images/about/about-hero-4.png']);

          const currentSlide = heroPreviewSlideIdx % carouselSlides.length;
          const activeSlideUrl = carouselSlides[currentSlide] || carouselSlides[0];

          return (
            <div className="space-y-8">
              {/* Header info */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-orange" />
                    <span>Hero Section Live Visual Canvas (50/50 Editorial Layout)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Direct in-place visual layout with editable badge, title, narrative description, and interactive multi-photo carousel preview.
                  </p>
                </div>
              </div>

              {/* LIVE HERO VISUAL CANVAS (50/50 SPLIT) */}
              <div className="relative w-full rounded-[14px] overflow-hidden border border-slate-200/90 bg-white min-h-[440px] shadow-sm p-6 sm:p-8 lg:p-10 text-neutral-900">
                {/* Subtle grid pattern background */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:32px_32px]" />
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  {/* Left Column (6 cols): Badge, Title, Description */}
                  <div className="lg:col-span-6 space-y-4">
                    {/* Hero Badge Tag */}
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-orange text-white shadow-xs">
                        <Tag className="w-3 h-3 text-white" />
                        <input
                          type="text"
                          value={page.badge || ''}
                          onChange={(e) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, badge: e.target.value }))}
                          placeholder="PAGE BADGE"
                          className="text-[11px] font-bold uppercase tracking-wider text-white bg-transparent border-none focus:outline-none focus:ring-0 p-0 w-44 placeholder:text-white/60"
                        />
                      </div>
                    </div>

                    {/* Hero Main Heading (h1) */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Hero Main Heading (H1)
                      </label>
                      <textarea
                        rows={3}
                        value={page.heading || page.title || ''}
                        onChange={(e) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, heading: e.target.value }))}
                        placeholder="Hero Main Heading (H1)..."
                        className="text-2xl sm:text-3xl lg:text-4xl font-normal text-neutral-900 leading-tight w-full bg-slate-50/70 border border-slate-200 focus:border-brand-blue rounded-xl p-3 focus:outline-none focus:bg-white shadow-2xs"
                      />
                    </div>

                    {/* Hero Description Paragraph */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Hero Description Paragraph
                      </label>
                      <textarea
                        rows={4}
                        value={page.description || ''}
                        onChange={(e) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, description: e.target.value }))}
                        placeholder="Hero description paragraph..."
                        className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed w-full bg-slate-50/70 border border-slate-200 focus:border-brand-blue rounded-xl p-3 focus:outline-none focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Right Column (6 cols): Multi-Photo Carousel Live Preview matching Image 1 */}
                  <div className="lg:col-span-6 flex flex-col items-center">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-lg group">
                      {/* Current Slide Image */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={activeSlideUrl}
                        alt="Hero Slide"
                        className="w-full h-full object-cover transition-all duration-500"
                      />

                      {/* Slide Counter Pill Badge (Top Right matching Image 1 e.g. 2/4) */}
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full z-10 border border-white/20 shadow-xs">
                        {currentSlide + 1}/{carouselSlides.length}
                      </div>

                      {/* Navigation Arrow Left */}
                      <button
                        type="button"
                        onClick={() => setHeroPreviewSlideIdx((prev) => (prev > 0 ? prev - 1 : carouselSlides.length - 1))}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 z-10"
                        title="Previous Slide"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      {/* Navigation Arrow Right */}
                      <button
                        type="button"
                        onClick={() => setHeroPreviewSlideIdx((prev) => (prev + 1) % carouselSlides.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 z-10"
                        title="Next Slide"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Pagination Dots at Bottom Center (Active is Orange Pill) */}
                      <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 z-10">
                        {carouselSlides.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            type="button"
                            onClick={() => setHeroPreviewSlideIdx(dotIdx)}
                            className={`transition-all duration-300 rounded-full cursor-pointer ${
                              dotIdx === currentSlide
                                ? 'w-6 h-2 bg-brand-orange shadow-xs'
                                : 'w-2 h-2 bg-white/70 hover:bg-white'
                            }`}
                            title={`Go to slide ${dotIdx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Multi-Photo Hero Carousel Manager */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
                <PhotoCarouselManager
                  label="Hero Multi-Photo Carousel Slides (Add, Reorder, Replace)"
                  images={page.images && page.images.length > 0 ? page.images : carouselSlides}
                  onChangeImages={(imgs) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, images: imgs }))}
                  onOpenPresetGallery={() => {
                    setGalleryTargetCallback(() => (url: string) => {
                      const currentImgs = (page.images && page.images.length > 0) ? page.images : carouselSlides;
                      setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, images: [...currentImgs, url] }));
                    });
                    setIsGalleryModalOpen(true);
                  }}
                  onUploadMultipleFiles={async (files) => {
                    await handleMultipleFilesUpload(files, (urls) => {
                      const currentImgs = (page.images && page.images.length > 0) ? page.images : carouselSlides;
                      setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, images: [...currentImgs, ...urls] }));
                    });
                  }}
                  uploading={uploading}
                />
              </div>
            </div>
          );
        })()}

        {/* TAB 3: PAGE SETTINGS & SEO */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Page Routing & SEO Meta Details
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure browser title, URL routing slug, search engine meta descriptions, and base template layout.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Page Title (Browser Tab) *
                </label>
                <input
                  type="text"
                  value={page.title || ''}
                  onChange={(e) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, title: e.target.value }))}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-neutral-900 focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Meta Title (SEO)
                </label>
                <input
                  type="text"
                  value={page.metaTitle || ''}
                  onChange={(e) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, metaTitle: e.target.value }))}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Category Slug
                </label>
                <input
                  type="text"
                  value={page.category || ''}
                  onChange={(e) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, category: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-mono text-neutral-900 focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={page.slug || ''}
                  onChange={(e) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-mono text-neutral-900 focus:outline-none focus:border-brand-blue"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={page.metaDesc || ''}
                onChange={(e) => setPage((prev) => ({ ...prev, hasUnpublishedChanges: true, metaDesc: e.target.value }))}
                placeholder="Summary for Google and search engines..."
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-brand-blue"
              />
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-brand-blue font-semibold">
                <Globe className="w-4 h-4" />
                <span>Public Web Address: {liveUrl}</span>
              </div>
              <Link
                href={liveUrl}
                target="_blank"
                className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1"
              >
                <span>Open Live Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* TAB 4: PUBLISH & LIVE REVIEW */}
        {activeTab === 'publish' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Status Overview Banner */}
            <div
              className={`p-6 rounded-2xl border ${
                isDraftOnly
                  ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                  : hasUnpublished
                  ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                  : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl shrink-0 ${
                    isDraftOnly
                      ? 'bg-amber-200/70 text-amber-800'
                      : hasUnpublished
                      ? 'bg-amber-200/70 text-amber-800'
                      : 'bg-emerald-200/70 text-emerald-800'
                  }`}
                >
                  {isDraftOnly ? (
                    <Clock className="w-6 h-6" />
                  ) : hasUnpublished ? (
                    <AlertCircle className="w-6 h-6" />
                  ) : (
                    <CheckCircle2 className="w-6 h-6" />
                  )}
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/5">
                      Status
                    </span>
                    <h3 className="text-lg font-bold">
                      {isDraftOnly
                        ? 'Draft Only (Unpublished)'
                        : hasUnpublished
                        ? 'Unpublished Draft Changes Pending'
                        : 'Live & Published (Up-to-Date)'}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {isDraftOnly
                      ? 'This page has not been published to the live website yet. Visitors who navigate to this URL will not see this page until you click "Publish to Live".'
                      : hasUnpublished
                      ? 'You have saved draft changes that have NOT yet been published to the live website. Public visitors continue to see the previously published version until you click "Publish to Live".'
                      : 'The public website is currently displaying the latest version of this page. Any future edits saved as draft will not affect the live site until you publish again.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Actions Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-brand-orange" />
                  <span>Publishing Controls</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Manage publication lifecycle, preview drafts before going live, or discard draft changes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Big Publish Button */}
                <button
                  type="button"
                  onClick={handlePublishToLive}
                  disabled={publishing || savingDraft}
                  className="p-4 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-left shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group disabled:opacity-50"
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-md">
                      Go Live
                    </span>
                    <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold">Publish Draft to Live Website</h4>
                    <p className="text-xs text-white/85 mt-1">
                      Immediately push all working draft edits to the live public website.
                    </p>
                  </div>
                </button>

                {/* Save Draft Button */}
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={savingDraft || publishing}
                  className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/70 hover:bg-slate-100 text-slate-800 text-left transition-all cursor-pointer flex flex-col justify-between group disabled:opacity-50"
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider bg-slate-200 px-2.5 py-1 rounded-md text-slate-700">
                      Draft
                    </span>
                    <Save className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-neutral-900">Save Draft Only</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Save your edits to continue working later without changing what visitors see.
                    </p>
                  </div>
                </button>
              </div>

              {/* Secondary Actions & Revert */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRevertDraft}
                    disabled={!hasUnpublished || reverting}
                    className="px-4 py-2 rounded-xl border border-red-200 bg-red-50/50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Discard unpublished draft changes"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Discard Draft & Revert to Live</span>
                  </button>

                  {page.isPublished !== false && page.slug !== 'home' && (
                    <button
                      type="button"
                      onClick={handleUnpublishPage}
                      className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                      title="Unpublish this page from the live site"
                    >
                      <ShieldAlert className="w-3.5 h-3.5 text-slate-500" />
                      <span>Unpublish (Take Offline)</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePreviewDraft}
                    disabled={savingDraft || publishing}
                    className="px-4 py-2 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-700" />
                    <span>Preview Draft in New Tab</span>
                  </button>
                  <Link
                    href={liveUrl}
                    target="_blank"
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Open Live Page</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Timestamps Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Draft Saved Timestamp</span>
                </span>
                <p className="text-sm font-bold text-neutral-900">
                  {page.lastSavedAt
                    ? new Date(page.lastSavedAt).toLocaleString()
                    : 'Not saved in this session'}
                </p>
                <p className="text-xs text-slate-500">
                  {hasUnpublished
                    ? 'Contains unsaved or unpublished draft changes.'
                    : 'Draft is in sync with published version.'}
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-brand-blue" />
                  <span>Live Published Timestamp</span>
                </span>
                <p className="text-sm font-bold text-neutral-900">
                  {page.lastPublishedAt
                    ? new Date(page.lastPublishedAt).toLocaleString()
                    : page.isPublished !== false
                    ? 'Default Production Build'
                    : 'Never Published'}
                </p>
                <p className="text-xs text-slate-500">
                  {page.isPublished !== false
                    ? 'Visible to all visitors at the live URL.'
                    : 'Page is currently offline.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 2. SECTION LAYOUT GALLERY MODAL */}
      <SectionLayoutGalleryModal
        isOpen={isLayoutModalOpen}
        onClose={() => setIsLayoutModalOpen(false)}
        onSelectLayout={handleAddSectionFromLayout}
        activeSectionIds={activeSpecializedLayoutIds}
      />

      {/* 3. ENHANCED PRESET MEDIA GALLERY MODAL (WITH CATEGORIZED TABS & PLAYABLE VIDEOS) */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 flex flex-col max-h-[88vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-brand-orange" />
                  <span>Media Presets & Cleanroom Footage Library</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select from pre-configured scientific cleanroom photos and cinematic background videos.
                </p>
              </div>
              <button
                onClick={() => setIsGalleryModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-neutral-900 hover:bg-slate-100 text-sm font-bold cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs & Search */}
            <div className="py-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {[
                  { id: 'all', label: 'All Media' },
                  { id: 'videos', label: '🎬 Videos (Playable)' },
                  { id: 'gmp', label: '🏭 GMP Cleanroom & Mfg' },
                  { id: 'cleanroom', label: '🏢 Facilities' },
                  { id: 'upstream', label: '🧬 Upstream' },
                  { id: 'downstream', label: '🧪 Downstream' },
                  { id: 'analytical', label: '📊 Analytical' },
                  { id: 'modalities', label: '💊 Modalities' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setGallerySelectedCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      gallerySelectedCategory === tab.id
                        ? 'bg-brand-navy text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-neutral-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={gallerySearchFilter}
                onChange={(e) => setGallerySearchFilter(e.target.value)}
                placeholder="Search media..."
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-neutral-900 focus:outline-none focus:border-brand-blue min-w-[200px]"
              />
            </div>

            {/* Media Items Grid with Playable Video Previews */}
            <div className="p-2 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
              {filteredPresets.map((item, i) => {
                const isVideo = item.type === 'video' || isVideoUrl(item.url);

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      if (galleryTargetCallback) {
                        galleryTargetCallback(item.url, item.type);
                      }
                      setIsGalleryModalOpen(false);
                    }}
                    className="group p-2 rounded-xl border border-slate-200 hover:border-brand-orange hover:bg-orange-50/40 text-left transition-all cursor-pointer flex flex-col justify-between relative bg-white shadow-2xs hover:shadow-md"
                  >
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-950 mb-2 relative w-full">
                      {isVideo ? (
                        <>
                          <video
                            src={item.url}
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                            onMouseLeave={(e) => {
                              e.currentTarget.pause();
                              e.currentTarget.currentTime = 0;
                            }}
                          />
                          <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs text-[9px] font-bold text-emerald-400 flex items-center gap-1 border border-emerald-500/30">
                            <Play className="w-2 h-2 fill-current" />
                            <span>Video</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <img
                            src={item.url}
                            alt={item.label}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs text-[9px] font-bold text-sky-300 flex items-center gap-1 border border-sky-500/30">
                            <ImageIcon className="w-2 h-2" />
                            <span>Image</span>
                          </div>
                        </>
                      )}

                      {item.badge && (
                        <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-slate-900/80 backdrop-blur-xs text-[9px] font-bold text-white">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-neutral-900 line-clamp-1 group-hover:text-brand-orange transition-colors">
                        {item.label}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 truncate block mt-0.5">
                        {item.url}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 mt-2">
              <span>{filteredPresets.length} media items found</span>
              <button
                type="button"
                onClick={() => setIsGalleryModalOpen(false)}
                className="px-4 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 font-semibold text-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
