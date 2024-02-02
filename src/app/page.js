import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from '../FrontEnd/Homepage'
import Login from '../FrontEnd/Login'
import Signup from '../FrontEnd/Signup'
import Appbar from '../FrontEnd/Appbar'
import AuctionStatus from '../FrontEnd/AuctionStatus'
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
export default function Home() {
  return (
    <div>
      {/* <AppRouterCacheProvider>{children}</AppRouterCacheProvider> */}
      <BrowserRouter>
        <Routes>
          <Appbar />
          <Route path="/" component={Homepage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/auctionstatus" component={AuctionStatus} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
