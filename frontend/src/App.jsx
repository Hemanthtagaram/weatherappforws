import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

const ProtectedRoute = ({ children }) => {
    const { token } = React.useContext(AuthContext);
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
  return (
    <Router>
        <AuthProvider>
            <div className="min-h-screen bg-slate-900 text-white font-sans">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </div>
        </AuthProvider>
    </Router>
  );
}

export default App;
