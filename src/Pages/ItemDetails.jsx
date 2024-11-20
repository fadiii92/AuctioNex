import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { retrieveItems } from "../redux/itemActions";
import ImageContainer from "../Components/ItemDetals/ImageContainer";
import OwnerItemDetails from "../Components/ItemDetals/OwnerItemDetails";
import NonOwnerDetails from "../Components/ItemDetals/NonOwnerDetails";
import ChatWithOwnerButton from "../Components/ItemDetals/ChatWithOwnerButton";
import Chat from '../Components/chat/Chat'
import { AuthContext } from "../context/AuthProvider";

function ItemDetails() {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [currentBid, setCurrentBid] = useState(0);
  const [haveWinner, setHaveWinner] = useState(false);
  const [formattedDescription, setFormttedDescription] = useState("");
  const { auctionItems } = useSelector((state) => state.auctionDataReducer);
  const [showChat, setShowChat] = useState(false);

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
      if (currentBid !== currentItem.startingBid) {
        setCurrentBid(currentItem.startingBid);
        setMainImage(currentItem.imgUrls ? currentItem.imgUrls[0] : "");
      }

      const descriptionText =
        currentItem?.description.length > 450
          ? currentItem?.description.slice(0, 400) + "... ..."
          : currentItem?.description;

      if (formattedDescription !== descriptionText) {
        setFormttedDescription(descriptionText);
      }

      if (!haveWinner && currentItem.winner) {
        setHaveWinner(true);
      }
    }
  }, [currentItem]);


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
        <ImageContainer
          mainImage={mainImage}
          currentItem={currentItem}
          setMainImage={setMainImage}
        />

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
                <span className="text-indigo-600">${currentBid}</span>
              </p>
              <p className="text-sm text-gray-500">
                Auction ends on:{" "}
                {new Date(currentItem?.auctionDuration).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Conditional Rendering Based on Pathname */}
          {pathname.includes("myItems") ? (
            <OwnerItemDetails
              currentItem={currentItem}
              haveWinner={haveWinner}
              setHaveWinner={setHaveWinner}
              itemId={itemId}
            />
          ) : (
            <NonOwnerDetails
              currentItem={currentItem}
              itemId={itemId}
              currentBid={currentBid}
              setCurrentBid={setCurrentBid}
              haveWinner={haveWinner}

            />
          )}
          {haveWinner && (Object.values(currentItem.winner)[0].user === currentUser.email || Object.values(currentItem.winner)[0].owner === currentUser.email) && <ChatWithOwnerButton
            path={pathname}
            onClick={() => setShowChat(true)}
          />}

          {showChat && (
            <Chat 
            itemId={itemId}
            currentUserId={currentUser.email}
            onClose={()=>setShowChat(false)}
            category={currentItem.category}
            
            />
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
