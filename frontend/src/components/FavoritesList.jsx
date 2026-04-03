import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { Heart, Trash2 } from 'lucide-react';

const FavoritesList = ({ onSelectCity }) => {
    const { favorites, removeFavorite } = useContext(WeatherContext);

    return (
        <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center space-x-3 mb-6">
                <Heart className="text-pink-500 fill-pink-500" size={24} />
                <h3 className="text-xl font-bold text-white">Your Favorites</h3>
            </div>

            {favorites.length === 0 ? (
                <p className="text-slate-400 text-sm">No favorite cities saved yet.</p>
            ) : (
                <ul className="space-y-3">
                    {favorites.map((fav) => (
                        <li key={fav.id} className="flex items-center justify-between group p-3 bg-slate-900/50 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all">
                            <span 
                                onClick={() => onSelectCity(fav.cityName)}
                                className="font-medium text-slate-200 cursor-pointer flex-1 truncate hover:text-blue-400 transition-colors"
                            >
                                {fav.cityName}
                            </span>
                            <button
                                onClick={() => removeFavorite(fav.cityName)}
                                className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1"
                            >
                                <Trash2 size={16} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default FavoritesList;
