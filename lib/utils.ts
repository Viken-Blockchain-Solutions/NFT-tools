'use server'


export async function getUSDPrice() {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`);
    const data = await response.json();
    console.log("eth:", data.ethereum.usd);
    let usd = data.ethereum.usd.toFixed(2);
    return usd;
}
