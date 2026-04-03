import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Sun } from 'lucide-react';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(username, password);
        } catch (err) {
            setError(err.response?.data?.message || 'Error occurred during signup');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-emerald-900 p-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
                <div className="text-center">
                    <Sun className="w-16 h-16 mx-auto text-yellow-400 mb-4 animate-[spin_10s_linear_infinite]" />
                    <h2 className="text-3xl font-bold text-white tracking-tight">Create Account</h2>
                    <p className="mt-2 text-slate-400">Join to save your favorite cities</p>
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
                                className="w-full px-5 py-4 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                                placeholder="Choose a username"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-4 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                                placeholder="Create a password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold tracking-wide text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none flex justify-center items-center transition-all hover:scale-[1.02]"
                    >
                        Sign Up
                    </button>
                </form>
                
                <p className="text-center text-slate-400 font-medium">
                    Already have an account?{' '}
                    <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">Sign in</Link>
                </p>
            </div>
        </div>
    );
};
export default Signup;
