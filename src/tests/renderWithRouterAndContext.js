import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import FoodProvider from '../contexts/FoodProvider';
import DrinkProvider from '../contexts/DrinkProvider';
import FavoritesProvider from '../contexts/FavoritesProvider';
import DoneRecipesProvider from '../contexts/DoneRecipesProvider';

const renderWithRouterAndContext = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        <FoodProvider>
          <DrinkProvider>
            <FavoritesProvider>
              <DoneRecipesProvider>
                {component}
              </DoneRecipesProvider>
            </FavoritesProvider>
          </DrinkProvider>
        </FoodProvider>
      </Router>,
    ),
    history,
  });
};

export default renderWithRouterAndContext;
