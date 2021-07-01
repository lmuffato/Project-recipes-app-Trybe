import React, { createContext } from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouterAndRedux = (
  Component,
  Context = createContext(),
  {
    value = {},
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({
  ...render(
    <Router history={ history }>
      <Context.Provider value={ value }>{Component}</Context.Provider>
      ,
    </Router>,
  ),
  value,
  history,
});

export default renderWithRouterAndRedux;
