
interface Person {
    firstName: string;
    lastName: string;
    photoUrl: string;
    about: string;
    skills: string[];
    age: number;
    gender: string;
}

const UserCard = ({person}: {person: Person}) => {
    const {firstName, lastName, photoUrl, about, skills, age, gender} = person;
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
                <p>{about}</p>
                {age && <p>Age: {age}</p>}
                {gender && <p>Gender: {gender}</p>}
                {skills && <p>Skills: {skills.join(', ')}</p>}
                <div className="card-actions justify-center">
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Intrested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard