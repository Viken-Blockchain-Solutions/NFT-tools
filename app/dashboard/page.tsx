'use client'
import { useSession } from 'next-auth/react';

const Dashboard: React.FC = () => {
  const { data: session } = useSession();

  return (
    <>
      {session?.user && (
        <div className='min-w-screen min-h-screen'>
          <header className="bg-gray-200 py-4">
            <nav className="container mx-auto">
              <h3 className="text-lg font-bold">NAVIGATION</h3>
            </nav>
          </header>

          <aside className="bg-gray-800 text-white py-4">
            <div className="px-4">
              <h3 className="text-lg font-bold">Aside</h3>
              <ul className="mt-4">
                <li className="py-2">Profile</li>
                <li className="py-2">Settings</li>
                <li className="py-2">Dashboard</li>
              </ul>
            </div>
          </aside>

          <main>
            <section id="overview" className="container mx-auto mt-8">
              <div className="bg-white p-4 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Overview</h2>
                {/* Add your overview content here */}
              </div>
            </section>

            <section id="statistics" className="container mx-auto mt-8">
              <div className="bg-white p-4 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Statistics</h2>
                {/* Add your statistics content here */}
              </div>
            </section>

            <section id="charts" className="container mx-auto mt-8">
              <div className="bg-white p-4 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Charts</h2>
                {/* Add your charts content here */}
              </div>
            </section>

            <section id="notifications" className="container mx-auto mt-8">
              <div className="bg-white p-4 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Notifications</h2>
                {/* Add your notifications content here */}
              </div>
            </section>
          </main>

          <footer className="bg-gray-200 py-4">
            {/* Add your footer content here */}
          </footer>
        </div>
      )}
    </>
  );
};

export default Dashboard;
