import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import handleLogin from './handleLogin';
import App from '../App';

const drinkIcon = 'drinks-bottom-btn';
const mealIcon = 'food-bottom-btn';
const exploreIcon = 'explore-bottom-btn';

describe('Test the Main Recipes Page', () => {
  it('verify the pathname', async () => {
    const { history, getByTestId, findByTestId } = renderWithRouter(<App />);

    handleLogin(getByTestId);

    const header = getByTestId('header');
    const footer = getByTestId('footer');
    const iconDrink = getByTestId(drinkIcon);
    const iconExplore = getByTestId(exploreIcon);
    const iconMeal = getByTestId(mealIcon);
    const initialPathname = history.location.pathname;
    const mainRecipes = await findByTestId('main-recipes');

    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(iconDrink).toBeInTheDocument();
    expect(iconExplore).toBeInTheDocument();
    expect(iconMeal).toBeInTheDocument();
    expect(initialPathname).toBe('/comidas');
    expect(mainRecipes).toBeInTheDocument();

    userEvent.click(iconDrink);

    const drinkPathname = history.location.pathname;
    expect(drinkPathname).toBe('/bebidas');

    userEvent.click(iconMeal);

    const mealPathname = history.location.pathname;
    expect(mealPathname).toBe('/comidas');

    userEvent.click(iconExplore);

    const explorePathname = history.location.pathname;
    expect(explorePathname).toBe('/explorar');
  });
});
