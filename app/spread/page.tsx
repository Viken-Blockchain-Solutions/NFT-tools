'use client'
import React, { useState } from 'react';
import BatchTransferERC721Page from '@/components/BatchTransferERC721';
import BatchTransferERC20Page from '@/components/BatchTransferERC20';

const Page = () => {
  const [userAccount, setUserAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setUserAccount(accounts[0]);
      console.log(`Connected to account ${accounts[0]}`);
    } catch (error) {
      console.log('Error connecting wallet:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>BatchTransferNft Dapp</h1>
      <button id="connectWallet" className="btn btn-primary mb-4" onClick={connectWallet}>
        Connect Wallet
      </button>
      <div className="row flex">
        <div className="col-md-6">
          <BatchTransferERC721Page userAccount={userAccount} />
          <BatchTransferERC20Page userAccount={userAccount} />
        </div>
        <div className="col-md-6">
          <h2>Summary and NFT Display</h2>
          <div id="summary">{/* Summary and NFT Display will be here */}</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
