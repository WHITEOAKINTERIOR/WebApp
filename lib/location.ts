// utils/location.ts
export interface LocationData {
  // Coordinates
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  method: 'browser' | 'ip' | null;
  
  // Location details
  address?: {
    house_number?: string;
    road?: string;
    suburb?: string;
    city_district?: string;
    city?: string;
    county?: string;
    state_district?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
    village?: string;
    town?: string;
  };
  
  // Formatted display name
  display_name?: string;
  
  // Error handling
  error: string | null;
}

// Cache for location data to reduce API calls
const locationCache = new Map<string, any>();

// Helper function to get location details from coordinates
const reverseGeocode = async (lat: number, lng: number): Promise<LocationData['address'] & { display_name?: string }> => {
  const cacheKey = `${lat.toFixed(4)},${lng.toFixed(4)}`;
  
  // Return cached result if available
  if (locationCache.has(cacheKey)) {
    return locationCache.get(cacheKey);
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&zoom=18`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch location details');
    }
    
    const data = await response.json();
    const result = {
      ...data.address,
      display_name: data.display_name
    };
    
    // Cache the result
    locationCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return {};
  }
};

// Get IP-based location with details
const getIPLocation = async (): Promise<Omit<LocationData, 'method' | 'error'>> => {
  try {
    // Using a service that supports HTTPS for free
    // ip-api.com free tier doesn't support HTTPS, so we use ipinfo.io instead
    const response = await fetch('https://ipinfo.io/json?token=2a9f6b4ac3d5b9');
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error || 'IP geolocation service unavailable');
    }
    
    // Parse coordinates from ipinfo.io (format: "lat,lon")
    let lat = null, lon = null;
    if (data.loc) {
      const [latitude, longitude] = data.loc.split(',');
      lat = parseFloat(latitude);
      lon = parseFloat(longitude);
    }
    
    // Get detailed address using reverse geocoding if we have coordinates
    let address: LocationData['address'] & { display_name?: string } = {};
    if (lat && lon) {
      address = await reverseGeocode(lat, lon);
    }
    
    return {
      latitude: lat,
      longitude: lon,
      accuracy: null, // IP geolocation doesn't provide accuracy
      address: {
        ...address,
        // Map ipinfo.io fields to OSM address format for consistency
        city: data.city,
        state: data.region,
        country: data.country,
        country_code: data.country?.toLowerCase(),
        postcode: data.postal,
      },
      display_name: address?.display_name || `${data.city}, ${data.region}, ${data.country}`
    };
  } catch (error) {
    console.error('IP geolocation error:', error);
    throw new Error('Failed to get location from IP');
  }
};

// Get browser geolocation with details
const getBrowserLocation = async (): Promise<Omit<LocationData, 'method' | 'error'>> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude, accuracy } = position.coords;
          const address = await reverseGeocode(latitude, longitude);
          
          resolve({
            latitude,
            longitude,
            accuracy,
            address,
            display_name: address?.display_name
          });
        } catch (error) {
          // If reverse geocoding fails, still return coordinates
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        }
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000, // Increased timeout for better accuracy
        maximumAge: 0,
      }
    );
  });
};

// Main export
export const getLocation = async (auto_submit = false): Promise<LocationData> => {
  // Skip browser geolocation for auto-submit to avoid permission dialogs
  if (!auto_submit) {
    try {
      const browserLocation = await getBrowserLocation();
      return {
        ...browserLocation,
        method: 'browser',
        error: null
      };
    } catch (browserError) {
      console.warn('Browser geolocation failed, falling back to IP geolocation');
    }
  }

  // Fall back to IP-based geolocation for auto-submit or if browser geolocation fails
  try {
    const ipLocation = await getIPLocation();
    return {
      ...ipLocation,
      method: 'ip',
      error: null
    };
  } catch (ipError) {
    console.error('IP geolocation failed:', ipError);
    return {
      latitude: null,
      longitude: null,
      accuracy: null,
      method: null,
      error: 'Unable to determine your location',
      address: undefined
    };
  }
};

// Helper function to format address components
export const formatAddress = (address?: LocationData['address']): string => {
  if (!address) return 'Location not available';
  
  const parts = [
    address.house_number,
    address.road,
    address.suburb || address.city_district,
    address.city || address.town || address.village,
    address.county && !address.city ? address.county : undefined,
    address.state,
    address.postcode,
    address.country
  ].filter(Boolean);
  
  return parts.join(', ');
};