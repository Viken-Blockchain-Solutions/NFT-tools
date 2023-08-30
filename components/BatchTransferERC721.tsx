'use client'
import { ethers } from 'ethers';
import { useState } from "react";
type BatchTransferERC721Props = {
  userAccount: string | null;
};
/**
 * Renders a page for batch transferring ERC721 tokens.
 * @param {Object} props - The component props.
 * @param {string} props.userAccount - The user account.
 * @returns {JSX.Element|null} The rendered component.
 */
const BatchTransferERC721Page = ({ userAccount }: BatchTransferERC721Props): JSX.Element | null => {
  const [recipients, setRecipients] = useState<Array<{ address: string; tokenId: string }>>([]);
  const [message, setMessage] = useState<string>('');

  /**
   * Adds a new recipient to the list.
   */
  const handleAddRecipient = (): void => {
    setRecipients([...recipients, { address: '', tokenId: '' }]);
  };

  /**
   * Removes a recipient from the list.
   * @param {number} index - The index of the recipient to remove.
   */
  const handleRemoveRecipient = (index: number): void => {
    const updatedRecipients = recipients.filter((_, i) => i !== index);
    setRecipients(updatedRecipients);
  };

  /**
   * Handles the change event for the recipient address input.
   * @param {number} index - The index of the recipient.
   * @param {string} value - The new value of the input.
   */
  const handleRecipientAddressChange = (index: number, value: string): void => {
    if (validateAddress(value)) {
      const updatedRecipients = recipients.map((recipient, i) =>
        i === index ? { ...recipient, address: value } : recipient
      );
      setRecipients(updatedRecipients);
    } else {
      // handle invalid address
    }
  };

  /**
   * Handles the change event for the token ID input.
   * @param {number} index - The index of the recipient.
   * @param {string} value - The new value of the input.
   */
  const handleTokenIdChange = (index: number, value: string): void => {
    const updatedRecipients = recipients.map((recipient, i) =>
      i === index ? { ...recipient, tokenId: value } : recipient
    );
    setRecipients(updatedRecipients);
  };

  /**
   * Handles the submit event.
   */
  const handleSubmit = (): void => {
    try {
      // perform batch transfer logic
      setMessage('Transfer successful');
    } catch (error) {
      // handle error
    }
  };

  if (userAccount === null) {
    return null; // or render an appropriate message or component
  }

  return (
    <div id="batchTransferERC721Page" className="d-none mt-4">
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
              <th>Recipient Address</th>
              <th>Token ID</th>
              <th>Action</th>
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
                  <button className="btn btn-xs" onClick={() => handleRemoveRecipient(index)}>
                    <svg className="h-4 w-4"> {/* Add your Heroicons (-) SVG here */} </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
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


const validateAddress = (address: string) => {
  // use ethers.js or web3.js to validate the address
  try {
    // @ts-ignore
    ethers.utils.getAddress(address);
    return true;
  } catch (error) {
    return false;
  }
};

export default BatchTransferERC721Page;
