// Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa"; // Importing icons from react-icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to handle dropdown visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the dropdown menu
  };

  return (
    <nav className="bg-gray-800 fixed w-full z-10 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">MallaReddy University</h1>
        <div className="hidden md:flex space-x-4">
          <Link to="/register" className="text-white flex items-center mr-20">
            <FaSignOutAlt className="mr-1" />
            Register
          </Link>
          <Link to="/login" className="text-white flex items-center">
            <FaSignInAlt className="mr-1" />
            Login
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu} // Toggle dropdown menu on click
            className="text-white focus:outline-none text-xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-gray-800">
          <Link
            to="/register"
            className="block text-white py-2 px-4 hover:bg-gray-700"
            onClick={toggleMenu} // Close menu on link click
          >
            Register
          </Link>
          <Link
            to="/login"
            className="block text-white py-2 px-4 hover:bg-gray-700"
            onClick={toggleMenu} // Close menu on link click
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
