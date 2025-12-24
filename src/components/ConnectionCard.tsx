
interface Connection {
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    about: string;
    photoUrl: string;
}

const ConnectionCard = ({ connection }: { connection: Connection }) => {
    const { firstName, lastName, photoUrl, about, age, gender } = connection;
    return (
        <li className="list-row bg-base-300">
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
            <button className="btn btn-primary btn-ghost">
                View
            </button>
        </li>
    )
}

export default ConnectionCard