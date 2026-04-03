import React, { useEffect, useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import FavoritesList from '../components/FavoritesList';
import { WeatherContext } from '../context/WeatherContext';
import MapViewer from '../components/MapViewer';
import LayerControls from '../components/LayerControls';
import Timeline from '../components/Timeline';
// import { useWebSocket } from '../hooks/useWebSocket';

const Dashboard = () => {
    const { currentWeather, loading, error, loadFavorites, searchCity } = useContext(WeatherContext);
    const [activeLayer, setActiveLayer] = useState('radar');
    // const { alerts } = useWebSocket();

    useEffect(() => {
        loadFavorites();
        if (!currentWeather) searchCity("London");
    }, []);

    const mapCenter = currentWeather?.coord ? [currentWeather.coord.lat, currentWeather.coord.lon] : [20, 0];

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#0f172a] text-white font-sans">
            <Navbar />
            
            {/* The Full Background Map */}
            <MapViewer center={mapCenter} activeLayer={activeLayer} />

            {/* Floating Top-Left Search & Weather Panel */}
            <div className="absolute top-24 left-4 z-10 w-96 max-w-[calc(100vw-2rem)] flex flex-col gap-4">
                <SearchBar onSearch={searchCity} />
                
                {error && <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm shadow-lg backdrop-blur-md">{error}</div>}
                
                {loading && (
                    <div className="flex justify-center mt-4">
                        <div className="w-8 h-8 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                )}
                
                {currentWeather && !loading && !error && (
                    <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-2xl animate-fade-in">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 truncate">
                            {currentWeather.name}, {currentWeather.sys?.country}
                        </h2>
                        <div className="flex items-center gap-6 mt-4">
                            <span className="text-6xl font-light tracking-tighter">
                                {Math.round(currentWeather.main.temp)}°
                            </span>
                            <div className="flex flex-col text-slate-300 text-sm gap-1">
                                <span className="capitalize text-white font-medium">{currentWeather.weather[0].description}</span>
                                <span className="flex items-center gap-2">H: {Math.round(currentWeather.main.humidity)}%</span>
                                <span className="flex items-center gap-2">W: {currentWeather.wind.speed.toFixed(1)} m/s</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Sidebar Floating for Favorites */}
            <div className="hidden lg:block absolute bottom-8 left-4 z-10 w-80">
                <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl max-h-[40vh] overflow-y-auto custom-scrollbar">
                    <FavoritesList onSelectCity={searchCity} />
                </div>
            </div>

            <LayerControls activeLayer={activeLayer} setLayer={setActiveLayer} />
            <Timeline activeLayer={activeLayer} />
        </div>
    );
};
export default Dashboard;
