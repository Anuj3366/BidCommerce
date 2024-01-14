import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter , Router,} from 'react-router-dom'
import Homepage from '../FrontEnd/Homepage'
import Login from '../FrontEnd/Login'
import Signup from '../FrontEnd/Signup'
import Appbar from '../FrontEnd/Appbar'
import AuctionStatus from '../FrontEnd/AuctionStatus'
export default function Home() {
  return (
    <div>
      <BrowserRouter>
        <Router>
          <Appbar />
          <Route path="/" component={Homepage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/auctionstatus" component={AuctionStatus} />
        </Router>
      </BrowserRouter>
    </div>
  )
}
