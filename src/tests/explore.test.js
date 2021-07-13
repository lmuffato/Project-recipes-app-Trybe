import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Explore from '../pages/explore/Explore';

const exploreFood = 'explore-food';
const exploreDrink = 'explore-drinks';

afterEach(() => jest.clearAllMocks());

describe('testing requirement 67 and 68', () => {
  it('Check all data-testId', () => {
    const { getByTestId } = renderWithRouter(<Explore />);
    expect(getByTestId(exploreFood)).toBeInTheDocument();
    expect(getByTestId(exploreDrink)).toBeInTheDocument();
  });
  it('Test click on the `Explorar Comidas` button takes you to the page', () => {
    const { history, getByText } = renderWithRouter(<Explore />);
    userEvent.click(getByText(/explorar comidas/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');
  });

  it('Test on the `Explorar Bebidas` takes you to the page', () => {
    const { history, getByText } = renderWithRouter(<Explore />);
    userEvent.click(getByText(/explorar bebidas/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');
  });
});
