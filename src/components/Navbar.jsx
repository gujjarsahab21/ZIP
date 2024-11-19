import { Link } from 'react-router-dom';
import logo from "../assets/logo-removebg-preview.png"

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-200 to-blue-800 shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center h-20"> {/* Set a fixed height for the navbar */}
        {/* Logo and Short Text (ZIP) */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="ZIP Logo" className="h-16 w-16" />  {/* Adjusted logo size */}
          <span className="text-2xl font-bold text-white hover:text-gray-200 transform transition-all duration-300 ease-in-out hover:scale-110">
          Ź𝓘𝓟
          </span>
        </Link>

        {/* Hamburger Menu */}
        <div className="block lg:hidden">
          <button className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex space-x-6">
          <Link to="/" className="text-white text-lg font-semibold transition-all duration-300 hover:text-gray-300 hover:scale-105">
            Home
          </Link>
          <Link to="/about" className="text-white text-lg font-semibold transition-all duration-300 hover:text-gray-300 hover:scale-105">
            About Us
          </Link>
          <Link to="/membership" className="text-white text-lg font-semibold transition-all duration-300 hover:text-gray-300 hover:scale-105">
            Membership
          </Link>
          <Link to="/contact" className="text-white text-lg font-semibold transition-all duration-300 hover:text-gray-300 hover:scale-105">
            Contact
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden absolute top-0 left-0 w-full bg-blue-800 bg-opacity-80 shadow-md transition-all duration-300 ease-in-out transform translate-y-[-100%]">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-white text-lg font-semibold transition-all duration-300 hover:text-gray-300 hover:scale-105">
              Home
            </Link>
            <Link to="/about" className="text-white text-lg font-semibold transition-all duration-300 hover:text-gray-300 hover:scale-105">
              About Us
            </Link>
            <Link to="/membership" className="text-white text-lg font-semibold transition-all duration-300 hover:text-gray-300 hover:scale-105">
              Membership
            </Link>
            <Link to="/contact" className="text-white text-lg font-semibold transition-all duration-300 hover:text-gray-300 hover:scale-105">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
