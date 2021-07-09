import React from 'react';
import ReactDOM from 'react-dom';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import ExploreIngredients from '../components/ExploreIngredients';
import * as api from '../services/searchIngredient';
import RecipesContext from '../context/RecipesContext';

describe('test the component', () => {
  const context = {
    setRecipesFoods: jest.fn(),
    setRecipesDrinks: jest.fn(),
  };
  const history = createMemoryHistory();
  history.push('/comidas/ingredientes');
  it('test the function call', async () => {
    api.default = jest.fn().mockReturnValue([]);
    await act(() => {
      renderWithRouter(<ExploreIngredients />);
    });
    expect(api.default).toHaveBeenCalled();
  });
  it('test the rendering and the link', async () => {
    const container = document.createElement('div');
    api.default = jest.fn().mockReturnValue(['Chicken', 'test']);
    await act(async () => {
      ReactDOM.render(
        <RecipesContext.Provider value={ context }>
          <Router history={ history }>
            <ExploreIngredients />
          </Router>
        </RecipesContext.Provider>, container,
      );
    });
    const img = container.querySelector('img');
    expect(img.src).toBe('https://www.themealdb.com/images/ingredients/Chicken-Small.png');
    const name = container.querySelector('h1');
    expect(name.textContent).toBe('Chicken');
    userEvent.click(img);
    const path = history.location.pathname;
    expect(path).toBe('/comidas/ingredientes');
  });
});
