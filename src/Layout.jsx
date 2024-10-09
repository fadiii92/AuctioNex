import React from 'react'
import { Outlet } from 'react-router-dom'
import {Header, Footer} from './Components'

function Layout() {
  return (
    <div>
      <Header />
      <main className='min-h-screen '>
      <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
