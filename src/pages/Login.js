import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ReceitasContext from '../contexts/ReceitasContext';
import '../styles/Login.css';
import easyRecipe from '../images/recipEasy.png';

function Login() {
  const {
    email, setEmail, password, setPassword } = useContext(ReceitasContext);
  const [disableButton, setDisableButton] = useState(true);
  // Pattern Source: https://regexr.com/3e48o
  const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailPatternTest = emailPattern.test(String(email).toLowerCase());
  const minPasswordLength = 6;
  const history = useHistory();

  // verifica erros no input de email
  const verifyEmailError = () => {
    const emailSpan = document.getElementById('email_span__form');

    if (!emailPatternTest) {
      emailSpan.style.display = 'block';
    } else {
      emailSpan.style.display = 'none';
    }
  };

  const verifyPassError = () => {
    const passwordSpan = document.getElementById('password_span__form');

    if (password.length <= minPasswordLength) {
      passwordSpan.style.display = 'block';
    } else {
      passwordSpan.style.display = 'none';
    }
  };
  useEffect(() => {
    const passwordSpan = document.getElementById('password_span__form');
    const emailSpan = document.getElementById('email_span__form');

    if (emailPatternTest) {
      emailSpan.style.display = 'none';
    }
    if (password.length > minPasswordLength) {
      passwordSpan.style.display = 'none';
    }
    if (emailPatternTest && password.length > minPasswordLength) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [password, email, emailPatternTest]);

  const saveToLocalStorage = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const object = JSON.stringify({ email });
    localStorage.setItem('user', object);
    history.push('/comidas');
  };
  return (
    <form
      className="form"
      onSubmit={ (event) => {
        event.preventDefault();
        saveToLocalStorage();
      } }
    >
      <div>
        <img className="form__img" src={ easyRecipe } alt="logo easy recipe" />

        <h1 className="form__title">Login</h1>
        <label className="form__label" htmlFor="email">
          <p className="form__p">
            E-mail
          </p>
          <input
            className="form__input"
            value={ email }
            data-testid="email-input"
            type="email"
            placeholder="E-mail"
            onChange={ ({ target }) => setEmail(target.value) }
            onBlur={ verifyEmailError }
            required
          />
          <span className="form__span" id="email_span__form">
            Invalid email format
          </span>
        </label>
        <label className="form__label" htmlFor="password">
          <p className="form__p">Password</p>
          <input
            className="form__input"
            value={ password }
            data-testid="password-input"
            type="password"
            placeholder="Password"
            onChange={ ({ target }) => setPassword(target.value) }
            minLength="7"
            onBlur={ verifyPassError }
            required
          />
          <span className="form__span" id="password_span__form">
            Password must be at least 7 characters
          </span>
        </label>
        <button
          className="form__button"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ disableButton }
        >
          Enter
        </button>
      </div>

    </form>
  );
}

export default Login;
