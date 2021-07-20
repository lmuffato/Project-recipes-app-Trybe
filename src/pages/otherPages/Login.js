import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';
import setTokenLocalStorage from '../../services/localStorage';
import './Login.css';

function loginValidation(email, password) {
  const regex2Email = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const minLenght = 6;
  if (regex2Email.test(email) && password.length > minLenght) return false;
  return true;
}

export default function Login() {
  const { setUserEmail, setPassword, userEmail, password } = useContext(Context);
  console.log(userEmail);
  return (
    <div className="login-page">
      <div className="NeonButton-container">
        <button type="button" className="neon-button">OPEN</button>
      </div>
      <form className="form-login">
        <label htmlFor="control">
          Email address
          <input
            id="control"
            className="email-input"
            onChange={ ({ target }) => setUserEmail(target.value) }
            data-testid="email-input"
            type="email"
            placeholder="Enter email"
          />
        </label>
        <label htmlFor="control2">
          Password
          <input
            id="control2"
            className="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
            type="password"
            minLength="6"
            placeholder="Password"
            data-testid="password-input"
          />
        </label>
        <Link to="/comidas">
          <button
            className="Button-Login"
            disabled={ loginValidation(userEmail, password) }
            variant="dark"
            type="button"
            data-testid="login-submit-btn"
            onClick={ () => setTokenLocalStorage(userEmail) }
          >
            Entrar
          </button>
        </Link>
      </form>
    </div>
  );
}
