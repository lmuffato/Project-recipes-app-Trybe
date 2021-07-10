import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import mealIngredients from '../../cypress/mocks/mealIngredients';
import meals from '../../cypress/mocks/meals';
import App from '../App';
import areas from '../../cypress/mocks/areas';
import oneMeal from '../../cypress/mocks/oneMeal';
import italianMeals from '../../cypress/mocks/italianMeals';

const exploreFoodPath = '/explorar/comidas';
const exploreFoodByIngredientPath = '/explorar/comidas/ingredientes';
const exploreFoodByAreaPath = '/explorar/comidas/area';

describe('Testa a página de explorar e se direciona para local correto', () => {
  afterEach(() => jest.clearAllMocks());
  it('Verifica a renderização da pg explorar e o caminho p comidas', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/explorar');

    const comidasbtn = getByText('Explorar Comidas');

    userEvent.click(comidasbtn);

    const { pathname } = history.location;
    expect(pathname).toBe(exploreFoodPath);
  });
  it('Verifica a renderização e caminho para explorar ingredientes', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    const { findByText, history } = renderWithRouter(<App />);
    history.push(exploreFoodPath);

    const ingredientesbtn = await findByText('Por Ingredientes');

    userEvent.click(ingredientesbtn);

    const { pathname } = history.location;
    expect(pathname).toBe(exploreFoodByIngredientPath);
  });
  it('Verifica a renderização e caminho para explorar local origem', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    const { findByText, history } = renderWithRouter(<App />);
    history.push(exploreFoodPath);

    const areabtn = await findByText('Por Local de Origem');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealIngredients),
    });

    userEvent.click(areabtn);

    const { pathname } = history.location;
    expect(pathname).toBe(exploreFoodByAreaPath);
  });
});

describe('testa explorar comidas por ingredientes', () => {
  afterEach(() => jest.clearAllMocks());
  it('verifia se renderiza os cards corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealIngredients),
    });
    const { findByText, history } = renderWithRouter(<App />);
    history.push(exploreFoodByIngredientPath);

    await findByText('Chicken');
    await findByText('Salmon');
    await findByText('Beef');
    await findByText('Pork');
    await findByText('Avocado');
    await findByText('Apple Cider Vinegar');
    await findByText('Asparagus');
    await findByText('Aubergine');
    await findByText('Baby Plum Tomatoes');
    await findByText('Bacon');
    await findByText('Baking Powder');
  });
  it('verifia se redireciona corretamente ao clicar em um card', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealIngredients),
    });
    const { findByText, history } = renderWithRouter(<App />);
    history.push(exploreFoodByIngredientPath);

    const chicken = await findByText('Chicken');

    userEvent.click(chicken);

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');

    expect(global.fetch).toBeCalledWith(
      'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken',
    );
  });
});

describe('testa explorar comidas por Local de origem', () => {
  const ExploreByAreaDropdown = 'explore-by-area-dropdown';
  afterEach(() => jest.clearAllMocks());
  it('verifia se renderiza os cards corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    const { findByText, history } = renderWithRouter(<App />);
    history.push(exploreFoodByAreaPath);

    await findByText('Corba');
    await findByText('Kumpir');
    await findByText('Dal fry');
    await findByText('Poutine');
  });
  it('verifia se renderiza o dropdown corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(areas),
    });
    const { findByText, getByTestId, history } = renderWithRouter(<App />);
    history.push(exploreFoodByAreaPath);

    const dropDown = getByTestId(ExploreByAreaDropdown);
    expect(dropDown).toBeInTheDocument();
    userEvent.click(dropDown);
    await findByText('American');
    await findByText('British');
    await findByText('Canadian');
    await findByText('Chinese');
  });
  it('verifia se ao clicar no dropdown renderiza corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(areas),
    });
    const { findByText, getByTestId, findByTestId, history } = renderWithRouter(<App />);
    history.push(exploreFoodByAreaPath);

    const dropDown = getByTestId(ExploreByAreaDropdown);
    // userEvent.click(dropDown);
    await findByTestId('Italian-option');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(italianMeals),
    });
    userEvent.selectOptions(dropDown, 'Italian');

    await findByText('Budino Di Ricotta');
    expect(global.fetch).toBeCalledWith(
      'https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian',
    );
  });
  it('verifia teste de alert', async () => {
    const nullObject = { meals: null };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(areas),
    });
    const { getByTestId, findByTestId, history } = renderWithRouter(<App />);
    history.push(exploreFoodByAreaPath);
    window.alert = jest.fn();

    const dropDown = getByTestId(ExploreByAreaDropdown);
    // userEvent.click(dropDown);
    await findByTestId('Italian-option');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(nullObject),
    });
    userEvent.selectOptions(dropDown, 'Italian');

    await findByTestId('Canadian-option');

    await expect(window.alert).toBeCalledTimes(2);
  });
});
