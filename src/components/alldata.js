import React from 'react';

function AllData() {
    const [data, setData] = React.useState([]);    
  
    React.useEffect(() => {
      // Fetch all accounts from the API
      fetch('${process.env.REACT_APP_API_URL}/account/all')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setData(data); // Store the fetched data in the state
        });
    }, []);
  
    return (
      <>
        <h5>All Data in Store:</h5>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>${user.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
  


  export default AllData;