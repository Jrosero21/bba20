import React from 'react'; 
import { Card } from '../context'; 

function Home() {
  return (
    <div className="container">
      <div className="row align-items-start">
        {/* Left-side image */}
        <div className="col-md-4 text-center"> {/* Center the image horizontally */}
          <img src="BB-PURP.png" className="img-fluid left-image" alt="BB Purple Logo" />
        </div>
        {/* Center Card */}
        <div className="col-md-8">
          <div className="content">
            <Card
            bgcolor="light"
              txtcolor="black"
              header="BadBank Credit Union"  // This header will be centered
              title="Welcome to the bank"
              text="Please login or create an account to utilize our services"
              body={(<img src="bank1.png" className="img-fluid" alt="Responsive image" />)}
              className="card-border"
            />
            <a href="#/CreateAccount/" className="create-account-link">
              Create an account today!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Home;