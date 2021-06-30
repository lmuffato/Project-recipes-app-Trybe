import React from 'react';

function Login() {
  return (
    <>
      <input type="text" data-testid="email-input" />
      <input type="password" data-testid="password-input" />
      <button type="button" data-testid="login-submit-btn"> Entrar</button>
    </>
  );
}

export default Login;
