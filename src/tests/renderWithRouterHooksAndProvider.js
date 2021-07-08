import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import UserContextProvider from '../context/UserContext';
import RecipesContextProvider from '../context/RecipesContext';
import FiltredRecipesContextProvider from '../context/FilteredRecipesContext';

const renderWithRouterHooksAndHooks = (component, route = '/') => {
  const history = createMemoryHistory();
  history.push(route);

  return ({
    ...render(
      <Router>
        <UserContextProvider>
          <RecipesContextProvider>
            <FiltredRecipesContextProvider>
              { component}
            </FiltredRecipesContextProvider>
          </RecipesContextProvider>
        </UserContextProvider>
      </Router>,
    ),
    history,
  });
};

export default renderWithRouterHooksAndHooks;
