import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { setToLocalStorage } from '../services/localStorage';
import gifLogin from '../images/gifLogin.gif';
import ReceitasTitle from '../images/ReceitasTitle.png';

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
    history.push('/comidas');
  }

  const regex = /\S+@\S+\.\S\S/;
  const passwordLength = 7;
  return (
    <div className="login">
      <Image
        className="titleImage"
        src={ ReceitasTitle }
      />
      <Image
        className="gifLogin"
        type="image/svg+xml"
        src={ gifLogin }
        alt="gif"
      />
      <div className="loginButtonsGroup">
        <div className="login-word">
          <p>Login</p>
        </div>
        <input
          className="input"
          type="email"
          onChange={ handleInput }
          data-testid="email-input"
          placeholder="E-mail"
          name="email"
          value={ email }
        />
        <input
          className="input"
          type="password"
          onChange={ handleInput }
          placeholder="Senha"
          data-testid="password-input"
          name="password"
          value={ password }
        />
        <button
          type="button"
          className="loginButton"
          data-testid="login-submit-btn"
          onClick={ loginUser }
          disabled={ !email.match(regex) || password.length < passwordLength }
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
