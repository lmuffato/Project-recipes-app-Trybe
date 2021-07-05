import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import RecipesProvider from '../provider/RecipesProvider';

const renderWithRouter = (component, mockHistory = '') => {
  const history = createMemoryHistory();
  history.push(mockHistory);
  return ({
    ...render(
      <RecipesProvider>
        <Router history={ history }>{component}</Router>
      </RecipesProvider>,
    ),
    history,
  });
};

export default renderWithRouter;
