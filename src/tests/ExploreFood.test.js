import { screen, render } from '@testing-library/react';
import React from 'react';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ExploreFood from '../pages/ExploreFood';
import CocktailsProvider from '../context/CocktailsProvider';
import MealsProvider from '../context/MealsProvider';
import UserContext from '../context/UserContext';

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

// const renderWithRouter = (component) => {
//   const history = createMemoryHistory();
//   return ({
//     ...render(<Router history={ history }>{component}</Router>), history,
//   });
// };

describe('Test if ExploreFood page', () => {
  const EXPLORE_BY_INGREDIENT = 'explore-by-ingredient';
  const EXPLORE_BY_AREA = 'explore-by-area';
  const EXPLORE_SURPRISE = 'explore-surprise';

  it('1. renders exploreByIngButton, exploreByAreaButton and exploreSurpriseButton',
    () => {
      renderWithRouterAndContext(<ExploreFood />);
      const exploreByIngButton = screen.getByTestId(EXPLORE_BY_INGREDIENT);
      const exploreByAreaButton = screen.getByTestId(EXPLORE_BY_AREA);
      const exploreSurpriseButton = screen.getByTestId(EXPLORE_SURPRISE);

      expect(exploreByIngButton).toBeInTheDocument();
      expect(exploreByAreaButton).toBeInTheDocument();
      expect(exploreSurpriseButton).toBeInTheDocument();
    });

  it('2. renders the texts Por Ingredientes, Por Local de Origem and Me Surpreenda!',
    () => {
      renderWithRouterAndContext(<ExploreFood />);
      const exploreByIngButton = screen.getByTestId(EXPLORE_BY_INGREDIENT);
      const exploreByAreaButton = screen.getByTestId(EXPLORE_BY_AREA);
      const exploreSurpriseButton = screen.getByTestId(EXPLORE_SURPRISE);
      const exploreByIngButtonText = within(exploreByIngButton)
        .getByText('Por Ingredientes');
      const exploreByAreaButtonText = within(exploreByAreaButton)
        .getByText('Por Local de Origem');
      const exploreSurpriseButtonText = within(exploreSurpriseButton)
        .getByText('Me Surpreenda!');
      expect(exploreByIngButtonText).toBeInTheDocument();
      expect(exploreByAreaButtonText).toBeInTheDocument();
      expect(exploreSurpriseButtonText).toBeInTheDocument();
    });

  it('03. redirects to /explorar/comidas/ingredientes when'
    + 'exploreByIngButton button is clicked', () => {
    const { historyTest } = renderWithRouterAndContext(<ExploreFood />);
    const exploreByIngButton = screen.getByTestId(EXPLORE_BY_INGREDIENT);
    userEvent.click(exploreByIngButton);
    const path = historyTest.location.pathname;
    expect(path).toBe('/explorar/comidas/ingredientes');
  });

  it('04. redirects to /explorar/comidas/area when'
    + 'exploreByIngButton button is clicked', () => {
    const { historyTest } = renderWithRouterAndContext(<ExploreFood />);
    const exploreByAreaButton = screen.getByTestId(EXPLORE_BY_AREA);
    userEvent.click(exploreByAreaButton);
    const path = historyTest.location.pathname;
    expect(path).toBe('/explorar/comidas/area');
  });

  // const history = useHistory();

  // const handleRandomMealDetails = async () => {
  //   const result = await mockApiByName();
  //   const { meals } = result;
  //   const [meal] = meals;
  //   const { idMeal } = meal;
  //   history.push(`/comidas/${idMeal}`);
  // };

  // const context = {
  //   handleRandomMealDetails,
  // };

  // it('05. redirects to /explorar/bebidas when drinksExplore button is clicked',
  //   async () => {
  //     const { historyTest } = renderWithRouterAndContext(<ExploreFood />,
  //       { providerProps: context });
  //     const request = await mockApiByName();
  //     const randomMeal = { meals: [
  //       {
  //         idMeal: '52771',
  //         strMeal: 'Spicy Arrabiata Penne',
  //         strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //       },
  //     ],
  //     };

  //     const exploreSurpriseButton = screen.getByTestId(EXPLORE_SURPRISE);
  //     userEvent.click(exploreSurpriseButton);
  //     const path = historyTest.location.pathname;
  //     expect(path).toBe('/comidas/52771');
  //     expect(request).toMatchObject(randomMeal);
  //   });
});
