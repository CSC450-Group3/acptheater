import React from 'react';

function Login() {
  return (
    <body class="login">
      <form>
        <h1>Sign In</h1>
        <div>
          <label class="label-email">
            <input type="email" name="email" placeholder="Email" required />
          </label>
        </div>
        <div>
          <label class="label-password">
            <input type="text" name="password" placeholder="Password" required />
          </label>
        </div>
        <input type="submit" value="Log In" />
        <div>
          <a href="#">Forgot password?</a>
        </div>
      </form>
    </body>
  );
}

export default Login;