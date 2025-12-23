import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [email, setEmail] = useState<string>('tanvi@gmail.com');
    const [password, setPassword] = useState<string>('Tanvi@123');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailId : email, password }),
                credentials: 'include'
            })

            const data = await response.json();

            dispatch(setUser(data.data))

            if (!response.ok) {
                setError(data.error);
            }
            setError('');
            navigate('/');
        } catch (error: any) {
            setError(error.message);
        }
    }

    return (
        <div className="flex justify-center items-center pt-20">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Login</legend>

                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button onClick={handleLogin} className="btn btn-neutral mt-4">Login</button>
                {error && <p className="text-red-500">{error}</p>}
            </fieldset>
        </div>
    )
}

export default Login