import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const LOGIN_BTN_TEST_ID = 'login-submit-btn';
const MOCK_EMAIL = 'alguem@alguem.com';

const PAGE_MOCK = '/receitas-favoritas';
const FAVORITE_IMG_TESTID = '0-horizontal-image';
const FAVORITE_BTN_TESTID = 'favorite-btn';

describe('Teste da página de receitas favoritas', () => {
  test('O header é renderizado corretamente', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toHaveTextContent('Receitas Favoritas');
  });

  test('Os botões de filtro são renderizados corretamente', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    expect(getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(getByTestId('filter-by-food-btn')).toBeInTheDocument();
    expect(getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  });

  test('se há uma comida favoritada, ela deve aparecer', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/comidas/52977');
    userEvent.click(getByTestId(FAVORITE_BTN_TESTID));

    history.push(PAGE_MOCK);

    expect(getByTestId(FAVORITE_IMG_TESTID)).toBeInTheDocument();
  });

  test('filtro por all funciona', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    const filterByAllBtn = getByTestId('filter-by-all-btn');
    userEvent.click(filterByAllBtn);

    expect(getByTestId(FAVORITE_IMG_TESTID)).toBeInTheDocument();
  });

  test('filtro por food funciona', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/comidas/52978');
    userEvent.click(getByTestId(FAVORITE_BTN_TESTID));

    history.push(PAGE_MOCK);

    const filterByFoodBtn = getByTestId('filter-by-food-btn');
    userEvent.click(filterByFoodBtn);

    expect(getByTestId(FAVORITE_IMG_TESTID)).toBeInTheDocument();
  });

  test('filtro por drink funciona', () => {
    const { getByTestId, queryByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/comidas/52978');
    userEvent.click(getByTestId(FAVORITE_BTN_TESTID));

    history.push(PAGE_MOCK);

    const filterByDrinkBtn = getByTestId('filter-by-drink-btn');
    userEvent.click(filterByDrinkBtn);

    expect(queryByTestId(FAVORITE_IMG_TESTID)).not.toBeInTheDocument();
  });

  test('O botão de desfavoritar funciona', () => {
    const { getByTestId, queryByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/comidas/52977');
    userEvent.click(getByTestId(FAVORITE_BTN_TESTID));

    history.push(PAGE_MOCK);

    expect(getByTestId(FAVORITE_IMG_TESTID)).toBeInTheDocument();

    const unFavoriteBtn = getByTestId('0-horizontal-favorite-btn');
    expect(unFavoriteBtn).toBeInTheDocument();

    userEvent.click(unFavoriteBtn);

    expect(queryByTestId(FAVORITE_IMG_TESTID)).not.toBeInTheDocument();
  });
});
