import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styleSheets/Login.css';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableButton, setDisableButton] = useState(true);

  // https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
  const emailValidation = /\S+@\S+\.\S+/;
  const emailTest = emailValidation.test(email);
  const minPasswordLength = 6;

  useEffect(() => {
    if (emailTest && password.length > minPasswordLength) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [password, email, emailTest]);

  const saveToLocalStorage = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const object = JSON.stringify({ email });
    localStorage.setItem('user', object);
    history.push('/comidas');
  };

  return (
    <div className="loginScreen">
      <h1
        className="login-title"
      >
        MyRecipes
      </h1>
      <form
        className="form"
        onSubmit={ (e) => {
          e.preventDefault();
          saveToLocalStorage();
        } }
      >
        <input
          className="input-login"
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          placeholder="Digite seu e-mail"
          required
        />
        <input
          className="input-login"
          type="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          data-testid="password-input"
          placeholder="Digite sua senha"
          minLength="7"
          required
        />
        <button
          className="loginBtn"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ disableButton }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
