import React from 'react';

const SummaryDisplay: React.FC = () => {
  return (
    <div className="grid flex-grow h-fit w-auto card bg-base-300 rounded-box place-items-center">
      <h2>Summary and NFT Display</h2>
      <div id="summary">{/* Summary and NFT Display will be here */}</div>
    </div>
  );
};

export default SummaryDisplay;
