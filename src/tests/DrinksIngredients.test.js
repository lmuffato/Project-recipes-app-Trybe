import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

function login() {
  const getInputEmail = screen.getByTestId('email-input');
  const getInputPassw = screen.getByTestId('password-input');
  const getBtnLogin = screen.getByTestId('login-submit-btn');
  userEvent.type(getInputEmail, 'teste@email.com');
  userEvent.type(getInputPassw, '12345678');
  userEvent.click(getBtnLogin);
}

function enterTheExploreDrinksPage() {
  const exploreBtn = screen.getByTestId('explore-bottom-btn');
  userEvent.click(exploreBtn);
  const exploreDrinksBtn = screen.getByTestId('explore-drinks');
  expect(exploreDrinksBtn).toBeInTheDocument();
  userEvent.click(exploreDrinksBtn);
}

function enterTheExploreByIngredients() {
  const exploreByIngredientsBtn = screen.getByRole('button', {
    name: /por ingredientes/i,
  });
  expect(exploreByIngredientsBtn).toBeInTheDocument();
  userEvent.click(exploreByIngredientsBtn);
}

describe('Testing DrinksIngredients page', () => {
  test('checking the ingredients are rederized', async () => {
    const {
      history, findByText, getByTestId,
    } = renderWithRouter(<App />);
    login();
    enterTheExploreDrinksPage();
    enterTheExploreByIngredients();

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas/ingredientes');

    const header = getByTestId('header');
    const profileBtn = getByTestId('profile-top-btn');
    // const heading = await findByRole('heading', { level: 1 });
    // const searchBtn = getByTestId('search-top-btn');
    // const pageTitle = await findByTestId('page-title');
    const footer = getByTestId('footer');

    expect(header).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    // expect(heading).toHaveValue(/explorar ingredientes/i);
    expect(footer).toBeInTheDocument();
    // expect(searchBtn).toBeNull();

    const ingredientGin = await findByText('Gin');
    expect(ingredientGin).toBeInTheDocument();
  });
});
