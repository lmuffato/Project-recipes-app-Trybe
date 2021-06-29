import React, { useState } from 'react';
import { useHistory } from 'react-router';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const emailIsValid = ({ target }) => {
    const { value } = target;
    const emailValidation = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(value);
    setEmail(value);
    setValidEmail(emailValidation);
  };

  const passwordIsValid = ({ target }) => {
    const { value } = target;
    const passwordValidation = value.length >= Number('7');
    setValidPassword(passwordValidation);
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/comidas');
  };

  return (
    <form>
      <input type="email" data-testid="email-input" onChange={ emailIsValid } />
      <input type="password" data-testid="password-input" onChange={ passwordIsValid } />
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ !(validEmail && validPassword) }
        onClick={ handleSubmit }
      >
        Entrar
      </button>
    </form>
  );
};

export default Login;
