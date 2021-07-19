import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test Recipes In Progress page', () => {
  const myPath = '/comidas/52978/in-progress';
  it('Check Page Components', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push(myPath);

    const recipePhoto = await getByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();

    const recipeTitle = await getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();

    const recipeCategory = await getByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();

    const recipeFirstIngredient = await getByTestId('0-ingredient-step');
    expect(recipeFirstIngredient).toBeInTheDocument();

    const recipeInstructions = await getByTestId('instructions');
    expect(recipeInstructions).toBeInTheDocument();

    const recipeFinishBtn = await getByTestId('finish-recipe-btn');
    expect(recipeFinishBtn).toBeInTheDocument();
  });
});
