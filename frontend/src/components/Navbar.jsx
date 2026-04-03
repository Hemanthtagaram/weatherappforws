import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Cloud } from 'lucide-react';

const Navbar = () => {
    const { logout, user } = useContext(AuthContext);

    return (
        <nav className="fixed w-full z-50 top-0 border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <Cloud className="h-8 w-8 text-blue-400" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            SkyCast
                        </span>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                        <span className="text-sm font-medium text-slate-300 hidden sm:block">
                            Welcome, {user?.username}
                        </span>
                        <button
                            onClick={logout}
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                            <LogOut size={18} />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
