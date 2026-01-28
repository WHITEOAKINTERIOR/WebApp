'use client';

import { useState } from 'react';
import { Box, Play, Pause, RotateCw, Maximize2, Eye, Move3D, Sparkles, ArrowLeft, Sofa, BedDouble, Utensils, Bath, Home } from 'lucide-react';
import Link from 'next/link';
import { PageHero } from '@/components/shared/page-hero';
import { PropertySelectorForm } from '@/components/property-selector-form';

export default function ThreeDVisualization() {
  const [selectedRoom, setSelectedRoom] = useState('living');
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');

  const rooms = [
    { id: 'living', name: 'Living Room', icon: Sofa },
    { id: 'bedroom', name: 'Master Bedroom', icon: BedDouble },
    { id: 'kitchen', name: 'Kitchen', icon: Utensils },
    { id: 'bathroom', name: 'Bathroom', icon: Bath },
    { id: 'dining', name: 'Dining Room', icon: Home },
  ];

  return (
    <div className="min-h-screen">
      <PageHero
        title={"Free 3D Visualization"}
        description={"Experience your dream interior design in stunning 3D. Visualize every detail before we begin."}
      />

     <div className="bg-gradient-to-br from-purple-50 to-primary/20 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Interactive 3D Room Visualization
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our stunning 3D visualizations and get a personalized cost estimation for your dream space
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-8">
            {/* Cost Estimation Form */}
            <div className="lg:col-span-2">
              <PropertySelectorForm buttonText='Get 3D Visualization' />
            </div>
          </div>         
        </div>
      </div>
    </div>
  );
} 
