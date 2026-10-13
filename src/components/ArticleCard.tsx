'use client';

import Link from 'next/link';
import { Article } from '@/data/articles';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link 
      href={`/insights/blogs/${article.slug}`}
      className="group block w-full select-none"
    >
     <div className="relative overflow-hidden rounded-[10px] border border-neutral-200 bg-neutral-100 aspect-[16/10] shadow-sm hover:shadow-md transition-all duration-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
        />
      </div>
      
     <div className="mt-4 px-1">
        {/* Meta Info */}
       <div className="text-[10px] md:text-xs tracking-widest font-semibold uppercase flex items-center gap-1.5 mb-1.5">
         <span className="text-brand-blue">{article.category}</span>
         <span className="text-neutral-300">•</span>
         <span className="text-neutral-400">{article.readingTime}</span>
        </div>
        
        {/* Title */}
       <h3 className="text-base sm:text-lg md:text-xl font-serif font-medium text-neutral-900 leading-snug group-hover:opacity-80 transition-opacity">
          {article.title}
        </h3>
        
        {/* Brief description */}
       <p className="text-xs sm:text-sm text-muted mt-1.5 line-clamp-2 leading-relaxed">
          {article.subtitle}
        </p>
      </div>
    </Link>
  );
}
