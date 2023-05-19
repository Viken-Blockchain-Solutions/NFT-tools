import { Features } from '@/components/Features';
import { Hero } from '@/components/Hero';


export default function Home() {

  return (
    <>
      <main className="flex min-h-screen flex-col bg-white gap-5">
          <Hero />
          <hr className="mx-auto my-10 w-1/2 border-indigo-500" />
          <Features />
      </main>
    </>

  )
}
