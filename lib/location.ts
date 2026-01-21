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
    // Using ip-api.com which provides more detailed location data
    const response = await fetch('http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,query');
    const data = await response.json();
    
    if (data.status !== 'success') {
      throw new Error(data.message || 'IP geolocation service unavailable');
    }
    
    // Get detailed address using reverse geocoding
    const address = await reverseGeocode(data.lat, data.lon);
    
    return {
      latitude: data.lat,
      longitude: data.lon,
      accuracy: null, // IP geolocation doesn't provide accuracy
      address: {
        ...address,
        // Map ip-api fields to OSM address format for consistency
        city: data.city,
        state: data.regionName,
        country: data.country,
        country_code: data.countryCode?.toLowerCase(),
        postcode: data.zip,
        // Custom mapping for district if available
        ...(data.district && { 
          city_district: data.district,
          // Try to get more specific district if available
          ...(address?.city_district ? {} : { city_district: data.district })
        }),
        // Add raw data for reference
        _raw: data
      },
      display_name: address?.display_name || `${data.city}, ${data.regionName}, ${data.country}`
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
export const getLocation = async (): Promise<LocationData> => {
  // Try HTML5 Geolocation first
  try {
    const browserLocation = await getBrowserLocation();
    return {
      ...browserLocation,
      method: 'browser',
      error: null
    };
  } catch (browserError) {
    console.warn('Browser geolocation failed, falling back to IP geolocation');
    
    // Fall back to IP-based geolocation
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