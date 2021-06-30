import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionLogin } from '../redux/actions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginButton, setLoginButton] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const validateFields = () => {
      const sixDigits = 6;
      const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
      const resultButton = password.length > sixDigits && regex.test(email);
      setLoginButton(resultButton);
    };
    validateFields();
  }, [email, password]);

  const loginBtn = () => {
    dispatch(actionLogin(email, password));
    history.push('/comidas');
  };

  return (
    <form>
      <input
        type="email"
        data-testid="email-input"
        onChange={ (e) => setEmail(e.target.value) }
      />
      <input
        type="password"
        data-testid="password-input"
        onChange={ (e) => setPassword(e.target.value) }
      />
      <button
        type="button"
        disabled={ !loginButton }
        onClick={ loginBtn }
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
