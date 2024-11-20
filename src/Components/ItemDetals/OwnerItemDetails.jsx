import React, { useState } from 'react'
import ConfirmPopup from "../../Portals/ConfirmPopup";
import BidsPopup from "../../Portals/BidsPopup";
import { useNavigate } from 'react-router-dom';
import { deleteItem, handleWinner, retrieveItems } from '../../redux/itemActions';
import { useDispatch } from 'react-redux';
import Spinner from '../utils/Spinner';

function OwnerItemDetails({ currentItem, itemId, haveWinner, setHaveWinner }) {
  const [isModelOpen, setisModelOpen] = useState(false);
  const [isBidModelOpen, setisBidModelOpen] = useState(false);
  const [errormsg, setErrorMsg] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [endAuctLoading, setendAuctLaoding] = useState(false)


  const handleDelete = async () => {
    try {
      await deleteItem(itemId, currentItem.category);
      navigate("/myitems");
      alert("Deleted Successfully");
      setErrorMsg('')
    } catch (err) {
      setErrorMsg(err)
    }
  };

  const endAuctionHandler = async () => {
    try {
      //getting last user beacuse last object contain highest bid
      const winner = (Object.values(currentItem.recentBids).slice(-1))[0]
      setendAuctLaoding(true)
      await handleWinner(winner, currentItem.category).then(res=>setendAuctLaoding(false))
      setHaveWinner(true)
      console.log(winner, " is the winner")
      setErrorMsg('')
    }
    catch (error) {
      setErrorMsg(error)
    }
  }


  return (
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

        <button
          onClick={endAuctionHandler}
          className={`px-4 py-2 text-white rounded-lg transition-all duration-200 shadow-md ${currentItem.winner ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
            }`}
          disabled={!!currentItem?.winner}
        >
          {endAuctLoading ? <Spinner /> : 'End Auction'} 
        </button>

      </div>
      <ConfirmPopup
        open={isModelOpen}
        onClose={() => setisModelOpen(false)}
        deleteItem={handleDelete}
      />

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
        {haveWinner && (
          <span className="text-red-600 font-medium">
            You declared a winner
          </span>
        )}
        {currentItem?.recentBids &&
          Object.values(currentItem.recentBids).length > 0 ? (
          Object.values(currentItem.recentBids)
            .slice(-3)
            .reverse()
            .map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 p-4 rounded-md shadow-md"
              >
                <p className="text-sm text-gray-700 font-semibold">
                  Bidder: <span className="text-indigo-600">{item.user}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Bid: <span className="font-bold text-teal-600">${item.bid}</span>
                </p>
              </div>

            ))
        ) : (
          <p className="text-gray-500">No bids have been placed yet.</p>
        )}
        <button
          onClick={() => setisBidModelOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md"
        >
          Show list of all Bids
        </button>


        <BidsPopup
          open={isBidModelOpen}
          onClose={() => setisBidModelOpen(false)}
          currentItem={currentItem}

        />
      </div>
      {errormsg && (
                <p className="text-red-500 text-sm mt-2">{errormsg}</p>
              )}
    </>
  )
}

export default OwnerItemDetails
