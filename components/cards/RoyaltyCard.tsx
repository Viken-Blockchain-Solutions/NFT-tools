import React from 'react';

interface RoyaltyCardProps {
  total_sales: number;
  primary_sales: number;
  secondary_sales: number;
  total_royalty: number;
  royalty_sales: number;
  non_royalty_sales: number;
}

const RoyaltyCard: React.FC<RoyaltyCardProps> = ({
  total_sales,
  primary_sales,
  secondary_sales,
  total_royalty,
  royalty_sales,
  non_royalty_sales,
}) => {
  return (
    <>
    <div className="card shadow-xl glassmorphism grid ">

      <div className=' grid-cols-2 gap-4'>
        <div className="stats stats-vertical shadow m-5">
          <div className="stat">
            <div className="stat-title">Total Sales</div>
            <div className="stat-value">{total_sales}</div>
            <div className="stat-desc">Total sales made</div>
          </div>
          <div className="stat">
            <div className="stat-title">Primary Sales</div>
            <div className="stat-value">{primary_sales}</div>
            <div className="stat-desc">Sales made from primary source</div>
          </div>
          <div className="stat">
            <div className="stat-title">Secondary Sales</div>
            <div className="stat-value">{secondary_sales}</div>
            <div className="stat-desc">Sales made from secondary source</div>
          </div>
        </div>
        <div className="stats stats-vertical shadow">
          <div className="stat">
            <div className="stat-title">Total Royalty</div>
            <div className="stat-value">{total_royalty}</div>
            <div className="stat-desc">Total royalty earned</div>
          </div>
          <div className="stat">
            <div className="stat-title">Royalty Sales</div>
            <div className="stat-value">{royalty_sales}</div>
            <div className="stat-desc">Sales made from royalty</div>
          </div>
          <div className="stat">
            <div className="stat-title">Non-Royalty Sales</div>
            <div className="stat-value">{non_royalty_sales}</div>
            <div className="stat-desc">Sales made without royalty</div>
          </div>
        </div>
    </div>
      </div>
    </>
  );
};

export default RoyaltyCard;
