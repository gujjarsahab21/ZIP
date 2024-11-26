// src/components/Footer.jsx
import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-6 mt-12">
      <div className="container mx-auto px-6 text-center">
        {/* Contact Information */}
        <p className="text-lg font-semibold mb-2">Zambia Institute of Planners - ZIP</p>
        <p className="text-sm mb-4">Contact us:</p>
        <p className="text-sm">
          Email: <a href="mailto:zip.planner@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">zip.planner@gmail.com</a>
        </p>
        <p className="text-sm mb-4">
          Phone: 0975720015 / 0976653703 / 0964526170
        </p>
        <p className="text-sm mb-4">
          Website: <a href="http://www.zambiainstituteofplanners.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">www.zambiainstituteofplanners.com</a>
        </p>

        {/* Social Icons */}
        <div className="social-icons mt-4 flex justify-center space-x-6">
          <a
            href="https://www.facebook.com/ZambiaInstituteofPlanners"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition-all duration-300 transform hover:scale-125"
          >
            <i className="fab fa-facebook-square fa-2x"></i>
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-sm">
          All rights reserved &copy; 2024
        </p>
      </div>
    </footer>
  );
}

export default Footer;
