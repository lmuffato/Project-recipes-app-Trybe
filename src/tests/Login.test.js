import userEvent from '@testing-library/user-event';
import React from 'react';
import Login from '../pages/Login';
import renderWithRouter from './renderWithRouter';

describe('Teste da página de Login', () => {
  test('Os inputs e o botão de login são renderizados', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginButton = getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('Ao clicar no botão, o usuário vai para /comidas', () => {
    const { getByTestId, history } = renderWithRouter(<Login />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginButton = getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'fulano@gmail.com');
    userEvent.type(passwordInput, '12345678');
    expect(loginButton).not.toHaveAttribute('disabled');

    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/comidas');
  });
});
