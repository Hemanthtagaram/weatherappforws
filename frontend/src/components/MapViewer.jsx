import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet icon path issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center && center[0] !== 0 && center[1] !== 0) {
            map.flyTo(center, 10, { animate: true, duration: 1.5 });
        }
    }, [center, map]);
    return null;
};

const MapViewer = ({ center, activeLayer }) => {
    return (
        <MapContainer center={center || [20, 0]} zoom={3} className="absolute inset-0 z-0 h-screen w-full" zoomControl={false}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; OpenStreetMap contributors'
            />
            {activeLayer && activeLayer !== 'none' && (
                <TileLayer
                    key={activeLayer}
                    url={activeLayer === 'radar' 
                        ? 'https://tilecache.rainviewer.com/v2/radar/1680206400/256/{z}/{x}/{y}/2/1_1.png'
                        : `https://tile.openweathermap.org/map/${activeLayer}/{z}/{x}/{y}.png?appid=YOUR_API_KEY`}
                    opacity={0.6}
                />
            )}
            <MapUpdater center={center} />
        </MapContainer>
    );
};

export default MapViewer;
