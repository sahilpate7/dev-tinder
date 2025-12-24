import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { setPosts } from "../redux/feedSlice";
import UserCard from "./userCard";

const Feed = () => {
  const feed = useSelector((state: any) => state.feed.posts);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const response = await fetch(`${BASE_URL}/feed`, {
        method: 'GET',
        credentials: 'include'
      })
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      dispatch(setPosts(data.data));
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    if(!feed.length) getFeed();
  }, []);
  
  if(!feed.length) return null;
  return (
    <div className="flex justify-center gap-4 pt-12">
      <UserCard person={feed[0]} />
    </div>
  )
}

export default Feed