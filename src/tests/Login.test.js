import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getItemFromLocalStorage } from '../services/localStorage';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const BUTTON_INPUT_TEST_ID = 'login-submit-btn';
const VALID_EMAIL = 'email@email.com';
const VALID_PASSWORD = '1234567';

// scr: https://testing-library.com/docs/example-react-router/#reducing-boilerplate
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Login Page', route);

  return render(ui, { wrapper: BrowserRouter });
};

describe('Testa todo o Componente "Login"', () => {
  it('1-Verifica se contem o texto trybe na página login', () => {
    renderWithRouter(<App />);
    const linkElement = screen.getByText(/TRYBE/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('2-Verifica se a página possui os campos de inputs e o botão', () => {
    renderWithRouter(<App />);

    const button = screen.getByTestId(BUTTON_INPUT_TEST_ID);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    expect(button).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });
  test('3-Verifica se é possivel digitar no campo de input "email"', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);

    userEvent.type(emailInput, VALID_EMAIL);

    expect(emailInput).toHaveValue(VALID_EMAIL);
  });
  test('4-Verifica se é possivel digitar no campo de input "senha"', () => {
    renderWithRouter(<App />);

    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(passwordInput, VALID_PASSWORD);

    expect(passwordInput).toHaveValue(VALID_PASSWORD);
  });
  test('5-Verifica que o formulário só seja válido após um'
   + ' email válido e uma senha de mais de 6 caracteres serem preenchidos', () => {
    renderWithRouter(<App />);

    const button = screen.getByTestId(BUTTON_INPUT_TEST_ID);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(email, 'sdfsadfs');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, '13456');
    expect(button).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).not.toBeDisabled();
  });
  test('6-Verifica que após a submissão mealsToken e cocktailsToken'
  + ' devem estar salvos em localStorage e ambas possuem o valor 1', () => {
    renderWithRouter(<App />);

    const button = screen.getByTestId(BUTTON_INPUT_TEST_ID);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    userEvent.click(button);

    expect(getItemFromLocalStorage('cocktailsToken')).toBe(1);
    expect(getItemFromLocalStorage('mealsToken')).toBe(1);
  });
  test('7-Verifica que após a submissão a chave user deve estar'
  + ' salva em localStorage', () => {
    renderWithRouter(<App />);

    const button = screen.getByTestId(BUTTON_INPUT_TEST_ID);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    userEvent.click(button);

    expect(getItemFromLocalStorage('user')).toEqual({ email: VALID_EMAIL });
  });
  test('8-Verifica que após a submissão a rota muda para a tela '
  + ' principal de receitas de comidas', () => {
    renderWithRouter(<App />);

    const button = screen.getByTestId(BUTTON_INPUT_TEST_ID);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    userEvent.click(button);

    expect(window.location.pathname).toBe('/comidas');
  });
});
