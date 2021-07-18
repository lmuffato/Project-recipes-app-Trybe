import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const LOGIN_BTN_TEST_ID = 'login-submit-btn';
const SEARCH_INPUT_TEST_ID = 'search-input';
const SEARCH_BTN_TEST_ID = 'search-top-btn';
const EXEC_SEARCH_TEST_ID = 'exec-search-btn';
const MOCK_EMAIL = 'alguem@alguem.com';

describe('Teste da Search Bar na pagina de comidas', () => {
  test('Testa busca por nome', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    userEvent.click(getByTestId(SEARCH_BTN_TEST_ID));

    const input = getByTestId(SEARCH_INPUT_TEST_ID);

    userEvent.type(input, 'chicken');
    userEvent.click(getByTestId('name-search-radio'));

    userEvent.click(getByTestId(EXEC_SEARCH_TEST_ID));

    expect(history.location.pathname).toBe('/comidas');
  });

  test('Testa busca por ingrediente comidas', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    userEvent.click(getByTestId(SEARCH_BTN_TEST_ID));

    const input = getByTestId(SEARCH_INPUT_TEST_ID);

    userEvent.type(input, 'chicken');
    userEvent.click(getByTestId('ingredient-search-radio'));

    userEvent.click(getByTestId(EXEC_SEARCH_TEST_ID));

    expect(history.location.pathname).toBe('/comidas');
  });

  test('Testa busca por primeira letra comidas', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    userEvent.click(getByTestId(SEARCH_BTN_TEST_ID));

    const input = getByTestId(SEARCH_INPUT_TEST_ID);

    userEvent.type(input, 'c');
    userEvent.click(getByTestId('first-letter-search-radio'));

    userEvent.click(getByTestId(EXEC_SEARCH_TEST_ID));

    expect(history.location.pathname).toBe('/comidas');
  });
});

describe('Teste da Search Bar na pagina de bebidas', () => {
  test('Testa busca por nome bebidas', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/bebidas');

    userEvent.click(getByTestId(SEARCH_BTN_TEST_ID));

    const input = getByTestId(SEARCH_INPUT_TEST_ID);

    userEvent.type(input, 'gg');
    userEvent.click(getByTestId('name-search-radio'));

    userEvent.click(getByTestId(EXEC_SEARCH_TEST_ID));

    expect(history.location.pathname).toBe('/bebidas');
  });

  test('Testa busca por ingrediente bebidas', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/bebidas');

    userEvent.click(getByTestId(SEARCH_BTN_TEST_ID));

    const input = getByTestId(SEARCH_INPUT_TEST_ID);

    userEvent.type(input, 'lime');
    userEvent.click(getByTestId('ingredient-search-radio'));

    userEvent.click(getByTestId(EXEC_SEARCH_TEST_ID));

    expect(history.location.pathname).toBe('/bebidas');
  });

  test('Testa busca por primeira letra bebidas', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/bebidas');

    userEvent.click(getByTestId(SEARCH_BTN_TEST_ID));

    const input = getByTestId(SEARCH_INPUT_TEST_ID);

    userEvent.type(input, 'l');
    userEvent.click(getByTestId('first-letter-search-radio'));

    userEvent.click(getByTestId(EXEC_SEARCH_TEST_ID));

    expect(history.location.pathname).toBe('/bebidas');
  });
});
