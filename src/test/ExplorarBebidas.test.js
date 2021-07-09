import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import drinkIngredients from '../../cypress/mocks/drinkIngredients';
import App from '../App';
import oneDrink from '../../cypress/mocks/oneDrink';

const exploreDrinkPath = '/explorar/bebidas';
const exploreDrinkByIngredientPath = '/explorar/bebidas/ingredientes';

describe('Testa a página de explorar e se direciona para local correto', () => {
  afterEach(() => jest.clearAllMocks());
  it('Verifica a renderização da pg explorar e o caminho p/ Bebidas', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/explorar');

    const bebidasbtn = getByText('Explorar Bebidas');

    userEvent.click(bebidasbtn);

    const { pathname } = history.location;
    expect(pathname).toBe(exploreDrinkPath);
  });
  it('Verifica a renderização e caminho para explorar ingredientes', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    const { findByText, history } = renderWithRouter(<App />);
    history.push(exploreDrinkPath);

    const ingredientesbtn = await findByText('Por Ingredientes');

    userEvent.click(ingredientesbtn);

    const { pathname } = history.location;
    expect(pathname).toBe(exploreDrinkByIngredientPath);
  });
  it('Verifica a renderização de explorar bebidas por area', async () => {
    const { findByText, history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas/area');

    const notFound = await findByText('Not Found');

    expect(notFound).toBeInTheDocument();
  });
});

describe('testa explorar bebidas por ingredientes', () => {
  afterEach(() => jest.clearAllMocks());
  it('verifia se renderiza os cards corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkIngredients),
    });
    const { findByText, history } = renderWithRouter(<App />);
    history.push(exploreDrinkByIngredientPath);

    await findByText('Light rum');
    await findByText('Applejack');
    await findByText('Gin');
    await findByText('Dark rum');
    await findByText('Sweet Vermouth');
    await findByText('Strawberry schnapps');
    await findByText('Scotch');
    await findByText('Apricot brandy');
    await findByText('Triple sec');
    await findByText('Southern Comfort');
    await findByText('Orange bitters');
  });
  it('verifia se redireciona corretamente ao clicar em um card', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkIngredients),
    });
    const { findByText, history } = renderWithRouter(<App />);
    history.push(exploreDrinkByIngredientPath);

    const gin = await findByText('Gin');

    userEvent.click(gin);

    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');

    expect(global.fetch).toBeCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin',
    );
  });
});
