import React from 'react';

import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/getTestInfo';

const { headerRenderTests, footerRenderTests } = getTest('/');
const { itDoesntRenderHeader } = headerRenderTests();
const { itDoesntRenderFooter } = footerRenderTests();

describe('Login screen', () => {
  describe('Check Header and Footer components', () => {
    it('doesnt render the Header and Footer on the Login screen', () => {
      const { queryByTestId } = renderWithRouterAndContext(<Login />);
      itDoesntRenderHeader(queryByTestId);
      itDoesntRenderFooter(queryByTestId);
    });
  });

  it('does and checks the user login process', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<Login />);

    const passwordInput = getByTestId('password-input');
    const emailInput = getByTestId('email-input');
    const loginSubmitButton = getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'renzo@gmail.com');
    userEvent.type(passwordInput, '12345');
    expect(loginSubmitButton).toHaveAttribute('disabled');

    userEvent.type(passwordInput, '1234567');
    expect(loginSubmitButton).not.toHaveAttribute('disabled');
    userEvent.click(loginSubmitButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
