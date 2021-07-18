import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const LOGIN_BTN_TEST_ID = 'login-submit-btn';
const MOCK_EMAIL = 'alguem@alguem.com';

const PAGE_MOCK = '/receitas-feitas';
const DONE_IMG_TESTID = '0-horizontal-image';

describe('Teste da página de receitas feitas', () => {
  test('O header é renderizado corretamente', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toHaveTextContent('Receitas Feitas');
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

  test('se há uma comida feita, ela deve aparecer', async () => {
    const { getByTestId, findAllByRole, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/comidas/52977/in-progress');

    const ingredientCheckbox = await findAllByRole('checkbox');
    ingredientCheckbox.forEach((ing) => {
      userEvent.click(ing);
    });

    userEvent.click(getByTestId('finish-recipe-btn'));

    expect(history.location.pathname).toBe(PAGE_MOCK);

    expect(getByTestId(DONE_IMG_TESTID)).toBeInTheDocument();
  });

  test('filtro por all funciona', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    const filterByAllBtn = getByTestId('filter-by-all-btn');
    userEvent.click(filterByAllBtn);

    expect(getByTestId(DONE_IMG_TESTID)).toBeInTheDocument();
  });

  test('filtro por food funciona', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    const filterByFoodBtn = getByTestId('filter-by-food-btn');
    userEvent.click(filterByFoodBtn);

    expect(getByTestId(DONE_IMG_TESTID)).toBeInTheDocument();
  });

  test('filtro por drink funciona', () => {
    const { getByTestId, queryByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    const filterByDrinkBtn = getByTestId('filter-by-drink-btn');
    userEvent.click(filterByDrinkBtn);

    expect(queryByTestId(DONE_IMG_TESTID)).not.toBeInTheDocument();
  });
});
