// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';  // Create this page similarly
import Membership from './pages/Membership';  // Create this page similarly
import ContactUs from './pages/ContactUs';  // Create this page similarly
import Register from './pages/Register';
import Payment from './pages/Payment';


function App() {
  return (
    <Router>
      {/* Navbar Component */}
      <Navbar />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>

      {/* Footer Component */}
      <Footer />
    </Router>
  );
}

export default App;
