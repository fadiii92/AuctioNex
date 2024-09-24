import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthProvider"
import { useDispatch, useSelector } from "react-redux"
import { retrieveItems } from "../redux/itemActions"
import ParentCard from "../miniComponents/ParentCard"
import AuctionCard from "../miniComponents/AuctionCard"



function Home() {
  const { currentUser } = useContext(AuthContext)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveItems())
  }, [])

  const allItems = useSelector((state) => state.auctionDataReducer.auctionItems)
   console.log(allItems)
  //  Object.values(allItems).map(curr=> console.log(curr))





  return (
    <div>
      <h1>Welcome to AuctioNex</h1>
      {currentUser ? (
        <p>You are logged in as: {currentUser.email}</p>
      ) : (
        <p>Please log in to access your account.</p>
      )}



      <ParentCard>
        {Object.values(allItems).map((category) => {
          return category.map((item) => (
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


    </div>
  )
}

export default Home
