import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testing Login Screen', () => {
  it('Testing Login route', () => {
    const { history } = renderWithRouter(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Testing forms in Login', () => {
    const { getByText, getByTestId, getByRole } = renderWithRouter(<App />);

    const button = getByText(/Entrar/i);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button.type).toBe('button');

    userEvent.type(emailInput, 'hernanne@gmail.com');
    userEvent.type(passwordInput, 'teste12');

    expect(button.disabled).toBe(false);

    userEvent.click(getByRole('button'));

    expect(getByText('Hello World')).toBeInTheDocument();
  });
});
