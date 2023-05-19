import React from 'react';
import { Home } from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Booking  from './pages/Booking';
import { Login } from './pages/Auth/Login/Login';
import { Register } from './pages/Auth/Register/Register';
import AdminApp from './admin/app/index';


export default function App() {
    return (
        <Router>
            <div className="App">
                <Header />
        <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/Admin/*" element={<AdminApp />} />
        
        </Routes>
            </div>
        </Router>
    );
}
