
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import { Login, Signup, Home, MyItems, ListItems, NotFoundPage } from './Components'
import Layout from './Layout'
import PrivateRoute from './context/PrivateRoute'
import { Provider } from 'react-redux'
import store from './redux/store'
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
        <>

        <Route path='/' element= {<Layout />} >
              <Route index element = {<PrivateRoute><Home /></PrivateRoute>} />
              <Route path='listitem' element = {<PrivateRoute><ListItems /></PrivateRoute>} />
              <Route path='myitems' element = {<PrivateRoute><MyItems /></PrivateRoute>} />

        </Route>
          <Route path='login' element = {<Login />} />
          <Route path='register' element = {<Signup />} />
          <Route path='*' element = {<NotFoundPage />} />
        
        </>
    )
  )

  return (
   <>
      <Provider store = {store}>
      <RouterProvider router={router} />
    
      </Provider>


   </>
  )
}

export default App
