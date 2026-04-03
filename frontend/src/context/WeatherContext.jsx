import React, { createContext, useState } from 'react';
import axios from 'axios';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [favorites, setFavorites] = useState([]);

    const loadFavorites = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/favorites');
            setFavorites(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const searchCity = async (city) => {
        setLoading(true);
        setError('');
        try {
            const [weatherRes, forecastRes] = await Promise.all([
                axios.get(`http://localhost:8080/api/weather/${city}`),
                axios.get(`http://localhost:8080/api/forecast/${city}`)
            ]);
            setCurrentWeather(weatherRes.data);
            setForecast(forecastRes.data);
        } catch (err) {
            setError('Failed to fetch weather data for ' + city);
            setCurrentWeather(null);
            setForecast(null);
        } finally {
            setLoading(false);
        }
    };

    const addFavorite = async (cityName) => {
        try {
            await axios.post('http://localhost:8080/api/favorites', { cityName });
            await loadFavorites();
        } catch (err) {
            console.error(err);
        }
    };

    const removeFavorite = async (cityName) => {
        try {
            await axios.delete(`http://localhost:8080/api/favorites/${cityName}`);
            await loadFavorites();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <WeatherContext.Provider value={{
            currentWeather, forecast, loading, error, 
            searchCity, favorites, loadFavorites, addFavorite, removeFavorite
        }}>
            {children}
        </WeatherContext.Provider>
    );
};
