import { INftCollection } from "@models/nftCollection";
import Image from "next/image";
import logo from "@public/assets/images/Viken (Black).jpg";
import { abbreviatedAddress } from "@components/cards/UserCollectionsCard";

type StatProps = {
  collectionData: INftCollection;
};

const Stats = ({ collectionData }: StatProps) => {
  console.log(collectionData)
  const { _id, name, description, contractAddress, floorPrice, deployed_blocknumber, deployer, image, symbol, totalSupply } = collectionData;

  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl my-10 mx-auto">
        <figure className="w-full h-fit" >
          <Image src={image || logo} alt="Collection" width={200} height={280} priority/>
        </figure>
        <div className="card-body w-fit">
          <h2 className="card-title">{name}</h2>
          <p className="font-lightbold text-stone-400 text-xs">{description? description : "No description available for this collection"}</p>
          <div>
            <div className="stats shadow my-10">
              <div className="stat">
                <div className="stat-title">Total Supply</div>
                <div className="stat-value">{totalSupply}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Collection Address</div>
                <div className="stat-value">{abbreviatedAddress(contractAddress)}</div>
              </div>
            </div>
          </div>
          
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Show Stats</button>
          </div>
        </div>
      </div>

      {/* 
      <div className="stats shadow my-10">
        <div className="stat">
          <div className="stat-title">Total Supply</div>
          <div className="stat-value">{totalSupply}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Collection Name</div>
          <div className="stat-value">{name}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Collection Symbol</div>
          <div className="stat-value">{symbol}</div>
        </div>
      </div>

      <div className="stats shadow my-10">
      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Total Sales</div>
        <div className="stat-value">31K</div>
        <div className="stat-desc">Jan 1st - Feb 1st</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Total Holders</div>
        <div className="stat-value">4,200</div>
        <div className="stat-desc">↗︎ 400 (22%)</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Total Royalty</div>
        <div className="stat-value">1,200</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
      </div>
    </div> */}
    </>
  );
};

export default Stats;
