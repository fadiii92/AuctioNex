import React from 'react';

function ParentCard({ children }) {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Auction Items</h2>
      
      {/* Grid layout for auction cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {children}
      </div>
    </div>
  );
}

export default ParentCard;
