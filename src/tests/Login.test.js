import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const EMAIL_LOGIN_INPUT = 'email-input';
const PASSWORD_LOGIN_INPUT = 'password-input';
const BUTTON_LOGIN = 'login-submit-btn';

const renderAppWithRouter = () => renderWithRouter(<App />);

describe('Página de Login', () => {
  test('Exibe um heading com o "Título" escrito', () => {
    const { getByRole } = renderAppWithRouter();
    const loginTitle = getByRole('heading', { level: 1, name: 'Login' });
    expect(loginTitle).toBeInTheDocument();
  });
  test('Exibe um input do tipo "email"', () => {
    const { getByTestId } = renderAppWithRouter();
    const emailInput = getByTestId(EMAIL_LOGIN_INPUT);
    expect(emailInput).toHaveAttribute('type', 'email');
  });
  test('Exibe um input do tipo "password"', () => {
    const { getByTestId } = renderAppWithRouter();
    const passwordInput = getByTestId(PASSWORD_LOGIN_INPUT);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
  describe('Exibe um botão que caso:', () => {
    test('Os inputs estejam apagados, esteja desabilitado', () => {
      const { getByTestId } = renderAppWithRouter();
      const submitBtn = getByTestId(BUTTON_LOGIN);
      expect(submitBtn).toBeInTheDocument();
      expect(submitBtn).toBeDisabled();
    });
    test('Os inputs estejam preenchidos incorretamente, esteja desabilitado', () => {
      const { getByTestId } = renderAppWithRouter();
      const submitBtn = getByTestId(BUTTON_LOGIN);
      const emailInput = getByTestId(EMAIL_LOGIN_INPUT);
      const passwordInput = getByTestId(PASSWORD_LOGIN_INPUT);
      userEvent.type(emailInput, 'wrongemail.com');
      userEvent.type(passwordInput, 'wpass');
      expect(submitBtn).toBeInTheDocument();
      expect(submitBtn).toBeDisabled();
    });
    test('Os inputs estejam preenchedos corretamente, esteja habilitado', () => {
      const { getByTestId } = renderAppWithRouter();
      const submitBtn = getByTestId(BUTTON_LOGIN);
      const emailInput = getByTestId(EMAIL_LOGIN_INPUT);
      const passwordInput = getByTestId(PASSWORD_LOGIN_INPUT);
      userEvent.type(emailInput, 'ada-lovelance@trybe.com');
      userEvent.type(passwordInput, 'alanTuring1912');
      expect(submitBtn).toBeEnabled();
    });
    test('Ao clicar no botão, habiltiado, vai para "/comidas"', () => {
      const { getByTestId, history } = renderAppWithRouter();
      userEvent.type(getByTestId(EMAIL_LOGIN_INPUT), 'ada-lovelance@trybe.com');
      userEvent.type(getByTestId(PASSWORD_LOGIN_INPUT), 'alanTuring1912');
      userEvent.click(getByTestId(BUTTON_LOGIN));
      expect(history.location.pathname).toBe('/comidas');
    });
  });
});
