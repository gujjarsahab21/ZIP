import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"; // Assuming this is the path for the logo

const Navbar = () => {
  const navigate = useNavigate();

  // Handle Logout (clear token and redirect to login)
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="bg-blue-600 p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto text-white">
        <img src={logo} alt="ZIP Logo" className="h-16 w-16" />
        <span className="text-xl font-bold text-white hover:text-gray-200 transform transition-all duration-300 ease-in-out hover:scale-110">
          Źambia 𝓘nstitute of 𝓟lanners
        </span>
        {/* Left Links */}
        <div className="space-x-6">
          <Link to="/dashboard" className="text-lg font-semibold hover:text-blue-200">Dashboard</Link>
          <Link to="/memo" className="text-lg font-semibold hover:text-blue-200">Memos</Link>
          <Link to="/payment-form" className="text-lg font-semibold hover:text-blue-200">Make Payment</Link>
          <Link to="/membership-validation" className="text-lg font-semibold hover:text-blue-200">Membership Validation</Link>
          <Link to="/profile" className="text-lg font-semibold hover:text-blue-200">Profile</Link>
        </div>

        {/* Right Profile Icon */}
        <div className="flex items-center space-x-4"> 
          <button type="button" onClick={handleLogout} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900  hover:text-blue-200">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
