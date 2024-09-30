import React from 'react';  
import { useNavigate } from 'react-router-dom';  
import { UserContext } from '../context';  

function NavBar() {
  const { user, setUser } = React.useContext(UserContext);
  const navigate = useNavigate();  // Use useNavigate for redirection

  const handleLogout = () => {
    setUser(null);
    navigate("/"); // Navigate to the home component
  };

  const hasBankDomain = (email) => {
    return email && email.endsWith('@bank.com');
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <a className="navbar-brand" href="#">Home</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#/CreateAccount/">Create Account</a>
          </li>
          {!user && (  // Conditionally render the login link
            <li className="nav-item">
              <a className="nav-link" href="#/login/">Login</a>
            </li>
          )}
          {user && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="#/transactions/">Transactions</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/transfer/">Transfers</a>
              </li>
              {hasBankDomain(user.email) && (
                <li className="nav-item">
                  <a className="nav-link" href="#/alldata/">AllData</a>
                </li>
              )}
            </>
          )}
        </ul>
        {user && (
          <div className="ml-auto d-flex align-items-center">
            <span className="navbar-text">Logged in as: {user.email}</span>
            <button className="btn btn-link ml-2" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
