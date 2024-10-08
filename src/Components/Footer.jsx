import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {

  return (
    <footer className="bg-indigo-600 p-6 shadow-inner">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-8">

        {/* Logo Section */}
        <div className="text-2xl font-bold text-white">
          <NavLink to="/" className="flex items-center space-x-1">
            <span className="text-white">Auctio</span>
            <span className="text-teal-300">Nex</span>
          </NavLink>
        </div>

        {/* Footer Links */}
        <div className="flex space-x-8">
          <NavLink
            to="/about"
            className="text-white hover:text-teal-200 transition-colors"
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className="text-white hover:text-teal-200 transition-colors"
          >
            Contact
          </NavLink>
          <NavLink
            to="/privacy-policy"
            className="text-white hover:text-teal-200 transition-colors"
          >
            Privacy Policy
          </NavLink>
          <NavLink
            to="/terms-and-conditions"
            className="text-white hover:text-teal-200 transition-colors"
          >
            Terms & Conditions
          </NavLink>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-teal-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M18 2h-3.5a4.5 4.5 0 00-4.5 4.5v3H7v4h3v8h4v-8h3l1-4h-4v-2a1 1 0 011-1h3V2z" />
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-teal-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M8 19c7.732 0 12-6.372 12-11.943v-.543A8.293 8.293 0 0022 4.79a8.2 8.2 0 01-2.356.633A4.109 4.109 0 0021.447 3a8.233 8.233 0 01-2.606.992 4.109 4.109 0 00-7.019 3.743A11.654 11.654 0 013 3.924a4.109 4.109 0 001.271 5.476A4.077 4.077 0 012 8.768v.05A4.109 4.109 0 004.107 13a4.074 4.074 0 01-1.85.07 4.109 4.109 0 003.835 2.85A8.23 8.23 0 012 17.539a11.6 11.6 0 006.29 1.833" />
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-teal-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M16 8a6 6 0 00-9 0v1H4v10h5V13a3 3 0 016 0v6h5V12a6 6 0 00-9-4zM6 7H5V6a2 2 0 012-2h2v1H6zm0 0H4v1h2v1H4zm0 0H2v1h2v1H2zm0 0H1v1h2v1H1zm0 0H0v1h2v1H0z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="mt-4 border-t border-teal-300 pt-4 text-center text-white text-sm">
        &copy; {new Date().getFullYear()} AuctioNex. All Rights Reserved.
      </div>
    </footer>

  )
}

export default Footer
