import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Login, Signup, Home, MyItems, ListItems, NotFoundPage, ItemDetails, FooterPages, Results } from './Pages'
import { SearchProvider } from './context/searchContext'
import PrivateRoute from './context/PrivateRoute'
import { Provider } from 'react-redux'
import store from './redux/store'
import { useState } from 'react'
import Layout from './Layout'

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>

        <Route path='/' element={<Layout />} >
          <Route index element={<PrivateRoute> <Home /> </PrivateRoute>} />
          <Route path='myitems' element={<PrivateRoute> <MyItems /> </PrivateRoute>} />
          <Route path='listitem' element={<PrivateRoute> <ListItems /> </PrivateRoute>} />
          <Route path='edititem/:id' element={<PrivateRoute> <ListItems /> </PrivateRoute>} />
          <Route path='allItems/:itemId' element={<PrivateRoute> <ItemDetails /> </PrivateRoute>} />
          <Route path='myItems/:itemId' element={<PrivateRoute> <ItemDetails /> </PrivateRoute>} />
          <Route path='cetagories/:cetagory' element={<PrivateRoute> <Home /> </PrivateRoute>} />
          <Route path="/contact" element={<FooterPages />} />
          <Route path="/results" element={<Results />} />
          <Route path="/about" element={<FooterPages />} />
          <Route path="/privacy-policy" element={<FooterPages />} />
          <Route path="/terms-and-conditions" element={<FooterPages />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route path="*" element={<NotFoundPage />} />
      </>
    )
  );

  return (
    <>
      <Provider store={store}>
        <SearchProvider value={{ searchQuery, updateSearchQuery }}>
          <RouterProvider router={router} />
        </SearchProvider>
      </Provider>
    </>
  );
}

export default App;
