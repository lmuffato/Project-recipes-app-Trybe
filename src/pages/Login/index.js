import React, { useState } from 'react';
import { useHistory } from 'react-router';

import './style.css';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const emailIsValid = ({ target }) => {
    const inputEmail = document.querySelector('.email');
    const { value } = target;
    const emailValidation = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(value);
    setEmail(value);
    setValidEmail(emailValidation);
    if (validEmail && inputEmail.value.length >= 1) {
      inputEmail.style.border = '2px solid #04AA6B';
    } else {
      inputEmail.style.border = '2px solid #D70E21';
    }
  };

  const passwordIsValid = ({ target }) => {
    const inputPassword = document.querySelector('.password');
    const { value } = target;
    const passwordValidation = value.length >= Number('7');
    setValidPassword(passwordValidation);
    if (passwordValidation) {
      inputPassword.style.border = '2px solid #04AA6B';
    } else {
      inputPassword.style.border = '2px solid #D70E21';
    }
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/comidas');
  };

  return (
    <div className="screen">
      <div className="container">
        <div className="line">
          <h2 className="title-login">Login</h2>
          <form className="form">
            <input
              type="email"
              className="input email"
              placeholder="Email"
              data-testid="email-input"
              onChange={ emailIsValid }
            />
            <input
              type="password"
              className="input password"
              placeholder="Senha"
              data-testid="password-input"
              onChange={ passwordIsValid }
            />
            <button
              type="submit"
              className="login-submit-btn"
              data-testid="login-submit-btn"
              disabled={ !(validEmail && validPassword) }
              onClick={ handleSubmit }
            >
              Entrar
            </button>
            <span className="have-account">
              Don&apos;t have a account?
            </span>
            <span className="create-account">
              Create an account
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
