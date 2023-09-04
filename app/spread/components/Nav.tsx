import React from 'react';

interface NavProps {
  connectWallet: () => Promise<void>;
}

const Nav: React.FC<NavProps> = ({ connectWallet }) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await connectWallet();
  };

  return (
    <nav className="header shadow-xl">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a href="./" className="btn btn-ghost flex normal-case">
            <h2 className='flex flex-col md:flex-row md:text-xl'>
              Spread Dapp - <span>NFT Edition</span>
            </h2>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn btn-info" onClick={handleSubmit}>Connect Wallet</button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
