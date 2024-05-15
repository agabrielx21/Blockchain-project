import React from 'react';

function CoinsBar(){
    return (
        <div className="my-1 mx-[150px] flex justify-between gap-4">
       <div>TETHER/USDT 1.0001 
          <span className="ml-1 font-semibold text-red-400">
          -0.07%
          </span>
       </div>
       <div>BTC/USDT 61,415.27 
          <span className="ml-1 font-semibold text-green-500">
          +15.42%
          </span>
       </div>
       <div>ETH/USDT 3024.67
          <span className="ml-1 font-semibold text-green-500">
          +21.57%
          </span>
       </div>
       <div>SOL/USDT 141.24 
          <span className="ml-1 font-semibold text-red-400">
          -5.82%
          </span>
       </div>
    </div>
    );
}

export default CoinsBar;