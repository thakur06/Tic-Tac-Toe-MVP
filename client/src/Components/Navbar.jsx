import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/fav.png';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-16 flex flex-row md:p-10 xs:p-4 justify-between items-center shadow-md bg-pink-800 shadow-pink-500">
      
      <div className="flex flex-row font-display text-2xl items-center">
        <img src={logo} alt="Logo" className="h-12 w-12" />
        <h1 className="ml-2"><Link to={"/"} >Tic Tac Toe</Link></h1>
      </div>

      
      <div className="md:hidden">
        <button
          className="text-gray-500 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Hamburger icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Right section with buttons (visible on medium and larger screens) */}
      <div className="hidden md:flex space-x-4">
        <button className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-100 to-pink-700 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <Link
            to="/"
            className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-slate-200 font-rye dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            Login
          </Link>
        </button>
        <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-700 to-pink-100 group-hover:from-cyan-500 group-hover:to-pink-100 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <Link
            to="/signin"
            className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-slate-200 font-rye dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            Signin
          </Link>
        </button>
      </div>

      {/* Dropdown menu (visible on small screens) */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} absolute top-16 right-0 text-white bg-pink-800 rounded-md shadow-2xl shadow-pink-900`}>
        <ul className="flex flex-col items-center space-y-2 py-4">
          <li>
            <Link
              to="/"
              className=" px-4 py-2 w-40 text-center"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signin"
              className="px-4 py-2 w-50 text-center"
              onClick={() => setIsOpen(false)}
            >
              Signin
            </Link>
          </li>

        </ul>
      </div>
    </div>
  );
};
