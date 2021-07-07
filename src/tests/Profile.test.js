import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testing Profile page', () => {
  const emialTest = 'teste@email.com';
  const passwTest = '12345678';
  const emailTestId = 'email-input';
  const passwTestId = 'password-input';
  const loginBtnTestId = 'login-submit-btn';
  const profileBtnTestId = 'profile-top-btn';

  test('if user email and buttons are in the page', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const getInputEmail = getByTestId(emailTestId);
    const getInputPassw = getByTestId(passwTestId);
    const getBtnLogin = getByTestId(loginBtnTestId);
    userEvent.type(getInputEmail, emialTest);
    userEvent.type(getInputPassw, passwTest);
    userEvent.click(getBtnLogin);

    const profileBtn = getByTestId(profileBtnTestId);
    userEvent.click(profileBtn);

    const email = getByTestId('profile-email');
    const profileDoneBtn = getByTestId('profile-done-btn');
    const profileFavoriteBtn = getByTestId('profile-favorite-btn');
    const profileLogoutBtn = getByTestId('profile-logout-btn');

    expect(email).toBeInTheDocument();
    expect(profileDoneBtn).toBeInTheDocument();
    expect(profileFavoriteBtn).toBeInTheDocument();
    expect(profileLogoutBtn).toBeInTheDocument();
  });

  test('if click on the done recipes button redirects to done recipes page', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    const getInputEmail = getByTestId(emailTestId);
    const getInputPassw = getByTestId(passwTestId);
    const getBtnLogin = getByTestId(loginBtnTestId);
    userEvent.type(getInputEmail, emialTest);
    userEvent.type(getInputPassw, passwTest);
    userEvent.click(getBtnLogin);

    const profileBtn = getByTestId(profileBtnTestId);
    userEvent.click(profileBtn);

    const profileDoneBtn = getByTestId('profile-done-btn');
    userEvent.click(profileDoneBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-feitas');
  });

  test('if click on the favorite recipes btn redirects to favorite recipes page', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    const getInputEmail = getByTestId(emailTestId);
    const getInputPassw = getByTestId(passwTestId);
    const getBtnLogin = getByTestId(loginBtnTestId);
    userEvent.type(getInputEmail, emialTest);
    userEvent.type(getInputPassw, passwTest);
    userEvent.click(getBtnLogin);

    const profileBtn = getByTestId(profileBtnTestId);
    userEvent.click(profileBtn);

    const profileFavoriteBtn = getByTestId('profile-favorite-btn');
    userEvent.click(profileFavoriteBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-favoritas');
  });

  test('if click on the exit button redirects to login page', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    const getInputEmail = getByTestId(emailTestId);
    const getInputPassw = getByTestId(passwTestId);
    const getBtnLogin = getByTestId(loginBtnTestId);
    userEvent.type(getInputEmail, emialTest);
    userEvent.type(getInputPassw, passwTest);
    userEvent.click(getBtnLogin);

    const profileBtn = getByTestId(profileBtnTestId);
    userEvent.click(profileBtn);

    const profileLogoutBtn = getByTestId('profile-logout-btn');
    userEvent.click(profileLogoutBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
