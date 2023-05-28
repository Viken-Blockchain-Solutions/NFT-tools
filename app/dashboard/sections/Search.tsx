'use client'
import { useState, useEffect } from 'react'
import NFTCollectionCard from '@/components/NFTCollectionCard'
import { CollectionNftsResponse } from '@alch/alchemy-sdk'
import { NFTCollection } from '@types'


/* const NFTCollectionCardList = ({ data, handleTagClick }: {data: any, handleTagClick: any}) => {
  const { collectionMetadata } = data;
  
  return (
    <div className="mt-16 prompt_layout">
      {collectionMetadata.map((collectionMetadata: any) => (
        <NFTCollectionCard 
          key={collectionMetadata._id}
          data={collectionMetadata}
          handleTagClick={handleTagClick} 
          handleEdit={undefined} 
          handleDelete={undefined}
        />
      ))}
    </div>
  )
}
 */

const Search = () => {
    const [address, setAddress] = useState<string>(' ')
    const [collectionMetadata, setCollectionMetadata] = useState<any>();
    const [isError, setIsError] = useState(false);
    
    
/*     useEffect(() => {
      const fetchCollection   = async () => {
        const response = await fetch('/api/nftcollection')
        const data = await response.json()
        console.log(data)
      }
      fetchCollection()
    }, []) */

    async function handleFormSubmit(address: string) {
      try {
        const apikey = 'x5pi1Ykrq9fnCchoIdswHu9ijWHflqIs';
        const data = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v3/${apikey}/getContractMetadata?contractAddress=${address}`);
        const result: NFTCollection = await data.json();
        console.log(result)
        if(result.tokenType === 'NOT_A_CONTRACT' || result.tokenType === 'UNKNOWN')  { 
          console.log("This is error: ", result.tokenType);
          setIsError(true);
        }
        setCollectionMetadata(result);
  
      } catch (error) {
        console.log("This is error: ", error);
        setIsError(true);
      }
    };

    return (
        <section className='feed'>
            <form
                  className="relative w-full flex-center"
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log(address)
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
           {/*  <NFTCollectionCardList
            data={collectionMetadata}
            handleTagClick={() => {}}
            />	
 */}
        </section>
    )
}

export default Search;
