import React from 'react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import handleLogin from './handleLogin';
import App from '../App';

const buttonsLength = 7;

const testIdArray = [
  'All-category-filter', 'Beef-category-filter', 'Breakfast-category-filter',
  'Chicken-category-filter', 'Dessert-category-filter', 'Goat-category-filter'];
// const categoriesArray = ['All', 'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];

describe('Tests the filter buttons at the main recipes page', () => {
  it('Verify how many filter buttons there ara', async () => {
    const {
      getByTestId, findByTestId, findByRole, findAllByRole,
    } = renderWithRouter(<App />);
    handleLogin(getByTestId);

    const buttons = await findAllByRole('button');
    expect(buttons.length).toBe(buttonsLength);

    testIdArray.forEach(async (testId /* , index */) => {
      const button = await findByRole(testId);
      expect(button).toBeInTheDocument();
    });
    const all = await findByTestId('All-category-filter');
    expect(all).toBeInTheDocument();
  });
});
