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

// const verifyIngrendientsRederized = async (findAllByRole) => {
//   await ingredientsMock.meals.map((ingredient) => {
//     console.log(ingredient.strIngredient);
//     expect(findAllByRole('img', {
//       nome: ingredient.strIngredient,
//     })).toBeInTheDocument();
//     // expect(ingredientsTexts).toHaveAttribute('src', `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`);
//   });
// };

describe('Testing FoodsIngredients page', () => {
  it('checking the path to FoodsIngredients page', async () => {
    const { history } = renderWithRouter(<App />);

    login();
    enterTheExploreFoodPage();
    enterTheExploreByIngredients();

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');
  });

  it('if the ingredients are rederized', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ingredientsMock,
    });

    // global.fetch = jest.fn().mockResolvedValue({
    //   json: async () => filterdToMealsIngredientsMock,
    // });

    const { findByRole, history } = renderWithRouter(<FoodsIngredients />);

    const ingredientText = await
    findByRole('link', {
      name: /chicken/i,
    });
    const ingredientImg = await
    findByRole('img', {
      name: /chicken/i,
    });
    console.log(ingredientText);
    expect(ingredientText).toBeInTheDocument();
    expect(ingredientImg).toHaveAttribute('src', 'https://www.themealdb.com/images/ingredients/Chicken-Small.png');
    userEvent.click(ingredientText);

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');

    console.log(filterdToMealsIngredientsMock);

    // await verifyIngrendientsRederized(findAllByRole);
    // const ingredients = findAllByRole('img', {
    //   nome: ingredient,
    // });
  });

  it('', () => {
    // const { findAllByRole } = renderWithRouter(<FoodsIngredients />);

    // const allLinks = findAllByRole('link');
    // expect(allLinks.length).toBe(3);
  });
});
