// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
  return (
    // Neo-brutalist style: bright bg, thick bottom border, hard-right shadow
    <nav className="bg-yellow-300 border-b-4 border-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo/Site Title linking to Home */}
        <Link 
          to="/" 
          className="text-2xl md:text-3xl font-bold uppercase text-black tracking-wider"
        >
          YourSite
        </Link>

        {/* Navigation Links */}
        <div className="space-x-2">
          <Link 
            to="/" 
            className="text-black font-bold uppercase border-2 border-black bg-white py-2 px-4 shadow-[3px_3px_0_0_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
          >
            Home
          </Link>
          {/* Add more links here if needed */}
          {/* <Link 
            to="/about" 
            className="hidden md:inline-block text-black font-bold uppercase border-2 border-black bg-white py-2 px-4 shadow-[3px_3px_0_0_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
          >
            About
          </Link>
          */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;