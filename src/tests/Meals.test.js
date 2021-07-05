import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Meals from '../pages/Meals';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import { storeCategories, storeMeals } from '../actions/meals';

const mockStore = {
  meals: {
    categories: [],
    meals: [],
    loading: false,
    filter: '',
  },
};

const data = [
  {
    idMeal: '52977',
    strMeal: 'Corba',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  {
    idMeal: '52978',
    strMeal: 'Kumpir',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
  },
];

const beefData = {
  meals: [
    {
      idMeal: '52874',
      strMeal: 'Beef and Mustard Pie',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/wrssvt1511556563.jpg',
    },
    {
      idMeal: '52878',
      strMeal: 'Beef and Oyster pie',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
    },
  ],
};

describe.skip('1 - Test Meals page', () => {
  afterAll(() => done());

  it('Test if pathname is \'/comidas\'', () => {
    const { history } = renderWithRouterAndRedux(<Meals />, mockStore);
    history.push('/comidas');
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });

  it('Test if meal cards are rendered', () => {
    const { store } = renderWithRouterAndRedux(<Meals />, mockStore);
    store.dispatch(storeMeals(data));
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(2);
  });

  it('Test if category buttons are rendered', () => {
    const numberOfButtons = 6;
    const mockCategories = ['Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous'];
    const { store,
      getByRole, getAllByRole } = renderWithRouterAndRedux(<Meals />, mockStore);
    store.dispatch(storeCategories(mockCategories));
    expect(getAllByRole('button').length).toBe(numberOfButtons);
    expect(getByRole('button', { name: /beef/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /chicken/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /dessert/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /lamb/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /miscellaneous/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /all/i })).toBeInTheDocument();
  });
});

describe.skip('2 - Test filter buttons', () => {
  afterAll(() => done());

  it('Test if filter button \'Beef\' fetchs new data', async () => {
    const { findByText, findByRole } = renderWithRouterAndRedux(
      <Meals />, mockStore,
    );

    global.fetch = jest.fn(() => (
      Promise.resolve({
        json: () => Promise.resolve(beefData),
      })
    ));

    expect(await findByText(/Corba/i)).toBeInTheDocument();

    const beefButton = await findByRole('button', { name: /beef/i });
    userEvent.click(beefButton);

    expect(await findByText(/Beef and Mustard Pie/i));
  });
});
