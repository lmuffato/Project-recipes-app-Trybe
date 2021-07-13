import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Explorar from '../pages/Explorar';
import renderWithRouter from './renderWithRouter';

describe('Tests in Explorar page', () => {
  it('Check if you have the explore food button with text', () => {
    renderWithRouter(<Explorar />);
    const btnFood = screen.getByRole('button', {
      name: /Explorar Comidas/i,
    });

    expect(btnFood).toBeInTheDocument();
  });

  it('Check if you have the explore drink button with text', () => {
    renderWithRouter(<Explorar />);
    const btnDrink = screen.getByRole('button', {
      name: /Explorar Bebidas/i,
    });

    expect(btnDrink).toBeInTheDocument();
  });

  it(`Check that clicking the explore food button goes to
  the correct screen`, () => {
    // Acessa o elemento
    const { getByText, history } = renderWithRouter(<Explorar />);
    const foodsEx = getByText('Explorar Comidas');
    userEvent.click(foodsEx);

    // faz o teste
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');
  });

  it(`Check that clicking the explore drink button goes to
  the correct screen`, () => {
    // Acessa o elemento
    const { getByText, history } = renderWithRouter(<Explorar />);
    const drinkEx = getByText('Explorar Bebidas');
    userEvent.click(drinkEx);

    // faz o teste
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');
  });
});
