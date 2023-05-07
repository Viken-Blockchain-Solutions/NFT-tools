import { Table } from './Table';

export const FormResult = ({ data }: { data: any }) => {

    console.log("data",data);
    const collectionAAA = "0x210Dddfe9440567DD0C96D97CB72A7123074c0a1";
    return (
        <>
            <section className="container pt-10">
                <div className="mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-1 w-fit">
                            <div className="bg-white rounded-lg shadow-md">
                                <div className="px-4 py-5 sm:p-6">
                                    <h5 className="text-lg font-medium mb-2">Royalty Information</h5>
                                    <p className="text-gray-500">Royalty information will be displayed here.</p>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 w-fit">
                            <div className="bg-white rounded-lg shadow-md">
                                <div className="px-4 py-5 sm:p-6">
                                    <h5 className="text-lg font-medium mb-2">Transaction History</h5>
                                    <p className="text-gray-500">Transaction history will be displayed here.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="bg-white rounded-lg shadow-md">
                                <div className="px-4 py-5 sm:p-6 text-gray-800">
                                    <h5 className="text-lg font-medium mb-2">Secondary Sales Information</h5>
                                    <Table data={data}/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
};