import React from 'react';
import { fireEvent } from '@testing-library/react';
import Explore from '../pages/Explore';
import renderWithRoute from './helpers/renderWithRoute';

describe('Tela de Explorar', () => {
  test('Deve ser renderizado na rota \'/explorar\'', () => {
    const { history } = renderWithRoute(<Explore />, '/explorar');

    expect(history.location.pathname).toBe('/explorar');
  });

  test('Existe um botão para explorar comidas', () => {
    const { getByTestId } = renderWithRoute(<Explore />, '/explorar');
    const buttonExplorFood = getByTestId('explore-food');
    expect(buttonExplorFood).toBeInTheDocument();
  });
  test('Existe um botão para explorar Bebidas', () => {
    const { getByTestId } = renderWithRoute(<Explore />, '/explorar');
    const buttonExplorDrink = getByTestId('explore-drinks');
    expect(buttonExplorDrink).toBeInTheDocument();
  });
  test('Usuário é redirecionado para  \'/explorar/comidas\' ao clicar no botão', () => {
    const { history, getByTestId } = renderWithRoute(<Explore />, '/explorar');
    const explorFoodButton = getByTestId('explore-food');
    fireEvent.click(explorFoodButton);

    expect(history.location.pathname).toBe('/explorar/comidas');
  });
  test('Usuário é redirecionado para  \'/explorar/bebidas\' ao clicar no botão', () => {
    const { history, getByTestId } = renderWithRoute(<Explore />, '/explorar');
    const explorDrinksButton = getByTestId('explore-drinks');
    fireEvent.click(explorDrinksButton);

    expect(history.location.pathname).toBe('/explorar/bebidas');
  });
});
