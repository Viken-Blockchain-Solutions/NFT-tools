'use client';
import Image from 'next/image'
import logo_white from '@/public/assets/images/logo-white.png'
import logo from '@/public/assets/images/logo.png'
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';




const NavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const response: any = await getProviders();
      setProviders(response);
    };
    fetchProviders();
  })

  return (
    <>

      <nav className="flex-between w-full mb-16 pt-3">
        <div className="px-6 w-full flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <Link className="navbar-brand text-blue-600" href="/">
              <Image src={logo_white} alt='vbs' width={100} height={100} className='w-1/2' />
            </Link>
          </div>

          {/* Desktop */}
          <div className="sm:flex hidden ">
            {session?.user ? (
              <div className='flex items-center'>
                <div className='flex gap-3 md:gap-5'>
                  <Link href="/dashboard" className="black_btn">
                    Dashboard
                  </Link>
                  <Link href="/nftcollections" className="black_btn">
                    Collections
                  </Link>
                  <Link href={"/"}>
                    <button type="button" onClick={() => {signOut(); router.push('/');}} className="outline_btn">
                      Sign Out
                    </button>
                  </Link>
                  <div className='flex'>
                    <Image
                      className='rounded-full'
                      src={session?.user?.image as string || logo}
                      alt='profile web3'
                      width={37}
                      height={37}
                      priority
                      onClick={() => { setToggleDropdown((prev) => !prev) }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex items-center'>
                {providers && Object.values(providers).map((provider: any) => (
                  <div key={provider.name} >
                    <button onClick={() => { signIn(provider.id) }} type="button" className="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light">Sign In</button>
                    <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light">Sign up for free</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>


        {/* Mobile */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex">
              <Image
                src={session.user.image || logo}
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile Picture"
                onClick={() => setToggleDropdown((prev) => !prev)}
                priority
              />

              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false)
                      signOut()
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

          ) : (
            <div className='flex items-center'>
              {providers && Object.values(providers).map((provider: any) => (
                <div key={provider.name}>
                  <button onClick={() => signIn(provider.id)} type="button" className="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light">Sign In</button>
                  <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light">Sign up for free</button>
                </div>
              ))}
            </div>
          )}
        </div>

      </nav>
    </>

  )
}
export default NavBar;