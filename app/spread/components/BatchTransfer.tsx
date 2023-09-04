import React from 'react';
import Tab from '../enums/Tab';
import BatchTransferERC721Page from './BatchTransferERC721';
import BatchTransferERC20Page from './BatchTransferERC20';

interface BatchTransferProps {
  activeTab: Tab;
  userAccount: string | null;
}

const BatchTransfer: React.FC<BatchTransferProps> = ({ activeTab, userAccount }) => {
  return (
    <div className="grid flex-grow h-fit w-auto card bg-base-300 rounded-box place-items-center">
      {activeTab === Tab.ERC721 && <BatchTransferERC721Page userAccount={userAccount} />}
      {activeTab === Tab.ERC20 && <BatchTransferERC20Page userAccount={userAccount} />}
    </div>
  );
};

export default BatchTransfer;
