import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import './globals.css'
import { Montserrat } from 'next/font/google'

const mont = Montserrat({ subsets: ['latin'] })

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
      <body className={mont.className}>
        <NavBar />
          {children}
        <Footer />
      </body>
    </html>
  )
}
