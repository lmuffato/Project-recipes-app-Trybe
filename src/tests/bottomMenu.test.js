import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import BottomMenu from '../components/Bottom Menu/bottomMenu';

describe('Testing the Bottom Menu', () => {
  it('3 Links', () => {
    const { getAllByRole } = renderWithRouter(<BottomMenu />);
    const allLinks = getAllByRole('link');
    const links = 3;
    expect(allLinks).toHaveLength(links);
  });

  it('Find /bebidas', () => {
    const { getByAltText, history } = renderWithRouter(<BottomMenu />);
    const drink = getByAltText('drinks btn');
    fireEvent.click(drink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/bebidas');
  });

  it('Find /explorar', () => {
    const { getByAltText, history } = renderWithRouter(<BottomMenu />);
    const explore = getByAltText('explore btn');
    fireEvent.click(explore);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar');
  });

  it('Find /comidas', () => {
    const { getByAltText, history } = renderWithRouter(<BottomMenu />);
    const meal = getByAltText('meals btn');
    fireEvent.click(meal);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/comidas');
  });

});
