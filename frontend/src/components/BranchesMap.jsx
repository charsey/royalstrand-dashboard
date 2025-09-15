import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const branches = [
  { id: 'kigali', name: 'RoyalStrand Kigali', coords: [-1.9441, 30.0619], address: 'KN 3 Ave, Kigali, Rwanda', revenue: '$34,200' },
  { id: 'nairobi', name: 'RoyalStrand Nairobi', coords: [-1.2921, 36.8219], address: 'Westlands, Nairobi, Kenya', revenue: '$41,800' },
  { id: 'johannesburg', name: 'RoyalStrand Johannesburg', coords: [-26.2041, 28.0473], address: 'Sandton, Johannesburg, South Africa', revenue: '$52,100' },
  { id: 'accra', name: 'RoyalStrand Accra', coords: [5.6037, -0.1870], address: 'Osu, Accra, Ghana', revenue: '$27,900' },
];

function MapEvents({ onClickMarker }) {
  useMapEvents({ click() { /* placeholder to enable map interaction */ } });
  return null;
}

export default function BranchesMap({ className = '' }) {
  const [selected, setSelected] = useState(null);
  const center = useMemo(() => [0.5, 20], []);

  // detect dark mode for tile layer choice
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  const tileUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  return (
    <div className={`map-card ${className}`}>
      <div className="map-card-header">
        <h3 className="map-title">Salon Branches</h3>
      </div>
      <div className="map-wrap">
        <MapContainer center={center} zoom={3} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
          <TileLayer url={tileUrl} />
          <MapEvents />
          {branches.map(b => (
            <CircleMarker
              key={b.id}
              center={b.coords}
              radius={8}
              pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 1, weight: 1 }}
              eventHandlers={{ click: () => setSelected(b) }}
              className="branch-circle"
            />
          ))}
          {selected && (
            <Popup position={selected.coords} onClose={() => setSelected(null)}>
              <div className="branch-popup">
                <div className="font-semibold">{selected.name}</div>
                <div className="text-xs text-gray-500">{selected.address}</div>
                <div className="mt-2 text-sm font-semibold">{selected.revenue}</div>
                <div className="text-xs text-gray-500">Revenue (monthly)</div>
              </div>
            </Popup>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
