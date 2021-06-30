import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('2 - Create all elements that must respect the attributes described', () => {
  it('It has the data-testids email-input, password-input and login-submit-btn', () => {
    const { getByTestId } = renderWithRouter(<App />);

    getByTestId('email-input');
    getByTestId('password-input');
    getByTestId('login-submit-btn');
  });
});

describe('3 - Design the screen so that the person should be able to write email', () => {
  it('It is possible to write the email', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const inputEmail = getByTestId('email-input');
    expect(inputEmail).toHaveValue('');
    fireEvent.change(inputEmail, { target: { value: 'mateus@betrybe.com' } });
    expect(inputEmail).toHaveValue('mateus@betrybe.com');
  });
});

describe('4 - Screen must be able to write password', () => {
  it('It is possible to write the password', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const inputPassword = getByTestId('password-input');
    expect(inputPassword).toHaveValue('');
    fireEvent.change(inputPassword, { target: { value: '12345678' } });
    expect(inputPassword).toHaveValue('12345678');
  });
});
