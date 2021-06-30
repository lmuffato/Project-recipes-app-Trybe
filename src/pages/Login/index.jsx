import React from 'react';
import brandFace from '../../images/brand/face.svg';

import styles from './styles.module.scss';

function Login() {
  return (
    <div className={ styles.loginPage }>
      <header className={ styles.loginHeader }>
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
      <main className={ styles.loginMain }>
        <h1>Login</h1>
        <form>
          <input type="email" data-testid="email-input" placeholder="E-mail" />
          <input type="password" data-testid="password-input" placeholder="Senha" />
          <button
            type="submit"
            className="primary-btn"
            data-testid="login-submit-btn"
          >
            Entrar
          </button>
        </form>
      </main>
      <footer className={ styles.loginFooter }>
        <img src="/logo_darkbg.svg" alt="Squarefood" />
        <div>Desenvolvido por Grupo 21</div>
      </footer>
    </div>
  );
}

export default Login;
