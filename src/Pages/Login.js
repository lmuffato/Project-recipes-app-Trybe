import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionLogin } from '../redux/actions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginButton, setLoginButton] = useState(false);
  const dispatch = useDispatch();

  const validateFields = (target) => {
    const { value, type } = target;
    if (type === 'email') setEmail(value);
    if (type === 'password') setPassword(value);

    const sevenDigits = 7;
    const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const resultButton = password.length >= sevenDigits && regex.test(email);
    setLoginButton(resultButton);
  };

  return (
    <form>
      <input
        type="email"
        data-testid="email-input"
        onChange={ ({ target }) => validateFields(target) }
      />
      <input
        type="password"
        data-testid="password-input"
        onChange={ ({ target }) => validateFields(target) }
      />
      <button
        type="button"
        disabled={ !loginButton }
        onClick={ () => dispatch(actionLogin(email, password)) }
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
