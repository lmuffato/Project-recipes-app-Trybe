import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';
import ProfilePage from '../pages/ProfilePage';
import Login from '../pages/Login';

const renderProfileWithRouter = () => renderWithRouter(<ProfilePage />);

describe('ProfilePage', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<Login />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    userEvent.type(email, 'user@email.com');
    userEvent.type(password, '1234567');
    userEvent.click(button);
    history.push('/perfil');
  });

  test('Verifica se exibe o email da pessoa usuária', () => {
    const { getByTestId } = renderProfileWithRouter();
    const profileEmail = getByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
  });

  test('Verifica se exibe o botão para receitas feitas', () => {
    const { getByTestId, history } = renderProfileWithRouter();
    const recipesDoneButton = getByTestId('profile-done-btn');
    expect(recipesDoneButton).toBeInTheDocument();
    userEvent.click(recipesDoneButton);
    // expect(history.location.pathname).toBe('/receitas-feitas');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/receitas-feitas');
  });

  test('Verifica se exibe o botão para receitas favoritas', () => {
    const { getByTestId, history } = renderProfileWithRouter();
    const favoriteRecipesButton = getByTestId('profile-favorite-btn');
    expect(favoriteRecipesButton).toBeInTheDocument();
    userEvent.click(favoriteRecipesButton);
    expect(history.location.pathname).toBe('/receitas-favoritas');
  });

  test('Verifica se exibe o botão para sair', () => {
    const { getByTestId, history } = renderProfileWithRouter();
    const logoutButton = getByTestId('profile-logout-btn');
    expect(logoutButton).toBeInTheDocument();
    userEvent.click(logoutButton);
    expect(history.location.pathname).toBe('/');
    expect(localStorage.getItem('mealsToken')).toBeNull();
    expect(localStorage.getItem('cocktailsToken')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });
});
