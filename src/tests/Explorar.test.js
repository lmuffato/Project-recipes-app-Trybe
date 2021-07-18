import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const LOGIN_BTN_TEST_ID = 'login-submit-btn';
const MOCK_EMAIL = 'alguem@alguem.com';

describe('Teste da página de explorar', () => {
  test('O header é renderizado corretamente', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/explorar');

    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toHaveTextContent('Explorar');
  });

  test('Os botôes são renderizados corretamente', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/explorar');

    const exploreFoodsBtn = getByTestId('explore-food');
    const exploreDrinksBtn = getByTestId('explore-drinks');

    expect(exploreFoodsBtn).toBeInTheDocument();
    expect(exploreFoodsBtn).toHaveTextContent('Explorar Comidas');

    expect(exploreDrinksBtn).toBeInTheDocument();
    expect(exploreDrinksBtn).toHaveTextContent('Explorar Bebidas');
  });
});
