import React, { useState, useEffect } from 'react';
import { DEXcontractID, DEXcontractABI } from '../configs/DEXconfig';
import { ROUTERcontractABI } from '../configs/ROUTERconfig';
import { PAIRcontractABI } from '../configs/PAIRconfig';
import { ethers, JsonRpcProvider } from 'ethers';
import ExchangeComponent from './Exchange'; 

const Dex = () => {
    const provider = new JsonRpcProvider("http://127.0.0.1:8545");
    const DEXcontract = new ethers.Contract(DEXcontractID, DEXcontractABI, provider);
    const [pairDetails, setPairDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPairs = async () => {
            try {
                const routerAddress = await DEXcontract.router();
                const RouterContract = new ethers.Contract(routerAddress, ROUTERcontractABI, provider);
                const pairs = await RouterContract.getPairs();

                // Fetch additional details for each pair
                const pairPromises = pairs.map(async (pairAddress) => {
                    const PairContract = new ethers.Contract(pairAddress, PAIRcontractABI, provider);
                    const token1 = await PairContract.token1();
                    const token2 = await PairContract.token2();
                    const rate = await PairContract.rate();

                    return { address: pairAddress, token1, token2, rate };
                });

                const pairDetails = await Promise.all(pairPromises);
                setPairDetails(pairDetails);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch the dex contract or router pairs:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPairs();
    }, []); // Dependency array is empty to ensure this runs only once on mount

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1>DEX Page</h1>
            {/* Render the ExchangeComponent and pass the pairDetails */}
            <ExchangeComponent pairDetails={pairDetails} />
        </div>
    );
}

export default Dex;
