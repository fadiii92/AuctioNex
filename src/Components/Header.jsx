import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const Header = () => {
  const { logout } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown
  };

  return (
    <>
      <header className="bg-blue-500 shadow-md p-4 sticky top-0 z-50"> {/* Added sticky top */}
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

            {/* Dropdown for Browse Auctions */}
            <div className="relative">
              <button
                className="text-white hover:text-yellow-300 font-semibold focus:outline-none flex items-center"
                onClick={toggleDropdown}
              >
                Browse Auctions
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-blue-600 shadow-lg rounded-lg z-50">
                  <ul className="py-2 text-white">
                   <Link to = {`cetagories/${'electronics'}`}> <li className="hover:bg-blue-700 px-4 py-2 cursor-pointer">Electronics</li></Link>
                   <Link to = {`cetagories/${'clothing'}`}> <li className="hover:bg-blue-700 px-4 py-2 cursor-pointer">Clothing</li></Link>
                   <Link to = {`cetagories/${'furniture'}`}> <li className="hover:bg-blue-700 px-4 py-2 cursor-pointer">Furniture</li></Link>
                   <Link to = {`cetagories/${'books'}`}> <li className="hover:bg-blue-700 px-4 py-2 cursor-pointer">Books</li></Link>
                   <Link to = {`cetagories/${'other'}`}> <li className="hover:bg-blue-700 px-4 py-2 cursor-pointer">Other</li></Link>
                  </ul>
                </div>
              )}
            </div>

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

            {/* Sidebar dropdown for Browse Auctions */}
            <div className="relative">
              <button
                className="text-white py-2 hover:text-yellow-300 focus:outline-none flex items-center"
                onClick={toggleDropdown}
              >
                Browse Auctions
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="mt-2 bg-blue-700 rounded-lg shadow-lg">
                  <ul className="py-2 text-white">
                   <Link to = '/electronics'> <li className="hover:bg-blue-800 px-4 py-2 cursor-pointer">Electronics</li></Link>
                   <Link to = '/cloting'> <li className="hover:bg-blue-800 px-4 py-2 cursor-pointer">Clothing</li></Link>
                   <Link to = '/furniture'> <li className="hover:bg-blue-800 px-4 py-2 cursor-pointer">Furniture</li></Link>
                   <Link to = '/books'> <li className="hover:bg-blue-800 px-4 py-2 cursor-pointer">Books</li></Link>
                   <Link to = '/other'> <li className="hover:bg-blue-800 px-4 py-2 cursor-pointer">Other</li></Link>
                  </ul>
                </div>
              )}
            </div>

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
