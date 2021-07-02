import React from 'react';
import { screen } from '@testing-library/react';
import Drinks from '../pages/Drinks';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import { storeDrinks } from '../actions/drinks';

describe('Test Drinks Page', () => {
  afterAll(() => done());

  const data = [
    {
      strDrink: 'GG',
      strDrinkThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
    {
      strDrink: 'A1',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    }];

  it('Test if pathname is \'/bebidas\'', () => {
    const { history } = renderWithRouterAndRedux(<Drinks />);
    history.push('/bebidas');
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });

  it('Test if meal cards are rendered', () => {
    const { store, getByText } = renderWithRouterAndRedux(<Drinks />);
    store.dispatch(storeDrinks(data));
    const images = screen.getAllByRole('img');

    expect(images.length).toBe(2);
    expect(getByText(/gg/i)).toBeInTheDocument();
    expect(getByText(/a1/i)).toBeInTheDocument();
  });
});
