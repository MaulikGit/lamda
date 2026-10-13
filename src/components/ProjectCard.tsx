'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link 
      href={`/${project.slug}`}
      className="group block w-full select-none"
     data-cursor="project"
    >
     <div className="relative overflow-hidden rounded-[10px] border border-neutral-200 bg-neutral-100 aspect-[4/3] transition-all duration-500 shadow-sm hover:shadow-md">
        {/* Project Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103 group-hover:filter group-hover:brightness-95"
        />
        
        {/* Category Pill Overlay (Subtle) */}
       <div className="absolute top-4 left-4 z-10">
         <span className="inline-block px-3 py-1 text-[10px] tracking-widest font-semibold uppercase rounded-full bg-white/90 backdrop-blur-sm text-neutral-800 shadow-sm border border-white/20">
            {project.category}
          </span>
        </div>
      </div>
      
      {/* Text Info */}
     <div className="mt-4 flex items-center justify-between px-1">
        <div>
         <h3 className="text-lg md:text-xl font-serif font-medium text-neutral-900 group-hover:text-brand-yellow transition-colors">
            {project.title}
          </h3>
         <p className="text-xs md:text-sm text-muted mt-1 font-normal line-clamp-1 max-w-[90%]">
            {project.description}
          </p>
        </div>
        
        {/* Animated Arrow Icon */}
       <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-800 shadow-sm transition-all duration-300 group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:text-white group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
         <ArrowUpRight className="w-4 h-4 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
