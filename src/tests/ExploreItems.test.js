import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import ExploreItems from '../components/ExploreItems';
import * as searchRandomFood from '../services/searchRandomFood';

const historyPath = 'explorar/comidas';

test('test the components rendering', () => {
  const { getByTestId } = renderWithRouter(<ExploreItems />);
  const linkIngredient = getByTestId('explore-by-ingredient');
  expect(linkIngredient).toBeInTheDocument();
  const areaLink = getByTestId('explore-by-area');
  expect(areaLink).toBeInTheDocument();
  const idLink = getByTestId('explore-surprise');
  expect(idLink).toBeInTheDocument();
});

describe('test the buttons', () => {
  it('ingredient link', () => {
    const { getByTestId,
      history } = renderWithRouter(<ExploreItems />, historyPath);
    const link = getByTestId('explore-by-ingredient');
    userEvent.click(link);
    const path = history.location.pathname;
    expect(path).toBe('/explorar/comidas/ingredientes');
  });
  it('area link', () => {
    const { getByTestId,
      history } = renderWithRouter(<ExploreItems />, historyPath);
    const link = getByTestId('explore-by-area');
    userEvent.click(link);
    const path = history.location.pathname;
    expect(path).toBe('/explorar/comidas/area');
  });
  it('surprise link', async () => {
    const { getByTestId,
      history } = renderWithRouter(<ExploreItems />, historyPath);
    searchRandomFood.default = jest.fn().mockReturnValue({ idMeal: '12345' });
    const button = getByTestId('explore-surprise');
    userEvent.click(button);
    await expect(searchRandomFood.default).toHaveBeenCalled();
    const path = history.location.pathname;
    expect(path).toBe('/comidas/12345');
  });
});
