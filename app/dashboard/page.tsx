'use client'
import React from "react";
import { useSession } from 'next-auth/react';
import Sidebar from "@components/Sidebar";
import Header from "./sections/Header";
import Search from "./sections/Search";
import Overview from "./sections/Overview";
import Stats from "./sections/Stats";
import Charts from "./sections/Charts";
import Notifications from "./sections/Notifications";
import DashboardFooter from "./sections/DashboardFooter";

const Dashboard: React.FC = () => {
  const { data: session } = useSession();

  return (
    <>
      {session?.user && (
        <div className="w-screen h-full flex flex-row">
          <Sidebar />

          <main className="flex-1 p-12">
            <Header />
            <Search />
            <Overview session={session}/>
            <Stats />
            <Charts />
            <Notifications />
            <hr className="my-12" />
            <DashboardFooter />
          </main>
        </div>
      )}
    </>
  );
};

export default Dashboard;

