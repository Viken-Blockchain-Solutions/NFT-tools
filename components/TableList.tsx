'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { GetOwnersForContractResponse } from "alchemy-sdk";

export const TableList = ({ holders }: { holders: GetOwnersForContractResponse }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(25);
    const [pagedItems, setPagedItems] = useState([] as any);

    useEffect(() => {
        setPagedItems(holders?.owners.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    }, [holders, currentPage, itemsPerPage]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const downloadCSV = useCallback(() => {
        const csvData = holders?.owners.reduce((csvString, holder, index) => {
            let row = `${index + 1},${holder}\n`;
            return csvString + row;
        }, "Index,Address\n");

        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'holders.csv';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [holders]);

    return (
        <>
            <div className="m-5">
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full table-auto">
                                    <thead className="bg-purple-600 border-b">
                                        <tr>
                                            <th className='col text-sm text-white font-medium px-6 py-4 whitespace-nowrap'>#</th>
                                            <th className='col text-sm text-white font-medium px-6 py-4 whitespace-nowrap'>Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pagedItems.map((holder: any, index: number) => {
                                            const rowNumber = (currentPage - 1) * itemsPerPage + index + 1;
                                            return (
                                                <tr key={holder} className="bg-gray-100 border-b">
                                                    <td className="text-xs text-gray-900 font-light px-6 py-4 text-center">{rowNumber}</td>
                                                    <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">{holder}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Pagination */}
                <nav aria-label="Page navigation example">
                    <ul className="list-style-none flex">
                        <li>
                            <button
                                disabled={currentPage === 1}
                                className="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Previous
                            </button>
                        </li>
                        {currentPage > 1 && (
                            <li>
                                <button
                                    className="relative block rounded-full px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    {currentPage - 1}
                                </button>
                            </li>
                        )}
                        <li>
                            <button
                                className="relative block rounded-full bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300"
                            >
                                {currentPage}
                            </button>
                        </li>
                        {currentPage < Math.ceil(holders?.owners.length / itemsPerPage) && (
                            <li>
                                <button
                                    className="relative block rounded-full px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    {currentPage + 1}
                                </button>
                            </li>
                        )}
                        <li>
                            <button
                                disabled={currentPage === Math.ceil(holders?.owners.length / itemsPerPage)}
                                className="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                   {/*  <button 
                        className="relative block bg-blue-600 rounded-lg px-3 py-1.5 text-sm  transition-all duration-30 text-white hover:bg-neutral-700 hover:text-white"
                        onClick={downloadCSV}
                    >
                        Download CSV
                    </button> */}
                </nav>
            </div>
        </>
    )
}
