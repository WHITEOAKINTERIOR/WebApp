'use client';

import { Box } from 'lucide-react';
import Link from 'next/link';

interface VisualizationButtonProps {
  isNearBottom?: boolean;
}

export function VisualizationButton({ isNearBottom = false }: VisualizationButtonProps) {
  return (
    <Link
      href="/3d-visualization"
      className={`group relative bg-gradient-to-r from-primary to-amber-700 hover:from-amber-800 hover:to-amber-900 text-white rounded-r-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-3 justify-start ${
        isNearBottom 
          ? 'px-3 py-2 min-w-[48px] mt-2' 
          : 'px-6 py-4 min-w-[220px] mt-4'
      }`}
      aria-label="View 3D Visualization"
    >
      <Box className={`flex-shrink-0 ${
        isNearBottom ? 'w-5 h-5' : 'w-6 h-6'
      }`} />
      {!isNearBottom && (
        <>
          <div className="flex flex-col items-start">
            <span className="text-sm">Free 3D</span>
            <span className="text-sm">Visualization</span>
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full"></div>
        </>
      )}
      <div className="absolute inset-0 rounded-r-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      
      {/* Animated border effect */}
      {/* <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-amber-600 to-amber-800 rounded-r-full animate-pulse"></div> */}
    </Link>
  );
}
