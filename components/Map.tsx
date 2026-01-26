'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Map components with SSR disabled
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => {
    const { MapContainer } = mod;
    return function DynamicMapContainer(props: any) {
      return <MapContainer {...props} />;
    };
  }),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface MapProps {
  center?: [number, number];
  zoom?: number;
  height?: string | number;
  className?: string;
  markerText?: string;
  subText?: string;
}

export const Map = ({
  center = [28.5355, 77.3910],
  zoom = 10,
  height = '500px',
  className = '',
  markerText = 'White Oak Interior Design',
  subText = '123 Design Street, New Delhi'
}: MapProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [icon, setIcon] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      setIcon(L.icon({
        iconUrl: '/images/marker-icon.png',
        shadowUrl: '/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }));
    }
  }, []);

  if (!isMounted || !icon) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`} style={{ height }}>
        Loading map...
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border overflow-hidden ${className}`} style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        className="z-10"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={center}
          icon={icon}
        >
          <Popup>
            <div className="text-sm font-medium">{markerText}</div>
            <div className="text-xs text-gray-600">{subText}</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
