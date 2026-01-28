'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageHero } from '@/components/shared/page-hero';
import { PropertySelectorForm } from '@/components/property-selector-form';
import { Calculator, Sparkles } from 'lucide-react';

export default function CostEstimation() {
  const [submitted, setSubmitted] = useState(false);

  const handleSuccess = () => {
    setSubmitted(true);
  };

 

  return (
    <div className="min-h-screen">
      <PageHero
        title={"Free Cost Estimation"}
        description={"Get a detailed cost breakdown for your interior design project. No hidden charges, complete transparency."}
      />
      <div className="bg-gradient-to-br from-purple-50 to-primary/20 py-12 px-4">
        <div className="max-w-4xl mx-auto">
            {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-primary rounded-full mb-6">
              <Calculator className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Free Cost Estimation
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get a detailed cost breakdown for your interior design project. No hidden charges, complete transparency.
            </p>
          </div>
          <PropertySelectorForm 
            onSuccess={handleSuccess}
          />

          {/* Features */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Transparent Pricing</h3>
              <p className="text-gray-600 text-sm">No hidden charges, complete cost breakdown</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Quick Response</h3>
              <p className="text-gray-600 text-sm">Get your estimation within 24 hours</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Expert Consultation</h3>
              <p className="text-gray-600 text-sm">Professional guidance from experienced designers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
