import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider';
import { placeBid, retrieveItems } from '../../redux/itemActions';
import { useDispatch } from 'react-redux';

function NonOwnerDetails({currentItem, itemId, currentBid, setCurrentBid, haveWinner}) {
    const [bid, setBid] = useState("");
    const [bidError, setBidError] = useState("");
    const [bidPlaceMsg, setBidPlaceMsg] = useState("");
    const { currentUser } = useContext(AuthContext);
    const dispatch = useDispatch()


    const handleBid = async () => {
        const bidValue = parseInt(bid);
        if (bidValue > currentBid) {
          setCurrentBid(bidValue);
          setBid("");
          setBidError("");
          setBidPlaceMsg("Bid Placed successfully");
          await placeBid(bidValue, itemId, currentUser.email, currentItem.category, currentItem.itemOwner);
        } else {
          setBidError("Your bid must be higher than the current bid.");
          setBidPlaceMsg("");
        }
      };

  return (
    <div>
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
                  className={`px-4 py-2 text-white rounded-lg transition-all duration-200 shadow-md ${haveWinner
                    ? 'bg-gray-400 cursor-not-allowed' // Styles when disabled
                    : 'bg-blue-600 hover:bg-blue-700' // Styles when active
                    }`}
                  disabled={haveWinner}
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

              <div className="space-y-4">
                {haveWinner && (
                  <div>
                    {Object.values(currentItem.winner)[0].user === currentUser.email ? (
                      <span className="text-red-600 font-medium">
                        Congratulations! You've won.
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">
                        Winner Announced Better Luck Next time.
                      </span>
                    )}
                  </div>
                )}


                {currentItem?.recentBids && Object.keys(currentItem.recentBids).length > 0 ? (
                  Object.values(currentItem.recentBids)
                    .slice(-3)
                    .reverse()
                    .map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 p-4 rounded-lg shadow-md transition-transform transform"
                      >
                        <p className="text-sm text-gray-700">
                          Bid:{" "}
                          <span className="font-bold text-indigo-600">
                            ${item.bid}
                          </span>
                          {item.user === currentUser.email && (
                            <span className="text-green-600 font-semibold ml-2">
                              (You)
                            </span>
                          )}
                        </p>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-500 italic">No recent bids available.</p>
                )}
              </div>

    </div>
  )
}

export default NonOwnerDetails
