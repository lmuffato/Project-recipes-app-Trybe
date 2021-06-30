import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';

import UserContext from '../../context/UserContext';

function Login() {
  const { email, setEmail } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const minPassLength = 7;
  const loginData = ({ email });
  const history = useHistory();
  function handleClick() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(loginData));
    history.push('/comidas');
  }
  const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (
    <>
      <h1>Login</h1>
      <form>
        <input
          type="email"
          value={ email }
          placeholder="E-mail"
          data-testid="email-input"
          pattern={ patternEmail }
          onChange={ (ev) => setEmail(ev.target.value) }
        />
        <input
          type="password"
          value={ password }
          placeholder="Senha"
          data-testid="password-input"
          onChange={ (ev) => setPassword(ev.target.value) }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ handleClick }
          disabled={ !((patternEmail.test(email)) && (password.length >= minPassLength)) }
        >
          Entrar
        </button>
      </form>
    </>
  );
}

export default Login;
