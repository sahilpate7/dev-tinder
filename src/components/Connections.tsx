import { BASE_URL } from "../utils/constants";
import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConnections } from "../redux/connectionsSlice";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((state: any) => state.connections.connections);
    const fetchConnections = async () => {
        try {
            const response = await fetch(`${BASE_URL}/user/connections`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            dispatch(setConnections(data.data));

        } catch (error) {
            console.log(error);
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
                        <ConnectionCard connection={connection} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Connections