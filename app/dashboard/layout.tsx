import Sidebar from "@components/Sidebar"

export const metadata = {
    title: 'NFTInsight',
    description: 'NFTInsight is an analytics and management tool for NFT Creators and Deployers',
  }
    
  
  export default function DashboardLayout({children}: {children: React.ReactNode}) { 
    return (
        <>
        <div className='w-screen'>
              {children}
        </div>
        </>
    )
  }