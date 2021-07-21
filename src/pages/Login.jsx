import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import UserContext from '../context/UserContext';
import { setToLocalStorage } from '../services/localStorage';
import '../login.css';

function Login() {
  const [disabled, setDisabled] = useState(true);
  const { email, setEmail } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    const isDisabled = () => {
      const emailRegex = /\S+@\S+\.\S+/; // *https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/ *//
      const PASSWORD_LENGTH = 6;
      const isValid = emailRegex.test(email);
      const validation = password.length > PASSWORD_LENGTH && isValid;
      if (validation) {
        setDisabled(false);
      } else { setDisabled(true); }
    };
    isDisabled();
  }, [email, password]);

  const submitInfo = () => {
    setToLocalStorage('user', { email });
    setToLocalStorage('mealsToken', 1);
    setToLocalStorage('cocktailsToken', 1);
    history.push('/comidas');
  };

  return (
    <div className="loginBody">
      <h2 className="brand">Receitas Campeãs</h2>
      <div className="loginContainer">
        <input
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
          placeholder="Email"
          className="placeholder"
        />
        <input
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
          placeholder="Senha"
          className="placeholder"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ disabled }
          onClick={ submitInfo }
        >
          Entrar
        </button>

      </div>
    </div>
  );
}

export default Login;
