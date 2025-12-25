import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeRequest } from "../redux/requestSlice";

interface Connection {
    _id: string;
    fromUserId: User ;
}

interface User {
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    about: string;
    photoUrl: string;
}

const RequestCard = ({ connection }: { connection: Connection }) => {
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const { firstName, lastName, photoUrl, about, age, gender } = connection.fromUserId;

    const reviewRequest = async (status: string) => {
        try {
            const response = await fetch(`${BASE_URL}/request/review/${status}/${connection._id}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            if (!response.ok) {
                return setError(data.error.message);
            }
            dispatch(removeRequest(connection._id));
        } catch (error) {
            if(error instanceof Error) {
                setError(error.message);
            }
        }
    }
    return (
        <li className="list-row bg-base-300 mb-2 last:mb-0">
            <div>
                <img className="size-10 rounded-box" src={photoUrl} />
            </div>
            <div>
                <div>{firstName} {lastName}</div>
                <p className="text-xs font-semibold opacity-60">{about || "No about"}</p>
                {age && gender && (
                    <p className="text-xs capitalize font-semibold opacity-60">{age}, {gender}</p>
                )}

            </div>
            <button className="btn btn-primary" onClick={() => reviewRequest('accepted')}>
                Accept
            </button>
            <button className="btn btn-secondary" onClick={() => reviewRequest('rejected')}>
                Reject
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </li>
    )
}

export default RequestCard