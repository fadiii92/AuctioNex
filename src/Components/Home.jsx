import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthProvider"
import AuctionCard from "../miniComponents/AuctionCard"
import { useDispatch, useSelector } from "react-redux"
import { retrieveItems } from "../redux/itemActions"


function Home() {
  const { currentUser } = useContext(AuthContext)
  const dispatch = useDispatch()

  useEffect(()=>{
   dispatch(retrieveItems()) 
  },[])

 const allItems = useSelector((state)=>state.auctionDataReducer.auctionItems)
 console.log(Object.values(allItems))
  
  
  
  return (
    <div>
      <h1>Welcome to AuctioNex</h1>
      {currentUser ? (
        <p>You are logged in as: {currentUser.email}</p>
      ) : (
        <p>Please log in to access your account.</p>
      )}

     


      <AuctionCard image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpaQN1D80MShu3r-RASjp5AgVR8QaVWCGv5g&s"
        title="Vintage Watch"
        startingBid={100} />  <AuctionCard image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpaQN1D80MShu3r-RASjp5AgVR8QaVWCGv5g&s"
        title="Vintage Watch"
        startingBid={100} />  <AuctionCard image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpaQN1D80MShu3r-RASjp5AgVR8QaVWCGv5g&s"
        title="Vintage Watch"
        startingBid={100} />  <AuctionCard image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpaQN1D80MShu3r-RASjp5AgVR8QaVWCGv5g&s"
        title="Vintage Watch"
        startingBid={100} />  <AuctionCard image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpaQN1D80MShu3r-RASjp5AgVR8QaVWCGv5g&s"
        title="Vintage Watch"
        startingBid={100} />  <AuctionCard image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpaQN1D80MShu3r-RASjp5AgVR8QaVWCGv5g&s"
        title="Vintage Watch"
        startingBid={100} />  <AuctionCard image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpaQN1D80MShu3r-RASjp5AgVR8QaVWCGv5g&s"
        title="Vintage Watch"
        startingBid={100} />  <AuctionCard image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpaQN1D80MShu3r-RASjp5AgVR8QaVWCGv5g&s"
        title="Vintage Watch"
        startingBid={100} />  <AuctionCard image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpaQN1D80MShu3r-RASjp5AgVR8QaVWCGv5g&s"
        title="Vintage Watch"
        startingBid={100} />
    </div>
  )
}

export default Home
