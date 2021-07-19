import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';

import beefMeals from '../../cypress/mocks/beefMeals';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const LOGIN_BTN_TEST_ID = 'login-submit-btn';
const MOCK_EMAIL = 'alguem@alguem.com';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(beefMeals),
    }));
};

describe('Teste dos botoes de categoria página de Comidas', () => {
  beforeAll(mockFetch);
  test('filtro é aplicado ao clicar no botão', async () => {
    const { getByTestId, findByTestId } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

  });
});
