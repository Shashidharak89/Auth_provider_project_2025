import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLogin from './GoogleLogin';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useState, useEffect } from 'react';
import RefreshHandler from './RefreshHandler';
import NotFound from './NotFound';
import Dummy from './Dummy';
import Ver from './Ver';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const GoogleWrapper = () => (
        <GoogleOAuthProvider clientId="853735521140-nrgnguvasbhui8gpu7utab3ulckgkspf.apps.googleusercontent.com">
            <GoogleLogin setIsAuthenticated={setIsAuthenticated} />
        </GoogleOAuthProvider>
    );

    const PrivateRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/login" />;
    };

    // Handle authentication state globally
    useEffect(() => {
        const userInfo = localStorage.getItem('user-info');
        if (userInfo) {
            setIsAuthenticated(true); // User is authenticated if we have user data
        } else {
            setIsAuthenticated(false);
        }
    }, []); // Only run on mount to check localStorage

    return (
        <BrowserRouter>
            <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
            <Routes>
                <Route path="/login" element={<GoogleWrapper />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                <Route path="/user" element={<Dummy />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Ver />
        </BrowserRouter>
    );
}

export default App;
