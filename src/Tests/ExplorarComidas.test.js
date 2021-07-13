import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExplorarComidas from '../pages/ExplorarComidas';
import renderWithRouter from './renderWithRouter';

describe('Food explore screen tests', () => {
  it('Check if you have the explore by ingredients button', () => {
    renderWithRouter(<ExplorarComidas />);
    const ingredients = screen.getByRole('button', {
      name: /Por ingredientes/i,
    });

    expect(ingredients).toBeInTheDocument();
  });

  it('Check if you have the explore by place of origin button', () => {
    renderWithRouter(<ExplorarComidas />);
    const area = screen.getByRole('button', {
      name: /Por Local de Origem/i,
    });

    expect(area).toBeInTheDocument();
  });

  it('Check if you have the surprise me button', () => {
    renderWithRouter(<ExplorarComidas />);
    const surprise = screen.getByRole('button', {
      name: /Me surpreenda/i,
    });

    expect(surprise).toBeInTheDocument();
  });

  it(`Check if clicking the explore by ingredient button goes
  to the correct screen`, () => {
    // Acessa o elemento
    const { history } = renderWithRouter(<ExplorarComidas />);
    const ingredients = screen.getByRole('button', {
      name: /Por ingredientes/i,
    });
    userEvent.click(ingredients);

    // faz o teste
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');
  });

  it(`Check if clicking the explore by ingredient button goes
  to the correct screen`, () => {
    // Acessa o elemento
    const { history } = renderWithRouter(<ExplorarComidas />);
    const area = screen.getByRole('button', {
      name: /Por Local de Origem/i,
    });
    userEvent.click(area);

    // faz o teste
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/area');
  });

  it(`Check if clicking the explore by ingredient button goes
  to the correct screen`, () => {
    const { history } = renderWithRouter(<ExplorarComidas />);
    const surprise = screen.getByRole('button', {
      name: /Me surpreenda/i,
    });
    userEvent.click(surprise);

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/');
  });
});
