
export const TableList = ({holders} : {holders: any}) => {
    let sum = 0;
  return (
    <div className="m-5">
    <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
            <table className="min-w-full">
                <thead className="bg-white border-b">
                        <tr>
                            <th className='col text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap'>#</th>
                            <th className='col text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap'>Address</th>
                        </tr>
                </thead>
                <tbody>
                    {holders?.owners.map((holder: any) => {
                        sum++
                        return (
                        <tr key={holder} className="bg-gray-100 border-b">
                            <td className="text-xs text-gray-900 font-light px-6 py-4 ">{sum}</td>
                            <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">{holder}</td>
                        </tr>
                    )})}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    </div>
</div>
  )
}
