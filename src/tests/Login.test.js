import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, render, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const SUBMIT_BUTTON_TEST_ID = 'login-submit-btn';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '1234567';

describe('1 - Crie todos os elementos que devem respeitar os atributos', () => {
  test('O input de email deve possuir o atributo data-testid="email-input"', () => {
    render(<Login />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);

    expect(email).toBeInTheDocument();
  });

  test('O input de senha deve possuir o atributo data-testid="password-input"', () => {
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

describe('2 - O usuário deve conseguir escrever digitar no input de email', () => {
  test('É possível escrever o email', () => {
    render(<Login />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);

    userEvent.type(email, VALID_EMAIL);
    expect(email).toHaveValue(VALID_EMAIL);
  });
});

describe('3 - O usuário deve conseguir escrever digitar no input de senha', () => {
  test('É possível escrever a senha', () => {
    render(<Login />);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(senha, VALID_PASSWORD);
    expect(senha).toHaveValue(VALID_PASSWORD);
  });
});

describe('4 - Autenticar informações de acordo com os seguintes testes', () => {
  test('O botão deve estar desativado se o email for inválido', () => {
    render(<Login />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const button = screen.getByText('Entrar');

    userEvent.type(email, VALID_EMAIL);
    expect(button).toBeDisabled();
    userEvent.type(email, 'email');
    expect(button).toBeDisabled();
    userEvent.type(email, 'email@com@');
    expect(button).toBeDisabled();

    userEvent.type(email, 'emailcom@');
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.');
    expect(button).toBeDisabled();
  });

  test('O botão deve estar desativado se a senha tiver 6 caracteres ou menos', () => {
    render(<Login />);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText('Entrar');

    userEvent.type(senha, '23456');
    expect(button).toBeDisabled();
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

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

describe('5 - Salva 2 tokens no localStorage após a submissão', () => {
  test('Cria as chaves no LocalStorage', () => {
    render(<Login />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText('Entrar');
    userEvent.type(email, 'email@email.com');
    userEvent.type(senha, '1234567');
    fireEvent.click(button);

    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');
    const user = JSON.parse(localStorage.getItem('user'));
    expect(mealsToken).toBe('1');
    expect(cocktailsToken).toBe('1');
    expect(user.email).toBe(email.value);
  });
});
