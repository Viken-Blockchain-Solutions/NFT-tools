import Header from "./Header";  
import Sidebar from "./Sidebar";
import Overview from "./Overview";
import Statistics from "./Statistics";
import Charts from "./Charts";
import Notifications from "./Notifications";
import Footer from "./DashboardFooter";

export const Collections = () => {
    return (
        <div className="w-full md:w-1/2 p-5 rounded-xl border-x-2 border-y-4 border-purple-500 ">
            <div className="mb-8 md:mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold font-heading"><span className="text-indigo-600">Stored </span>Collections</h2>
            </div>
            <div className="mb-8 md:mb-16">
                <p className="text-gray-500 leading-loose">
                    Table of stored collections from DB.
                </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <a href="https://vikenblockchain.com" className="inline-block py-4 px-8 leading-none text-white bg-indigo-600 hover:bg-indigo-700 font-semibold rounded shadow">
                    new collection
                </a>
            </div>
        </div>
    )
}
