
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Login, Signup, Home, MyItems, ListItems, NotFoundPage, ItemDetails } from './Components'
import Layout from './Layout'
import PrivateRoute from './context/PrivateRoute'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>

        <Route path='/' element={<Layout />} >
          <Route index element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='listitem' element={<PrivateRoute><ListItems /></PrivateRoute>} />
          <Route path='edititem/:id' element={<PrivateRoute><ListItems /></PrivateRoute>} />
          <Route path='allItems/:itemId' element={<PrivateRoute><ItemDetails /></PrivateRoute>} />
          <Route path='myitems' element={<PrivateRoute><MyItems /></PrivateRoute>} />
          <Route path='myItems/:itemId' element={<PrivateRoute><ItemDetails /></PrivateRoute>} />

          <Route path='cetagories/:cetagory' element={<PrivateRoute><Home /></PrivateRoute>} />
     

        </Route>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Signup />} />
        <Route path='*' element={<NotFoundPage />} />

      </>
    )
  )

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />

      </Provider>


    </>
  )
}

export default App
