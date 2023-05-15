'use server'


export default async function getEthInUsdPrice() {
    const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`,
        {cache: 'no-store'}
    );
    const data = await response.json();
    let usd = data.ethereum.usd.toFixed(2);
    return usd;
}


