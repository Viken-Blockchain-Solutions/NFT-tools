import Footer from '@components/Footer';
import NavBar from '@components/NavBar';
import 'styles/globals.css';
import "tw-elements/dist/css/tw-elements.min.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: 'NFT Collection Management Tool',
  description: 'A tool for managing NFT collections',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className='main'>
          <div className='gradient'/>
        </div>

        <NavBar />
        <main className='app'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
