import React from 'react';
import brandFace from '../../images/brand/face.svg';

function Login() {
  return (
    <>
      <header>
        <p>
          Você está a poucos
          <br />
          passos de conhecer
          <br />
          🌽️
          <strong>&nbsp;milhares&nbsp;</strong>
          de receitas.
        </p>
        <img src={ brandFace } alt="illustration of face savoring food" />
      </header>
      <main>
        <form>
          <input type="email" data-testid="email-input" />
          <input type="password" data-testid="password-input" />
          <button type="submit" data-testid="login-submit-btn">Entrar</button>
        </form>
      </main>
      <footer />
    </>
  );
}

export default Login;
