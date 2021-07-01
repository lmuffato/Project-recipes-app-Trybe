import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import Login from '../pages/Login';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const SUBMIT_BUTTON_TEST_ID = 'login-submit-btn';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '1234567';

describe('1 - Crie todos os elementos que devem respeitar os atributos', () => {
  test('O input de email deve possuir o atributo data-testid="email-input', () => {
    render(<Login />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);

    expect(email).toBeInTheDocument();
  });

  test('O input de senha deve possuir o atributo data-testid="password-input', () => {
    render(<Login />);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    expect(senha).toBeInTheDocument();
  });

  test('O botão "Entrar" deve possuir o atributo data-testid="login-submit-btn"', () => {
    render(<Login />);
    const button = screen.getByTestId(SUBMIT_BUTTON_TEST_ID);

    expect(button).toBeInTheDocument();
  });
});

describe('5 - Autenticar informações de acordo com os seguintes testes', () => {
  test('O botão deve estar desativado se o email for inválido', () => {
    render(<Login />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText('Entrar');

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, '23456');
    expect(button).toBeDisabled();
    userEvent.type(email, 'email');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();
    userEvent.type(email, 'email@com@');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, 'emailcom@');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();
  });

  test('O botão de "Entrar" habilita ao inserir email e uma senha válidos', () => {
    render(<Login />);

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText('Entrar');

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeEnabled();
  });
});

/*
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';

import { renderWithRouterAndStore } from './testConfig';

afterEach(() => jest.clearAllMocks());

  test('A rota para esta página deve ser \'/\'', () => {
    const { history } = renderWithRouterAndStore(<App />, '/');
    expect(history.location.pathname).toBe('/');
  });

describe('3 - Utilize o Redux para salvar no estado global as informações da pessoa logada', () => {
  test('Salve o email no estado da aplicação, com a chave email, assim que o usuário logar.', () => {
    const { store } = renderWithRouterAndStore(<App />, '/');
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    fireEvent.click(button);

    expect(store.getState().user.email).toBe(VALID_EMAIL);
  });

  test('A rota deve ser mudada para \'/carteira\' após o clique no botão.', () => {
    const { history } = renderWithRouterAndStore(<App />, '/');
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    fireEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });
});
*/
