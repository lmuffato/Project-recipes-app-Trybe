import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const LOGIN_BTN_TEST_ID = 'login-submit-btn';
const MOCK_EMAIL = 'alguem@alguem.com';

const EXPLORE_PAGE_PATH = '/explorar/comidas/ingredientes';

describe('Teste da página de Explorar Bebidas por ingrediente', () => {
  test('O header é renderizado corretamente', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(EXPLORE_PAGE_PATH);

    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toHaveTextContent('Explorar Ingredientes');
  });

  test('São renderizados 12 cards de ingredientes', async () => {
    const { getByTestId, findAllByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(EXPLORE_PAGE_PATH);

    const cardRegEx = /.-ingredient-card/;
    const AMOUNT_OF_CARDS = 12;

    const cards = await findAllByTestId(cardRegEx);
    expect(cards).toHaveLength(AMOUNT_OF_CARDS);

    cards.forEach((card) => {
      expect(card).toBeInTheDocument();
    });
  });

  test('Ao clicar em um card, vai para a pagina principal', async () => {
    const { getByTestId, findByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(EXPLORE_PAGE_PATH);

    const ingredientCard = await findByTestId('0-ingredient-card');

    userEvent.click(ingredientCard);

    expect(history.location.pathname).toBe('/comidas');
  });
});
