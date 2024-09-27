import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveItems, placeBid, deleteItem } from '../redux/itemActions';
import { AuthContext } from '../context/AuthProvider';

function ItemDetails() {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const { pathname } = useLocation()
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(retrieveItems());
    // dispatch(retriveBids())
  }, [dispatch]);

  const allItems = useSelector((state) => state.auctionDataReducer.auctionItems);
  const currentItem = Object.values(allItems)
    .flatMap((category) => category)
    .find((item) => item.key === itemId);

  // console.log(currentItem)

  const [mainImage, setMainImage] = useState(currentItem?.imgUrls ? currentItem.imgUrls[0] : '');


  //Handling bid
  const [bid, setBid] = useState('');
  const [currentBid, setCurrentBid] = useState(currentItem ? currentItem.startingBid : 0);
  const [bidError, setBidError] = useState('');
  const [bidPlaceMsg, setBidPlaceMsg] = useState('')
  const [cetagory, setCetagory] = useState(currentItem ? currentItem.category : 0)

  useEffect(() => {
    if (currentItem) {
      console.log(currentItem)
      setCurrentBid(currentItem.startingBid);
      setMainImage(currentItem.imgUrls ? currentItem.imgUrls[0] : '');
      setCetagory(currentItem?.category)
    }
  }, [currentItem]);

  const handleBid = async () => {
    const bidValue = parseInt(bid);
    if (bidValue > currentBid) {
      setCurrentBid(bidValue);
      setBid('');
      setBidError('');
      setBidPlaceMsg('Bid Placed successfully')
      await placeBid(bidValue, itemId, currentUser.email, cetagory)

    } else {
      setBidError('Your bid must be higher than the current bid.');
      setBidPlaceMsg('')
    }
  };

  const handleDelete = async ()=>{
    try{
      await deleteItem(itemId, cetagory)
      alert('Deleted Successfuly')
      navigate('/myitems')
    }
    catch(err){
      alert('Something Went wrong. Could not delete')
    }
  }

  return (
    <div className="container mx-auto py-10 min-h-screen">
      <div className="flex flex-col lg:flex-row items-center lg:items-start h-full">
        {/* Main image and thumbnails */}
        <div className="w-full lg:w-1/2 bg-gray-100 rounded-lg overflow-hidden shadow-lg h-full min-h-[500px]">
          {/* Main image */}
          {mainImage && (
            <div className="h-[500px] w-full flex justify-center items-center bg-white">
              <img
                src={mainImage}
                alt={currentItem?.itemTitle}
                className="object-contain w-[400px] h-[400px] max-w-full max-h-full"
              />
            </div>
          )}

          {/* Thumbnails */}
          {currentItem?.imgUrls && currentItem.imgUrls.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {currentItem.imgUrls.slice(0, 3).map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Thumbnail-${index}`}
                  onClick={() => setMainImage(url)}
                  className={`w-16 h-16 object-cover cursor-pointer border-2 rounded-md ${mainImage === url ? 'border-blue-500' : 'border-gray-300'
                    }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Item details */}
        <div className="w-full lg:w-1/2 lg:ml-8 mt-6 lg:mt-0 bg-white p-6 rounded-lg shadow-lg h-full min-h-[500px]">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            {currentItem?.itemTitle}
          </h2>

          <p className="text-lg text-gray-500 mb-4">
            Category: <span className="font-semibold">{currentItem?.category}</span>
          </p>

          <p className="text-gray-700 mb-8">{currentItem?.description}</p>

          <div className="flex justify-between items-center mb-8">
            <p className="text-2xl text-gray-800 font-semibold">
              Current Bid: <span className="text-blue-600">${currentBid}</span>
            </p>
            <p className="text-sm text-gray-500">
              Auction ends on: {new Date(currentItem?.auctionDuration).toLocaleDateString()}
            </p>
          </div>

          {/* Buttons or Bid Input */}
          {pathname.includes('myItems') ? (
            <div className="flex items-center space-x-4 mb-8">
              <button
                onClick={() => console.log('Edit clicked')}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
              >
                Delete
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center space-x-4 mb-6">
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


              {bidPlaceMsg && <p className="text-black text-sm mt-2">{bidPlaceMsg}</p>}
              {/* Error Message */}
              {bidError && <p className="text-red-500 text-sm mt-2">{bidError}</p>}
            </>
          )}
        </div>
      </div>
    </div>


  );
}

export default ItemDetails;
