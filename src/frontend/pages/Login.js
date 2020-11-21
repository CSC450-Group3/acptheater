import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import { withRouter } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalidLogin, setInvalidLogin] = useState(null);
  const [isError, setError] = useState(null);
  const [history] = useState(props.history);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `ACP | Login`;
  });

  async function login(e) {
    e.preventDefault();

    // Attempt to find user in the database
    await axios.post('/api/user/authenticate', {
      email: email,
      password: password
    })
      .then(function (res) {
        //user found successfully
        if (res.status === 200) {
          const user = res.data
          //sent logged in user to the redux store
          props.loginAction(
            user.user_id,
            user.first_name,
            user.last_name,
            user.middle_name,
            user.birthday,
            user.email,
            user.password,
            user.type
          )
          setInvalidLogin(false);
          setError(false);

          //redirect to home page upon successful login
          history.push("/");
        }
      })
      .catch(function (err) {
        if (err.message === "Request failed with status code 404") {
          // Invalid credentials were entered
          setInvalidLogin(true);
          setError(false);
        } else {
          // Something unexpected happened
          setInvalidLogin(false);
          setError(true);
        }
      });

  }
  function failedLogin(invalidLogin, failedLogin) {
    if (invalidLogin) {
      return (
        <Alert variant="outlined" severity="error">
          Invalid email or password.
        </Alert>
      )
    }
    if (failedLogin) {
      return (
        <Alert variant="outlined" severity="error">
          Error: an unexpected error occured.
        </Alert>
      )
    }
  }
  
  return (
    <body class="loginBody">
      <form method="post" class="login" onSubmit={login}>
        <h1>Sign In</h1>
        <hr></hr>
        <div>
          <label class="label-email">
            <input
              value={email}
              type="email"
              name="email"
              placeholder="Email"
              onChange={event => {
                setEmail(event.target.value);
                setError(false);
                setInvalidLogin(false);
              }
              }
              required />
          </label>
        </div>
        <div>
          <label class="label-password">
            <input
              value={password}
              type="password"
              name="password"
              placeholder="Password"
              onChange={event => {
                setPassword(event.target.value);
                setError(false);
                setInvalidLogin(false);
              }
              }
              required />
          </label>
        </div>
        <p></p>
        {failedLogin(isInvalidLogin, isError)}
        <input type="submit" value="Log In" />
        <p></p>
      </form>
      <div class="loginForgot">
          <a href="#">Forgot password?</a>
        </div>
      <p></p>
      <p></p>
      <div class="userCreationAlreadyMember">
        Not with us yet? Create a new account <Link to='/SignUp'>here</Link >.
      </div>
    </body>
  );
}

export default withRouter(Login);