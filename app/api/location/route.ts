import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Server-side can make HTTP requests without mixed content issues
    const response = await fetch('http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,query');
    const data = await response.json();
    
    if (data.status !== 'success') {
      throw new Error(data.message || 'IP geolocation service unavailable');
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get location' },
      { status: 500 }
    );
  }
}
