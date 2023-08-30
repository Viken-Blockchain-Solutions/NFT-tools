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
      <input
        type="text"
        id="erc721ContractAddress"
        placeholder="ERC721 Contract Address"
        className="form-control mb-2"
      />
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left border border-slate-900">
                Recipient Address
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left border border-slate-600">
                Token ID
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {recipients.map((recipient, index) => (
              <tr key={index} className="bg-gray-50 text-gray-500">
                <td className="border border-slate-700 p-3 text-sm text-gray-700 whitespace-nowrap">
                  <input
                    type="text"
                    value={recipient.address}
                    placeholder="Recipient Address"
                    className="form-control"
                    onChange={(e) => handleRecipientAddressChange(index, e.target.value)}
                  />
                </td>
                <td className="border border-slate-700 p-3 text-sm text-gray-700 whitespace-nowrap">
                  <input
                    type="text"
                    value={recipient.tokenId}
                    placeholder="Token ID"
                    className="form-control"
                    onChange={(e) => handleTokenIdChange(index, e.target.value)}
                  />
                </td>
                <td className="border border-slate-700 p-3 text-sm text-gray-700 whitespace-nowrap">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveRecipient(index)}
                  >
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