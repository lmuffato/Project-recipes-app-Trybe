import userEvent from '@testing-library/user-event';
import React from 'react';
import Perfil from '../pages/Perfil';
import renderWithRouter from './renderWithRouter';

describe('Testa a página de perfil', () => {
  // incluir o contexto: https://testing-library.com/docs/example-react-context/

  test('O campo de email está visível', () => {
    const { getByTestId } = renderWithRouter(<Perfil />);
    const email = getByTestId('profile-email');
    const doneBtn = getByTestId('profile-done-btn');
    const favoriteBtn = getByTestId('profile-favorite-btn');
    const logoutBtn = getByTestId('profile-logout-btn');

    expect(email).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  test('O email do usuario no local Storage aparece na tela', () => {
    const { getByText } = renderWithRouter(<Perfil />);
    const userEmail = JSON.parse(localStorage.getItem('user')).email;
    expect(getByText(userEmail).toBeInTheDocument());
  });

  test('Ir para tela receitas favoritas ao clicar no botão', () => {
    const { getByTestId, history } = renderWithRouter(<Perfil />);
    const favoriteBtn = getByTestId('profile-favorite-btn');

    userEvent.click(favoriteBtn);

    expect(history.location.pathname).toBe('/receitas-favoritas');
  });

  test('Ir para tela receitas feitas ao clicar no botão', () => {
    const { getByTestId, history } = renderWithRouter(<Perfil />);
    const doneBtn = getByTestId('profile-done-btn');

    userEvent.click(doneBtn);

    expect(history.location.pathname).toBe('/receitas-feitas');
  });

  test('Comportamento do botão logout', () => {
    const { getByTestId, history } = renderWithRouter(<Perfil />);
    const logoutBtn = getByTestId('profile-logout-btn');

    userEvent.click(logoutBtn);

    expect(history.location.pathname).toBe('/');

    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');
    const user = localStorage.getItem('user');

    expect(mealsToken).toBe('');
    expect(cocktailsToken).toBe('');
    expect(user).toBe('');
  });
});
