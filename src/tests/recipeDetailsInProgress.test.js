import React from 'react';
import { screen } from '@testing-library/dom';
import App from '../App';
import renderWithRouterAndProvider from '../renderWithRouterAndProvider';
import recipeDetailsData from './mocks/recipeDetailsData';

const state = {
  inProgressRecipes: {
    cocktails: {},
    meals: {},
  },
  favoriteRecipes: [],
  addNewInProgressMealsRecipes: () => {},
  addNewInProgressCocktailsRecipes: () => {},
  setFavoriteRecipes: () => {},
};

describe('Tela de receita em progresso', () => {
  test('O header possui o titulo, imagem, categoria da receita', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(recipeDetailsData),
    });

    const { history } = renderWithRouterAndProvider(<App />, state);
    history.push('/comidas/52977/in-progress');
    const recipeName = await screen.findByText('Corba');
    expect(recipeName).toBeInTheDocument();
  });
});
