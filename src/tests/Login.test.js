import React from 'react';
import { render } from '@testing-library/react';
import Login from '../pages/Login';

test('Botão de Login', () => {
  const { getByText } = render(<Login />);
  const Button = getByText(/Entrar/i);
  expect(Button).toBeInTheDocument();
});

test('Input de Email', () => {
  const { getByText } = render(<Login />);
  const Email = getByText(/Email/i);
  expect(Email).toBeInTheDocument();
});

test('Input de Senha', () => {
  const { getByText } = render(<Login />);
  const Password = getByText(/Password/i);
  expect(Password).toBeInTheDocument();
});
