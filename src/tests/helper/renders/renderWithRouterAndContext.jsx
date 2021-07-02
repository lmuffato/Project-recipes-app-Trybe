import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { RecipeContextProvider } from '../../../store/RecipeContext';

const renderWithRouterAndContext = (
  Component,
  {
    value = {},
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({
  ...render(
    <RecipeContextProvider value={ value }>
      <Router history={ history }>
        {Component}
      </Router>
    </RecipeContextProvider>,
  ),
  value,
  history,
});

export default renderWithRouterAndContext;
