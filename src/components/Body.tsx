import Navbar from "./Navbar"
import Footer from "./Footer"
import {Outlet} from "react-router-dom"

const Body = () => {
  return (
    <div className="h-screen min-h-screen">
        <Navbar/>
        <Outlet />
        <Footer/>
    </div>
  )
}

export default Body