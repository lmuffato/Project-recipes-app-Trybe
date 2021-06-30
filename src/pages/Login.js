import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReceitasContext from '../contexts/ReceitasContext';

function Login() {
  const {
    email, setEmail, password, setPassword } = useContext(ReceitasContext);
  const [disableButton, setDisableButton] = useState(true);
  // Pattern Source: https://regexr.com/3e48o
  const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailPatternTest = emailPattern.test(String(email).toLowerCase());
  const minPasswordLength = 6;
  const history = useHistory();

  useEffect(() => {
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
      onSubmit={ (event) => {
        event.preventDefault();
        saveToLocalStorage();
      } }
    >
      <h1>Login</h1>
      <label htmlFor="email">
        Email
        <input
          value={ email }
          data-testid="email-input"
          type="email"
          placeholder="Email"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          value={ password }
          data-testid="password-input"
          type="password"
          placeholder="Senha"
          onChange={ ({ target }) => setPassword(target.value) }
          minLength="7"
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ disableButton }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
