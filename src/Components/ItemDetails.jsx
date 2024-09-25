import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveItems } from '../redux/itemActions';
import MyItems from '../HeaderPages/MyItems';

function ItemDetails() {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const {pathname} = useLocation()

  useEffect(() => {
    dispatch(retrieveItems());
  }, [dispatch]);

  const allItems = useSelector((state) => state.auctionDataReducer.auctionItems);
  const currentItem = Object.values(allItems)
    .flatMap((category) => category)
    .find((item) => item.key === itemId);
  
  const [mainImage, setMainImage] = useState(currentItem?.imgUrls ? currentItem.imgUrls[0] : '');


  //Handling bid
  const [bid, setBid] = useState('');
  const [currentBid, setCurrentBid] = useState(currentItem?.startingBid || 0);
  const [bidError, setBidError] = useState('');

  const handleBid = () => {
    const bidValue = parseInt(bid, 10);
    if (bidValue > currentBid) {
      setCurrentBid(bidValue);
      setBid('');
      setBidError('');
    } else {
      setBidError('Your bid must be higher than the current bid.');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        {/* Main image and thumbnails */}
        <div className="w-full lg:w-1/2 h-full bg-gray-100 rounded-lg overflow-hidden shadow-lg">
          {/* Main image */}
          {mainImage && (
            <div className="h-96 w-full flex justify-center items-center bg-white">
              <img
                src={mainImage}
                alt={currentItem?.itemTitle}
                className="object-contain w-[400px] h-[400px] max-w-full max-h-full"
              />
            </div>
          )}

          {/* Thumbnails (only if there are more than one image) */}
          {currentItem?.imgUrls && currentItem.imgUrls.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {currentItem.imgUrls.slice(0, 3).map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Thumbnail-${index}`}
                  onClick={() => setMainImage(url)}
                  className={`w-16 h-16 object-cover cursor-pointer border-2 rounded-md ${
                    mainImage === url ? 'border-blue-500' : 'border-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Item details on the right */}
        <div className="w-full lg:w-1/2 lg:ml-8 mt-6 lg:mt-0 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {currentItem?.itemTitle}
          </h2>
          <p className="text-lg text-gray-500 mb-2">
            Category: <span className="font-semibold">{currentItem?.category}</span>
          </p>
          <p className="text-gray-700 mb-6">{currentItem?.description}</p>

          <div className="flex justify-between items-center mb-4">
            <p className="text-2xl text-gray-800 font-semibold">
              Current Bid: <span className="text-blue-600">${currentBid}</span>
            </p>
            <p className="text-sm text-gray-500">
              Auction ends on: {new Date(currentItem?.auctionDuration).toLocaleDateString()}
            </p>
          </div>

          {/* Bid Input */}
          {pathname.includes('myItems')?(
              <>
                {<h1>from myitems</h1>}
              </>
          ):(
           <> <div className="flex items-center space-x-4">
           <input
             type="number"
             value={bid}
             onChange={(e) => setBid(e.target.value)}
             placeholder={`Bid more than $${currentBid}`}
             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
           />
           <button
             onClick={handleBid}
             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
           >
             Place Bid
           </button>
         </div>

         {/* Error Message */}
         {bidError && <p className="text-red-500 text-sm mt-2">{bidError}</p>}</>
          )}
         



        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
