import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { retrieveItems } from "../redux/itemActions";

function Results() {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(retrieveItems());
  }, [dispatch]);

  const ItemsInStore = Object.values(
    useSelector((state) => state.auctionDataReducer.auctionItems)
  ).flat();

  //   console.log(ItemsInStore[0].recendBids);

  //   const currUserBidItems = ItemsInStore.filter((item) => {
  //     item.recendBids &&
  //       Object.values(item.recendbids)
  //         .flat()
  //         .some((bidDetails) => bidDetails.bidder === currentUser.email);
  //   });
  //   console.log(currUserBidItems);

  return (
    <>
      <h1>Items You've Bid on</h1>
    </>
  );
}

export default Results;
