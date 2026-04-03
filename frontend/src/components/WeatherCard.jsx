import React from 'react';
import { Droplets, Wind, Cloud, Sun, CloudRain, CloudLightning, Snowflake, Eye, Thermometer } from 'lucide-react';

const WeatherCard = ({ data, isCelsius }) => {
  const getTemp = (tempStr) => {
    let t = parseFloat(tempStr);
    return isCelsius ? Math.round(t) : Math.round((t * 9/5) + 32);
  };

  const condition = data.weather[0].main.toLowerCase();
  
  let WeatherIcon = Cloud;
  let iconColor = "#94a3b8"; 

  if (condition.includes('clear')) {
    WeatherIcon = Sun;
    iconColor = "#fbbf24";
  } else if (condition.includes('rain') || condition.includes('drizzle')) {
    WeatherIcon = CloudRain;
    iconColor = "#60a5fa";
  } else if (condition.includes('thunder')) {
    WeatherIcon = CloudLightning;
    iconColor = "#c084fc";
  } else if (condition.includes('snow')) {
    WeatherIcon = Snowflake;
    iconColor = "#e2e8f0";
  }

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between">
            <div className="flex flex-col items-center md:items-start">
                <h2 className="text-4xl font-bold tracking-tight text-white mb-2">{data.name}, {data.sys.country}</h2>
                <p className="text-xl text-slate-300 capitalize">{data.weather[0].description}</p>
                <div className="flex items-center mt-6 space-x-4">
                    <WeatherIcon className="w-24 h-24 drop-shadow-lg" style={{ color: iconColor }} strokeWidth={1.5} />
                    <div className="flex items-start">
                        <span className="text-8xl font-black tracking-tighter text-white drop-shadow-lg">
                            {getTemp(data.main.temp)}
                        </span>
                        <span className="text-3xl font-bold text-slate-300 mt-2 ml-1">°{isCelsius ? 'C' : 'F'}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 md:mt-0 w-full md:w-auto">
                <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex flex-col items-start gap-2">
                    <div className="flex items-center space-x-2 text-slate-400">
                        <Thermometer size={18} className="text-orange-400"/>
                        <span className="text-sm font-medium">Feels Like</span>
                    </div>
                    <span className="text-xl font-bold text-white">{getTemp(data.main.feels_like)}°</span>
                </div>
                <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex flex-col items-start gap-2">
                    <div className="flex items-center space-x-2 text-slate-400">
                        <Droplets size={18} className="text-blue-400"/>
                        <span className="text-sm font-medium">Humidity</span>
                    </div>
                    <span className="text-xl font-bold text-white">{data.main.humidity}%</span>
                </div>
                <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex flex-col items-start gap-2">
                    <div className="flex items-center space-x-2 text-slate-400">
                        <Wind size={18} className="text-teal-400"/>
                        <span className="text-sm font-medium">Wind</span>
                    </div>
                    <span className="text-xl font-bold text-white">{data.wind.speed} m/s</span>
                </div>
                <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex flex-col items-start gap-2">
                    <div className="flex items-center space-x-2 text-slate-400">
                        <Eye size={18} className="text-purple-400"/>
                        <span className="text-sm font-medium">Visibility</span>
                    </div>
                    <span className="text-xl font-bold text-white">{data.visibility / 1000} km</span>
                </div>
            </div>
        </div>
    </div>
  );
};
export default WeatherCard;
