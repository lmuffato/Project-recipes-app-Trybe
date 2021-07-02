import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drinks from '../pages/Drinks';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import { storeDrinks } from '../actions/drinks';

const mockStore = {
  drinks: {
    categories: [],
    drinks: [],
    loading: false,
    filter: '',
  },
};

const data = [
  {
    strDrink: 'GG',
    strDrinkThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  {
    strDrink: 'A1',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
  }];

const ordinaryDrinkData = {
  drinks: [
    {
      strDrink: '3-Mile Long Island Iced Tea',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/rrtssw1472668972.jpg',
    },
    {
      strDrink: '410 Gone',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/xtuyqv1472669026.jpg',
    },
  ],
};

describe('Test Drinks Page', () => {
  afterAll(() => done());

  it('Test if pathname is \'/bebidas\'', () => {
    const { history } = renderWithRouterAndRedux(<Drinks />, mockStore);
    history.push('/bebidas');
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });

  it('Test if meal cards are rendered', () => {
    const { store, getByText } = renderWithRouterAndRedux(<Drinks />, mockStore);
    store.dispatch(storeDrinks(data));
    const images = screen.getAllByRole('img');

    expect(images.length).toBe(2);
    expect(getByText(/gg/i)).toBeInTheDocument();
    expect(getByText(/a1/i)).toBeInTheDocument();
  });
});

describe('Test filter buttons', () => {
  afterAll(() => done());

  it('Test if filter button \'Ordinary Drink\' fetchs new data', async () => {
    const { findByText, findByRole } = renderWithRouterAndRedux(
      <Drinks />, mockStore,
    );

    global.fetch = jest.fn(() => (
      Promise.resolve({
        json: () => Promise.resolve(ordinaryDrinkData),
      })
    ));

    expect(await findByText(/GG/i)).toBeInTheDocument();

    const ordinaryDrinkButton = await findByRole('button', { name: /ordinary drink/i });
    userEvent.click(ordinaryDrinkButton);

    expect(await findByText(/3-Mile Long Island Iced Tea/i)).toBeInTheDocument();
  });
});
