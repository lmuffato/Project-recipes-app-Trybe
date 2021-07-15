import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import LogoImg from '../images/logo.png';
import BackgroundLoginImg from '../images/backgroundLogin.png';

function Home() {
  const [userEmail, setEmail] = useState('');
  const [validEmail, seTvalidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);

  // Clear localstorage data when login screen loads;
  useEffect(() => {
    window.localStorage.removeItem('mealsToken');
    window.localStorage.removeItem('cocktailsToken');
    window.localStorage.removeItem('user');
  }, []);

  const changeEmailInState = (email) => {
    setEmail(email);
    const validEmailTest = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email);
    seTvalidEmail(validEmailTest);
  };

  const changePasswordInState = (value) => {
    const minimumPasswordLength = 7;
    setValidPassword(value.length >= minimumPasswordLength);
  };

  const saveTokenInLocalStorage = () => {
    window.localStorage.setItem('mealsToken', 1);
    window.localStorage.setItem('cocktailsToken', 1);
  };

  const saveUserInfoInLocalStorage = () => {
    const userKeyLocalStore = { email: userEmail };
    const userInfoJson = JSON.stringify(userKeyLocalStore);
    localStorage.setItem('user', userInfoJson);
  };

  const buttonSubmit = () => {
    saveTokenInLocalStorage();
    saveUserInfoInLocalStorage();
    setRedirect(true);
  };

  return (
    <Container image={ BackgroundLoginImg }>
      <Logo src={ LogoImg } />
      <FormLogin>
        <div>
          <label htmlFor="text">
            {/* <p>Email</p> */}
            <input
              id="text"
              data-testid="email-input"
              type="text"
              placeholder="Digite um email válido"
              onChange={ (event) => { changeEmailInState(event.target.value); } }
            />
          </label>
        </div>
        <div>
          <label htmlFor="text">
            {/* <p>Senha</p> */}
            <input
              id="text"
              type="password"
              data-testid="password-input"
              placeholder="Pelo menos sete dígitos"
              onChange={ (event) => { changePasswordInState(event.target.value); } }
            />
          </label>
        </div>
        <div>
          <Button
            id="loginButton"
            type="button"
            data-testid="login-submit-btn"
            disabled={ validEmail === false || validPassword === false }
            onClick={ buttonSubmit }
          >
            Entrar
          </Button>
          {redirect ? <Redirect to="/comidas" /> : null}
        </div>
      </FormLogin>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: rgb( 214, 168, 40 );
  background-image: ${(props) => `url(${props.image})`};
`;

const Logo = styled.img`
  width: 60%;
  height: auto;
`;

const FormLogin = styled.div`
  width: 70%;
  height: auto;
  margin-top: 20px;

  display: flex;
  flex-direction: column;

  label {
    width: 100%;

    input {
      width: 100%;
      padding: 5px;
    }
  }

  p {
    margin: 0;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 50px;

  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;

  background-color: ${({ disabled }) => (
    disabled ? 'rgba(0, 128, 0, 0.5)' : 'rgb(0, 128, 0)'
  )};
`;

export default Home;
