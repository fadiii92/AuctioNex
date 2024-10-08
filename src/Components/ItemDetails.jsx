import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { retrieveItems, placeBid, deleteItem } from "../redux/itemActions";
import { AuthContext } from "../context/AuthProvider";
import ConfirmPopup from "../miniComponents/ConfirmPopup";

function ItemDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { itemId } = useParams();
  const { pathname } = useLocation();
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [bid, setBid] = useState("");
  const [currentBid, setCurrentBid] = useState(0);
  const [bidError, setBidError] = useState("");
  const [bidPlaceMsg, setBidPlaceMsg] = useState("");
  const [category, setCategory] = useState("");
  const [isModelOpen, setisModelOpen] = useState(false);
  const [formattedDescription, setFormttedDescription] = useState("");
  const { auctionItems } = useSelector((state) => state.auctionDataReducer);

  const currentItem = Object.values(auctionItems)
    .flatMap((category) => category)
    .find((item) => item.key === itemId);

  useEffect(() => {
    dispatch(retrieveItems()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentItem) {
      setCurrentBid(currentItem.startingBid);
      setMainImage(currentItem.imgUrls ? currentItem.imgUrls[0] : "");
      setCategory(currentItem.category);

      if (currentItem?.description.length > 450) {
        setFormttedDescription(
          currentItem?.description.slice(0, 400) + "... ..."
        );
      } else {
        setFormttedDescription(currentItem?.description);
      }
    }
  }, [currentItem]);

  const handleBid = async () => {
    const bidValue = parseInt(bid);
    if (bidValue > currentBid) {
      setCurrentBid(bidValue);
      setBid("");
      setBidError("");
      setBidPlaceMsg("Bid Placed successfully");
      await placeBid(bidValue, itemId, currentUser.email, category);
    } else {
      setBidError("Your bid must be higher than the current bid.");
      setBidPlaceMsg("");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteItem(itemId, category);
      navigate("/myitems");
      alert("Deleted Successfully");
    } catch (err) {
      alert("Something went wrong. Could not delete");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!currentItem) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-red-600">Item not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col lg:flex-row items-stretch h-full">
        {/* Main Image Section */}
        <div className="w-full lg:w-1/2 bg-gray-100 rounded-lg overflow-hidden shadow-lg h-full flex flex-col justify-between">
          {mainImage && (
            <div className="h-[500px] w-full flex justify-center items-center bg-white">
              <img
                src={mainImage}
                alt={currentItem?.itemTitle}
                className="object-contain w-[400px] h-[400px] max-w-full max-h-full shadow-md"
              />
            </div>
          )}

          {/* Thumbnail Images */}
          {currentItem?.imgUrls && currentItem.imgUrls.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2 p-2 bg-gray-200 rounded-md shadow-inner">
              {currentItem.imgUrls.slice(0, 3).map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Thumbnail-${index}`}
                  onClick={() => setMainImage(url)}
                  className={`w-16 h-16 object-cover cursor-pointer border-2 rounded-md transition duration-200 ease-in-out transform ${
                    mainImage === url
                      ? "border-blue-500 scale-110"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Item Details Section */}
        <div className="w-full lg:w-1/2 lg:ml-8 mt-6 lg:mt-0 bg-white p-6 rounded-lg shadow-lg h-full flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {currentItem?.itemTitle}
            </h2>

            <p className="text-lg text-gray-500 mb-4">
              Category:{" "}
              <span className="font-semibold">{currentItem?.category}</span>
            </p>
            <p className="text-gray-700 mb-8">{formattedDescription}</p>

            <div className="flex justify-between items-center mb-8">
              <p className="text-2xl text-gray-800 font-semibold">
                Current Bid:{" "}
                <span className="text-blue-600">${currentBid}</span>
              </p>
              <p className="text-sm text-gray-500">
                Auction ends on:{" "}
                {new Date(currentItem?.auctionDuration).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Conditional Rendering Based on Pathname */}
          {pathname.includes("myItems") ? (
            <>
              {/* Edit and Delete Buttons */}
              <div className="flex items-center space-x-4 mb-8">
                <button
                  onClick={() =>
                    navigate(`/editItem/${itemId}`, { state: currentItem })
                  }
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-200 shadow-md"
                >
                  Edit
                </button>

                <button
                  onClick={() => setisModelOpen(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md"
                >
                  Delete
                </button>
              </div>
              <ConfirmPopup
                open={isModelOpen}
                onClose={() => setisModelOpen(false)}
                deleteItem={handleDelete}
              />

              <h3 className="text-lg font-semibold mt-6 mb-4">All Bids</h3>
              <div className="space-y-2">
                {currentItem?.recendBids &&
                Object.values(currentItem.recendBids).length > 0 ? (
                  Object.values(currentItem.recendBids)
                    .slice(-3)
                    .reverse()
                    .map((item, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-300 p-3 rounded-md shadow-sm"
                      >
                        <p className="text-sm text-gray-700">
                          Bidder: {item.user}
                        </p>
                        <p className="text-sm text-gray-700">
                          Bid: ${item.bid}
                        </p>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-500">No bids have been placed yet.</p>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Place Bid Input and Button */}
              <div className="flex items-center space-x-4 mb-6">
                <input
                  type="number"
                  value={bid}
                  onChange={(e) => setBid(e.target.value)}
                  placeholder={`Bid more than $${currentBid}`}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <button
                  onClick={handleBid}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
                >
                  Place Bid
                </button>
              </div>

              {/* Messages for Bid Placement */}
              {bidPlaceMsg && (
                <p className="text-black text-sm mt-2">{bidPlaceMsg}</p>
              )}
              {bidError && (
                <p className="text-red-500 text-sm mt-2">{bidError}</p>
              )}

              {/* Show Recent Bids for Non-Owner */}
              <div className="flex justify-between items-center mt-6 mb-4">
                <h3 className="text-lg font-semibold">Recent Bids</h3>
                <button
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                  onClick={() => {
                    dispatch(retrieveItems());
                    setBidPlaceMsg("");
                  }}
                >
                  Reload
                </button>
              </div>

              <div className="space-y-2">
                {currentItem?.recendBids &&
                Object.keys(currentItem.recendBids).length > 0 ? (
                  Object.values(currentItem.recendBids)
                    .slice(-3)
                    .reverse()
                    .map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 p-3 rounded-md shadow-md"
                      >
                        <p className="text-sm text-gray-700">
                          Bid: ${item.bid}
                        </p>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-500">No recent bids available.</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {formattedDescription.length > 300 && (
        <div className="itemDescription mt-8 bg-gray-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Item Description
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {currentItem?.description}
          </p>
        </div>
      )}
    </div>
  );
}

export default ItemDetails;
