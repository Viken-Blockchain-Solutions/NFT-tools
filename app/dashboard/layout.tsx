import Sidebar from "@components/Sidebar"
import Header from "./sections/Header"
import Dashboard from "./page"
import DashboardFooter from "./sections/DashboardFooter"

export const metadata = {
    title: 'NFTInsight',
    description: 'NFTInsight is an analytics and management tool for NFT Creators and Deployers',
  }
    
  
  export default function DashboardLayout({children}: {children: React.ReactNode}) { 
    return (
        <>
        <div className="app">   
            <div className="w-full flex flex-row">
                <Sidebar />
                <div className="flex-1 pt-10 mx-auto">
                    <Header />
                    {children}
                    <DashboardFooter />
                </div>
            </div>
        </div>
        </>
    )
  }