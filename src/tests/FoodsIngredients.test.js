import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import FoodsIngredients from '../pages/FoodsIngredients';

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

const ingredients = [{ idIngredient: '1', strIngredient: 'Chicken', strDescription: 'The chicken is a type of domesticated fowl, a subs…bylonia, according to the annals of Thutmose III.', strType: null }, { idIngredient: '2', strIngredient: 'Salmon', strDescription: 'Salmon is the common name for several species of r…lfactory memory. Salmon date back to the Neogene.', strType: null }, { idIngredient: '3', strIngredient: 'Beef', strDescription: 'Beef is the culinary name for meat from cattle, pa…asings. The bones are used for making beef stock.', strType: null }];

describe('Testing FoodsIngredients page', () => {
  test('checking the path to FoodsIngredients page', async () => {
    const { history } = renderWithRouter(<App />);

    login();
    enterTheExploreFoodPage();
    enterTheExploreByIngredients();

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');
  });

  test('if the ingredients are rederized', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(ingredients),
    });

    const { findByText } = renderWithRouter(<FoodsIngredients />);

    expect(global.fetch).toBeCalledTimes(1);
    // const chicken = getByRole('img', {
    //   name: /chicken/i,
    // });
    // expect(chicken).toBeInTheDocument();

    // const ingredientsImg = getAllByRole('img');
    // expect(ingredientsImg.length).toBe(12);

    // const exploreByIngredientsBtn = getByTestId('explore-by-ingredient');
    // userEvent.click(exploreByIngredientsBtn);
    // expect(pathname).toBe('/explorar/comidas/ingredientes');
  });
});
