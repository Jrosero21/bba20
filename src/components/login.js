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
      <button type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}>
        Authenticate again
      </button>
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
    const encodedEmail = encodeURIComponent(email); // Encode the email to handle special characters
    fetch(`${process.env.REACT_APP_API_URL}/account/login/${encodedEmail}/${password}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          setUser(data); // Set the logged-in user in the context
          props.setStatus('');
          props.setShow(false);
          console.log('JSON:', data);
        } catch (err) {
          props.setStatus(text);
          console.error('Error during login:', text);
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        props.setStatus('Error logging in');
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



