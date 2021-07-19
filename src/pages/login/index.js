import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import './login.css';
import logo from '../../images/logofood.svg';

export default function Login() {
  const history = useHistory();
  function tokensStorage(login) {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email: login }));
    history.push('/comidas');
  }
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const minPassword = 6;

  return (
    <div className="login-page">
      <div classNme="logo">
        <img style={ { width: '150px' } } src={ logo } alt="logo do app" />
      </div>
      <form className="login">
        <h2 className="loginText">Login</h2>
        <label
          htmlFor="email"
        >
          <input
            value={ login }
            onChange={ ({ target: { value } }) => setLogin(value) }
            type="text"
            id="email"
            data-testid="email-input"
            placeholder="Email"
          />
        </label>
        <label
          htmlFor="password"
        >
          <input
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
            type="password"
            id="password"
            data-testid="password-input"
            placeholder="Password"
          />
        </label>
        <Button
          variant="success"
          type="button"
          id="button"
          data-testid="login-submit-btn"
          disabled={ !login.match(/\S+@\S+\.\S+/) || password.length <= minPassword }
          onClick={ () => tokensStorage(login) }
        >
          Entrar
        </Button>
      </form>
    </div>
  );
}
