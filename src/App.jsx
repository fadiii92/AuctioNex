
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import { Login, Signup, Home } from './Components'
import Layout from './Layout'
import PrivateRoute from './context/PrivateRoute'
import AuthProvider from './context/AuthProvider'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
        <>

        <Route path='/' element= {<Layout />} >
              <Route index element = {<PrivateRoute><Home /></PrivateRoute>} />

        </Route>
          <Route path='login' element = {<Login />} />
          <Route path='register' element = {<Signup />} />
        
        </>
    )
  )

  return (
   <>
 
      <RouterProvider router={router} />
    


   </>
  )
}

export default App
