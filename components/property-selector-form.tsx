'use client';

import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { EnquiryForm } from '@/components/enquiry-form';

interface PropertySelectorFormProps {
  onSuccess?: () => void;
  buttonText?: string;
}

export function PropertySelectorForm({ 
  onSuccess, 
  buttonText = "Get Free Cost Estimation",
  }: PropertySelectorFormProps) {
  const [formData, setFormData] = useState({
    propertyType: 'apartment',
    rooms: '2bhk',
    style: 'modern',
    selectedAreas: {
      kitchen: true,
      'master-bedroom': true,
      'living-room': true,
      'dining-area': true,
      'common-washroom': true,
      balcony: true
    }
  });

  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  const updateAreasForBHK = (bhkType: string) => {
    const areaConfigs = {
      '1bhk': {
        kitchen: true,
        'master-bedroom': true,
        'living-room': true,
        'dining-area': true,
        'common-washroom': true,
        balcony: false
      },
      '2bhk': {
        kitchen: true,
        'master-bedroom': true,
        'second-bedroom': true,
        'living-room': true,
        'dining-area': true,
        'common-washroom': true,
        balcony: true
      },
      '3bhk': {
        kitchen: true,
        'master-bedroom': true,
        'second-bedroom': true,
        'third-bedroom': true,
        'living-room': true,
        'dining-area': true,
        'common-washroom': true,
        'guest-washroom': true,
        balcony: true
      },
      '4bhk': {
        kitchen: true,
        'master-bedroom': true,
        'second-bedroom': true,
        'third-bedroom': true,
        'fourth-bedroom': true,
        'living-room': true,
        'dining-area': true,
        'common-washroom': true,
        'guest-washroom': true,
        'study-room': true,
        balcony: true
      },
      '5bhk': {
        kitchen: true,
        'master-bedroom': true,
        'second-bedroom': true,
        'third-bedroom': true,
        'fourth-bedroom': true,
        'fifth-bedroom': true,
        'living-room': true,
        'dining-area': true,
        'common-washroom': true,
        'guest-washroom': true,
        'study-room': true,
        'pooja-room': true,
        balcony: true
      }
    };

    setFormData(prev => ({
      ...prev,
      rooms: bhkType,
      selectedAreas: areaConfigs[bhkType as keyof typeof areaConfigs] || areaConfigs['2bhk']
    }));
  };

  const toggleArea = (area: string) => {
    setFormData(prev => ({
      ...prev,
      selectedAreas: {
        ...prev.selectedAreas,
        [area]: !prev.selectedAreas[area as keyof typeof prev.selectedAreas]
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowEnquiryForm(true);
  };

  const handleEnquirySuccess = () => {
    setShowEnquiryForm(false);
    onSuccess?.();
  };

  return (
    <>
      {/* Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Details */}
          <div className="grid md:grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Property Type</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {[
                  { value: 'apartment', label: 'Apartment' },
                  { value: 'villa', label: 'Villa' },
                  { value: 'independent-house', label: 'Independent House' },
                  { value: 'office', label: 'Office' },
                  { value: 'retail', label: 'Retail Space' }
                ].map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, propertyType: type.value }))}
                    className={`px-3 py-2 rounded-lg border transition-all duration-200 text-sm ${
                      formData.propertyType === type.value
                        ? 'bg-purple-100 text-purple-700 border-purple-300'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-purple-200 hover:bg-purple-50'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Number of Rooms</label>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { value: '1bhk', label: '1 BHK' },
                  { value: '2bhk', label: '2 BHK' },
                  { value: '3bhk', label: '3 BHK' },
                  { value: '4bhk', label: '4 BHK' },
                  { value: '5bhk', label: '5+ BHK' }
                ].map((room) => (
                  <button
                    key={room.value}
                    type="button"
                    onClick={() => updateAreasForBHK(room.value)}
                    className={`px-3 py-2 rounded-lg border transition-all duration-200 text-sm ${
                      formData.rooms === room.value
                        ? 'bg-purple-100 text-purple-700 border-purple-300'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-purple-200 hover:bg-purple-50'
                    }`}
                  >
                    {room.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Individual Areas Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Areas to Design</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.entries(formData.selectedAreas).map(([area, isSelected]) => {
                const areaLabels: { [key: string]: string } = {
                  'kitchen': 'Kitchen',
                  'master-bedroom': 'Master Bedroom',
                  'second-bedroom': 'Second Bedroom',
                  'third-bedroom': 'Third Bedroom',
                  'fourth-bedroom': 'Fourth Bedroom',
                  'fifth-bedroom': 'Fifth Bedroom',
                  'living-room': 'Living Room',
                  'dining-area': 'Dining Area',
                  'common-washroom': 'Common Washroom',
                  'guest-washroom': 'Guest Washroom',
                  'study-room': 'Study Room',
                  'pooja-room': 'Pooja Room',
                  'balcony': 'Balcony'
                };

                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleArea(area)}
                    className={`px-3 py-2 rounded-lg border transition-all duration-200 text-sm ${
                      isSelected
                        ? 'bg-purple-100 text-purple-700 border-purple-300'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-purple-200 hover:bg-purple-50'
                    }`}
                  >
                    {areaLabels[area] || area}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-2">Areas are automatically selected based on your BHK choice. You can customize them above.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Design Style</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {[
                { value: 'modern', label: 'Modern' },
                { value: 'contemporary', label: 'Contemporary' },
                { value: 'traditional', label: 'Traditional' },
                { value: 'minimalist', label: 'Minimalist' },
                { value: 'luxury', label: 'Luxury' }
              ].map((style) => (
                <button
                  key={style.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, style: style.value }))}
                  className={`px-3 py-2 rounded-lg border transition-all duration-200 text-sm ${
                    formData.style === style.value
                      ? 'bg-purple-100 text-purple-700 border-purple-300'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-purple-200 hover:bg-purple-50'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-primary text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-primary/90 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {buttonText}
          </button>
        </form>
      </div>

      {/* Enquiry Form Modal */}
      {showEnquiryForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Contact Information</h3>
              <button
                onClick={() => setShowEnquiryForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-4">Please provide your contact details to see/receive your personalized cost estimation.</p>
            <EnquiryForm 
              onSuccess={handleEnquirySuccess} 
              showMessage={false} 
              showLookingFor={false}
              subject={`${buttonText} Request`}
              propertyData={formData}
            />
          </div>
        </div>
      )}
    </>
  );
}
