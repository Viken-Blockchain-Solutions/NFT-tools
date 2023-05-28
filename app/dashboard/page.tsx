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
        <div className="w-full flex flex-row">
          <Sidebar />
          <main className="flex-1 pt-10 mx-auto">
            <Header />
            <Search />
            <Overview session={session}/>
            <Stats />
            <Charts />
            <Notifications />
            <hr className="my-12" />
            <DashboardFooter />
          </main>
          <Sidebar />
        </div>
      )}
    </>
  );
};

export default Dashboard;

