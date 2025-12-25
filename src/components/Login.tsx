import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailId: email, password }),
                credentials: 'include'
            })

            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
                return;
            }

            dispatch(setUser(data.data))

            setError('');
            navigate('/');
        } catch (error: any) {
            setError(error.message);
        }
    }

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailId: email, password, firstName, lastName }),
                credentials: 'include'
            })

            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
                return;
            }

            dispatch(setUser(data.data))

            setError('');
            navigate('/profile');
        } catch (error: any) {
            setError(error.message);
        }
    }

    return (
        <div className="flex justify-center items-center pt-20">
            <form onSubmit={isLoginForm ? handleLogin : handleRegister}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">{isLoginForm ? 'Login' : 'Register'}</legend>

                    {!isLoginForm && (
                        <>
                            <label className="label">First Name</label>
                            <input type="text" className="input" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>

                            <label className="label">Last Name</label>
                            <input type="text" className="input" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                        </>
                    )}
                    <label className="label">Email</label>
                    <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

                    <label className="label">Password</label>
                    <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

                    <button type="submit" className="btn btn-neutral mt-4">{isLoginForm ? 'Login' : 'Register'}</button>
                    <p className="text-center mt-4 cursor-pointer" onClick={() => setIsLoginForm(!isLoginForm)}>{isLoginForm ? 'Don\'t have an account? Register' : 'Already have an account? Login'}</p>
                    {error && <p className="text-red-500">{error}</p>}
                </fieldset>
            </form>
        </div>
    )
}

export default Login