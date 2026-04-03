import axios from 'axios';

const API_URL = 'http://localhost:8080/api/weather';

export const fetchWeather = async (city) => {
    try {
        const response = await axios.get(`${API_URL}/${city}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Failed to fetch weather. Please ensure the backend is running.');
    }
};
