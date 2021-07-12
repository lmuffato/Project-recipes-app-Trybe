import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const LOGIN_BTN_TEST_ID = 'login-submit-btn';
const MOCK_EMAIL = 'alguem@alguem.com';

describe('Testa a página de perfil', () => {
  test('O campo de email está visível e é correto', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/perfil');

    expect(history.location.pathname).toBe('/perfil');

    const profileEmail = getByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
    expect(profileEmail).toHaveTextContent(MOCK_EMAIL);
  });

  test('Ir para tela receitas feitas ao clicar no botão', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/perfil');

    const doneRecipesBtn = getByTestId('profile-done-btn');
    expect(doneRecipesBtn).toBeInTheDocument();

    userEvent.click(doneRecipesBtn);

    expect(history.location.pathname).toBe('/receitas-feitas');
  });

  test('Ir para tela receitas favoritas ao clicar no botão', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/perfil');

    const favoriteRecipesBtn = getByTestId('profile-favorite-btn');
    expect(favoriteRecipesBtn).toBeInTheDocument();

    userEvent.click(favoriteRecipesBtn);

    expect(history.location.pathname).toBe('/receitas-favoritas');
  });

  test('Comportamento do botão logout', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/perfil');

    const logoutBtn = getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();

    userEvent.click(logoutBtn);

    expect(history.location.pathname).toBe('/');
  });
});
