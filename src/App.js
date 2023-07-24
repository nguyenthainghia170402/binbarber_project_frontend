import React from 'react';
import { Home } from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Booking from './components/Booking/booking';

import { Login } from './pages/Auth/Login/Login';
import { Register } from './pages/Auth/Register/Register';
import Services from './pages/Services/services';
import AdminApp from './admin/app/index';
import Staff from './pages/Staff/index';
import useToken from './utils/useToken';

export default function App() {
    const { token, removeToken, setToken } = useToken();
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/Login" element={<Login setToken={setToken} />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/Admin/*" element={<AdminApp />} />
                    <Route path="/Services" element={<Services />} />
                    <Route path="/Staff" element={<Staff />} />
                </Routes>
            </div>
        </Router>
    );
}
