import React from 'react';

function Login() {
  return (
    <>
      <h1>Login</h1>
      <form>
        <input
          type="email"
          placeholder="E-mail"
          data-testid="email-input"
        />
        <input
          type="password"
          placeholder="Senha"
          data-testid="password-input"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </form>
    </>
  );
}

export default Login;
