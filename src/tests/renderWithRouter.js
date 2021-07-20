import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import UserProvider from '../contexts/UserProvider';
import SearchbarProvider from '../contexts/SearchbarProvider';
import RecipesProvider from '../contexts/RecipesProvider';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <UserProvider>
        <SearchbarProvider>
          <RecipesProvider>
            <Router history={ history }>{component}</Router>
          </RecipesProvider>
        </SearchbarProvider>
      </UserProvider>,
    ),
    history,
  });
};

export default renderWithRouter;
