import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo with styled text */}
        <div className="text-3xl font-bold">
          <NavLink to = '/'>
          <span className="text-white">Auctio</span>
          <span className="text-yellow-400">Nex</span>
          </NavLink>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="block lg:hidden">
          <button className="text-white focus:outline-none" aria-label="Toggle menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="hidden lg:flex space-x-6">
          <NavLink
            to="/listitem"
            className={({ isActive }) =>
              isActive ? 'text-yellow-400 font-bold' : 'text-white hover:text-yellow-300'
            }
          >
            List Item
          </NavLink>

          <NavLink
            to="/browse-auctions"
            className={({ isActive }) =>
              isActive ? 'text-yellow-400 font-bold' : 'text-white hover:text-yellow-300'
            }
          >
            Browse Auctions
          </NavLink>

          <NavLink
            to="/myitems"
            className={({ isActive }) =>
              isActive ? 'text-yellow-400 font-bold' : 'text-white hover:text-yellow-300'
            }
          >
            My Items
          </NavLink>

          <button className="text-red-500 hover:text-red-300 font-semibold" >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
