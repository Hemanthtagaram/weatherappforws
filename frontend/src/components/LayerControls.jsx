import React from 'react';
import { Cloud, CloudRain, Wind, Thermometer, Map } from 'lucide-react';

const LayerControls = ({ activeLayer, setLayer }) => {
    const layers = [
        { id: 'none', icon: Map, label: 'Base' },
        { id: 'temp_new', icon: Thermometer, label: 'Temp' },
        { id: 'wind_new', icon: Wind, label: 'Wind' },
        { id: 'clouds_new', icon: Cloud, label: 'Clouds' },
        { id: 'radar', icon: CloudRain, label: 'Radar' },
    ];

    return (
        <div className="absolute right-4 top-24 z-10 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-2 flex flex-col gap-2">
            {layers.map(layer => {
                const Icon = layer.icon;
                const isActive = activeLayer === layer.id;
                return (
                    <button
                        key={layer.id}
                        onClick={() => setLayer(layer.id)}
                        title={layer.label}
                        className={`p-3 rounded-xl flex flex-col items-center justify-center transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <Icon size={20} />
                        <span className="text-[10px] mt-1 hidden md:block font-medium">{layer.label}</span>
                    </button>
                )
            })}
        </div>
    );
};
export default LayerControls;
