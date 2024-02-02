import React from 'react'
import Homepage from '../FrontEnd/Homepage'
import Login from '../FrontEnd/Login'
import Signup from '../FrontEnd/Signup'
import Appbar from '../FrontEnd/Appbar'
import AuctionStatus from '../FrontEnd/AuctionStatus'
export default function Home() {
  return (
    <div>
      <Appbar />
      <Link path="/" component={Homepage} />
      <Link path="/login" component={Login} />
      <Link path="/signup" component={Signup} />
      <Link path="/auctionstatus" component={AuctionStatus} />
    </div>
  )
}
