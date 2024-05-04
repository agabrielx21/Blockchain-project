import React, { useState } from 'react';
import CoinsBar from './components/CoinsBar'; 


function App() {
  const ethers = require('ethers')
  const [userAddress, setUserAddress] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function connectWallet() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = (await signer).address;
      setUserAddress(address);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  }

  function disconnect(){
    setUserAddress(null);
    setIsAuthenticated(false);
  }
  
  return (
    
   <div>
     <CoinsBar />
    <div className="h-auto w-full flex justify-end bg-blue-100">
        { !isAuthenticated ? (
          <div className="rounded-[4px] bg-blue-900 font-semibold text-white p-2 mr-2 cursor-pointer" onClick={connectWallet}>
            Connect Wallet
          </div>
        ) : (
          <div className="flex">
            <div className="rounded-[4px] bg-green-500 font-semibold text-white p-2 mr-2 flex flex-col justify-center items-center">
            <span>{userAddress}</span>
          </div>
          <div className="rounded-[4px] bg-red-500 font-semibold text-white p-2 mr-2 flex justify-center items-center w-auto cursor-pointer" onClick={disconnect}>
            Disconnect
          </div>
          </div>
        )}
    </div>
   </div>
  );
}

export default App;
