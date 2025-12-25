import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { removePost } from "../redux/feedSlice";

interface Person {
    _id: string;
    firstName: string;
    lastName: string;
    photoUrl: string;
    about: string;
    skills: string[];
    age: number;
    gender: string;
}

const UserCard = ({ person }: { person: Person }) => {
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const { firstName, lastName, photoUrl, about, skills, age, gender, _id } = person;


    const handleRequest = async (status: string) => {
        try {
            const response = await fetch(`${BASE_URL}/request/send/${status}/${_id}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            if (!response.ok) {
                return setError(data.message);
            }
            dispatch(removePost(_id));
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    }

    return (
        <div className="card bg-base-300 w-72 shadow-xl">
            <figure>
                <img
                    src={photoUrl}
                    alt={firstName}
                    className="w-full h-full object-cover max-w-72"
                />
            </figure>
            <div className="card-body p-4">
                <h2 className="card-title text-xl">{firstName} {lastName && lastName}</h2>
                <p>{about.slice(0, 100)}...</p>
                <div className="flex gap-2">
                     {gender && <p className="capitalize"><strong>Gender:</strong> {gender}</p>}
                     {age && <p><strong>Age: </strong> {age}</p>}
                </div>
                {skills && <p><strong>Skills:</strong> {skills.join(', ')}</p>}
                <div className="grid grid-cols-2 gap-3 mt-2">
                    <button className="btn btn-primary" onClick={() => handleRequest('ignored')}>Ignore</button>
                    <button className="btn btn-secondary" onClick={() => handleRequest('interested')}>Intrested</button>
                </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}

export default UserCard