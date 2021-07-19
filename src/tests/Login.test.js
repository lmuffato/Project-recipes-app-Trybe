import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Login Page Test', () => {
  test('shows the login page when route is `/`', () => {
    const { history: { location: { pathname } } } = renderWithRouter(<App />);

    expect(pathname).toBe('/');
  });
  test('the page has two inputs and a button', () => {
    const { getByPlaceholderText, getByRole } = renderWithRouter(<App />);

    const email = getByPlaceholderText(/enter email/i);
    const password = getByPlaceholderText(/password/i);
    const button = getByRole('button', {
      name: /entrar/i,
    });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(email.value).toMatch('');
    expect(password.value).toMatch('');
  });
  test('the button is disabled', () => {
    const { getByText } = renderWithRouter(<App />);

    const button = getByText(/entrar/i);

    expect(button).toBeDisabled();
  });
  test('the button is enabled on input change', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');

    const userEmail = 'test@test.com';
    const userPassword = '12345678';

    userEvent.type(email, userEmail);
    userEvent.type(password, userPassword);

    expect(email.value).toMatch(userEmail);
    expect(password.value).toMatch(userPassword);
    expect(button).not.toBeDisabled();
  });
  test('on button click change the route', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');

    const userEmail = 'test@test.com';
    const userPassword = '12345678';

    userEvent.type(email, userEmail);
    userEvent.type(password, userPassword);
    userEvent.click(button);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/comidas');
  });
});
