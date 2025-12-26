import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }: { user: any }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState(user?.firstName)
    const [lastName, setLastName] = useState(user?.lastName);
    const [age, setAge] = useState(user?.age);
    const [gender, setGender] = useState(user?.gender);
    const [about, setAbout] = useState(user?.about);
    const [skills, setSkills] = useState(user?.skills);
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
    const _id = user?._id;
    const dispatch = useDispatch();
 
    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/profile/edit`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    age: age,
                    gender: gender,
                    about: about,
                    photoUrl: photoUrl,
                }),
                credentials: 'include'
            })
            const data = await response.json();
            if (!response.ok) {
                setLoading(false);
                setError(data.error);
                return;
            }
            dispatch(setUser(data.data));
            setLoading(false);
            console.log(data);
        } catch (error) {
            setLoading(false);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unexpected error occurred");
            }
        }

    }

    return (
        <div className="flex justify-center gap-4 mt-8">
            <form onSubmit={handleSave}>
                <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-lg border px-5 py-8">
                    <div className="flex gap-4 mb-2">
                        <div className="w-1/2">
                            <label className="label mb-2">First Name</label>
                            <input
                                type="text"
                                className="input w-full"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="label mb-2">Last Name</label>
                            <input
                                type="text"
                                className="input w-full"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 mb-2">
                        <div className="w-1/2">
                            <label className="label mb-2">Age</label>
                            <input
                                type="number"
                                className="input w-full"
                                placeholder="Age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="label mb-2">Gender</label>
                            <select
                                className="select w-full"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <label className="label mb-2">Photo URL</label>
                    <input
                        type="text"
                        className="input w-full"
                        placeholder="Photo URL"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        required
                    />
                    <label className="label">About</label>
                    <textarea
                        className="textarea w-full"
                        placeholder="About"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        required
                        cols={50}
                        rows={3}
                    />
                    <label className="label">Skills</label>
                    <textarea
                        className="textarea w-full"
                        placeholder="Skills"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        cols={50}
                        rows={3}
                    />
                    {error && <div className="text-error mb-4 font-bold text-center">{error}</div>}

                    <button type="submit" className="btn btn-primary mt-3">{loading ? 'Loading...' : 'Update'}</button>
                </fieldset>
            </form>
            {user && <UserCard person={{firstName, lastName, photoUrl, about, skills, age, gender,_id}} />}
        </div>
    )
}

export default EditProfile