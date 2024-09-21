import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"


function Home() {
  const {currentUser} = useContext(AuthContext)
  return (
    <div>
      <h2>Home Page</h2>
      <p>Your're curretly logged in as : {currentUser.email}</p>



    </div>
  )
}

export default Home
