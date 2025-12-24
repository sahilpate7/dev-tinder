import EditProfile from "./EditProfile"
import { useSelector } from "react-redux"

const Profile = () => {
  const user = useSelector((state: any) => state.user);
  console.log(user);
  return (
    <div className="flex justify-center gap-4">
      {user && <EditProfile user={user} />}
    </div>
  )
}

export default Profile