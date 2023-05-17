import React from 'react'
import { Home } from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Booking } from './pages/Booking';
import Calender from './components/Header/calender';
export default function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Booking" element={<Booking />} />
        </Routes>
      </div>
    </Router>
  );
}

