import React from 'react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import RecipesDoneItems from '../components/RecipesDoneItems';

const render = async () => {
  await renderWithRouter(<RecipesDoneItems />);
};

describe('tests the component', () => {
  jest.spyOn(Storage.prototype, 'getItem')
    .mockReturnValue(JSON.stringify([{ type: 'comida', image: 'teste', tags: [] },
      { type: 'bebida', image: 'teste' }]));
  it('tests the function call', async () => {
    await act(render);
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('tests the buttons rendering', async () => {
    await act(render);
    const filterAll = screen.getByTestId('filter-by-all-btn');
    expect(filterAll).toBeInTheDocument();
    const filterFood = screen.getByTestId('filter-by-food-btn');
    expect(filterFood).toBeInTheDocument();
    const filterDrink = screen.getByTestId('filter-by-drink-btn');
    expect(filterDrink).toBeInTheDocument();
  });
  it('tests the buttons usage', async () => {
    await act(render);
    const filterAll = screen.getByTestId('filter-by-all-btn');
    const filterFood = screen.getByTestId('filter-by-food-btn');
    const filterDrink = screen.getByTestId('filter-by-drink-btn');
    let images = screen.getAllByRole('img');
    expect(images.length).toBe(2);
    userEvent.click(filterFood);
    images = await screen.findAllByRole('img');
    expect(images.length).toBe(1);
    userEvent.click(filterDrink);
    images = await screen.findAllByRole('img');
    expect(images.length).toBe(1);
    userEvent.click(filterAll);
    images = await screen.findAllByRole('img');
    expect(images.length).toBe(2);
  });
});
