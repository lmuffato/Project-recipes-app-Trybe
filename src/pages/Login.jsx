import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { LoginContainer, Container } from '../styles/login';
import logoIcon from '../images/logoLoginPequeno.svg';

function Login() {
  const { setEmail, setPassword, disabledData, handleClick } = useContext(UserContext);
  return (
    <LoginContainer>
      <div>
        <object className="logo-letmeeat" type="image/svg+xml" data={ logoIcon }>
          Logo letmeEat
        </object>
      </div>
      <Container>
        <label htmlFor="email">
          Email
          <input
            type="text"
            data-testid="email-input"
            id="email"
            onChange={ (event) => setEmail(event.target.value) }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            data-testid="password-input"
            id="password"
            onChange={ (event) => setPassword(event.target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ disabledData }
          onClick={ () => handleClick() }
        >
          Entrar
        </button>
      </Container>
    </LoginContainer>
  );
}

export default Login;
