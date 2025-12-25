import { BASE_URL } from "../utils/constants";
import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConnections } from "../redux/connectionsSlice";
import ConnectionCard from "./ConnectionCard";
import { useState } from "react";

const Connections = () => {
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const connections = useSelector((state: any) => state.connection.connections);
    const fetchConnections = async () => {
        try {
            const response = await fetch(`${BASE_URL}/user/connections`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json();
            if (!response.ok) {
                return setError(data.error.message);
            }
            dispatch(setConnections(data.data));

        } catch (error) {
            if(error instanceof Error) {
                setError(error.message);
            }
        }
    }

    useEffect(() => {
        if(!connections.length) fetchConnections();
    }, []);

    if(!connections) return null;

    if(connections.length === 0) return <p>No connections found</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-5 mt-5">Connections</h1>
            <div className="flex justify-center gap-4">
                <ul className="list bg-base-100 rounded-box shadow-md w-full">
                    {connections.map((connection: any) => (
                        <ConnectionCard key={connection._id} connection={connection} />
                    ))}
                </ul>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}

export default Connections