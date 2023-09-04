'use client'
import React, { useState } from 'react';
import { ethers } from 'ethers';

type Recipient = {
  address: string;
  tokenId: string;
};

type BatchTransferERC721Props = {
  userAccount: string | null;
};

const BatchTransferERC721Page: React.FC<BatchTransferERC721Props> = ({ userAccount }) => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleAddRecipient = () => {
    setRecipients([...recipients, { address: '', tokenId: '' }]);
  };

  const handleRemoveRecipient = (index: number) => {
    const updatedRecipients = recipients.filter((_, i) => i !== index);
    setRecipients(updatedRecipients);
  };

  const handleRecipientAddressChange = (index: number, value: string) => {
    const newRecipients = [...recipients];
    if (validateAddress(value)) {
      newRecipients[index].address = value;
      setRecipients(newRecipients);
    } else {
      console.log("Invalid Ethereum address");
    }
  };

  const handleTokenIdChange = (index: number, value: string) => {
    const updatedRecipients = [...recipients];
    if (validateTokenId(value)) {
      updatedRecipients[index].tokenId = value;
      setRecipients(updatedRecipients);
    } else {
      console.log("Invalid Token ID");
    }
  };
  
  const validateTokenId = (tokenId: string) => {
    return !isNaN(parseInt(tokenId)) && parseInt(tokenId) >= 0;
  };

  const validateAddress = (address: string) => {
    try {
      let addr = ethers.utils.getAddress(address);
      console.log(addr)
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate that all addresses and token IDs are correct
      const allValid = recipients.every((recipient) => {
        return validateAddress(recipient.address) && validateTokenId(recipient.tokenId);
      });
  
      if (!allValid) {
        setMessage("Invalid addresses or token IDs");
        return;
      }
  
      // Connect to the smart contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract("Your_Contract_Address_Here", ["Your_ABI_Here"], signer);
  
      // Execute batch transfer
      for (const recipient of recipients) {
        await contract.transferFrom(userAccount, recipient.address, recipient.tokenId);
      }
  
      setMessage("Transfer successful");
    } catch (error) {
      console.error("Error in batch transfer:", error);
      setMessage("Transfer failed");
    }
  };

  return (
    <div id="batchTransferERC721Page" className="d-none md:w-full md:px-12 py-5">
      <h2>Batch Transfer ERC721</h2>
      <label className="label">
        <span className="label-text">What is your name?</span>
        <span className="label-text-alt">Top Right label</span>
      </label>
      <input
        type="text"
        id="erc20ContractAddress"
        placeholder="ERC20 Contract Address"
        className="form-control mb-2 input input-bordered w-full max-w-xs"
      />
      <label className="label">
        <span className="label-text-alt">Bottom Left label</span>
        <span className="label-text-alt">Bottom Right label</span>
      </label>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Recipient Address & Token IDs</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map((recipient, index) => (
              <tr key={index}>
                <td className="flex flex-col sm:flex-row items-center">
                  <input
                    type="text"
                    value={recipient.address}
                    placeholder="Recipient Address"
                    className="form-control input input-bordered w-full max-w-xs mb-2 sm:mb-0 sm:mr-2"
                    onChange={(e) => handleRecipientAddressChange(index, e.target.value)}
                  />
                  <input
                    type="text"
                    value={recipient.tokenId}
                    placeholder="Token ID"
                    className="form-control input input-bordered w-full max-w-xs mb-2 sm:mb-0 sm:mr-2"
                    onChange={(e) => handleTokenIdChange(index, e.target.value)}
                  />
                </td>
                <td>
                  <button className="btn btn-xs" onClick={() => handleRemoveRecipient(index)}>
                    <svg className="h-4 w-4"> {/* Add your Heroicons (-) SVG here */} </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='grid gap-3'>
        <button id="addRecipientERC721" className="btn btn-info" onClick={handleAddRecipient}>
          Add Recipient
        </button>
        <button
          id="submitERC721"
          className="btn btn-success mt-2"
          disabled={recipients.length === 0}
          onClick={handleSubmit}
        >
          Submit
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default BatchTransferERC721Page;
