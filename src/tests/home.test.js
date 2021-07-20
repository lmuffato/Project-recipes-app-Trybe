import React from 'react';

import { screen } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import { waitForElement } from '@testing-library/react';
// import meals from '../../cypress/mocks/meals';

import userEvent from '@testing-library/user-event';
import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';

import App from '../App';

// const TWELVE = 12;
// const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const VALID_EMAIL = 'teste@teste.com';
const VALID_PASSWORD = '1234567';
const BUTTON_TEST_ID = 'login-submit-btn';
const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';

describe('Testes página Home', () => {
  it('Testes home', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<App />);
      const email = await screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const password = await screen.getByTestId(PASSWORD_INPUT_TEST_ID);
      const button = await screen.getByTestId(BUTTON_TEST_ID);

      await userEvent.type(email, VALID_EMAIL);
      await userEvent.type(password, VALID_PASSWORD);
      await userEvent.click(button);
      await waitForElement(() => screen.getByTestId('0-recipe-card'));
      await waitForElement(() => screen.getByTestId('0-card-img'));
      await waitForElement(() => screen.getByTestId('0-card-name'));

      await expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
      await expect(screen.getByTestId('0-card-img')).toBeInTheDocument();
      await expect(screen.getByTestId('0-card-name')).toBeInTheDocument();
    });
  });
});
