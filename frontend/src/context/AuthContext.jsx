const API_URL = "https://weatherappforws.onrender.com/api/auth";

const login = async (username, password) => {
    try {
        const res = await axios.post(`${API_URL}/login`, { username, password });
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
        await axios.post(`${API_URL}/signup`, { username, password });
        return await login(username, password);
    } catch (error) {
        console.error("Signup failed:", error);
        throw error;
    }
};
