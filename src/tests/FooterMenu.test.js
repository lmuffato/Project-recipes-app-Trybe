import React from 'react';
import userEvent from '@testing-library/user-event';
import FooterMenu from '../components/Footer';
import renderWithRouter from './renderWithRouter';

test('test the component rendering', () => {
  const { getByTestId } = renderWithRouter(<FooterMenu />);
  const componentDiv = getByTestId('footer');
  expect(componentDiv).toBeInTheDocument();
  const foodLink = getByTestId('food-bottom-btn');
  expect(foodLink).toBeInTheDocument();
  const drinkLink = getByTestId('drinks-bottom-btn');
  expect(drinkLink).toBeInTheDocument();
  const searchLink = getByTestId('explore-bottom-btn');
  expect(searchLink).toBeInTheDocument();
});

describe('test the links path', () => {
  it('food link', () => {
    const { getByTestId, history } = renderWithRouter(<FooterMenu />);
    const foodLink = getByTestId('food-bottom-btn');
    userEvent.click(foodLink);
    const path = history.location.pathname;
    expect(path).toBe('/comidas');
  });
  it('drinks link', () => {
    const { getByTestId, history } = renderWithRouter(<FooterMenu />);
    const drinksLink = getByTestId('drinks-bottom-btn');
    userEvent.click(drinksLink);
    const path = history.location.pathname;
    expect(path).toBe('/bebidas');
  });
  it('explore link', () => {
    const { getByTestId, history } = renderWithRouter(<FooterMenu />);
    const exploreLink = getByTestId('explore-bottom-btn');
    userEvent.click(exploreLink);
    const path = history.location.pathname;
    expect(path).toBe('/explorar');
  });
});
