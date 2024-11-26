import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Use the environment variable for the logo path (if it's dynamic)
const logoPath = import.meta.env.VITE_LOGO_PATH || "../assets/logo.png"; // default to local logo

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [isMemoDropdownOpen, setIsMemoDropdownOpen] = useState(false);

  // Handle Logout (clear token and redirect to login)
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Toggle the Memo Dropdown
  const toggleMemoDropdown = () => {
    setIsMemoDropdownOpen((prev) => !prev);
  };

  return (
    <div className="bg-blue-600 p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto text-white">
        {/* Dynamically load the logo based on environment variable */}
        <img src={logoPath} alt="ZIP Logo" className="h-16 w-16" />
        
        <span className="text-xl font-bold text-white hover:text-gray-200 transform transition-all duration-300 ease-in-out hover:scale-110">
          Źambia 𝓘nstitute of 𝓟lanners
        </span>

        {/* Left Links */}
        <div className="space-x-6">
          <Link to="/admin/dashboard" className="text-lg font-semibold hover:text-blue-200">Dashboard</Link>
          <Link to="/memo/create" className="text-lg font-semibold hover:text-blue-200">Create Memo</Link>
          <Link to="/admin/members" className="text-lg font-semibold hover:text-blue-200">Members</Link>
          <Link to="/generate-reports" className="text-lg font-semibold hover:text-blue-200">Get Reports</Link>
        </div>

        {/* Right Profile Icon */}
        <div className="flex items-center space-x-4">
          <button 
            type="button" 
            onClick={handleLogout} 
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 hover:text-blue-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
