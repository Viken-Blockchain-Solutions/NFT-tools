'use client'
import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import TabButtons from './components/TabButtons';
import BatchTransfer from './components/BatchTransfer';
import SummaryDisplay from './components/SummaryDisplay';
import Tab from './enums/Tab';

const Page: React.FC = () => {
  const [userAccount, setUserAccount] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.ERC20 || null);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setUserAccount(accounts[0]);
    } catch (error) {
      console.log('Error connecting wallet:', error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='w-full md:mx-auto'>
      <Nav connectWallet={connectWallet} />
      <div className="container mt-4">
        <div className="my-5">
          <h1 className='font-satoshi'>BatchTransferNft Dapp</h1>
          <TabButtons activeTab={activeTab} handleTabClick={handleTabClick} />
          <div className="flex flex-col w-full lg:flex-row">
            <BatchTransfer activeTab={activeTab} userAccount={userAccount} />
            <div className="divider lg:divider-horizontal">OR</div>
            <SummaryDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
