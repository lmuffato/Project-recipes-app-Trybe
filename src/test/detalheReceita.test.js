import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';

describe('Detalhe da receita', () => {
  afterEach(() => jest.clearAllMocks());

  it('Detalhe da receita da comida', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest
        .fn()
        .mockResolvedValue(meals)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(drinks),

    });

    const { findByTestId, history } = renderWithRouter(<App />);

    history.push('/comidas/52977');

    const recipeImg = await findByTestId('recipe-photo');
    const recipeTitle = await findByTestId('recipe-title');
    const recipeIngredient0 = await findByTestId('0-ingredient-name-and-measure');
    const recipeIngredient1 = await findByTestId('1-ingredient-name-and-measure');
    const recipeInstructions = await findByTestId('instructions');

    expect(recipeImg).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeIngredient0).toBeInTheDocument();
    expect(recipeIngredient1).toBeInTheDocument();
    expect(recipeInstructions).toBeInTheDocument();
  });

  it('Detalhe da receita da bebida', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest
        .fn()
        .mockResolvedValue(drinks)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(meals),

    });

    const { findByTestId, history } = renderWithRouter(<App />);

    history.push('/bebidas/15997');

    const recipeImg = await findByTestId('recipe-photo');
    const recipeTitle = await findByTestId('recipe-title');
    const recipeIngredient0 = await findByTestId('0-ingredient-name-and-measure');
    const recipeIngredient1 = await findByTestId('1-ingredient-name-and-measure');
    const recipeInstructions = await findByTestId('instructions');

    expect(recipeImg).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeIngredient0).toBeInTheDocument();
    expect(recipeIngredient1).toBeInTheDocument();
    expect(recipeInstructions).toBeInTheDocument();
  });
});
