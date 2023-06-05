'use client'
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { CustomUser } from "@types";
import Image from "next/image";
import logo from "@public/assets/images/Viken.jpg";
import UserCollections from "@/components/cards/UserCollectionsCard";
import Link from "next/link";

const Sidebar = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<CustomUser>();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (session?.user) {
      const sessionUser: CustomUser = session.user as CustomUser;
      setUserData(sessionUser);
    } else {
      console.log("No user in session");
    }
  }, [session?.user]);

  useEffect(() => {
    if (sidebarRef.current) {
      const sidebarElement = sidebarRef.current;
      const handleResize = () => {
        if (sidebarElement.scrollHeight > sidebarElement.clientHeight) {
          sidebarElement.style.overflowY = "auto";
        } else {
          sidebarElement.style.overflowY = "initial";
        }
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <aside ref={sidebarRef} className="max-w-md text-black py-4 glassmorphism m-10 bg-gray-200 sticky top-0">
      <div className="px-4">
        <h1 className="orange_gradient text-3xl font-bold"> NFTInsight </h1>
        <hr className="bg-purple-600 w-1/2 my-5" />
        <div> 
          {userData ? (
            <>
              <h2 className="text-sm font-bold">User information:</h2>
              <div className="flex flex-row mx-3 py-5">
                <Image src={userData?.image || logo} alt="profile picture" className="rounded-full" width={40} height={40} />
                <div className="mx-5 flex-col">
                  <p className="mx-2 mb-2 text-sm font-light">{userData?.name}</p>
                  <p className="mx-2 text-xs font-light">{userData?.email}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col">
              <h2 className="text-sm font-bold">User information:</h2>
              <p className="text-xs font-light">No user found</p>
              <hr className="bg-purple-600 w-1/2 my-5" />
            </div>
          )}
        </div>
        <div>
          <ul className="my-5">
            <hr className="bg-purple-600 w-1/2 my-5" />
            <Link href={"/dashboard"}>
              <li className="py-2 font-satoshi">Dashboard</li>
            </Link>
            <Link href={"/profile"}>
              <li className="py-2">Profile</li>
            </Link>
            <Link href={"/collections"}>
              <li className="py-2">Collections</li>
            </Link>
          </ul>
        </div>
        <div>
          <hr className="bg-purple-600 w-1/2 my-5" />
          <h2 className="text-sm font-bold">Your stored collections:</h2>
          {/* <UserCollections /> */}
          </div>
      </div>
    </aside>
  )
}

export default Sidebar;
