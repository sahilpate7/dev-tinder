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
            <div className="card-body">
                <h2 className="card-title">{firstName} {lastName}</h2>
                <p>{about} {_id}</p>
                {age && <p>Age: {age}</p>}
                {gender && <p>Gender: {gender}</p>}
                {skills && <p>Skills: {skills.join(', ')}</p>}
                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={() => handleRequest('ignored')}>Ignore</button>
                    <button className="btn btn-secondary" onClick={() => handleRequest('interested')}>Intrested</button>
                </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}

export default UserCard