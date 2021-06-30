import React, {  } from 'react';

function Login() {
  // const { email, senha } = algumacoisastate;
  
  return (
    <div>
      <span>Login</span>
      <label htmlFor="input-email">
        <input
          type="text"
          id="input-email"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="input-password">
        <input
          type="password"
          id="input-password"
          data-testid="password-input"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </div>);
}

export default Login;
