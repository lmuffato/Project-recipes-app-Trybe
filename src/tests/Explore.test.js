import { fireEvent, screen } from '@testing-library/dom';
import React from 'react';
import ExploreButtons from '../Components/ExploreButtons';
import renderWithRouter from './renderWithRoute';

describe('Explorer component test', () => {
  it('it redirects /explorar/comidas', () => {
    const { history } = renderWithRouter(<ExploreButtons />);
    const exploreFood = screen.getByTestId('explore-food');
    expect(exploreFood).toBeInTheDocument();
    fireEvent.click(exploreFood);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');
  });

  it('it redirects /explorar/bebidas', () => {
    const { history } = renderWithRouter(<ExploreButtons />);
    const exploreDrinks = screen.getByTestId('explore-drinks');
    expect(exploreDrinks).toBeInTheDocument();
    fireEvent.click(exploreDrinks);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');
  });
});
