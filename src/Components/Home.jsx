import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"


function Home() {
  const {currentUser} = useContext(AuthContext)
  return (
    <div>
    <h1>Welcome to AuctioNex</h1>
    {currentUser ? (
      <p>You are logged in as: {currentUser.email}</p>
    ) : (
      <p>Please log in to access your account.</p>
    )}
  </div>
  )
}

export default Home
