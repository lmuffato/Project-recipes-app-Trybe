import React from 'react';
import userEvent from '@testing-library/user-event';
// import { screen } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import drinks from '../../cypress/mocks/drinks';
import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';
import ginDrinks from '../../cypress/mocks/ginDrinks';
// import oneDrink from '../../cypress/mocks/oneDrink';

describe('Testa se a página renderiza corretamente', () => {
  afterEach(() => jest.clearAllMocks());
  it('Verifica a presença dos botões', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategories),
    });
    const { findByText, history } = renderWithRouter(<App />);

    history.push('/bebidas');

    await findByText('All');
    await findByText('Ordinary Drink');
    await findByText('Cocktail');
    await findByText('Milk / Float / Shake');
    await findByText('Other/Unknown');
    await findByText('Cocoa');
    expect(global.fetch).toBeCalledTimes(2);
    expect(global.fetch).toBeCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    );
  });
  it('Verifica a presença dos cards', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    const { findByTestId, history } = renderWithRouter(<App />);

    history.push('/bebidas');

    await findByTestId('0-recipe-card');
    await findByTestId('11-recipe-card');
    expect(global.fetch).toBeCalledTimes(2);
    expect(global.fetch).toBeCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
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
      json: jest.fn().mockResolvedValue(drinksByIngredient),
    });
    const { findByText, getByTestId, history } = renderWithRouter(<App />);
    history.push('/bebidas');

    const searchTopBtn = getByTestId(searchTop);
    userEvent.click(searchTopBtn);

    const textInput = getByTestId(searchInput);
    const radioInput = getByTestId('ingredient-search-radio');
    const submit = getByTestId(searchSubmit);

    userEvent.type(textInput, 'Light rum');
    userEvent.click(radioInput);
    userEvent.click(submit);

    await findByText('151 Florida Bushwacker');
    const timesCalled = 3;
    expect(global.fetch).toBeCalledTimes(timesCalled);
    expect(global.fetch).toBeCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum',
    );
  });
  it('Busca por Nome', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(ginDrinks),
    });
    const { findByText, getByTestId, history } = renderWithRouter(<App />);
    history.push('/bebidas');

    const searchTopBtn = getByTestId(searchTop);
    userEvent.click(searchTopBtn);

    const textInput = getByTestId(searchInput);
    const radioInput = getByTestId('name-search-radio');
    const submit = getByTestId(searchSubmit);

    userEvent.type(textInput, 'Gin');
    userEvent.click(radioInput);
    userEvent.click(submit);

    await findByText('Gin Fizz');
    const timesCalled = 3;
    expect(global.fetch).toBeCalledTimes(timesCalled);
    expect(global.fetch).toBeCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Gin',
    );
  });
  it('Busca por primeira Letra', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/bebidas');

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
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a',
    );
  });
  it('Alert mais de uma letra', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/bebidas');

    window.alert = jest.fn();

    const searchTopBtn = getByTestId(searchTop);
    userEvent.click(searchTopBtn);

    const textInput = getByTestId(searchInput);
    const radioInput = getByTestId('first-letter-search-radio');
    const submit = getByTestId(searchSubmit);

    userEvent.type(textInput, 'Xablau');
    userEvent.click(radioInput);
    userEvent.click(submit);

    expect(window.alert).toBeCalledTimes(1);
  });
});

describe('testa se os filtros "botões" funcionam corretamente', () => {
  afterEach(() => jest.clearAllMocks());
  it('Busca All', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategories),
    });
    const { findByText, history } = renderWithRouter(<App />);

    history.push('/bebidas');

    const allBtn = await findByText('All');
    userEvent.click(allBtn);

    const timesCalled = 3;
    expect(global.fetch).toBeCalledTimes(timesCalled);
    expect(global.fetch).toBeCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    );
  });
  it('Busca Ordinary Drink', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategories),
    });
    const { findByText, history } = renderWithRouter(<App />);

    history.push('/bebidas');

    const ordBtn = await findByText('Ordinary Drink');
    userEvent.click(ordBtn);

    const timesCalled = 3;
    expect(global.fetch).toBeCalledTimes(timesCalled);
    expect(global.fetch).toBeCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink',
    );
  });
});
