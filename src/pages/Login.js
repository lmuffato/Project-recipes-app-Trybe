import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setToLocalStorage } from '../services/localStorage';
import rockGlass from '../images/rockGlass.svg';

function Login() {
  const history = useHistory();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const handleInput = (event) => {
    const { value, name } = event.target;
    switch (name) {
    case 'email':
      return setemail(value);
    case 'password':
      return setpassword(value);
    default:
      break;
    }
  };

  const user = {
    email,
  };

  function loginUser() {
    setToLocalStorage('mealsToken', 1);
    setToLocalStorage('cocktailsToken', 1);
    setToLocalStorage('user', user);
    setToLocalStorage('doneRecipes', []);
    setToLocalStorage('favoriteRecipes', []);
    setToLocalStorage('inProgressRecipes', {});
    history.push('/comidas');
  }

  const regex = /\S+@\S+\.\S\S/;
  const passwordLength = 7;
  return (
    <div className="login">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <h1 className="login-word">Login</h1>
      <p className="loginEmail">Email:</p>
      <input
        className="input"
        type="email"
        onChange={ handleInput }
        data-testid="email-input"
        name="email"
        value={ email }
      />
      <p>Password:</p>
      <input
        className="input"
        type="password"
        onChange={ handleInput }
        data-testid="password-input"
        name="password"
        value={ password }
      />
      <button
        type="button"
        className="button"
        data-testid="login-submit-btn"
        onClick={ loginUser }
        disabled={ !email.match(regex) || password.length < passwordLength }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
