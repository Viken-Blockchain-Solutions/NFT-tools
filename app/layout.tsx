import Footer from '@components/layout/Footer';
import NavBar from '@components/layout/NavBar';
import { Analytics } from '@vercel/analytics/react';
import 'styles/globals.css';
import { Roboto } from "next/font/google";
import Provider from '@components/utils/Provider';
import Sidebar from '@components/layout/Sidebar';

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: 'NFTInsight',
  description: 'NFTInsight is an analytics and management tool for NFT Creators and Deployers',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Provider session={undefined}>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className="app">
            <NavBar />
            <div className="w-full flex-row flex">
              <Sidebar />
            
              <div className="flex-1 pt-10 mx-auto">
                {children}
              </div>

            </div>
          
          </main>
          <Footer />
        </Provider>
        <Analytics />
      </body>
    </html>
  )
}
