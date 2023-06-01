'use client';

import UserCollections from "@app/dashboard/sections/UserCollections";
import { useSession } from "next-auth/react";
import { CustomUser } from "@types";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@public/assets/images/Viken.jpg";



const Sidebar = () => {
    const { data: session } = useSession();
    const [userData, setUserData] = useState<CustomUser>();

    useEffect(() => {
        if (session?.user) {
            const sessionUser: CustomUser = session.user as CustomUser;
            setUserData(sessionUser);
        } else {
            console.log("No user in session");
        }
    }, [session?.user]);

    return (
        <aside className="text-black py-4 glassmorphism m-10">
            <div className="px-4">
                <h1 className="green_gradient text-3xl font-bold">NFTInsight</h1>
                <ul className="my-5">
                    <hr className="bg-purple-900 w-1/2 my-5" />
                    <li className="py-2">Profile</li>
                    <li className="py-2">Settings</li>
                    <li className="py-2">Dashboard</li>
                </ul>
                <hr className="bg-purple-900 w-1/2 my-5" />
                {userData ? (
                    <>
                        <h2 className="text-sm font-bold">User information:</h2>
                        <div className="flex flex-row mx-3 py-5">
                            <Image src={userData?.image || logo} alt="profile picture" className="rounded-full" width={40} height={40}/>
                            <div className="mx-5 flex-col">
                                <p className="mx-2 mb-2 text-sm font-light">{userData?.name}</p>
                                <p className="mx-2 text-xs font-light">{userData?.email}</p>
                            </div>
                        </div>
                        <hr className="bg-purple-900 w-1/2 my-5" />
                        <UserCollections />
                    </>
                ): (
                    <div className="flex flex-col">
                        <h2 className="text-sm font-bold">User information:</h2>
                        <p className="text-xs font-light">No user found</p>
                        <hr className="bg-purple-900 w-1/2 my-5" />
                    </div>
                )}
                
            </div>
        </aside>
    )
}

export default Sidebar;
