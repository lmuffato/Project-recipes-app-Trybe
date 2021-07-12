import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';
const validEmail = 'test@email.com';
const validPassword = '1234567';
const btnText = 'Entrar';

afterEach(() => jest.clearAllMocks());

describe('Check Login screen', () => {
  it('Check route is "/"', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
  });

  it('Check if there is a place for the user to enter their email and password', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const email = getByTestId(emailTestId);
    const password = getByTestId(passwordTestId);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  it('Check if there is button whith text "Entrar"', () => {
    const { getByText } = renderWithRouter(<App />);

    const button = getByText(btnText);
    expect(button).toBeInTheDocument();
  });

  it('Check if button "Entrar" is disabled when an invalid email is typed', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);

    const email = getByTestId(emailTestId);
    const password = getByTestId(passwordTestId);
    const button = getByText(btnText);

    userEvent.type(email, 'email');
    userEvent.type(password, validPassword);
    expect(button).toBeDisabled();

    userEvent.type(email, 'email@com@');
    userEvent.type(password, validPassword);
    expect(button).toBeDisabled();

    userEvent.type(email, 'emailcom@');
    userEvent.type(password, validPassword);
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.');
    userEvent.type(password, validPassword);
    expect(button).toBeDisabled();
  });

  it('Check if button "Entrar" is disabled when an invalid password is typed', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);

    const email = getByTestId(emailTestId);
    const password = getByTestId(passwordTestId);
    const button = getByText(btnText);

    userEvent.type(email, validEmail);
    userEvent.type(password, '1234');
    expect(button).toBeDisabled();
  });

  it('The route must be changed to "comidas" after clicking the button', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);

    const email = getByTestId(emailTestId);
    const password = getByTestId(passwordTestId);
    const button = getByText(btnText);

    userEvent.type(email, validEmail);
    userEvent.type(password, validPassword);
    userEvent.click(button);

    expect(window.location.href).toBe('http://localhost/comidas');
  });
});
