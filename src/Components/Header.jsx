import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';


const Header = () => {
  const {logout} = useContext(AuthContext)
  return (
    <header className="bg-gray-200 shadow">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo with styled text */}
        <div className="text-3xl font-bold">
          <span className="text-blue-600">Auctio</span>
          <span className="text-orange-500">Nex</span>
        </div>
        
        {/* Menu Items */}
        <nav className="space-x-4">
          <a href="/list-item" className="text-gray-700 hover:text-blue-500">List Item</a>
          <a href="/browse-auctions" className="text-gray-700 hover:text-blue-500">Browse Auctions</a>
          <a href="/my-items" className="text-gray-700 hover:text-blue-500">My Items</a>
          <button className="text-gray-700 hover:text-red-500" onClick={logout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
