import React from 'react';

function LoginPage() {
  return (
    <div>
      <label htmlFor="email-input">
        E-mail
        <input
          data-testid="email-input"
          id="email-input"
          type="email"
        />
      </label>

      <label htmlFor="password-input">
        Senha
        <input
          data-testid="password-input"
          id="password-input"
          type="password"
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
