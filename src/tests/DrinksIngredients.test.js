import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { drinksIngredientsMock, drinkIngredientRecipesMock } from './mocks';
import DrinksIngredients from '../pages/DrinksIngredients';

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
  it(
    'check the path and render all the ingredient images on the DrinksIngredients page',
    async () => {
      const { history, findAllByTestId } = renderWithRouter(<App />);
      const numberOfIngredients = 12;
      login();
      enterTheExploreDrinksPage();
      enterTheExploreByIngredients();
      const { pathname } = history.location;
      expect(pathname).toBe('/explorar/bebidas/ingredientes');

      const allIngredients = await findAllByTestId('ingredientsDrinks');
      expect(allIngredients.length).toBe(numberOfIngredients);
    },
  );

  it(
    'check on the ingredient goes to RecipesPage whit the recipes of the ingredient',
    async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: async () => drinkIngredientRecipesMock,
      });
      const { findByTestId, findAllByTestId } = renderWithRouter(<App />);
      login();
      enterTheExploreDrinksPage();
      enterTheExploreByIngredients();

      const allIngredients = await findAllByTestId('ingredientsDrinks');
      userEvent.click(allIngredients[2]);

      const ingredientRecipes = await findByTestId('2-ingredient-card');
      expect(ingredientRecipes).toBeInTheDocument();
    },
  );
  it('if the ingredients are rederized', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => drinksIngredientsMock,
    });
    const { findByRole, history } = renderWithRouter(<DrinksIngredients />);

    const ingredientLightRumText = await
    findByRole('link', {
      name: /Light Rum/i,
    });
    const ingredientLightRumImg = await
    findByRole('img', {
      name: /Light Rum/i,
    });
    expect(ingredientLightRumText).toBeInTheDocument();
    expect(ingredientLightRumImg).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/ingredients/Light rum-Small.png');
    userEvent.click(ingredientLightRumText);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });

  it('if the ingredients are rederized', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => drinksIngredientsMock,
    });
    const { findByRole, history } = renderWithRouter(<DrinksIngredients />);

    const ingredientApplejackText = await
    findByRole('link', {
      name: /Applejack/i,
    });
    const ingredientApplejackImg = await
    findByRole('img', {
      name: /Applejack/i,
    });
    expect(ingredientApplejackText).toBeInTheDocument();
    expect(ingredientApplejackImg).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/ingredients/Applejack-Small.png');
    userEvent.click(ingredientApplejackText);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });
});
