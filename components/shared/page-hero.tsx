// components/shared/page-hero.tsx
'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  overlayOpacity?: number;
  height?: 'small' | 'medium' | 'large' | 'xlarge';
  textAlign?: 'left' | 'center' | 'right';
  children?: ReactNode;
  className?: string;
}

const heightClasses = {
  small: 'h-[30vh] md:h-[50vh]',
  medium: 'h-[50vh] md:h-[60vh]',
  large: 'h-[60vh] md:h-[70vh]',
  xlarge: 'h-[70vh] md:h-[80vh]',
};

export function PageHero({
  title,
  subtitle,
  description,
  backgroundImage = '/images/hero-default.jpg',
  overlayOpacity = 0.6,
  height = 'small',
  textAlign = 'left',
  children,
  className = '',
}: PageHeroProps) {
  return (
    <section className={`relative flex items-center ${heightClasses[height]} ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div 
          className="absolute inset-0 bg-black" 
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className={`container mx-auto px-4 pt-16 text-white/90 ${getTextAlignmentClass(textAlign)}`}>
        {subtitle && (
          <p className="text-lg md:text-xl font-medium mb-2 md:mb-4">
            {subtitle}
          </p>
        )}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl max-w-3xl">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

function getTextAlignmentClass(align: string) {
  switch (align) {
    case 'left':
      return 'text-left';
    case 'right':
      return 'text-right';
    case 'center':
    default:
      return 'text-center';
  }
}