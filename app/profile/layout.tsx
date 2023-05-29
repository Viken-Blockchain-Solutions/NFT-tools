

export const metadata = {
    title: 'NFTInsight Profile',
    description: 'ProfilePage for NFTInsight',
  }
    
  
  export default function ProfileLayout({children}: {children: React.ReactNode}) { 
    return (
        <>
        <div className='w-screen'>
              {children}
        </div>
        </>
    )
  }