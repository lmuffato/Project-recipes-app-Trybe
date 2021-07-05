import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const emailDataId = 'email-input';
const passwordDataId = 'password-input';
const loginBtnDataId = 'login-submit-btn';

describe('1 -test if all login elements are in the login screen', () => {
  afterAll(() => done());

  it('test if app screen is "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    let { pathname } = history.location;
    pathname = history.location.pathname;
    expect(pathname).toBe('/');
  });

  it('test if email input is shown and works', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />);
    const emailInput = getByTestId(emailDataId);
    expect(emailInput).toBeInTheDocument();
    userEvent.type(emailInput, 'betrybe@trybe.com');
    expect(emailInput).toHaveValue('betrybe@trybe.com');
  });

  it('test if password input is shown and works', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />);
    const passwordInput = getByTestId(passwordDataId);
    expect(passwordInput).toBeInTheDocument();
    userEvent.type(passwordInput, 'p4ssw0rd');
    expect(passwordInput).toHaveValue('p4ssw0rd');
  });

  it('test if login button is shown and its disable', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />);
    const loginButton = getByTestId(loginBtnDataId);
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveAttribute('disabled');
  });
});

describe('2 -test if button is disable/enable', () => {
  afterAll(() => done());

  it('test if with wrong email and correct password button remains disable', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />);
    const emailInput = getByTestId(emailDataId);
    const passwordInput = getByTestId(passwordDataId);
    const loginButton = getByTestId(loginBtnDataId);
    userEvent.type(emailInput, 'trybe@betrybecom');
    userEvent.type(passwordInput, '1234567');
    expect(loginButton).toBeDisabled();
  });

  it('test if with correct email and wrong password button remains disable', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />);
    const emailInput = getByTestId(emailDataId);
    const passwordInput = getByTestId(passwordDataId);
    const loginButton = getByTestId(loginBtnDataId);
    userEvent.type(emailInput, 'trybe@betrybe.com');
    userEvent.type(passwordInput, '123456');
    expect(loginButton).toBeDisabled();
  });

  it('test if with correct email and password button will be enabled', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />);
    const emailInput = getByTestId(emailDataId);
    const passwordInput = getByTestId(passwordDataId);
    const loginButton = getByTestId(loginBtnDataId);
    userEvent.type(emailInput, 'trybe@trybe.com');
    userEvent.type(passwordInput, '1234567');
    expect(loginButton).toBeEnabled();
  });
});

describe('3 - test if when button is clicked it will redirect'
+ 'to "/comidas" and save things to localStorage', () => {
  afterAll(() => done());

  it('test if button fully works', () => {
    const { getByTestId, history } = renderWithRouterAndRedux(<App />);
    let { pathname } = history.location;
    const emailInput = getByTestId(emailDataId);
    const passwordInput = getByTestId(passwordDataId);
    const loginButton = getByTestId(loginBtnDataId);
    localStorage.clear();
    userEvent.type(emailInput, 'trybe@trybe.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);
    expect(localStorage.getItem('user')).toBe('{"email":"trybe@trybe.com"}');
    expect(localStorage.getItem('mealsToken')).toBe('1');
    expect(localStorage.getItem('cocktailsToken')).toBe('1');
    pathname = history.location.pathname;
    expect(pathname).toBe('/comidas');
    localStorage.clear();
  });
});
