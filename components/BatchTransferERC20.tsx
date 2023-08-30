import React from 'react';

type BatchTransferERC20Props = {
  userAccount: string | null;
};

const BatchTransferERC20Page = ({ userAccount }: BatchTransferERC20Props) => {
  const handleAddRecipient = () => {
    const newField = document.createElement('div');
    newField.innerHTML = `
      <input type="text" placeholder="Recipient Address" class="form-control me-2">
      <input type="text" placeholder="Amount" class="form-control">
    `;
    const recipientAddressesAndValues = document.getElementById('recipientAddressesAndValues');
    recipientAddressesAndValues?.appendChild(newField);
  };

  const handleRemoveRecipient = () => {
    const recipientAddressesAndValues = document.getElementById('recipientAddressesAndValues');
    if (recipientAddressesAndValues?.lastChild) {
      recipientAddressesAndValues.removeChild(recipientAddressesAndValues.lastChild);
    }
  };

  return (
    <div id="batchTransferERC20Page" className="d-none mt-4">
      <h2>Batch Transfer ERC20</h2>
      <input
        type="text"
        id="erc20ContractAddress"
        placeholder="ERC20 Contract Address"
        className="form-control mb-2"
      />
      <div id="recipientAddressesAndValues"></div>
      <button id="addRecipientERC20" className="btn btn-info mt-2 mb-2" onClick={handleAddRecipient}>
        Add Recipient
      </button>
      <button id="removeRecipientERC20" className="btn btn-danger mt-2 mb-2" onClick={handleRemoveRecipient}>
        Remove Recipient
      </button>
      <button id="submitERC20" className="btn btn-success mt-2">
        Submit
      </button>
    </div>
  );
};

export default BatchTransferERC20Page;
