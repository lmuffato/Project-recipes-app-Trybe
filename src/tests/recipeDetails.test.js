import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test Recipes Details page', () => {
  const myPath = '/comidas/52978';
  it('Check Page Components', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push(myPath);

    const recipeTitle = await getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();

    const recipeCategory = await getByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();

    const recipeFirstIngredient = await getByTestId('0-ingredient-name-and-measure');
    expect(recipeFirstIngredient).toBeInTheDocument();

    const recipeInstructions = await getByTestId('instructions');
    expect(recipeInstructions).toBeInTheDocument();

    const recipeVideo = await getByTestId('video');
    expect(recipeVideo).toBeInTheDocument();

    const recipeStartBtn = await getByTestId('start-recipe-btn');
    expect(recipeStartBtn).toBeInTheDocument();
  });

  it('Click on Start Recipe button, go to In Progres', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push(myPath);

    const recipeStartBtn = await getByTestId('start-recipe-btn');
    expect(recipeStartBtn).toBeInTheDocument();

    fireEvent.click(recipeStartBtn);
    const { location } = history;
    const { pathname } = location;
    expect(pathname).toBe('/comidas/52978/in-progress');
  });
});
