import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Perfil from '../pages/Perfil';
import renderWithRouter from './renderWithRouter';

describe('Profile Screen Tests', () => {
  it('Check if you have the Receitas Feitas button', () => {
    renderWithRouter(<Perfil />);
    const receitasFeitas = screen.getByRole('button', {
      name: /Receitas Feitas/i,
    });

    expect(receitasFeitas).toBeInTheDocument();
  });

  it('Check if you have the Receitas Favoritas button', () => {
    renderWithRouter(<Perfil />);
    const receitasFav = screen.getByRole('button', {
      name: /Receitas Favoritas/i,
    });
    expect(receitasFav).toBeInTheDocument();
  });

  it('Check if you have the Sair button', () => {
    renderWithRouter(<Perfil />);
    const sair = screen.getByRole('button', {
      name: /Sair/i,
    });
    expect(sair).toBeInTheDocument();
  });

  it(`Check if clicking the Receitas Feitas button goes
  to the correct screen`, () => {
    const { history } = renderWithRouter(<Perfil />);
    const goToRF = screen.getByRole('button', {
      name: /Receitas Feitas/i,
    });
    userEvent.click(goToRF);

    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-feitas');
  });

  it(`Check if clicking the Receitas Feitas button goes
  to the correct screen`, () => {
    const { history } = renderWithRouter(<Perfil />);
    const exit = screen.getByRole('button', {
      name: /Sair/i,
    });
    userEvent.click(exit);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it(`Check if clicking the Receitas Feitas button goes
  to the correct screen`, () => {
    const { history } = renderWithRouter(<Perfil />);
    const fav = screen.getByRole('button', {
      name: /Receitas Favoritas/i,
    });
    userEvent.click(fav);

    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-favoritas');
  });

  it('Check if there is an email field', () => {
    renderWithRouter(<Perfil />);
    const email = screen.getByTestId('profile-email');

    expect(email).toBeInTheDocument();
  });
});
