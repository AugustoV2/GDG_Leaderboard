import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 fixed top-0 w-full z-10 shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <a href="https://gdg.community.dev/gdg-on-campus-amal-jyothi-college-of-engineering-kanjirappally-india/" className="flex items-center space-x-3">
          <img
            src="https://envs.sh/TxW.png"
            className="h-8"
            alt="GDG Logo"
          />
          <span className="text-xl font-medium text-gray-800 dark:text-white">Google Developer Groups</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <a href="./" className="text-gray-700 dark:text-white hover:text-blue-600 transition">Home</a>
          <a href="https://developers.google.com/community/gdg" className="text-gray-700 dark:text-white hover:text-blue-600 transition">About</a>
          {/* Add more links as needed */}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-500 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <ul className="flex flex-col items-center py-4 space-y-4">
            <li><a href="#" className="text-gray-700 dark:text-white hover:text-blue-600 transition">Home</a></li>
            <li><a href="#" className="text-gray-700 dark:text-white hover:text-blue-600 transition">About</a></li>
            {/* Add more links as needed */}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
