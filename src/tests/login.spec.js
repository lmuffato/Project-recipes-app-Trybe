import React from 'react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';

describe('Login Screen', () => {
  it('Check whether the login page has been rendered', () => {
    const { getByText } = renderWithRouter(<Login />);
    const loginTitle = getByText('Login');

    expect(loginTitle).toBeInTheDocument();
  });

  it('It has two inputs', () => {
    const { container } = renderWithRouter(<Login />);
    const inputs = container.querySelectorAll('input');

    expect(inputs.length).toBe(2);
    expect(inputs[0].type).toBe('email');
    expect(inputs[1].type).toBe('password');
  });

  it('It has login button', () => {
    const { getByTestId, container } = renderWithRouter(<Login />);
    const button = getByTestId('login-submit-btn');
    const inputs = container.querySelectorAll('input');

    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Entrar');
    expect(button).toBeDisabled();

    userEvent.type(inputs[0], 'test');
    userEvent.type(inputs[1], '123456');
    expect(button).toBeDisabled();

    userEvent.type(inputs[0], 'test@email.com');
    userEvent.type(inputs[1], '12');
    expect(button).toBeDisabled();

    userEvent.type(inputs[0], 'test@test.com');
    userEvent.type(inputs[1], '1234567');
    expect(button).toBeEnabled();

    fireEvent.click(button);

    const localUser = localStorage.getItem('user');
    const localMeal = localStorage.getItem('mealsToken');
    const localCocktail = localStorage.getItem('cocktailsToken');

    expect(localUser).toContain('test@test.com');
    expect(localMeal).toContain(1);
    expect(localCocktail).toContain(1);
  });
});
