import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const LOGIN_BTN_TEST_ID = 'login-submit-btn';
const MOCK_EMAIL = 'alguem@alguem.com';

describe('Teste da página de Comidas', () => {
  test('Os inputs e o botão de login são renderizados', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));
  });
});
