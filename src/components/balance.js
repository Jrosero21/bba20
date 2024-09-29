import React from 'react';
import { UserContext } from '../context';
import { Card } from '../context'; 

function Balance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ? (
        <BalanceForm setShow={setShow} setStatus={setStatus} />
      ) : (
        <BalanceMsg setShow={setShow} setStatus={setStatus} />
      )}
    />
  );
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState('');
  const [balance, setBalance] = React.useState('');
  const { user } = React.useContext(UserContext); // Retrieve user from UserContext

  function handle() {
    const userEmail = email || user?.email; // Fallback to user context email
    fetch(`${process.env.REACT_APP_API_URL}/account/findOne/${userEmail}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.balance !== undefined) {
          props.setStatus(`Balance: $${data.balance}`);
          setBalance(data.balance); // Set fetched balance
          props.setShow(false);
        } else {
          props.setStatus('Error fetching balance');
        }
      })
      .catch(err => {
        props.setStatus('Error fetching balance');
        console.error('Fetch error:', err);
      });
  }

  return (
    <>
      <p>Your current balance: ${balance || 'N/A'}</p>
      Email<br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.currentTarget.value)}
      /><br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Check Balance
      </button>
    </>
  );
}

function BalanceMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}
      >
        Check balance again
      </button>
    </>
  );
}

export default Balance;

