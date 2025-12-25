import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { setRequests } from "../redux/requestSlice";
import { useEffect, useState } from "react";
import RequestCard from "./RequestCard";

const Requests = () => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const requests = useSelector((state: any) => state.request.requests);
  const fetchRequests = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/requests/received`, {
        method: 'GET',
        credentials: 'include'
      })
      const data = await response.json();
      if (!response.ok) {
        return setError(data.error.message);
      }
      console.log(data);
      dispatch(setRequests(data.data));
    } catch (error) {
      if(error instanceof Error) {
        setError(error.message);
      }
    }
  }

  useEffect(() => {
    if(!requests.length) fetchRequests();
  }, []);

  if(!requests) return null;

  if(requests.length === 0) return <p className="text-center">No requests found</p>
  
  return (
    <div>
            <h1 className="text-2xl font-bold mb-5 mt-5">Requests</h1>
            <div className="flex justify-center gap-4">
                <ul className="list bg-base-100 rounded-box shadow-md w-full">
                    {requests.map((request: any) => (
                        <RequestCard key={request._id} connection={request} />
                    ))}
                </ul>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </div>
  )
}

export default Requests