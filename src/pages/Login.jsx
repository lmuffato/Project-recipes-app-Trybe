import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import { setToLocalStorage } from '../services/localStorage';

function Login() {
  const [disabled, setDisabled] = useState(true);
  const { email, setEmail } = useContext(UserContext);
  const [password, setPassword] = useState('');

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
  };

  return (
    <div>
      <input
        type="email"
        data-testid="email-input"
        value={ email }
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        type="password"
        data-testid="password-input"
        value={ password }
        onChange={ ({ target }) => setPassword(target.value) }
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
  );
}
// teste de commit

export default Login;
