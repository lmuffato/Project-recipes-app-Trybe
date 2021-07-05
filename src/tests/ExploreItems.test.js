import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import ExploreItems from '../components/ExploreItems';

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
      history } = renderWithRouter(<ExploreItems />, 'explorar/comidas');
    const link = getByTestId('explore-by-ingredient');
    userEvent.click(link);
    const path = history.location.pathname;
    expect(path).toBe('/explorar/comidas/ingredientes');
  });
  it('are link', () => {
    const { getByTestId,
      history } = renderWithRouter(<ExploreItems />, 'explorar/comidas');
    const link = getByTestId('explore-by-area');
    userEvent.click(link);
    const path = history.location.pathname;
    expect(path).toBe('/explorar/comidas/area');
  });
});
