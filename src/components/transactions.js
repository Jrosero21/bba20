import React from 'react';
import { UserContext } from '../context';
import { Card } from '../context';

//test

function Transactions() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [balance, setBalance] = React.useState(0);
    const [transactionType, setTransactionType] = React.useState('Deposit');
    const [amount, setAmount] = React.useState('');
    const { user } = React.useContext(UserContext);

    // Fetch the user's balance on component mount or when the user changes
    React.useEffect(() => {
        if (user && user.email) {
            const fetchBalanceUrl = `${process.env.REACT_APP_API_URL}/account/findOne/${user.email}`;
            
            fetch(fetchBalanceUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch balance: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data && data.balance !== undefined) {
                        setBalance(data.balance);
                    } else {
                        setStatus('Error fetching balance');
                    }
                })
                .catch(err => {
                    setStatus('Error fetching balance');
                });
        }
    }, [user]);

    // Handle deposit and withdrawal
    function handleTransaction() {
        console.log('handleTransaction called'); // For debugging
    
        // Validate and parse the amount
        const parsedAmount = parseFloat(amount);
    
        if (isNaN(parsedAmount)) {
            setStatus(`${transactionType} failed: Input is not a number`);
            return;
        }
    
        if (parsedAmount <= 0) {
            setStatus(`${transactionType} failed: Cannot ${transactionType.toLowerCase()} negative or zero amounts`);
            return;
        }
    
        // Determine if it's a deposit or withdrawal
        const transactionAmount = transactionType === 'Withdraw' ? -parsedAmount : parsedAmount;
        const transactionUrl = `${process.env.REACT_APP_API_URL}/account/update/${user.email}/${transactionAmount}`;
    
        console.log(`Sending request to: ${transactionUrl}`); // Log the request URL for debugging
    
        fetch(transactionUrl)
            .then(response => {
                if (!response.ok) {
                    console.error(`Failed to perform ${transactionType}: ${response.status}`); // Log response status
                    throw new Error(`Failed to perform ${transactionType}: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('API Response:', data);  // Log the response for debugging
                if (data && data.balance !== undefined) {
                    setStatus(`${transactionType} successful! New Balance: $${data.balance.toFixed(2)}`);
                    setShow(false);
                    setBalance(data.balance);
                } else {
                    setStatus(`${transactionType} failed: Unable to fetch updated balance`);
                }
            })
            .catch(err => {
                console.error(`Error during ${transactionType}:`, err); // Log any fetch errors
                setStatus(`${transactionType} failed: ${err.message}`);
            });
    }
    
    return (
        <Card
            bgcolor="light"
            txtcolor="black"
            header="Transactions"
            status={status}
            body={show ? (
                <>
                    <div className="d-flex justify-content-between">
                        <label>Current Balance:</label>
                        <strong>${balance ? balance.toFixed(2) : '0.00'}</strong>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="transactionType">Transaction Type</label>
                        <select
                            id="transactionType"
                            className="form-control"
                            value={transactionType}
                            onChange={e => setTransactionType(e.currentTarget.value)}
                        >
                            <option value="Deposit">Deposit</option>
                            <option value="Withdraw">Withdraw</option>
                        </select>
                    </div>
                    <br />
                    Amount<br />
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={e => setAmount(e.currentTarget.value)}
                    /><br />
                    <button type="submit" className="btn btn-light" onClick={handleTransaction}>
                        {transactionType}
                    </button>
                </>
            ) : (
                <>
                    <h5>Success</h5>
                    <p>{status}</p>
                    <button
                        type="submit"
                        className="btn btn-light"
                        onClick={() => {
                            setShow(true);
                            setStatus('');
                        }}
                    >
                        Perform another {transactionType}
                    </button>
                </>
            )}
        />
    );
}

export default Transactions;
