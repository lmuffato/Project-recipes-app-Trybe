import { screen, render } from '@testing-library/react';
import React from 'react';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CocktailsProvider from '../context/CocktailsProvider';
import MealsProvider from '../context/MealsProvider';
import UserContext from '../context/UserContext';
import ExploreDrinks from '../pages/ExploreDrinks';

const renderWithRouterAndContext = (ui,
  { providerProps, route = '/explorar/comidas' } = {}) => {
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

describe('Test if ExploreFood page', () => {
  const EXPLORE_BY_INGREDIENT = 'explore-by-ingredient';
  const EXPLORE_SURPRISE = 'explore-surprise';

  it('1. renders exploreByIngButton and exploreSurpriseButton',
    () => {
      renderWithRouterAndContext(<ExploreDrinks />);
      const exploreByIngButton = screen.getByTestId(EXPLORE_BY_INGREDIENT);
      const exploreSurpriseButton = screen.getByTestId(EXPLORE_SURPRISE);

      expect(exploreByIngButton).toBeInTheDocument();
      expect(exploreSurpriseButton).toBeInTheDocument();
    });

  it('2. renders the texts Por Ingredientes and Me Surpreenda!',
    () => {
      renderWithRouterAndContext(<ExploreDrinks />);
      const exploreByIngButton = screen.getByTestId(EXPLORE_BY_INGREDIENT);
      const exploreSurpriseButton = screen.getByTestId(EXPLORE_SURPRISE);
      const exploreByIngButtonText = within(exploreByIngButton)
        .getByText('Por Ingredientes');
      const exploreSurpriseButtonText = within(exploreSurpriseButton)
        .getByText('Me Surpreenda!');
      expect(exploreByIngButtonText).toBeInTheDocument();
      expect(exploreSurpriseButtonText).toBeInTheDocument();
    });

  it('03. redirects to /explorar/bebidas/ingredientes when'
    + 'exploreByIngButton button is clicked', () => {
    const { historyTest } = renderWithRouterAndContext(<ExploreDrinks />);
    const exploreByIngButton = screen.getByTestId(EXPLORE_BY_INGREDIENT);
    userEvent.click(exploreByIngButton);
    const path = historyTest.location.pathname;
    expect(path).toBe('/explorar/bebidas/ingredientes');
  });
});
