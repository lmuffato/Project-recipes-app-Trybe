import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

function LoginPage() {
  const contextUser = useContext(UserContext);
  const { userEmail, setUserEmail, userPassw, setUserPassw } = contextUser;
  const [validEmail, setValidEmail] = useState(false);
  const [validPassw, setValidPassw] = useState(false);
  const [btnLogin, setBtnLogin] = useState(true);

  // habilita/desabilita o botão
  function handleButton() {
    if (validEmail && validPassw) {
      setBtnLogin(false);
    } else setBtnLogin(true);
  }

  function validit() {
    const minPassw = 6;
    const emailRegex = /^\w+@\w+.com$/;
    // checa se a senha é valida
    if (userPassw.length > minPassw) {
      console.log('userPassw.length');
      console.log(userPassw.length);
      setValidPassw(true);
    // checa se o email é valido
    } else if (emailRegex.test(userEmail)) {
      setValidEmail(true);
    }
    handleButton();
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === 'email') {
      setUserEmail(value);
    } else if (name === 'password') {
      setUserPassw(value);
    }
    validit();
  }

  function setLocalStorage() {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    const setUser = { email: userEmail };
    const emailStringFly = JSON.stringify(setUser);
    localStorage.setItem('user', emailStringFly);
  }

  return (
    <div>
      <label htmlFor="email-input">
        E-mail
        <input
          data-testid="email-input"
          id="email-input"
          type="email"
          name="email"
          value={ userEmail }
          onChange={ (event) => handleChange(event) }
        />
      </label>

      <label htmlFor="password-input">
        Senha
        <input
          data-testid="password-input"
          id="password-input"
          type="password"
          name="password"
          value={ userPassw }
          onChange={ (event) => handleChange(event) }
        />
      </label>
      <Link to="/comidas">
        <button
          data-testid="login-submit-btn"
          type="submit"
          disabled={ btnLogin }
          onClick={ setLocalStorage }
        >
          Entrar
        </button>
      </Link>
    </div>
  );
}

export default LoginPage;
