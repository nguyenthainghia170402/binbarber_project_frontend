import React from 'react'
import { Home } from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Booking from './components/Booking/Booking';
import Header from './components/Header';

export default function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />

        </Routes>
      </div>
    </Router>
  );
}

