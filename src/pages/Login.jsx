import React from 'react';

function Login() {
  return (
    <div>
      <label htmlFor="email">
        Email
        <input
          type="text"
          data-testid="email-input"
          id="email"
          // onChange={  }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          type="password"
          data-testid="password-input"
          id="password"
          // onChange={  }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        // onClick={ }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
