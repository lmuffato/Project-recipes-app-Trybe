import React from 'react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouter from '../helper/renderWithRouter';

describe('Login screen', () => {
  it('does and checks the user login process', () => {
    const { getByTestId, history } = renderWithRouter(<Login />);

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
