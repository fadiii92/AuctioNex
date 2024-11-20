import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { retrieveItems } from "../../redux/itemActions";
import ParentCard from '../../Components/ItemCards/ParentCard'
import AuctionCard from "../../Components/ItemCards/AuctionCard";
import {Link} from  "react-router-dom";

function Results() {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(retrieveItems());
  }, [dispatch]);

  const ItemsInStore = Object.values(
    useSelector((state) => state.auctionDataReducer.auctionItems)
  ).flat();

  const currUserBidItems = ItemsInStore.filter((item) => {
    if (item.recentBids && Object.keys(item.recentBids).length > 0) {
      return Object.values(item.recentBids)
        .flat()
        .some((bidDetails) => bidDetails.user === currentUser.email);
    }

  });

  return (
    <>
    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center my-4">
      Items You've Bid On
    </h2>
  
    {currUserBidItems.length > 0 ? (
      <ParentCard className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {currUserBidItems.map((item) => (
          <Link
            key={item.key}
            to={`/allItems/${item.key}`}
            className="block hover:bg-gray-100 transition-colors duration-200 p-2 rounded-lg"
          >
            <AuctionCard
              id={item.key}
              category={item.category}
              itemOwner={item.itemOwner}
              itemTitle={item.itemTitle}
              description={item.description}
              startingBid={item.startingBid}
              images={item.imgUrls}
              className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            />
          </Link>
        ))}
      </ParentCard>
    ) : (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-lg font-semibold text-red-600">No Items Found</p>
      </div>
    )}
  </>
  
  );
}

export default Results;
