import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test Recipes In Progress page', () => {
  const myPath = '/comidas/52978/in-progress';
  it('Check Page Components', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push(myPath);

    const recipePhoto = getByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();

    const recipeTitle = getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();

    const recipeCategory = getByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();

    const recipeFirstIngredient = getByTestId('0-ingredient-step');
    expect(recipeFirstIngredient).toBeInTheDocument();

    const recipeInstructions = getByTestId('instructions');
    expect(recipeInstructions).toBeInTheDocument();

    const recipeFinishBtn = getByTestId('finish-recipe-btn');
    expect(recipeFinishBtn).toBeInTheDocument();
  });
});
