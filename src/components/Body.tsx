import Navbar from "./Navbar"
import Footer from "./Footer"
import {Outlet} from "react-router-dom"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "../redux/userSlice"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);

    const fetchUser = async ()=>{
        try{
            const response = await fetch(`${BASE_URL}/profile/view`, {
                method: 'GET',
                credentials: 'include'
            })

            if(response.status === 401) {
                navigate('/login');
                return;
            }

            if(!response.ok) {
                throw new Error('Failed to fetch user');
            }

            const data = await response.json();
            dispatch(setUser(data.data))

        } catch (error: any) {
            console.error(error.message || 'something went wrong');
        }
    }
    useEffect(() => {
        if(!user) fetchUser();
    }, [])
  return (
    <div className="h-screen min-h-screen">
        <Navbar/>
        <Outlet />
        <Footer/>
    </div>
  )
}

export default Body