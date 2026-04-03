import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser({ username: localStorage.getItem('username') });
        } else {
            delete axios.defaults.headers.common['Authorization'];
            setUser(null);
        }
    }, [token]);

    const login = async (username, password) => {
        try {
            const res = await axios.post('http://localhost:8080/api/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.username);
            setToken(res.data.token);
            navigate('/dashboard');
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const signup = async (username, password) => {
        try {
            await axios.post('http://localhost:8080/api/auth/signup', { username, password });
            return await login(username, password);
        } catch (error) {
            console.error("Signup failed:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setToken(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
