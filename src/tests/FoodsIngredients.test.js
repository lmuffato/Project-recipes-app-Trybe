import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup, screen } from '@testing-library/react';
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

const ingredientsMock = [
  { idIngredient: '1',
    strIngredient: 'Chicken',
    strDescription: 'The chicken ...',
    strType: null },
  { idIngredient: '2',
    strIngredient: 'Salmon',
    strDescription: 'Salmon is ...',
    strType: null },
  { idIngredient: '3',
    strIngredient: 'Beef',
    strDescription: 'Beef is ...',
    strType: null },
];

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

    const { findByText } = renderWithRouter(<FoodsIngredients />);
    login();
    enterTheExploreFoodPage();
    enterTheExploreByIngredients();

    const findIngredients = await findByText(/chicken/i);
    expect(findIngredients).toBeInTheDocument();
    cleanup();
    // const header = getByTestId('header');
    // const footer = getByTestId('footer');

    // expect(header).toBeInTheDocument();
    // expect(footer).toBeInTheDocument();

    // const chicken = await findByText(/salmon/i);
    // expect(chicken).toBeInTheDocument();

    // const ingredientsImg = getAllByRole('img');
    // expect(ingredientsImg.length).toBe(12);

    // const exploreByIngredientsBtn = getByTestId('explore-by-ingredient');
    // userEvent.click(exploreByIngredientsBtn);
    // expect(pathname).toBe('/explorar/comidas/ingredientes');

    // jest.spyOn(global, 'fetch');
  // global.fetch.mockResolvedValue({
  //   json: jest.fn().mockResolvedValue(ingredients),
  // });
  // expect(global.fetch).toBeCalledTimes(1);
  // const chicken = getByRole('img', {
  //   name: /chicken/i,
  // });
  // expect(chicken).toBeInTheDocument();
  });
});
