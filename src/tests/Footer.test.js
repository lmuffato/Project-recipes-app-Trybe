import { fireEvent, screen } from '@testing-library/dom';
import React from 'react';
import Footer from '../Components/Footer';
import renderWithRouter from './renderWithRoute';

describe('Footer component test', () => {
  // https://medium.com/@drake_beth/how-to-test-images-in-react-a70053b1634a
  it('has three icons on footer', () => {
    renderWithRouter(<Footer />);
    const icons = screen.getAllByRole('img');

    expect(icons[0]).toBeInTheDocument();
    expect(icons[0].src).toBe('http://localhost/drinkIcon.svg');
    expect(icons[1]).toBeInTheDocument();
    expect(icons[1].src).toBe('http://localhost/exploreIcon.svg');
    expect(icons[2]).toBeInTheDocument();
    expect(icons[2].src).toBe('http://localhost/mealIcon.svg');
  });
  it('it redirects /bebidas', () => {
    const { history } = renderWithRouter(<Footer />);
    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    expect(drinksIcon).toBeInTheDocument();
    fireEvent.click(drinksIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });

  it('it redirects /comidas', () => {
    const { history } = renderWithRouter(<Footer />);
    const foodsIcon = screen.getByTestId('food-bottom-btn');
    expect(foodsIcon).toBeInTheDocument();
    fireEvent.click(foodsIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });

  it('it redirects to /explorar', () => {
    const { history } = renderWithRouter(<Footer />);
    const exploreIcon = screen.getByTestId('explore-bottom-btn');
    expect(exploreIcon).toBeInTheDocument();
    fireEvent.click(exploreIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });
});
