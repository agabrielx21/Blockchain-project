import React, { useState } from 'react';

// This component expects 'pairDetails' as a prop, which contains details about each token pair.
const ExchangeComponent = ({ pairDetails }) => {
    const [selectedToken, setSelectedToken] = useState('');
    const [amountToSend, setAmountToSend] = useState('');
    const [calculatedAmount, setCalculatedAmount] = useState('');

    const handleTokenChange = (event) => {
        setSelectedToken(event.target.value);
        setCalculatedAmount(''); // Reset calculated amount when token changes
        setAmountToSend('');
    };

    const handleAmountChange = (event) => {
        setAmountToSend(event.target.value);
        const selectedPair = pairDetails.find(pair => pair.token1 === selectedToken);
        if (selectedPair && event.target.value) {
            const calculated = parseFloat(event.target.value) * parseFloat(selectedPair.rate);
            setCalculatedAmount(calculated.toFixed(2)); // Assuming rate calculation doesn't need more precision
        } else {
            setCalculatedAmount('');
        }
    };

    const proceedWithPayment = () => {
        console.log("Proceeding with payment of:", calculatedAmount);
        // Integration with payment or blockchain transaction logic would go here.
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <div>
                <label htmlFor="token-select" className="block text-sm font-medium text-gray-700">Choose a token:</label>
                <select
                    id="token-select"
                    value={selectedToken}
                    onChange={handleTokenChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">Select a token</option>
                    {pairDetails.map((pair) => (
                        <option key={pair.token1} value={pair.token1}>
                            {pair.token1} - Rate: {pair.rate}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="amount-input" className="block text-sm font-medium text-gray-700">Amount to send:</label>
                <input
                    type="number"
                    id="amount-input"
                    value={amountToSend}
                    onChange={handleAmountChange}
                    placeholder="Enter amount"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Calculated Amount:</label>
                <input
                    type="text"
                    readOnly
                    value={calculatedAmount}
                    placeholder="Result shows here"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
                />
            </div>
            <button
                onClick={proceedWithPayment}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Proceed with Payment
            </button>
        </div>
    );
};

export default ExchangeComponent;
