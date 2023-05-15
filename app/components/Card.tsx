'use client';
import { useState, useEffect } from 'react';

export const Card = async () => {
    const [usdPrice, setUSDPrice] = useState(0);

    useEffect(() => {
        const getPrice = async () => {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
                {cache: 'no-store'});
            const data = await response.json();
            console.log(data);
            setUSDPrice(data.ethereum.usd);
        };
        getPrice();

    }, [usdPrice]);

    return (
            <div className="bg-white w-72 rounded-lg mx-auto">
                <div className="flex flex-row text-red-500 font-semibold">
                    <div className="p-5">
                        <h2 className="text-lg mx-auto">ETH/USD Price</h2>
                        <div className="p-5">
                            <p className="text-lg">{usdPrice} USD</p>
                        </div>
                    </div>
                </div>
            </div>
        );
}