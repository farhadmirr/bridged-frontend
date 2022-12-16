import { Outlet } from "react-router-dom";

import React from 'react'

const Layout = () => {
  return (
    <main className="Login">
        <Outlet />
    </main> 
  )
}

export default Layout