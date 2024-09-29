import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' for React 18
import { HashRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './context';
import NavBar from './components/navbar';
import Home from './components/home';
import CreateAccount from './components/createaccount';
import Login from './components/login';
import Transactions from './components/transactions';
import AllData from './components/alldata';
import Transfer from './components/transfer';
import Balance from './components/balance';

function Spa() {
  const [user, setUser] = React.useState(null);

  return (
    <HashRouter>
      <div>
        <UserContext.Provider value={{ user, setUser }}>
          <NavBar />
          <div className="container" style={{ padding: "20px" }}>
            <Routes>  
              <Route path="/" element={<Home />} />
              <Route path="/CreateAccount/" element={<CreateAccount />} />
              <Route path="/login/" element={<Login />} />
              <Route path="/transactions/" element={<Transactions />} />
              <Route path="/balance/" element={<Balance />} />
              <Route path="/alldata/" element={<AllData />} />
              <Route path="/transfer/" element={<Transfer />} />
            </Routes>
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

// Create a root and render the app using React 18's createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Spa />);
