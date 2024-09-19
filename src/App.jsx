
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import { Login, Signup, Home } from './Components'
import Layout from './Layout'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
        <>

        <Route path='/' element= {<Layout />} >
              <Route index element = {<Home />} />

        </Route>
          <Route path='login' element = {<Login />} />
          <Route path='register' element = {<Signup />} />
        
        </>
    )
  )

  return (
   <>
        <RouterProvider router = {router} >



        </RouterProvider>
   </>
  )
}

export default App
