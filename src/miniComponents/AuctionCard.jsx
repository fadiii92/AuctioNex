import React from 'react';
import { Link } from 'react-router-dom';

const AuctionCard = ({id, itemTitle, startingBid, images }) => {
  return (
    

    <div
     className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
    //  onClick={handleItemClick()}
     >
      
      {/* Image */}
      <img className="w-full h-48 object-cover" src={images[0]} alt={itemTitle} />

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <div className="font-bold text-xl mb-2 text-gray-900">
          {itemTitle}
        </div>

        {/* Starting Bid */}
        <p className="text-gray-700 text-lg font-medium">
          Starting Bid: <span className="text-blue-600 font-semibold">${startingBid}</span>
        </p>
      </div>
    </div>
    // </Link>
  );
};

export default AuctionCard;
