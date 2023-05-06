import Image from 'next/image'
import Header from './components/Header'
import SearchForm from './components/Search'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-normal">
       <SearchForm />

        <section className="container pt-10">
        <div className="mt-20">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <div className="bg-white rounded-lg shadow-md">
                <div className="px-4 py-5 sm:p-6">
                  <h5 className="text-lg font-medium mb-2">Royalty Information</h5>
                  <p className="text-gray-500">Royalty information will be displayed here.</p>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-white rounded-lg shadow-md">
                <div className="px-4 py-5 sm:p-6">
                  <h5 className="text-lg font-medium mb-2">Transaction History</h5>
                  <p className="text-gray-500">Transaction history will be displayed here.</p>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-white rounded-lg shadow-md">
                <div className="px-4 py-5 sm:p-6">
                  <h5 className="text-lg font-medium mb-2">Primary Sales Information</h5>
                  <p className="text-gray-500">Primary sales information will be displayed here.</p>
                </div>
              </div>
            </div>
          </div>

         
        </div>
        </section>
      </main>

    </>

  )
}
