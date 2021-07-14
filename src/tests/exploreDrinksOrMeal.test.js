import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import ExploreDrinks from '../pages/explore/ExploreDrinks';
import ExploreFood from '../pages/explore/ExploreFood';

const exploreByIngredient = 'explore-by-ingredient';
const exploreByArea = 'explore-by-area';
const exploreSurprise = 'explore-surprise';
afterEach(() => jest.clearAllMocks());
describe('testing requirement 70 to 74', () => {
  it('should have 3 data-testid', () => {
    const { getByTestId } = renderWithRouter(<ExploreFood />);
    expect(getByTestId(exploreByIngredient)).toBeInTheDocument();
    expect(getByTestId(exploreByArea)).toBeInTheDocument();
    expect(getByTestId(exploreSurprise)).toBeInTheDocument();
  });
  it('should have two data-testId', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinks />);
    expect(getByTestId(exploreByIngredient)).toBeInTheDocument();
    expect(getByTestId(exploreSurprise)).toBeInTheDocument();
  });
  it('Click on `Por local de Origem` takes you to the page', () => {
    const { getByText, history } = renderWithRouter(<ExploreFood />);
    userEvent.click(getByText(/por local de origem/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/area');
  });
  it('Click on `Me Surpreenda` button takes you to the page', () => {
    const { getByText, history } = renderWithRouter(<ExploreFood />);
    userEvent.click(getByText(/me surpreenda/i));
    const { pathname } = history.location;
    expect(pathname).toContain('/comidas/');
  });
  it('Click on the `Por Ingredientes` button takes you to the page', () => {
    const { history, getByText } = renderWithRouter(<ExploreDrinks />);
    userEvent.click(getByText(/por ingredientes/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas/ingredientes');
  });
  it('clicking the `Me Surpreenda` button takes you to the page', () => {
    const { history, getByText } = renderWithRouter(<ExploreDrinks />);
    userEvent.click(getByText(/me surpreenda/i));
    const { pathname } = history.location;
    expect(pathname).toContain('/bebidas/');
  });
});

// teste teste
