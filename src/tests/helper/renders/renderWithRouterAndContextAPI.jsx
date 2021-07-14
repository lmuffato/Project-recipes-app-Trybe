import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { RecipeContextProvider } from '../../../store/RecipeContext';
import App from '../../../App';

const renderWithRouterAndContextAPI = (
  value = {},
  history = createMemoryHistory('/'),
) => ({
  ...render(
    <Router history={ history }>
      <RecipeContextProvider value={ value }>
        <App />
      </RecipeContextProvider>
      ,
    </Router>,
  ),
  value,
  history,
});

export default renderWithRouterAndContextAPI;
