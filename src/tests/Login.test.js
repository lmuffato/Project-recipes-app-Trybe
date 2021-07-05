import React from 'react';
import { render } from '@testing-library/react';
import Login from '../pages/Login';

describe('Tela de Login', () => {
  test('Existe um campo para a pessoa usuária inserir o e-mail', () => {
    const { getByTestId } = render(<Login />);
    const email = getByTestId('email-input');
    expect(email).toBeInTheDocument();
  });

  test('Existe um campo para a pessoa usuária inserir a senha', () => {
    const { getByTestId } = render(<Login />);
    const password = getByTestId('password-input');
    expect(password).toBeInTheDocument();
  });

  test('Existe um botão para a pessoa usuária entrar', () => {
    const { getByTestId } = render(<Login />);
    const loginBtn = getByTestId('login-submit-btn');
    expect(loginBtn).toBeInTheDocument();
  });
});
