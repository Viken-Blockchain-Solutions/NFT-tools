import Footer from '@components/Footer';
import NavBar from '@components/NavBar';
import { Analytics } from '@vercel/analytics/react';
import 'styles/globals.css';
import "tw-elements/dist/css/tw-elements.min.css";
import { Roboto } from "next/font/google";
import { Provider } from '@components/Provider';

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: 'NFTInsight',
  description: 'NFTInsight is an analytics and management tool for NFT Creators and Deployers',
}


export default function RootLayout({children}: {children: React.ReactNode}) { 
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Provider session={undefined}>
        <div className='main'>
          <div className='gradient'/>
        </div>

        <main className='app'>
        <NavBar />
        {children}
        </main>
        <Footer />
        </Provider>
        <Analytics />
      </body>
    </html>
  )
}
