import React from 'react';
import Tab from '../enums/Tab';

interface TabButtonsProps {
  activeTab: Tab;
  handleTabClick: (tab: Tab) => void;
}

const TabButtons: React.FC<TabButtonsProps> = ({ activeTab, handleTabClick }) => {
  return (
    <div className="prose my-5">
      <button onClick={() => handleTabClick(Tab.ERC721)} className={`btn btn-outline hover:bg-yellow-200 ${activeTab === Tab.ERC721 ? 'active' : ''}`}>
        ERC721
      </button>
      <button onClick={() => handleTabClick(Tab.ERC20)} className={`btn btn-outline hover:bg-yellow-200 ${activeTab === Tab.ERC20 ? 'active' : ''}`}>
        ERC20
      </button>
    </div>
  );
};

export default TabButtons;
