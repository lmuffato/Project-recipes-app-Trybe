import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('teste do Login', () => {
  const rigthEmail = 'xablau@google.com';
  const loginBtnId = 'login-submit-btn';
  it('Inicia a aplicação na página de login com botão de login desabilitado', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const login = getByText(/Login/);
    const loginBtn = getByTestId(loginBtnId);
    expect(login).toBeInTheDocument();
    expect(loginBtn).toBeDisabled();
  });

  it('Habilita o botão de login quando os dados forem preenchidos corretamente', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const email = getByTestId('email-input');
    const senha = getByTestId('password-input');
    const loginBtn = getByTestId(loginBtnId);
    expect(loginBtn).toBeDisabled();

    userEvent.type(email, 'xablau');
    userEvent.type(senha, 'xablau');
    expect(loginBtn).toBeDisabled();

    userEvent.type(email, rigthEmail);
    userEvent.type(senha, 'xabla');
    expect(loginBtn).toBeDisabled();

    userEvent.type(email, rigthEmail);
    userEvent.type(senha, '1234567');
    expect(loginBtn).toBeEnabled();
  });

  it('Redireciona para página de comidas ao fazer login', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const email = getByTestId('email-input');
    const senha = getByTestId('password-input');
    const loginBtn = getByTestId(loginBtnId);

    userEvent.type(email, rigthEmail);
    userEvent.type(senha, '1234567');
    userEvent.click(loginBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
