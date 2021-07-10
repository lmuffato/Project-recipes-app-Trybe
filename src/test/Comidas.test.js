import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';
import App from '../App';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import soupMeals from '../../cypress/mocks/soupMeals';

describe('Testa se a página renderiza corretamente', () => {
  afterEach(() => jest.clearAllMocks());
  it('Verifica a presença dos botões', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });
    const { findByText, history } = renderWithRouter(<App />);

    history.push('/comidas');

    await findByText('All');
    await findByText('Beef');
    await findByText('Breakfast');
    await findByText('Chicken');
    await findByText('Dessert');
    await findByText('Goat');
    expect(global.fetch).toBeCalledTimes(2);
    expect(global.fetch).toBeCalledWith(
      'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    );
  });
  it('Verifica a presença dos cards', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    const { findByTestId, history } = renderWithRouter(<App />);

    history.push('/comidas');

    await findByTestId('0-recipe-card');
    await findByTestId('11-recipe-card');
    expect(global.fetch).toBeCalledTimes(2);
    expect(global.fetch).toBeCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    );
  });
});

describe('testa se a busca do header funciona corretamente', () => {
  const searchTop = 'search-top-btn';
  const searchInput = 'search-input';
  const searchSubmit = 'exec-search-btn';
  afterEach(() => jest.clearAllMocks());
  it('Busca por ingredientes', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsByIngredient),
    });
    const { findByText, getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');

    const searchTopBtn = getByTestId(searchTop);
    userEvent.click(searchTopBtn);

    const textInput = getByTestId(searchInput);
    const radioInput = getByTestId('ingredient-search-radio');
    const submit = getByTestId(searchSubmit);

    userEvent.type(textInput, 'Chicken');
    userEvent.click(radioInput);
    userEvent.click(submit);

    await findByText('Brown Stew Chicken');
    const timesCalled = 3;
    expect(global.fetch).toBeCalledTimes(timesCalled);
    expect(global.fetch).toBeCalledWith(
      'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken',
    );
  });
  it('Busca por Nome', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(soupMeals),
    });
    const { findByText, getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');

    const searchTopBtn = getByTestId(searchTop);
    userEvent.click(searchTopBtn);

    const textInput = getByTestId(searchInput);
    const radioInput = getByTestId('name-search-radio');
    const submit = getByTestId(searchSubmit);

    userEvent.type(textInput, 'Soup');
    userEvent.click(radioInput);
    userEvent.click(submit);

    await findByText('Leblebi Soup');
    const timesCalled = 3;
    expect(global.fetch).toBeCalledTimes(timesCalled);
    expect(global.fetch).toBeCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=Soup',
    );
  });
  it('Busca por primeira Letra', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');

    const searchTopBtn = getByTestId(searchTop);
    userEvent.click(searchTopBtn);

    const textInput = getByTestId(searchInput);
    const radioInput = getByTestId('first-letter-search-radio');
    const submit = getByTestId(searchSubmit);

    userEvent.type(textInput, 'a');
    userEvent.click(radioInput);
    userEvent.click(submit);

    const timesCalled = 3;
    expect(global.fetch).toBeCalledTimes(timesCalled);
    expect(global.fetch).toBeCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?f=a',
    );
  });
});

describe('testa se os filtros "botões" funcionam corretamente', () => {
  afterEach(() => jest.clearAllMocks());
  it('Busca All', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });
    const { findByText, history } = renderWithRouter(<App />);

    history.push('/comidas');

    const allBtn = await findByText('All');
    userEvent.click(allBtn);

    const timesCalled = 3;
    expect(global.fetch).toBeCalledTimes(timesCalled);
    expect(global.fetch).toBeCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    );
  });
  it('Busca Beef', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });
    const { findByText, history } = renderWithRouter(<App />);

    history.push('/comidas');

    const beefBtn = await findByText('Beef');
    userEvent.click(beefBtn);

    const timesCalled = 3;
    expect(global.fetch).toBeCalledTimes(timesCalled);
    expect(global.fetch).toBeCalledWith(
      'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef',
    );
  });
});

// describe('testa se ao clicar em um card, redireciona corretamente', () => {
//   it('renderiza os cards e verifica se redireciona', async () => {
//     jest.spyOn(global, 'fetch');
//     global.fetch.mockResolvedValue({
//       json: jest.fn().mockResolvedValue(meals),
//     });
//     const { findByTestId, history } = renderWithRouter(<App />);
//     history.push('/comidas');

//     const card1 = await findByTestId('0-recipe-card');
//     userEvent.click(card1);

//     const { pathname } = history.location;
//     expect(pathname).toBe('/comidas/52977');
//   });
// });
