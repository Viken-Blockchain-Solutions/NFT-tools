'use client'
import { useState } from "react";
type BatchTransferERC721Props = {
  userAccount: string | null;
};

const BatchTransferERC721Page = ({ userAccount }: BatchTransferERC721Props) => {
  const [recipients, setRecipients] = useState<Array<{ address: string; tokenId: string }>>([]);

  const handleAddRecipient = () => {
    setRecipients([...recipients, { address: '', tokenId: '' }]);
  };

  const handleRemoveRecipient = (index: number) => {
    const updatedRecipients = recipients.filter((_, i) => i !== index);
    setRecipients(updatedRecipients);
  };

  const handleRecipientAddressChange = (index: number, value: string) => {
    const updatedRecipients = recipients.map((recipient, i) =>
      i === index ? { ...recipient, address: value } : recipient
    );
    setRecipients(updatedRecipients);
  };

  const handleTokenIdChange = (index: number, value: string) => {
    const updatedRecipients = recipients.map((recipient, i) =>
      i === index ? { ...recipient, tokenId: value } : recipient
    );
    setRecipients(updatedRecipients);
  };

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
                <td>
                  <input
                    type="text"
                    value={recipient.address}
                    placeholder="Recipient Address"
                    className="form-control"
                    onChange={(e) => handleRecipientAddressChange(index, e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={recipient.tokenId}
                    placeholder="Token ID"
                    className="form-control"
                    onChange={(e) => handleTokenIdChange(index, e.target.value)}
                  />
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleRemoveRecipient(index)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        id="addRecipientERC721"
        className="btn btn-info"
        onClick={handleAddRecipient}
      >
        Add Recipient
      </button>
      <button
        id="submitERC721"
        className="btn btn-success mt-2"
        disabled={recipients.length === 0}
      >
        Submit
      </button>
    </div>
  );
};

export default BatchTransferERC721Page;