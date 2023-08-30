'use client'
import React, { useState, FC, FormEvent } from 'react';
import BatchTransferERC721Page from '@/components/BatchTransferERC721';
import BatchTransferERC20Page from '@/components/BatchTransferERC20';

interface NavProps {
  connectWallet: () => Promise<void>;
}

const Nav: FC<NavProps> = ({ connectWallet }) => {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await connectWallet();
  };

  return (
    <div className="header shadow-xl">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a href="./" className="btn btn-ghost flex normal-case">
            <h2 className='flex flex-col md:flex-row md:text-xl'>
              Spread Dapp - <span>NFT Edition</span>
            </h2>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn btn-info" onClick={handleSubmit}>Connect Wallet</button>
        </div>
      </div>
    </div>
  );
};




/**
 * Renders the Page component.
 * @returns JSX.Element
 */
const Page = () => {
  const [userAccount, setUserAccount] = useState<string | null>(null);
  enum Tab {
    ERC721 = 'ERC721',
    ERC20 = 'ERC20',
  }

  const [activeTab, setActiveTab] = useState<Tab>(Tab.ERC721);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setUserAccount(accounts[0]);
        console.log(`Connected to account ${accounts[0]}`);
      } else {
        console.log('Ethereum object not found');
      }
    } catch (error) {
      console.log('Error connecting wallet:', error);
    }
  };

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='w-full md:mx-auto'>
        <Nav connectWallet={connectWallet} />
      <div className="container mt-4">
        <div className="my-5">
          <h1 className='font-satoshi'>BatchTransferNft Dapp</h1>
          <div className="prose">
            <button onClick={() => handleTabClick(Tab.ERC721)} className={`btn btn-outline hover:bg-yellow-200 ${activeTab === 'ERC721' ? 'active' : ''}`}>
              ERC721
            </button>
            <button onClick={() => handleTabClick(Tab.ERC20)} className={`btn btn-outline hover:bg-yellow-200 ${activeTab === 'ERC20' ? 'active' : ''}`}>
              ERC20
            </button>
          </div>
          <div className="flex flex-col w-full lg:flex-row">
        <div className="grid flex-grow h-fit w-auto card bg-base-300 rounded-box place-items-center">
          {activeTab === 'ERC721' && <BatchTransferERC721Page userAccount={userAccount} />}
          {activeTab === 'ERC20' && <BatchTransferERC20Page userAccount={userAccount} />}
        </div>
            <div className="divider lg:divider-horizontal">OR</div>
            <div className="grid flex-grow h-fit w-auto card bg-base-300 rounded-box place-items-center">
              <h2>Summary and NFT Display</h2>
              <div id="summary">{/* Summary and NFT Display will be here */}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

