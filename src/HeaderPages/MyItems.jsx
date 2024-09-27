import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthProvider';
import ParentCard from '../miniComponents/ParentCard';
import AuctionCard from '../miniComponents/AuctionCard';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveItems } from "../redux/itemActions"
import { Link } from 'react-router-dom';


function MyItems() {
  const {currentUser} = useContext(AuthContext)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(retrieveItems())
  }, [])
  
  const allItems = useSelector((state) => state.auctionDataReducer.auctionItems)
  return (
    <ParentCard>
      {Object.values(allItems).map((category) => {
      return category
        .filter((item) => item.itemOwner === currentUser.uid)
        .map((item) => (
          <Link to = {`/myItems/${item.key}`}>
          <AuctionCard
            key={item.key} 
            itemTitle={item.itemTitle}
            startingBid={item.startingBid}
            images={item.imgUrls}
            />
            </Link>
        ));
    })}
  </ParentCard>
  
  )
}

export default MyItems
