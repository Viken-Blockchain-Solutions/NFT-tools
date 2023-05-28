
const Overview = ({session}: {session: any}) => {

    return (
        <section id="overview" className="container mx-auto mt-8">
            <div className="bg-white p-4 rounded-lg glassmorphism">
                <div>
                    <h2 className="text-lg font-bold mb-4">Overview</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg glassmorphism">
                            <p className="text-gray-600">
                                UserName: <span className="font-bold">{session.user.name}</span>
                            </p>
                            <p className="text-gray-600">
                                Subscription:
                            </p>
                            <p className="text-gray-600">
                                Some Info:
                            </p>
                        </div>
                        <div className="p-4 rounded-lg glassmorphism">
                            <p className="text-gray-600">
                                You have a total of `add Number here`` NFT collections.
                            </p>
                            <p className="text-gray-600">
                                Total Revenue: $10,000
                            </p>
                            <p className="text-gray-600">
                                Total Royalty Earned: $1,000
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Collections</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg glassmorphism">
                            <h3 className="text-lg font-bold">Collection 1</h3>
                            <p className="text-gray-600">Total Sales: 100</p>
                            <p className="text-gray-600">Total Owners: 50</p>
                            <p className="text-gray-600">Average Price: $100</p>
                            <p className="text-gray-600">Total Royalty Earned: $1,000</p>
                        </div>
                        <div className="p-4 rounded-lg glassmorphism">
                            <h3 className="text-lg font-bold">Collection 2</h3>
                            <p className="text-gray-600">Total Sales: 100</p>
                            <p className="text-gray-600">Total Owners: 50</p>
                            <p className="text-gray-600">Average Price: $100</p>
                            <p className="text-gray-600">Total Royalty Earned: $1,000</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Overview;