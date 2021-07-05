import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import md5 from 'md5';
import brandFace from '../../images/brand/face.svg';
import styles from './styles.module.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnisDisabled, setBtnIsDisabled] = useState(false);

  useEffect(() => {
    // Padrão para o RegEx: https://regexr.com/2ri2c
    const enabledButton = () => {
      const pattern = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
      const digits = 7;
      setBtnIsDisabled(!(password.length >= digits && email.match(pattern)));
    };

    enabledButton();
  }, [email, password]);

  const history = useHistory();

  const successfulLogin = (event) => {
    event.preventDefault();
    const userEmail = { email };
    localStorage.setItem('user', JSON.stringify(userEmail));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('gravatar', `https://www.gravatar.com/avatar/${md5(email)}`);
    history.push('/comidas');
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
        <form onSubmit={ successfulLogin }>
          <input
            type="email"
            data-testid="email-input"
            placeholder="E-mail"
            value={ email }
            onChange={ (event) => setEmail(event.target.value) }
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="Senha"
            value={ password }
            onChange={ (event) => setPassword(event.target.value) }
          />
          <button
            type="submit"
            className="primary-btn"
            data-testid="login-submit-btn"
            disabled={ btnisDisabled }
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
