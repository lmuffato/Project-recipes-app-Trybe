import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const LOGIN_BTN_TEST_ID = 'login-submit-btn';
const MOCK_EMAIL = 'alguem@alguem.com';

const FIRST_RECIPE = '0-card-image';

describe('Teste dos botoes de categoria página de Comidas', () => {
  test('filtro é removido ao clicar no botão novamente', async () => {
    const { getByTestId, findByTestId } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    const beefFilter = await findByTestId('Beef-category-filter');

    userEvent.click(beefFilter);
    userEvent.click(beefFilter);

    const firstRecipe = await findByTestId(FIRST_RECIPE);

    expect(firstRecipe).toHaveTextContent('Corba');
  });

  test('filtro All', async () => {
    const { getByTestId, findByTestId } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    const beefFilter = await findByTestId('Beef-category-filter');
    const allFilter = await findByTestId('All-category-filter');

    userEvent.click(beefFilter);
    userEvent.click(allFilter);

    const firstRecipe = await findByTestId(FIRST_RECIPE);

    expect(firstRecipe).toHaveTextContent('Corba');
  });
});

describe('Teste dos botoes de categoria página de Bebidas', () => {
  test('filtro é removido ao clicar no botão novamente', async () => {
    const { getByTestId, findByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/bebidas');

    const ordFilter = await findByTestId('Ordinary Drink-category-filter');

    userEvent.click(ordFilter);
    userEvent.click(ordFilter);

    const firstRecipe = await findByTestId(FIRST_RECIPE);

    expect(firstRecipe).toHaveTextContent('GG');
  });

  test('filtro All', async () => {
    const { getByTestId, findByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/bebidas');

    const ordFilter = await findByTestId('Ordinary Drink-category-filter');
    const allFilter = await findByTestId('All-category-filter');

    userEvent.click(ordFilter);
    userEvent.click(allFilter);

    const firstRecipe = await findByTestId(FIRST_RECIPE);

    expect(firstRecipe).toHaveTextContent('GG');
  });
});
