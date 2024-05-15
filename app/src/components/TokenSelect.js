import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'; // Import ethers module
import { TOKENcontractABI } from '../configs/TOKENconfig';

const TokenSelect = ({ pairDetails, TOKENcontractABI, provider }) => {
    const [tokenSymbols, setTokenSymbols] = useState([]);

    useEffect(() => {
        const fetchTokenSymbols = async () => {
            const symbols = await Promise.all(pairDetails.map(async (pair) => {
                const tokenContract = new ethers.Contract(pair.token1, TOKENcontractABI, provider);
                const tokenSymbol = await tokenContract.symbol();
                return { symbol: tokenSymbol, pairId: pair.token1 };
            }));
            setTokenSymbols(symbols);
        };

        fetchTokenSymbols();
    }, [pairDetails, TOKENcontractABI, provider]);

    return (
        <select>
            <option value="">Select a token</option>
            {tokenSymbols.map((token, index) => (
                <option key={index} value={token.pairId}>
                    {token.symbol}
                </option>
            ))}
        </select>
    );
};

export default TokenSelect;
