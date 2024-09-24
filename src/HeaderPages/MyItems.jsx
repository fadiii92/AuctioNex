import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthProvider';
import ParentCard from '../miniComponents/ParentCard';
import AuctionCard from '../miniComponents/AuctionCard';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveItems } from "../redux/itemActions"


function MyItems() {
  const {currentUser} = useContext(AuthContext)
  const allItems = useSelector((state) => state.auctionDataReducer.auctionItems)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveItems())
  }, [])

  return (
    <ParentCard>
    {Object.values(allItems).map((category) => {
      return category
        .filter((item) => item.itemOwner === currentUser.uid)
        .map((item) => (
          <AuctionCard
            key={item.id} 
            category={item.category}
            itemOwner={item.itemOwner}
            itemTitle={item.itemTitle}
            description={item.description}  
            startingBid={item.startingBid}
            image={item.imgUrls[0]}
          />
        ));
    })}
  </ParentCard>
  
  )
}

export default MyItems
