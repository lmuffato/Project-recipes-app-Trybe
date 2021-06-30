import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Login() {
  const { setEmail, setPassword, disabledData } = useContext(UserContext);
  return (
    <div>
      <label htmlFor="email">
        Email
        <input
          type="text"
          data-testid="email-input"
          id="email"
          onChange={ (event) => setEmail(event.target.value) }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          type="password"
          data-testid="password-input"
          id="password"
          onChange={ (event) => setPassword(event.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disabledData }
        // onClick={ }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
