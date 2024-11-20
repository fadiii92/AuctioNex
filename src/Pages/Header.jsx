import React, { useContext, useRef, useState, useEffect } from "react";
import { NavLink, Link, useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Search from "../Components/Search";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isResDropdownOpen, setIsResDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const { pathname } = useLocation();
  const { cetagory } = useParams();
  const dropdownRef = useRef(null);
  const dropdownRefRes = useRef(null);
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }

      if (
        dropdownRefRes.current &&
        !dropdownRefRes.current.contains(event.target)
      ) {
        setIsResDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleResDropdown = () => {
    setIsResDropdownOpen(!isResDropdownOpen);
  };


  return (
    <>
      <header className="bg-indigo-600 shadow-lg p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-3xl font-bold">
            <NavLink to="/" className="flex items-center">
              <span className="text-white">Auctio</span>
              <span className="text-teal-300">Nex</span>
            </NavLink>
          </div>

          {/* Search Bar */}
        <Search />

          {/* Hamburger menu for mobile */}
          <div className="block lg:hidden">
            <button
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
              onClick={toggleSidebar}
              ref={hamburgerRef}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          <nav className="hidden lg:flex space-x-8 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-teal-300 font-bold"
                  : "text-white hover:text-teal-200 transition-colors"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/listitem"
              className={({ isActive }) =>
                isActive
                  ? "text-teal-300 font-bold"
                  : "text-white hover:text-teal-200 transition-colors"
              }
            >
              List Item
            </NavLink>

            {/* Dropdown for Browse Auctions */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="text-white hover:text-teal-200 font-semibold focus:outline-none flex items-center min-l min-w-[100px]"
                onClick={toggleDropdown}
              >
                {pathname.includes(cetagory) ? (
                  <span>
                    {cetagory.charAt(0).toUpperCase() +
                      cetagory.slice(1).toLowerCase()}
                  </span>
                ) : (
                  <span>Browse</span>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-indigo-700 shadow-lg rounded-lg z-50">
                  <ul className="py-2 text-white">
                    <Link to={`cetagories/${"electronics"}`}>
                      <li className="hover:bg-indigo-800 px-4 py-2 cursor-pointer">
                        Electronics
                      </li>
                    </Link>
                    <Link to={`cetagories/${"clothing"}`}>
                      <li className="hover:bg-indigo-800 px-4 py-2 cursor-pointer">
                        Clothing
                      </li>
                    </Link>
                    <Link to={`cetagories/${"furniture"}`}>
                      <li className="hover:bg-indigo-800 px-4 py-2 cursor-pointer">
                        Furniture
                      </li>
                    </Link>
                    <Link to={`cetagories/${"books"}`}>
                      <li className="hover:bg-indigo-800 px-4 py-2 cursor-pointer">
                        Books
                      </li>
                    </Link>
                    <Link to={`cetagories/${"other"}`}>
                      <li className="hover:bg-indigo-800 px-4 py-2 cursor-pointer">
                        Other
                      </li>
                    </Link>
                  </ul>
                </div>
              )}
            </div>

            <NavLink
              to="/myitems"
              className={({ isActive }) =>
                isActive
                  ? "text-teal-300 font-bold"
                  : "text-white hover:text-teal-200 transition-colors"
              }
            >
              My Listings
            </NavLink>

            <NavLink
              to="/results"
              className={({ isActive }) =>
                isActive
                  ? "text-teal-300 font-bold"
                  : "text-white hover:text-teal-200 transition-colors"
              }
            >
              Results
            </NavLink>

            <button
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md border border-transparent hover:bg-red-600 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-all duration-300"
              onClick={() => {
                toggleSidebar();
                logout();
              }}
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed top-0 right-0 w-64 h-full bg-indigo-700 shadow-lg z-50 p-4 overflow-y-auto"
          ref={sidebarRef}
        >
          <div className="text-3xl font-bold">
            <NavLink to="/" className="flex items-center">
              <span className="text-white">Auctio</span>
              <span className="text-teal-300">Nex</span>
            </NavLink>
          </div>
          <nav className="flex flex-col gap-2">
            <NavLink
              to="/"
              onClick={toggleSidebar}
              className="text-white py-2 hover:text-teal-200"
            >
              Home
            </NavLink>
            <NavLink
              to="/listitem"
              onClick={toggleSidebar}
              className="text-white py-2 hover:text-teal-200"
            >
              List Item
            </NavLink>

            {/* Sidebar dropdown for Browse Auctions */}
            <div className="relative" ref={dropdownRefRes}>
              <button
                className="text-white py-2 hover:text-teal-200 focus:outline-none flex items-center"
                onClick={toggleResDropdown}
              >
                Browse Auctions
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                    isResDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isResDropdownOpen && (
                <div>
                  <ul className="py-2 text-white list-disc pl-4">
                    <Link to={`cetagories/${"electronics"}`}>
                      <li className="hover:bg-indigo-800 py-2 cursor-pointer">
                        Electronics
                      </li>
                    </Link>
                    <Link to={`cetagories/${"clothing"}`}>
                      <li className="hover:bg-indigo-800 py-2 cursor-pointer">
                        Clothing
                      </li>
                    </Link>
                    <Link to={`cetagories/${"furniture"}`}>
                      <li className="hover:bg-indigo-800 py-2 cursor-pointer">
                        Furniture
                      </li>
                    </Link>
                    <Link to={`cetagories/${"books"}`}>
                      <li className="hover:bg-indigo-800 py-2 cursor-pointer">
                        Books
                      </li>
                    </Link>
                    <Link to={`cetagories/${"other"}`}>
                      <li className="hover:bg-indigo-800 py-2 cursor-pointer">
                        Other
                      </li>
                    </Link>
                  </ul>
                </div>
              )}
            </div>

            <NavLink
              to="/myitems"
              onClick={toggleSidebar}
              className="text-white py-2 hover:text-teal-200"
            >
              My Listings
            </NavLink> 
            <NavLink
            to="/results"
              className="text-white py-2 hover:text-teal-200"
            >
              Results
            </NavLink>
            <button
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md border border-transparent hover:bg-red-600 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-all duration-300"
              onClick={() => {
                toggleSidebar();
                logout();
              }}
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
