import React from 'react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import handleLogin from './handleLogin';
import App from '../App';

describe('Tests the filter buttons at the main recipes page', () => {
  it('Verify if the meals filter buttons are being rendered', async () => {
    const {
      getByTestId, findByTestId,
    } = renderWithRouter(<App />);
    handleLogin(getByTestId);

    const allCategoryBtn = await findByTestId('All-category-filter');
    const beefCategoryBtn = await findByTestId('Beef-category-filter');
    const breakfastCategoryBtn = await findByTestId('Breakfast-category-filter');
    const chickenCategoryBtn = await findByTestId('Chicken-category-filter');
    const dessertCategoryBtn = await findByTestId('Dessert-category-filter');
    const goatCategoryBtn = await findByTestId('Goat-category-filter');

    expect(allCategoryBtn).toBeInTheDocument();
    expect(beefCategoryBtn).toBeInTheDocument();
    expect(breakfastCategoryBtn).toBeInTheDocument();
    expect(chickenCategoryBtn).toBeInTheDocument();
    expect(dessertCategoryBtn).toBeInTheDocument();
    expect(goatCategoryBtn).toBeInTheDocument();

    expect(allCategoryBtn).toHaveAttribute('value', 'All');
    expect(beefCategoryBtn).toHaveAttribute('value', 'Beef');
    expect(breakfastCategoryBtn).toHaveAttribute('value', 'Breakfast');
    expect(chickenCategoryBtn).toHaveAttribute('value', 'Chicken');
    expect(dessertCategoryBtn).toHaveAttribute('value', 'Dessert');
    expect(goatCategoryBtn).toHaveAttribute('value', 'Goat');
  });
});
