'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { CostEstimationButton } from './cost-estimation-button';
import { VisualizationButton } from './visualization-button';

export function SideButtons() {
  const [isNearBottom, setIsNearBottom] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      
      // When within 200px of bottom, reduce button size
      setIsNearBottom(distanceFromBottom < 200);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCostEstimationPage = pathname === '/cost-estimation';
  const isVisualizationPage = pathname === '/3d-visualization';

  return (
    <div className={`fixed left-0 z-50 flex flex-col items-start gap-2 transition-all duration-300 ${
      isNearBottom ? 'bottom-4' : 'bottom-4'
    }`}>
      {!isCostEstimationPage && <CostEstimationButton isNearBottom={isNearBottom} />}
      {!isVisualizationPage && <VisualizationButton isNearBottom={isNearBottom} />}
    </div>
  );
}
