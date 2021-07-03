import { screen, render } from '@testing-library/react';
import React from 'react';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Explore from '../pages/Explore';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Test if Explore page', () => {
  const EXPLORE_FOOD = 'explore-food';
  const EXPLORE_DRINKS = 'explore-drinks';

  it('1. renders mealsExplore button and drinksExplore button', () => {
    renderWithRouter(<Explore />);
    const exploreMealsButton = screen.getByTestId(EXPLORE_FOOD);
    const exploreDrinksButton = screen.getByTestId(EXPLORE_DRINKS);

    expect(exploreMealsButton).toBeInTheDocument();
    expect(exploreDrinksButton).toBeInTheDocument();
  });

  it('2. renders the texts Explorar Comidas and Explorar Bebidas', () => {
    renderWithRouter(<Explore />);
    const exploreMealsButton = screen.getByTestId(EXPLORE_FOOD);
    const exploreDrinksButton = screen.getByTestId(EXPLORE_DRINKS);
    const exploreMealsText = within(exploreMealsButton).getByText('Explorar Comidas');
    const exploreDrinksText = within(exploreDrinksButton).getByText('Explorar Bebidas');

    expect(exploreMealsText).toBeInTheDocument();
    expect(exploreDrinksText).toBeInTheDocument();
  });
  it('03. redirects to /explorar/comidas when mealsExplore button is clicked', () => {
    const { history } = renderWithRouter(<Explore />);
    const exploreMealsButton = screen.getByTestId(EXPLORE_FOOD);
    userEvent.click(exploreMealsButton);
    const path = history.location.pathname;
    expect(path).toBe('/explorar/comidas');
  });

  it('04. redirects to /explorar/bebidas when drinksExplore button is clicked', () => {
    const { history } = renderWithRouter(<Explore />);
    const exploreDrinksButton = screen.getByTestId(EXPLORE_DRINKS);
    userEvent.click(exploreDrinksButton);
    const path = history.location.pathname;
    expect(path).toBe('/explorar/bebidas');
  });
});
