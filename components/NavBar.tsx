'use client';
import Image from 'next/image'
import logo from '../public/assets/images/logo-white.png'
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import Link from 'next/link';
import "tw-elements";




const NavBar = () => {
  const isUserLoggedIn = true;
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
      <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
        <div className="px-6 w-full flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <Link className="navbar-brand text-blue-600" href="https://vikenblockchain.com">
              <Image src={logo} alt='vbs' width={100} height={100} className='w-1/2' />
            </Link>
          </div>
          <div className="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
            <ul className="navbar-nav mr-auto lg:flex lg:flex-row">
              <li className="nav-item">
                <a className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">Team</a>
              </li>
              <li className="nav-item mb-2 lg:mb-0">
                <a className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">Projects</a>
              </li>
            </ul>
          </div>
          <div className="sm:flex hidden items-center lg:ml-auto">
            {isUserLoggedIn ? (
              <div className='flex items-center'>
                <div className='flex gap-3 md:gap-5'>
                  <Link href='/dashboard' className='black_btn'>
                    Dashboard
                  </Link>
                  <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => signOut()} data-mdb-ripple="true" data-mdb-ripple-color="light">Sign Out</button>
                    <div className='flex'>
                    <Image
                      className='rounded-full'
                      src="/assets/images/logo.svg"
                      alt='profile web3'
                      width={37}
                      height={37}
                      priority
                      onClick={() => {setToggleDropdown((prev) => !prev)}}
                    />
                    {toggleDropdown && (
                      <div className='dropdown '>
                        <Link 
                          href="/profile" 
                          className='dropdown_link '
                          onClick={() => {setToggleDropdown(false)}}
                        >
                        My Profile
                        </Link>
                        <Link 
                          href="/profile" 
                          className='dropdown_link'
                          onClick={() => {setToggleDropdown(false)}}
                        >
                        My Collections
                        </Link>
                        <button type='button' className='dropdown_link' onClick={() => {setToggleDropdown(false); signOut()}}>
                          Sign Out
                          </button>
                      </div>
                    )}
                    </div>
                </div>
              </div>
            ) : (
              <div className='flex items-center'>
                {providers && Object.values(providers).map((provider: any) => (
                  <>
                    <Link href="/login" key={provider.name} onClick={() => signIn(provider.id)} type="button" className="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light">Sign In</Link>
                    <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light">Sign up for free</button>
                  </>
                ))}
              </div>
            )}
          </div>
        </div>


        {/* Mobile */}
        <div className="sm:hidden flex relative navbar-collapse collapse w-full" id="navbarSupportedContentY">
          {isUserLoggedIn ? (
            <div className='flex'>{ }
              <Image
                className='rounded-full'
                src="/assets/images/logo.svg"
                alt='profile web3'
                width={37}
                height={37}
                priority
              />
            </div>
          ) : (
            <div className='flex items-center'>
            {providers && Object.values(providers).map((provider: any) => (
              <>
                <Link href="/login" key={provider.name} onClick={() => signIn(provider.id)} type="button" className="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light">Sign In</Link>
                <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light">Sign up for free</button>
              </>
            ))}
          </div>
          )}
        </div>

      </nav>
    </>

  )
}
export default NavBar;
