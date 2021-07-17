import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import FoodsIngredients from '../pages/FoodsIngredients';
import { filterdToMealsIngredientsMock, ingredientsMock } from './mocks';

function login() {
  const getInputEmail = screen.getByTestId('email-input');
  const getInputPassw = screen.getByTestId('password-input');
  const getBtnLogin = screen.getByTestId('login-submit-btn');
  userEvent.type(getInputEmail, 'teste@email.com');
  userEvent.type(getInputPassw, '12345678');
  userEvent.click(getBtnLogin);
}

function enterTheExploreFoodPage() {
  const exploreBtn = screen.getByTestId('explore-bottom-btn');
  userEvent.click(exploreBtn);
  const exploreFoodBtn = screen.getByTestId('explore-food');
  expect(exploreFoodBtn).toBeInTheDocument();
  userEvent.click(exploreFoodBtn);
}

function enterTheExploreByIngredients() {
  const exploreByIngredientsBtn = screen.getByRole('button', {
    name: /por ingredientes/i,
  });
  expect(exploreByIngredientsBtn).toBeInTheDocument();
  userEvent.click(exploreByIngredientsBtn);
}

describe('Testing FoodsIngredients page', () => {
  it(
    'check the path and render all the ingredient images on the FoodIngredients page',
    async () => {
      const { history, findAllByTestId } = renderWithRouter(<App />);
      const numberOfIngredients = 12;
      login();
      enterTheExploreFoodPage();
      enterTheExploreByIngredients();
      const { pathname } = history.location;
      expect(pathname).toBe('/explorar/comidas/ingredientes');

      const allIngredients = await findAllByTestId('ingredients');
      expect(allIngredients.length).toBe(numberOfIngredients);
    },
  );

  it(
    'check on the ingredient goes to Recipes Page with the recipes of the ingredient',
    async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: async () => filterdToMealsIngredientsMock,
      });
      const { findByTestId, findAllByTestId } = renderWithRouter(<App />);
      login();
      enterTheExploreFoodPage();
      enterTheExploreByIngredients();

      const ingredientChicken = await findAllByTestId('ingredients');
      userEvent.click(ingredientChicken[0]);

      const ingredientRecipes = await findByTestId('0-ingredient-card');
      expect(ingredientRecipes).toBeInTheDocument();
    },
  );

  it('if the ingredients are rederized', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ingredientsMock,
    });
    const { findByRole, history } = renderWithRouter(<FoodsIngredients />);

    const ingredientChickenText = await
    findByRole('link', {
      name: /chicken/i,
    });
    const ingredientChickenImg = await
    findByRole('img', {
      name: /chicken/i,
    });
    expect(ingredientChickenText).toBeInTheDocument();
    expect(ingredientChickenImg).toHaveAttribute('src', 'https://www.themealdb.com/images/ingredients/Chicken-Small.png');
    userEvent.click(ingredientChickenText);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });

  it('if the ingredients are rederized', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ingredientsMock,
    });
    const { findByRole, history } = renderWithRouter(<FoodsIngredients />);
    const ingredientBalsamicVinegarText = await
    findByRole('link', {
      name: /Balsamic Vinegar/i,
    });
    const ingredientBalsamicVinegarImg = await
    findByRole('img', {
      name: /Balsamic Vinegar/i,
    });
    expect(ingredientBalsamicVinegarText).toBeInTheDocument();
    expect(ingredientBalsamicVinegarImg).toHaveAttribute('src', 'https://www.themealdb.com/images/ingredients/Balsamic Vinegar-Small.png');
    userEvent.click(ingredientBalsamicVinegarText);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
