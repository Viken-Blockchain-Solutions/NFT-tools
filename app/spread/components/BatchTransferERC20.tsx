'use client'
import React, { useState } from 'react';
import { ethers } from 'ethers';

type Recipient = {
  address: string;
  amount: string;
};

type BatchTransferERC20Props = {
  userAccount: string | null;
};

const BatchTransferERC20Page: React.FC<BatchTransferERC20Props> = ({ userAccount }) => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);

  const handleAddRecipient = () => {
    setRecipients([...recipients, { address: '', amount: '' }]);
  };

  const handleRemoveRecipient = (index: number) => {
    const updatedRecipients = recipients.filter((_, i) => i !== index);
    setRecipients(updatedRecipients);
  };
  

  const validateAddress = (address: string) => {
    try {
      ethers.utils.getAddress(address);
      return true;
    } catch (error) {
      return false;
    }
  };

  const validateAmount = (amount: string) => {
    return !isNaN(parseFloat(amount)) && parseFloat(amount) > 0;
  };

  return (
    <div className="d-none md:w-full md:px-12 py-5">
      <h2>Batch Transfer ERC20</h2>
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
        <table className="table table-xs table-zebra">
          <thead>
            <tr>
              <th>Recipient Address & Amount</th>
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
                    onChange={(e) => {
                      const newRecipients = [...recipients];
                      newRecipients[index].address = e.target.value;
                      setRecipients(newRecipients);
                    }}
                  />
                  <input
                    type="text"
                    value={recipient.amount}
                    placeholder="Amount"
                    className="form-control input input-bordered w-full max-w-xs mb-2 sm:mb-0 sm:mr-2"
                    onChange={(e) => {
                      const newRecipients = [...recipients];
                      newRecipients[index].amount = e.target.value;
                      setRecipients(newRecipients);
                    }}
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
        <button className="btn btn-info" onClick={handleAddRecipient}>
            Add Recipient
        </button>
        <button className="btn btn-success mt-2">
            Submit
        </button>
      </div>
    </div>
  );
};

export default BatchTransferERC20Page;
