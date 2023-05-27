import SideBar from './sections/Sidebar';
export const metadata = {
    title: 'NFTInsight',
    description: 'NFTInsight is an analytics and management tool for NFT Creators and Deployers',
  }
    
  
  export default function DashboardLayout({children}: {children: React.ReactNode}) { 
    return (
        <>
        <div className="flex flex-col">
            <div className=''>
                <SideBar />
                {children}
            </div>
        </div>

        </>
    )
  }