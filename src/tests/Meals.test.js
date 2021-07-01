import React from 'react';
import { screen } from '@testing-library/react';
import Meals from '../pages/Meals';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import { storeCategories, storeMeals } from '../actions/meals';

describe('Test Meals page', () => {
  const store = {
    meals: {
      categories: ['sushi'],
      meals: [],
      loading: false,
    },
  };

  const data = [
    {
      strMeal: 'Corba',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
    {
      strMeal: 'Kumpir',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
    },
  ];

  it('Test if pathname is \'/comidas\'', () => {
    const { history } = renderWithRouterAndRedux(<Meals />, store);
    history.push('/comidas');
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });

  it('Test if cards are rendered', () => {
    const { store: test } = renderWithRouterAndRedux(<Meals />, store);
    test.dispatch(storeMeals(data));
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(2);
  });

  it('Test if category buttons are rendered', () => {
    const numberOfButtons = 6;
    const mockCategories = ['Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous'];
    const { store: test,
      getByRole, getAllByRole } = renderWithRouterAndRedux(<Meals />, store);
    test.dispatch(storeCategories(mockCategories));
    expect(getAllByRole('button').length).toBe(numberOfButtons);
    expect(getByRole('button', { name: /beef/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /chicken/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /dessert/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /lamb/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /miscellaneous/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /all/i })).toBeInTheDocument();
  });
});
