import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Login from '../pages/Login';

const validEmail = 'tiao@gmail.com';
const validPassword = '1234567';

describe('Testing a Login Page', () => {
  test('The title ´Login` is rendered', () => {
    const { getByRole } = renderWithRouter(<Login />);
    const heading = getByRole('heading', {
      name: /login/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });
  test('If there is a place for the user, enter his email and password', () => {
    const { getByTestId } = renderWithRouter(<Login />, '/');
    const email = getByTestId('email-input');
    const senha = getByTestId('password-input');

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });
  test('If you have a link with the text "Enter"', () => {
    const { getAllByRole } = renderWithRouter(<Login />);
    const link = getAllByRole('link', {
      name: /Entrar/i,
    });
    expect(link).toHaveLength(1);
  });

  test('If the button enabled when the data is valid.', () => {
    const { getByText, getByTestId } = renderWithRouter(<Login />);
    const email = getByTestId('email-input');
    const senha = getByTestId('password-input');
    userEvent.type(email, validEmail);
    userEvent.type(senha, validPassword);
    const button = getByText(/Entrar/i);
    expect(button).toBeEnabled();
  });
});
