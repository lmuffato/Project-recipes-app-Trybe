import React from 'react';
import RecipesFav from '../pages/RecipesFav/RecipesFav';
import renderWithRouter from './renderWithRouter';

describe('Testing favorite recipes page', () => {
  it('Testing whether filters are on screen', () => {
    const { history, getByTestId } = renderWithRouter(<RecipesFav />);
    history.push('/receitas-favoritas');
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-favoritas');
    const allFilter = getByTestId('filter-by-all-btn');
    const foodFilter = getByTestId('filter-by-food-btn');
    const drinksFilter = getByTestId('filter-by-drink-btn');
    expect(drinksFilter).toBeInTheDocument();
    expect(foodFilter).toBeInTheDocument();
    expect(allFilter).toBeInTheDocument();
  });
});
