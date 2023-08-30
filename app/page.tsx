import { Features } from '@components/Features';
import { Hero } from '@components/Hero';
import NavBar from '@components/NavBar';


export default function Home() {

  return (
    <>
      <section className="w-full flex-center flex-col">
        <NavBar />
        <Hero />
        <hr className="mx-auto my-10 w-1/2 border-indigo-500" />
        <Features />
      </section>
    </>

  )
}
