import React from 'react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';
import ProfilePage from '../pages/ProfilePage';

const renderProfileWithRouter = () => renderWithRouter(<ProfilePage />);

describe('ProfilePage', () => {
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
    expect(history.location.pathname).toBe('/receitas-feitas');
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
  });
});
