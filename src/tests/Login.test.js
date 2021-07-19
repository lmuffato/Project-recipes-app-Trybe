import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Login Page Test', () => {
  test('shows the login page when routr is `/`', () => {
    const { getByPlaceholderText, getByRole } = renderWithRouter(<App />);

    const email = getByPlaceholderText(/enter email/i);
    const password = getByPlaceholderText(/password/i);
    const button = getByRole('button', {
      name: /entrar/i,
    });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
