import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthProvider"
import { useDispatch, useSelector } from "react-redux"
import { retrieveItems } from "../redux/itemActions"
import ParentCard from "../miniComponents/ParentCard"
import AuctionCard from "../miniComponents/AuctionCard"
import { Link } from "react-router-dom"

function Home() {
  const { currentUser } = useContext(AuthContext)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveItems())
  }, [])

  const allItems = useSelector((state) => state.auctionDataReducer.auctionItems)
  //  console.log(Object.values(allItems))
  //  Object.values(allItems).map(curr=> console.log(curr))





  return (
    <>

      <h1>Welcome to AuctioNex</h1>
      {currentUser && (
        <p>You are logged in as: {currentUser.email}</p>
      ) }



<ParentCard>
    {Object.values(allItems).map((category) => {
      return category
        .filter((item) => item.itemOwner !== currentUser.uid)
        .map((item) => (
          <Link to={`/allItems/${item.key}`}>

          <AuctionCard
            key={item.key} 
            id = {item.key}
            category={item.category}
            itemOwner={item.itemOwner}
            itemTitle={item.itemTitle}
            description={item.description}  
            startingBid={item.startingBid}
            images={item.imgUrls}
            />
            </Link>
        ));
    })}
  </ParentCard>


    </>
  )
}

export default Home
