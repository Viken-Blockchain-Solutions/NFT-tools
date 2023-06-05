import { NFTCollection } from "@types";

const Search = ({ address, setAddress, setCollectionMetadata, handleSubmit, setToast }: { address: string, setAddress: any, setCollectionMetadata: any, handleSubmit: any, setToast: any }) => {

  async function handleFormSubmit(address: string) {
    
    try {
      const apikey = 'x5pi1Ykrq9fnCchoIdswHu9ijWHflqIs';
      const data = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v3/${apikey}/getContractMetadata?contractAddress=${address}`, {cache: 'no-store'});
      const result: NFTCollection = await data.json();

      if (result.tokenType === 'NOT_A_CONTRACT' || result.tokenType === 'UNKNOWN') {
        console.log("This is error: ", result.tokenType);
      }
      setCollectionMetadata(result);

    } catch (error) {
      console.log("This is error: ", error);
    }
  };

  return (
    <section className='feed'>
      <form
        className="relative w-full flex-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit(address)
        }}>
        <input
          type="text"
          className="search_input peer"
          onChange={(e) => setAddress(e.target.value.toString())}
          name="address"
          placeholder="Search for an address or a collection name"
          required
        />
        <button className=" text-white bg-blue-600 rounded-sm p-2 hover:bg-blue-400 mt-3 md:mt-0" type="submit">Search</button>
      </form>
      <div className="flex flex-row justify-between">
        {address !== ' ' && (<a onClick={handleSubmit}>Store Collection</a>)}
      </div>

    </section>
  )
}

export default Search;
