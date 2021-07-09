import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('teste da Pagina de Explorar', () => {
  it('Verifica se renderiza a página de explorar', () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    history.push('/explorar');
    const explore = getByTestId('page-title');
    expect(explore.innerHTML).toBe('Explorar');
    expect(explore).toBeInTheDocument();
  });

  it('Verifica se a rota altera para explorar comidas ao clicar no botão', () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    history.push('/explorar');
    const srchFoods = getByTestId('explore-food');
    userEvent.click(srchFoods);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');
  });

  it('Verifica se a rota altera para explorar bebidas ao clicar no botão', () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    history.push('/explorar');
    const srchDrinks = getByTestId('explore-drinks');
    userEvent.click(srchDrinks);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');
  });
});
