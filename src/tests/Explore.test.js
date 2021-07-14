import React from 'react';
import userEvent from '@testing-library/user-event';
import Search from '../pages/Search';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import SearchMealOrDrink from '../pages/SearchMealOrDrink';

const pathComidas = '/explorar/comidas';
const pathBebidas = '/explorar/bebidas';

describe('tests Explore page', () => {
  test('tests buttons render', () => {
    const { getByTestId } = renderWithRouterAndRedux(<Search />);
    const exploreFoodButton = getByTestId('explore-food');
    expect(exploreFoodButton).toBeInTheDocument();
    const exploreDrinkButton = getByTestId('explore-drinks');
    expect(exploreDrinkButton).toBeInTheDocument();
  });

  test('tests explore food button clicking and route', () => {
    const { history, getByTestId } = renderWithRouterAndRedux(<Search />);
    history.push('/explorar');

    const exploreFoodButton = getByTestId('explore-food');
    userEvent.click(exploreFoodButton);
    const path = history.location.pathname;
    expect(path).toBe(pathComidas);
  });

  test('tests explore drinks button clicking and route', () => {
    const { history, getByTestId } = renderWithRouterAndRedux(<Search />);
    history.push('/explorar');

    const exploreDrinkButton = getByTestId('explore-drinks');
    userEvent.click(exploreDrinkButton);
    const path = history.location.pathname;
    expect(path).toBe(pathBebidas);
  });
});

describe('tests buttons on Explore Drinks page', () => {
  test('test buttons rendering', () => {
    const { history, getByTestId } = renderWithRouterAndRedux(<SearchMealOrDrink />);
    history.push(pathBebidas);
    const path = history.location.pathname;
    expect(path).toBe('/explorar/bebidas');

    const byIngredientsButton = getByTestId('explore-by-ingredient');
    const surpriseButton = getByTestId('explore-surprise');

    expect(byIngredientsButton).toBeInTheDocument();
    expect(surpriseButton).toBeInTheDocument();
  });

  test('test buttons clicking', () => {
    const { history, getByTestId } = renderWithRouterAndRedux(<SearchMealOrDrink />);
    history.push(pathBebidas);

    const byIngredientsButton = getByTestId('explore-by-ingredient');
    userEvent.click(byIngredientsButton);
    let path = history.location.pathname;
    expect(path).toBe('/explorar/bebidas/ingredientes');

    const surpriseButton = getByTestId('explore-surprise');
    userEvent.click(surpriseButton);
    path = history.location.pathname;
    expect(path).toBe('/bebidas/');
  });
});
