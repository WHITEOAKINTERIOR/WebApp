'use client';

import { Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { commonContent } from '@/content/sharedContent';

export function FloatingButtons() {
  const phoneNumber = commonContent.phone.replace(/\s+/g, ''); // Remove spaces from phone number
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* WhatsApp Button */}
      <Link
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </Link>
      
      {/* Phone Call Button */}
      <Link
        href={`tel:${phoneNumber}`}
        className="bg-blue-500 md:hidden hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6" />
      </Link>
    </div>
  );
}
