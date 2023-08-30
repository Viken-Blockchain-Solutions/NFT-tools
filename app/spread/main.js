document.addEventListener('DOMContentLoaded', () => {
    const web3 = new Web3(Web3.givenProvider);
    let userAccount;
    const connectWalletBtn = document.getElementById('connectWallet');
    const batchTransferERC721Btn = document.getElementById('batchTransferERC721');
    const batchTransferERC20Btn = document.getElementById('batchTransferERC20');
    const batchTransferERC721Page = document.getElementById('batchTransferERC721Page');
    const batchTransferERC20Page = document.getElementById('batchTransferERC20Page');
    const recipientAddressesAndTokenIds = document.getElementById('recipientAddressesAndTokenIds');
    const recipientAddressesAndValues = document.getElementById('recipientAddressesAndValues');
    const addRecipientERC721 = document.getElementById('addRecipientERC721');
    const removeRecipientERC721 = document.getElementById('removeRecipientERC721');
    const addRecipientERC20 = document.getElementById('addRecipientERC20');
    const removeRecipientERC20 = document.getElementById('removeRecipientERC20');
    const summary = document.getElementById('summary');
  
    connectWalletBtn.addEventListener('click', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      console.log(`Connected to account ${userAccount}`);
    });
  
    batchTransferERC721Btn.addEventListener('click', () => {
      batchTransferERC721Page.classList.remove('d-none');
      batchTransferERC20Page.classList.add('d-none');
    });
  
    batchTransferERC20Btn.addEventListener('click', () => {
      batchTransferERC721Page.classList.add('d-none');
      batchTransferERC20Page.classList.remove('d-none');
    });
  
    addRecipientERC721.addEventListener('click', () => {
      const newField = document.createElement('div');
      newField.innerHTML = '<input type="text" placeholder="Recipient Address" class="form-control me-2"> <input type="text" placeholder="Token ID" class="form-control">';
      recipientAddressesAndTokenIds.appendChild(newField);
    });
  
    removeRecipientERC721.addEventListener('click', () => {
      if (recipientAddressesAndTokenIds.lastChild) {
        recipientAddressesAndTokenIds.removeChild(recipientAddressesAndTokenIds.lastChild);
      }
    });
  
    addRecipientERC20.addEventListener('click', () => {
      const newField = document.createElement('div');
      newField.innerHTML = '<input type="text" placeholder="Recipient Address" class="form-control me-2"> <input type="text" placeholder="Value" class="form-control">';
      recipientAddressesAndValues.appendChild(newField);
    });
  
    removeRecipientERC20.addEventListener('click', () => {
      if (recipientAddressesAndValues.lastChild) {
        recipientAddressesAndValues.removeChild(recipientAddressesAndValues.lastChild);
      }
    });
  
    // TODO: Implement summary and NFT display in the right column
    // TODO: Implement smart contract interactions for batch transfers
  });
  