import React from 'react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile'; // changed to the parent component
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('tests if the elements of the Profile page are being rendered', () => {
  test('email element and the buttons Done Recipes, Favorite Recipes and Logout', () => {
    const { getByTestId } = renderWithRouterAndRedux(<Profile />);

    const emailElement = getByTestId('profile-email');
    expect(emailElement).toBeInTheDocument();

    const doneRecipesBtn = getByTestId('profile-done-btn');
    expect(doneRecipesBtn).toBeInTheDocument();

    const favoriteRecipesBtn = getByTestId('profile-favorite-btn');
    expect(favoriteRecipesBtn).toBeInTheDocument();

    const logoutBtn = getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();
  });
});

describe('tests the routes after clicking the buttons', () => {
  test('done recipes button', () => {
    const { getByTestId, history } = renderWithRouterAndRedux(<Profile />);
    const doneRecipesBtn = getByTestId('profile-done-btn');
    userEvent.click(doneRecipesBtn);
    const path = history.location.pathname;
    expect(path).toBe('/receitas-feitas');
  });
  test('favorite recipes button', () => {
    const { getByTestId, history } = renderWithRouterAndRedux(<Profile />);
    const favoriteRecipesBtn = getByTestId('profile-favorite-btn');
    userEvent.click(favoriteRecipesBtn);
    const path = history.location.pathname;
    expect(path).toBe('/receitas-favoritas');
  });
  test('logout button', () => {
    const { getByTestId, history } = renderWithRouterAndRedux(<Profile />);
    const logoutBtn = getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);
    const path = history.location.pathname;
    expect(path).toBe('/');
  });
});
