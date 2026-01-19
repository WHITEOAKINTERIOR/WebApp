'use client';

import { useEffect, useState } from 'react';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if cookie is already set
    const hasConsent = document.cookie.split(';').some((cookie) => {
      return cookie.trim().startsWith('cookieConsent=');
    });
    setShowBanner(!hasConsent);
  }, []);

  const handleAccept = () => {
    document.cookie = "cookieConsent=true; path=/; max-age=31536000";
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-700 mb-2 md:mb-0">
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
        </p>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm"
            onClick={handleAccept}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}