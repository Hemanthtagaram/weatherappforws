import React from 'react';
import { Cloud, Sun, CloudRain, CloudLightning, Snowflake } from 'lucide-react';

const ForecastCard = ({ forecast, isCelsius }) => {
    const getTemp = (tempStr) => {
        let t = parseFloat(tempStr);
        return isCelsius ? Math.round(t) : Math.round((t * 9/5) + 32);
    };

    const date = new Date(forecast.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric' });

    const condition = forecast.weather[0].main.toLowerCase();
    let WeatherIcon = Cloud;
    let iconColor = "#94a3b8"; 

    if (condition.includes('clear')) {
        WeatherIcon = Sun;
        iconColor = "#fbbf24";
    } else if (condition.includes('rain')) {
        WeatherIcon = CloudRain;
        iconColor = "#60a5fa";
    }

    return (
        <div className="bg-slate-800/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center hover:bg-slate-800/60 transition-all hover:-translate-y-1">
            <span className="text-slate-300 font-medium">{day}</span>
            <span className="text-xs text-slate-500 mb-2">{time}</span>
            <WeatherIcon size={32} style={{ color: iconColor }} className="my-2" />
            <span className="text-xl font-bold text-white">{getTemp(forecast.main.temp)}°</span>
            <span className="text-xs text-slate-400 capitalize text-center mt-1">{forecast.weather[0].description}</span>
        </div>
    );
};
export default ForecastCard;
