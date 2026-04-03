import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={20} className="text-slate-400 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search for any city..."
                className="w-full pl-12 pr-4 py-4 bg-slate-800/60 border border-white/10 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-lg backdrop-blur-md font-medium text-lg"
            />
            <button type="submit" className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 font-semibold transition-colors shadow-md">
                Search
            </button>
        </form>
    );
};
export default SearchBar;
