'use client';

import { Calculator, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface CostEstimationButtonProps {
  isNearBottom?: boolean;
}

export function CostEstimationButton({ isNearBottom = false }: CostEstimationButtonProps) {
  return (
    <Link
      href="/cost-estimation"
      className={`group relative bg-gradient-to-r from-purple-600 to-primary hover:from-purple-700 hover:to-[#7a7962] text-white rounded-r-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-4 justify-start ${
        isNearBottom 
          ? 'px-3 py-2' 
          : 'px-4 py-2 md:px-6 md:py-4'
      }`}
      aria-label="Get Free Cost Estimation"
    >
      <Calculator className={`flex-shrink-0 ${
        isNearBottom ? 'w-5 h-5' : 'w-6 h-6'
      }`} />
      {!isNearBottom && (
        <>
          <div className="flex flex-col items-start">
            <span className="text-sm">Free Cost</span>
            <span className="text-sm">Estimation</span>
          </div>
          <Sparkles className="w-6 h-6 animate-pulse ml-auto" />
        </>
      )}
      <div className="absolute inset-0 rounded-r-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      
      {/* Animated border effect */}
      {/* <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-purple-400 to-primary rounded-r-full animate-pulse"></div> */}
    </Link>
  );
}
