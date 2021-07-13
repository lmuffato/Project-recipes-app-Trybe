import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuInferior from '../components/MenuInferior';
import renderWithRouter from './renderWithRouter';

describe('Menu Inferior Component Tests', () => {
  it('Check for drinks icon', () => {
    renderWithRouter(<MenuInferior />);
    const drinkIcon = screen.getByAltText('icone-bebidas');

    expect(drinkIcon).toBeInTheDocument();
  });

  it('Check for explore icon', () => {
    renderWithRouter(<MenuInferior />);
    const explore = screen.getByAltText('explorar');

    expect(explore).toBeInTheDocument();
  });

  it('Check for foods page', () => {
    renderWithRouter(<MenuInferior />);
    const foods = screen.getByAltText('pagina de comidas');

    expect(foods).toBeInTheDocument();
  });

  it(`Check if clicking the explore by ingredient button goes
  to the correct screen`, () => {
    const { history } = renderWithRouter(<MenuInferior />);
    const drinkIcon = screen.getByAltText('icone-bebidas');

    userEvent.click(drinkIcon);

    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });

  it(`Check if clicking the explore by ingredient button goes
  to the correct screen`, () => {
    const { history } = renderWithRouter(<MenuInferior />);
    const explore = screen.getByAltText('explorar');

    userEvent.click(explore);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });

  it(`Check if clicking the explore by ingredient button goes
  to the correct screen`, () => {
    const { history } = renderWithRouter(<MenuInferior />);
    const foods = screen.getByAltText('pagina de comidas');

    userEvent.click(foods);

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
