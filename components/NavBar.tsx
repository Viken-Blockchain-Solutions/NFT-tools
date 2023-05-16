'use client'
import { useState, useEffect } from "react";
import { PriceCard } from "./PriceCard";

const NavBar = () => {
  const [usdPrice, setUsdPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(usdPrice);

  
  useEffect(() => {
    const getPrice = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
        );
        const data = await response.json();
        const usd = data.ethereum.usd.toFixed(2);
        setUsdPrice(usd);
      }

    getPrice();

  }, []);
  

  return (
      <nav className="max-w-screen py-10">
        <section>
          <h1 className="text-4xl text-center font-semibold">NFT Collection Information</h1>
          <p className="text-center my-5">Input the collection address and get the sales and royalty data displayed in the screen</p>
        </section>
      
        <PriceCard usdPrice={usdPrice} oldPrice={oldPrice}/>
      </nav>

    )
}
  
export default NavBar;