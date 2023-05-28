const Stats = () => {
    return (
        <section id="statistics" className="container mx-auto mt-8">
            <div className="bg-white p-4 rounded-lg glassmorphism">
                <h2 className="text-lg font-bold mb-4">Statistics</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg glassmorphism">
                        <h3 className="text-lg font-bold">Total Sales</h3>
                        <p className="text-gray-600">100</p>
                    </div>
                    <div className="p-4 rounded-lg glassmorphism">
                        <h3 className="text-lg font-bold">Total Owners</h3>
                        <p className="text-gray-600">50</p>
                    </div>
                    <div className="p-4 rounded-lg glassmorphism">
                        <h3 className="text-lg font-bold">Average Price</h3>
                        <p className="text-gray-600">$100</p>
                    </div>
                    <div className="p-4 rounded-lg glassmorphism">
                        <h3 className="text-lg font-bold">Total Royalty Earned</h3>
                        <p className="text-gray-600">$1,000</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Stats;
