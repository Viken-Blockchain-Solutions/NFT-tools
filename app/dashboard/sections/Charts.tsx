const Charts = () => {
    return (
        <section id="charts" className="container mx-auto mt-8">
            <div className="bg-white p-4 rounded-lg glassmorphism">
                <h2 className="text-lg font-bold mb-4">Charts & Tables</h2>
                <div className="flex justify-center">
                    <div className="w-64 h-64 glassmorphism rounded-lg">
                        {/* Add your chart component or chart library integration here */}
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Table Title</h3>
                    <table className="w-full border">
                        <thead className="bg-gray-200 bg-glass">
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
    )
}

export default Charts;