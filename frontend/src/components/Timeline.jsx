import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

const Timeline = () => {
    const [playing, setPlaying] = useState(false);
    
    return (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-3xl p-4 w-11/12 max-w-3xl flex items-center gap-6 shadow-2xl">
            <button onClick={() => setPlaying(!playing)} className="p-3 bg-blue-600 hover:bg-blue-500 rounded-full text-white transition-all shadow-lg hover:scale-105">
                {playing ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
            </button>
            <div className="flex-1 flex flex-col justify-center relative">
                <input type="range" min="0" max="100" defaultValue="50" className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                <div className="flex justify-between text-[11px] text-slate-400 font-bold mt-2 tracking-wider uppercase">
                    <span>Past 12h</span>
                    <span className="text-blue-400">Live</span>
                    <span>Next 12h</span>
                </div>
            </div>
            <div className="text-white text-xs font-bold tracking-widest bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg border border-red-500/20 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                LIVE
            </div>
        </div>
    );
};
export default Timeline;
