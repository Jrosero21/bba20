import React from 'react';  
import { UserContext } from '../context';  
import { Card } from '../context'; 
import { auth, provider, signInWithPopup } from '../firebase-auth';  // Firebase imports

function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <div className="container">
      <div className="row align-items-start">
        {/* Left-side image */}
        <div className="col-md-4 text-center"> 
          <h1 className="createTitle">Welcome back!</h1>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Card
            bgcolor="light"
            txtcolor="black"
            header="Login"
            status={status}
            body={show ? 
              <LoginForm setShow={setShow} setStatus={setStatus} /> : 
              <LoginMsg setShow={setShow} setStatus={setStatus} />}
          />
        </div>
      </div>
    </div>
  );
}

function LoginMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <a href="#/transactions/" className="btn btn-light">
  Make a transaction
</a>

    </>
  );
}

function LoginForm(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setUser } = React.useContext(UserContext);

  // Handle Firebase Google sign-in
  function handleGoogleSignIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser({
          email: user.email,
          token: user.accessToken,
        });
        props.setStatus('Successfully signed in with Google!');
        props.setShow(false);
        console.log('Google Sign-In successful:', user);
      })
      .catch((error) => {
        console.error('Error during Google Sign-In:', error);
        props.setStatus('Error during Google Sign-In');
      });
  }

// Handle regular form login
function handleLogin() {
  fetch(`${process.env.REACT_APP_API_URL}/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
      try {
        const data = JSON.parse(text);
        if (data.error) {
          // Handle error by displaying the failure status
          props.setStatus('Login failed');  // Show the failed message
        } else {
          // Proceed with login success
          setUser(data); // Set the logged-in user in the context
          props.setStatus('');
          props.setShow(false);  // Show success message
          console.log('Login successful:', data);
        }
      } catch (err) {
        // Handle error when parsing JSON fails
        props.setStatus('Login failed');  // Show the failed message
        console.error('Error during login:', text);
      }
    })
    .catch(err => {
      // Handle fetch error
      props.setStatus('Error logging in');
      console.error('Fetch error:', err);
    });
}


  return (
    <>
      Email<br />
      <input 
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.currentTarget.value)} 
      /><br />

      Password<br />
      <input 
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={e => setPassword(e.currentTarget.value)} 
      /><br />

      <div className="d-flex button-container">
        <button type="submit" className="btn" onClick={handleLogin}>Log in</button>
        <button type="button" className="btn btn-google" onClick={handleGoogleSignIn}>
          Log in with Google
        </button>
      </div>
    </>
  );
}

export default Login;



