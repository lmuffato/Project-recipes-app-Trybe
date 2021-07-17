import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getItemFromLocalStorage } from '../services/localStorage';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import { mockApiByCategory } from './mock/mockMealAPI';
import Login from '../pages/Login';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const BUTTON_INPUT_TEST_ID = 'login-submit-btn';
const VALID_EMAIL = 'email@email.com';
const VALID_PASSWORD = '1234567';

describe('Testa todo o Componente "Login"', () => {
  it('1-Verifica se contem o texto trybe na página login', () => {
    renderWithRouterAndContext(<Login />);
    const linkElement = screen.getByText(/TRYBE/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('2-Verifica se a página possui os campos de inputs e o botão', () => {
    renderWithRouterAndContext(<Login />);

    const button = screen.getByTestId(BUTTON_INPUT_TEST_ID);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    expect(button).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });
  test('3-Verifica se é possivel digitar no campo de input "email"', () => {
    renderWithRouterAndContext(<Login />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);

    userEvent.type(emailInput, VALID_EMAIL);

    expect(emailInput).toHaveValue(VALID_EMAIL);
  });
  test('4-Verifica se é possivel digitar no campo de input "senha"', () => {
    renderWithRouterAndContext(<Login />);

    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(passwordInput, VALID_PASSWORD);

    expect(passwordInput).toHaveValue(VALID_PASSWORD);
  });
  test('5-Verifica que o formulário só seja válido após um'
   + ' email válido e uma senha de mais de 6 caracteres serem preenchidos', () => {
    renderWithRouterAndContext(<Login />);

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
    renderWithRouterAndContext(<Login />);

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
    renderWithRouterAndContext(<Login />);

    const button = screen.getByTestId(BUTTON_INPUT_TEST_ID);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    userEvent.click(button);

    expect(getItemFromLocalStorage('user')).toEqual({ email: VALID_EMAIL });
  });
  test('8-Verifica que após a submissão a rota muda para a tela '
  + ' principal de receitas de comidas', async () => {
    const { historyTest } = renderWithRouterAndContext(<Login />);
    const categories = await mockApiByCategory();

    const button = screen.getByTestId(BUTTON_INPUT_TEST_ID);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    userEvent.click(button);

    const meals = { meals: [{ strCategory: 'Beef' },
      { strCategory: 'Breakfast' },
      { strCategory: 'Chicken' },
      { strCategory: 'Dessert' },
      { strCategory: 'Goat' },
      { strCategory: 'Lamb' },
      { strCategory: 'Miscellaneous' },
      { strCategory: 'Pasta' },
      { strCategory: 'Pork' },
      { strCategory: 'Seafood' },
      { strCategory: 'Side' },
      { strCategory: 'Starter' },
      { strCategory: 'Vegan' },
      { strCategory: 'Vegetarian' }] };
    expect(historyTest.entries[2].pathname).toBe('/comidas');
    expect(categories).toMatchObject(meals);
  });
});
