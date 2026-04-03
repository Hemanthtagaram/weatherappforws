import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CloudRain } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 p-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
                <div className="text-center">
                    <CloudRain className="w-16 h-16 mx-auto text-blue-400 mb-4" />
                    <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
                    <p className="mt-2 text-slate-400">Sign in to view your weather dashboard</p>
                </div>
                
                {error && <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200 text-sm text-center">{error}</div>}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-5 py-4 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-4 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold tracking-wide text-white bg-blue-600 hover:bg-blue-700 focus:outline-none flex justify-center items-center transition-all hover:scale-[1.02]"
                    >
                        Sign In
                    </button>
                </form>
                
                <p className="text-center text-slate-400 font-medium">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-bold transition-colors">Sign up</Link>
                </p>
            </div>
        </div>
    );
};
export default Login;
