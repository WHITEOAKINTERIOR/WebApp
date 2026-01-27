import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Get client IP from request headers
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const clientIP = forwarded?.split(',')[0] || realIp || 'unknown';
    
    // If we can't get the client IP, fall back to server IP detection
    const ipToUse = clientIP !== 'unknown' ? clientIP : '';
    
    // Server-side can make HTTP requests without mixed content issues
    const url = ipToUse 
      ? `http://ip-api.com/json/${ipToUse}?fields=status,message,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,query`
      : `http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,query`;
    
    const response = await fetch(url);
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
