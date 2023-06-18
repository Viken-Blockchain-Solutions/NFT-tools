import { useSession } from "next-auth/react"

export const UserCard = () => {
    const { data: session } = useSession();

    console.log(session?.user?.name)
    const user = session?.user;
    
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{user?.name}</h2>
                <p className="font-satoshi text-gray-500">{user?.email}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Fuck Off</button>
                </div>
            </div>
        </div>
    )
}
