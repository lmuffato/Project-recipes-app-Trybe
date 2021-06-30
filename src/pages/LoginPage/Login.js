import React, { useContext } from 'react';
import Context from '../../context/Context';

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(Context);

  const validate = () => {
    const minLength = 7;
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if ((password.length >= minLength) && (emailPattern.test(email) === true)) {
      return false;
    }
    return true;
  };

  return (
    <form>
      <fieldset>
        <input
          type="text"
          data-testid="email-input"
          onChange={ (e) => setEmail(e.target.value) }
          value={ email }
        />
        <input
          type="password"
          data-testid="password-input"
          onChange={ (e) => setPassword(e.target.value) }
          value={ password }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ validate() }
        >
          Entrar
        </button>
      </fieldset>
    </form>
  );
}

export default Login;
