import React from 'react';
import UserContext from '../CONTEXT/UserContext';

function LoginPage() {
  const contextUser = useContext(UserContext);
  const { userEmail,
    setUserEmail,
    userPassw,
    setUserPassw } = contextUser;

  return (
    <div>
      <label htmlFor="email-input">
        E-mail
        <input
          data-testid="email-input"
          id="email-input"
          type="email"
          value={ userEmail }
          onChange={ (e) => setUserEmail(e.target.value) }
        />
      </label>

      <label htmlFor="password-input">
        Senha
        <input
          data-testid="password-input"
          id="password-input"
          type="password"
          value={ userPassw }
          onChange={ (e) => setUserPassw(e.target.value) }
        />
      </label>

      <button
        type="button"
      >
        Entrar
      </button>
    </div>
  );
}

export default LoginPage;
