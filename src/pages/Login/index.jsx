import React, { useState } from 'react';
import brandFace from '../../images/brand/face.svg';

import styles from './styles.module.scss';

function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  // Padrão para o RegEx: https://regexr.com/2ri2c
  const enabledButton = () => {
    const pattern = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
    const digits = 7;
    return !(inputPassword.length >= digits && inputEmail.match(pattern));
  };

  const successfulLogin = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
  };

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
          <input
            type="email"
            data-testid="email-input"
            placeholder="E-mail"
            value={ inputEmail }
            onChange={ (event) => setInputEmail(event.target.value) }
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="Senha"
            value={ inputPassword }
            onChange={ (event) => setInputPassword(event.target.value) }
          />
          <button
            type="submit"
            className="primary-btn"
            data-testid="login-submit-btn"
            disabled={ enabledButton() }
            onClick={ successfulLogin }
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
