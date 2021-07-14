import React from 'react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';
import App from '../App';
import Provider from '../contexts/Provider';

const validEmail = 'email@email.com';
const invalidEmail1 = 'email@emailcom';
const invalidEmail2 = 'emailemail.com';
const validPassword = '1234567';
const invalidPassword = '123456';
const emailInputString = 'email-input';
const passwordInputString = 'password-input';
const loginInputString = 'login-submit-btn';

describe('Verifica se na tela de login', () => {
  const historyMock = createMemoryHistory();

  it('os inputs possuem os test ids corretos', () => {
    const { getByTestId } = renderWithRouter(<Login history={ historyMock } />);
    const emailTestId = getByTestId(emailInputString);
    const passwordTestId = getByTestId(passwordInputString);
    const loginBtnTestId = getByTestId(loginInputString);

    expect(emailTestId).toBeInTheDocument();
    expect(passwordTestId).toBeInTheDocument();
    expect(loginBtnTestId).toBeInTheDocument();
  });

  it('é possível digitar o email no input de email', () => {
    const { getByTestId } = renderWithRouter(
      <Login history={ historyMock } />,
    );
    const emailInput = getByTestId(emailInputString);

    userEvent.type(emailInput, validEmail);
    expect(emailInput).toHaveAttribute('value', validEmail);
  });

  it('é possível digitar a senha no input de password', () => {
    const { getByTestId } = renderWithRouter(
      <Login history={ historyMock } />,
    );
    const passwordInput = getByTestId(passwordInputString);

    userEvent.type(passwordInput, validPassword);
    expect(passwordInput).toHaveAttribute('value', validPassword);
  });

  it('só é possível enviar o formulário quando os conteúdos dos campos de email e'
  + ' password são válidos e o botão enviar fica desabilidato caso não', () => {
    const { getByTestId } = renderWithRouter(
      <Login history={ historyMock } />,
    );
    const emailInput = getByTestId(emailInputString);
    const passwordInput = getByTestId(passwordInputString);
    const loginBtn = getByTestId(loginInputString);

    userEvent.type(passwordInput, validPassword);
    userEvent.type(emailInput, validEmail);

    expect(loginBtn).not.toBeDisabled();

    userEvent.type(passwordInput, invalidPassword);
    userEvent.type(emailInput, validEmail);

    expect(loginBtn).toBeDisabled();

    userEvent.type(passwordInput, validPassword);
    userEvent.type(emailInput, invalidEmail1);

    expect(loginBtn).toBeDisabled();

    userEvent.type(passwordInput, invalidPassword);
    userEvent.type(emailInput, invalidEmail2);

    expect(loginBtn).toBeDisabled();
  });

  it('após a submissão são armazenados na local storage dois tokens:'
  + ' mealsToken e cocktailsToken ambos com valor 1', () => {
    const { getByTestId } = renderWithRouter(
      <Login history={ historyMock } />,
    );
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');

    const emailInput = getByTestId(emailInputString);
    const passwordInput = getByTestId(passwordInputString);
    const loginBtn = getByTestId(loginInputString);

    userEvent.type(passwordInput, validPassword);
    userEvent.type(emailInput, validEmail);
    userEvent.click(loginBtn);

    const mealsToken = JSON.parse(localStorage.getItem('mealsToken'));
    const cocktailsToken = JSON.parse(localStorage.getItem('cocktailsToken'));
    expect(cocktailsToken).toBe(1);
    expect(mealsToken).toBe(1);
  });

  it('após a submissão o email do usuário é armazenado na localStorage  na chave'
  + ' user no formato { email: email-da-pessoa }', () => {
    const { getByTestId } = renderWithRouter(
      <Login history={ historyMock } />,
    );
    localStorage.removeItem('user');

    const emailInput = getByTestId(emailInputString);
    const passwordInput = getByTestId(passwordInputString);
    const loginBtn = getByTestId(loginInputString);

    userEvent.type(passwordInput, validPassword);
    userEvent.type(emailInput, validEmail);
    userEvent.click(loginBtn);

    const { email } = JSON.parse(localStorage.getItem('user'));
    expect(email).toBe(validEmail);
  });

  it('após a submissão o usuário é redirecionado para a página de receita de'
  + ' comidas', async () => {
    const { getByTestId, history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>
      ,
    );

    const emailInput = getByTestId(emailInputString);
    const passwordInput = getByTestId(passwordInputString);
    const loginBtn = getByTestId(loginInputString);

    userEvent.type(passwordInput, validPassword);
    userEvent.type(emailInput, validEmail);
    userEvent.click(loginBtn);

    expect(history.location.pathname).toBe('/comidas');
  });
});
