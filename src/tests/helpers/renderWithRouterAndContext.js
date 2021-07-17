import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import CocktailsProvider from '../../context/CocktailsProvider';
import MealsProvider from '../../context/MealsProvider';

// src: https://testing-library.com/docs/example-react-context/
const renderWithRouterAndContext = (ui,
  { providerProps, route = '/' } = {}) => {
  const historyTest = createMemoryHistory();
  historyTest.push(route);
  return ({
    ...render(
      <CocktailsProvider>
        <MealsProvider>
          <UserContext.Provider { ...providerProps }>
            <Router history={ historyTest }>{ ui }</Router>
          </UserContext.Provider>
        </MealsProvider>
      </CocktailsProvider>,
      { wrapper: BrowserRouter },
    ),
    historyTest,
  });
};
export default renderWithRouterAndContext;
