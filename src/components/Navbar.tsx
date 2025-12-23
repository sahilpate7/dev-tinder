import { useDispatch, useSelector } from "react-redux"
import { removeUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);

    const handleLogout = async() => {
        try {
            const response = await fetch(`${BASE_URL}/logout`, {
                method: 'POST',
                credentials: 'include'
            })
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            dispatch(removeUser({}));
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
       
    }
    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">DevTinder</a>
            </div>
            {user && (
                <div className="flex gap-2">
                <div className="dropdown dropdown-end mr-5">
                <span className="pr-3">Welcome, {user.firstName}</span>
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src={user.photoUrl} 
                        />
                    </div>
                </div>
                <ul
                    tabIndex={-1}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a onClick={handleLogout}>Logout</a></li>
                </ul>
                </div>
            </div>
        )}
        </div>  
    )
}

export default Navbar
