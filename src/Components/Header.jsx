import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const Header = () => {
  const { logout } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="bg-blue-500 shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo with styled text */}
          <div className="text-3xl font-bold">
            <NavLink to="/">
              <span className="text-white">Auctio</span>
              <span className="text-yellow-400">Nex</span>
            </NavLink>
          </div>

          {/* Hamburger menu for mobile */}
          <div className="block lg:hidden">
            <button
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
              onClick={toggleSidebar}
            >
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

          {/* Menu Items (Desktop) */}
          <nav className="hidden lg:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-yellow-400 font-bold' : 'text-white hover:text-yellow-300'
              }
            >
              Home
            </NavLink>
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
            <button className="text-red-500 hover:text-red-300 font-semibold" onClick={logout}>
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-blue-600 shadow-lg z-50 p-4">
          <button className="text-white text-2xl mb-4" onClick={toggleSidebar}>
            &times; {/* Close button */}
          </button>
          <nav className="flex flex-col">
            <NavLink to="/" onClick={toggleSidebar} className="text-white py-2 hover:text-yellow-300">
              Home
            </NavLink>
            <NavLink to="/listitem" onClick={toggleSidebar} className="text-white py-2 hover:text-yellow-300">
              List Item
            </NavLink>
            <NavLink to="/browse-auctions" onClick={toggleSidebar} className="text-white py-2 hover:text-yellow-300">
              Browse Auctions
            </NavLink>
            <NavLink to="/myitems" onClick={toggleSidebar} className="text-white py-2 hover:text-yellow-300">
              My Items
            </NavLink>
            <button
              className="text-red-500 hover:text-red-300 font-semibold py-2"
              onClick={() => { toggleSidebar(); logout(); }}
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
