import React, { useState, useEffect } from 'react';
import { ethers, JsonRpcProvider } from 'ethers';
import { STAKEcontractID, STAKEcontractABI } from '../configs/STAKEconfig';

const StakingComponent = ({ contractAddress }) => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState('');
    const [stakeAmount, setStakeAmount] = useState('');
    const [stakeEvents, setStakeEvents] = useState([]);
    const [userStake, setUserStake] = useState(null);

    // useEffect(() => {
    //     const init = async () => {
    //         const localProvider = new JsonRpcProvider('http://localhost:8545');
    //         setProvider(localProvider);

    //         const signer = localProvider.getSigner();
    //         setSigner(signer);

    //         const stakingContract = new ethers.Contract(STAKEcontractID, STAKEcontractABI, signer);
    //         setContract(stakingContract);

    //         const accounts = await localProvider.listAccounts();
    //         setAccount(accounts[0]);
    //     };

    //     init();
    // }, [STAKEcontractID]);

    // useEffect(() => {
    //     const fetchStakeEvents = async () => {
    //         if (contract) {
    //             const stakedEvents = await contract.queryFilter(contract.filters.Staked());
    //             const unstakedEvents = await contract.queryFilter(contract.filters.Unstaked());

    //             setStakeEvents([...stakedEvents, ...unstakedEvents]);

    //             const userStake = await contract.stakes(account);
    //             if (userStake.amount.gt(0)) {
    //                 setUserStake(userStake);
    //             } else {
    //                 setUserStake(null);
    //             }
    //         }
    //     };

    //     fetchStakeEvents();
    // }, [contract, account]);

    // const handleStake = async () => {
    //     const stakeAmountBN = ethers.parseEther(stakeAmount);
    //     const minimumStakeAmountBN = ethers.parseEther('0.01');

    //     if (stakeAmountBN.gt(minimumStakeAmountBN)) {
    //         try {
    //             const tx = await contract.stake({ value: stakeAmountBN });
    //             await tx.wait();
    //             setStakeAmount('');
    //             alert('Staked successfully!');
    //         } catch (error) {
    //             alert('Error staking:', error.message);
    //         }
    //     } else {
    //         alert('Minimum stake amount is 0.01 ETH');
    //     }
    // };

    // const handleUnstake = async () => {
    //     try {
    //         const tx = await contract.unstake();
    //         await tx.wait();
    //         alert('Unstaked successfully!');
    //     } catch (error) {
    //         alert('Error unstaking:', error.message);
    //     }
    // };

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <div>
                <label htmlFor="amount-input" className="block text-sm font-medium text-gray-700">Amount to Stake:</label>
                <input
                    type="number"
                    id="amount-input"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            {userStake ? (
                <div>
                    <button
                        // onClick={handleUnstake}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Withdraw
                    </button>
                </div>
            ) : (
                <button
                    // onClick={handleStake}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Stake
                </button>
            )}
            {/* <div>
                <h2 className="text-lg font-medium text-gray-900">Stake Events</h2>
                <table className="min-w-full divide-y divide-gray-200 mt-2">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {stakeEvents.map((event, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.event}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ethers.formatEther(event.args.amount)} ETH</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(event.args.timestamp.toNumber() * 1000).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
        </div>
    );
};

export default StakingComponent;
