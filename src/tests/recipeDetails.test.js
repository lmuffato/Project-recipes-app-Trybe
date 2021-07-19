import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test Recipes Details page', () => {
  const myPath = '/comidas/52978';
  it('Check Page Components', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push(myPath);

    const recipeTitle = getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();

    const recipeCategory = getByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();

    const recipeFirstIngredient = getByTestId('0-ingredient-name-and-measure');
    expect(recipeFirstIngredient).toBeInTheDocument();

    const recipeInstructions = getByTestId('instructions');
    expect(recipeInstructions).toBeInTheDocument();

    const recipeVideo = getByTestId('video');
    expect(recipeVideo).toBeInTheDocument();

    const recipeStartBtn = getByTestId('start-recipe-btn');
    expect(recipeStartBtn).toBeInTheDocument();
  });

  it('Click on Start Recipe button, go to In Progres', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push(myPath);

    const recipeStartBtn = getByTestId('start-recipe-btn');
    expect(recipeStartBtn).toBeInTheDocument();

    fireEvent.click(recipeStartBtn);
    const { location } = history;
    const { pathname } = location;
    expect(pathname).toBe('/comidas/52978/in-progress');
  });
});
