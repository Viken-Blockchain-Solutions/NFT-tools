'use client'
import React from "react";
import { useSession } from 'next-auth/react';

const Dashboard: React.FC = () => {
  const { data: session } = useSession();

  return (
    <>
      {session?.user && (
        <div className="min-w-full min-h-screen flex flex-row">
          <aside className="bg-gray-800 text-white py-4 w-64">
            <div className="px-4">
              <h1 className="text-2xl font-bold">NFTInsight</h1>
              <ul className="mt-4">
                <hr className="bg-white w-1/2 my-5" />
                <li className="py-2">Profile</li>
                <li className="py-2">Settings</li>
                <li className="py-2">Dashboard</li>
              </ul>
            </div>
          </aside>

          <main className="flex-1 min-w-full px-12 ">
            <header className="bg-gray-200 py-4">
              <nav className="container m-10">
                <div className="flex flex-row justify-center">
                  <h3 className="text-2xl font-bold">Welcome To NFTInsight</h3>
                  <p className="text-md font-semibold">Coming Soon</p>
                </div>
              </nav>
            </header>

            <section id="overview" className="container mx-auto mt-8">
              <div className="bg-white p-4 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Overview</h2>
                <p className="text-gray-600">
                  You have a total of 10 NFT collections.
                </p>
                <p className="text-gray-600">
                  Total Revenue: $10,000
                </p>
                <p className="text-gray-600">
                  Total Royalty Earned: $1,000
                </p>
              </div>
            </section>

            <section id="statistics" className="container mx-auto mt-8">
              <div className="bg-white p-4 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Statistics</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-200 p-4 rounded-lg">
                    <h3 className="text-lg font-bold">Total Sales</h3>
                    <p className="text-gray-600">100</p>
                  </div>
                  <div className="bg-gray-200 p-4 rounded-lg">
                    <h3 className="text-lg font-bold">Total Owners</h3>
                    <p className="text-gray-600">50</p>
                  </div>
                  <div className="bg-gray-200 p-4 rounded-lg">
                    <h3 className="text-lg font-bold">Average Price</h3>
                    <p className="text-gray-600">$100</p>
                  </div>
                  <div className="bg-gray-200 p-4 rounded-lg">
                    <h3 className="text-lg font-bold">Total Royalty Earned</h3>
                    <p className="text-gray-600">$1,000</p>
                  </div>
                </div>
              </div>
            </section>


            <section id="charts" className="container mx-auto mt-8">
              <div className="bg-white p-4 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Charts & Tables</h2>
                <div className="flex justify-center">
                  <div className="w-64 h-64 bg-gray-200 rounded-lg">
                    {/* Add your chart component or chart library integration here */}
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Table Title</h3>
                  <table className="w-full border">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="border px-4 py-2">Column 1</th>
                        <th className="border px-4 py-2">Column 2</th>
                        <th className="border px-4 py-2">Column 3</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2">Data 1</td>
                        <td className="border px-4 py-2">Data 2</td>
                        <td className="border px-4 py-2">Data 3</td>
                      </tr>
                      {/* Add more rows of data as needed */}
                    </tbody>
                  </table>
                </div>

              </div>
            </section>



            <section id="notifications" className="container mx-auto mt-8">
              <div className="bg-white p-4 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Notifications</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M17.707 8.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L11 13.586l5.293-5.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <p className="text-gray-600">Congratulations! Your NFT has been sold.</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-red-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 6.293a1 1 0 010 1.414L7.414 12l5.293 5.293a1 1 0 01-1.414 1.414L6 13.414l-5.293 5.293a1 1 0 01-1.414-1.414L4.586 12 .293 7.707A1 1 0 011.707 6.293L6 10.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <p className="text-gray-600">Oops! There was an error processing your payment.</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 19a9 9 0 100-18 9 9 0 000 18zm0-1a8 8 0 100-16 8 8 0 000 16zM9 7a1 1 0 012 0v4a1 1 0 11-2 0V7zm0-5a1 1 0 012 0v1a1 1 0 11-2 0V2z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <p className="text-gray-600">You have a new message from a buyer.</p>
                  </div>
                </div>
              </div>
            </section>


            <footer className="bg-gray-200 py-4 my-12">
              <div className="container mx-auto">
                <p className="text-center text-gray-600">

                </p>
              </div>
            </footer>

          </main>
        </div>
      )}
    </>
  );
};

export default Dashboard;

