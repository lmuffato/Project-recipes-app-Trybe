import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

function LoginPage() {
  const contextUser = useContext(UserContext);
  const { userEmail, setUserEmail, userPassw, setUserPassw } = contextUser;
  const [validEmail, setValidEmail] = useState(false);
  const [validPassw, setValidPassw] = useState(false);
  const [btnLogin, setBtnLogin] = useState(true);

  useEffect(() => {
    const minPassw = 6;
    const emailRegex = /^\w+@\w+.com$/;
    if (userPassw.length > minPassw) {
      setValidPassw(true);
    } else if (emailRegex.test(userEmail)) {
      setValidEmail(true);
    }
    if (validEmail && validPassw === true) {
      setBtnLogin(false);
    }
  }, [userEmail, userPassw]);

  setLocalStorage = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    const setUser = { email: userEmail };
    const emailStringFly = JSON.stringify(setUser);
    localStorage.setItem('user', emailStringFly);
  };

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
          onChange={ (e) => setUserEmail(e.target.value) }
          pattern="(\w\.?)+@[\w\.-]+\.\w{2}"
          required
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
          onChange={ (e) => setUserPassw(e.target.value) }
        />
      </label>
      <Link to="/comidas">
        <button
          type="button"
          disabled={ btnLogin }
          onClick={ setLocalStorage() }
        >
          Entrar
        </button>
      </Link>
    </div>
  );
}

export default LoginPage;
