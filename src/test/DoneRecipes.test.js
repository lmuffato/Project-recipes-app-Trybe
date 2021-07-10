import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const doneAddress = '/receitas-feitas';
const CardTitle1 = '1-horizontal-name';
const CardTitle0 = '0-horizontal-name';
const foodFilterButton = 'filter-by-food-btn';
const shareBtn0 = '0-horizontal-share-btn';

const doneRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

// source https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests
const localStorageMock = () => {
  let store = { doneRecipes: JSON.stringify(doneRecipes) };
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
  };
};

beforeEach(() => Object
  .defineProperty(window, 'localStorage', { value: localStorageMock() }));

afterEach(() => Object
  .defineProperty(window, 'localStorage', { value: '' }));

describe('Testa se a página renderiza corretamente', () => {
  it('Verifica se renderiza os elementos da página de receitas feitas', async () => {
    const { getByTestId, history, findByTestId } = renderWithRouter(<App />);
    history.push(doneAddress);
    expect(getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(getByTestId(foodFilterButton)).toBeInTheDocument();
    expect(getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(await findByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(await findByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(await findByTestId(CardTitle0)).toBeInTheDocument();
    expect(await findByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(await findByTestId(shareBtn0)).toBeInTheDocument();
    expect(await findByTestId('0-Pasta-horizontal-tag')).toBeInTheDocument();
    expect(await findByTestId('0-Curry-horizontal-tag')).toBeInTheDocument();
    expect(await findByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(await findByTestId('1-horizontal-top-text')).toBeInTheDocument();
    expect(await findByTestId(CardTitle1)).toBeInTheDocument();
    expect(await findByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    expect(await findByTestId('1-horizontal-done-date')).toBeInTheDocument();
  });
});

describe(`Verifica se ao clicar na receita redireciona para a tela de detalhes
daquela receita`, () => {
  it('Ao clicar na foto da receita, a rota deve mudar', async () => {
    const { history, findByTestId } = renderWithRouter(<App />);
    history.push(doneAddress);
    const image = await findByTestId('0-horizontal-image');
    userEvent.click(image);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/52771');
  });

  it('Ao clicar no nome da receita, a rota deve mudar', async () => {
    const { history, findByTestId } = renderWithRouter(<App />);
    history.push(doneAddress);
    const title = await findByTestId(CardTitle1);
    userEvent.click(title);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas/178319');
  });
});

describe('Verifica se os botões filtram as receitas', () => {
  it('Clicando no botão Drinks aparece apenas bebidas', async () => {
    const { history, findByTestId, getByTestId } = renderWithRouter(<App />);
    history.push(doneAddress);
    const drinkButton = getByTestId('filter-by-drink-btn');
    userEvent.click(drinkButton);
    const drinkTitle = await findByTestId(CardTitle0);
    expect(drinkTitle).toHaveTextContent(doneRecipes[1].name);
    expect(await findByTestId(CardTitle1).lenght).toBe(undefined);
  });

  it('Clicando no botão Foods aparece apenas comidas', async () => {
    const { history, findByTestId, getByTestId } = renderWithRouter(<App />);
    history.push(doneAddress);
    const foodButton = getByTestId(foodFilterButton);
    userEvent.click(foodButton);
    const foodTitle = await findByTestId(CardTitle0);
    expect(foodTitle).toHaveTextContent(doneRecipes[0].name);
    expect(await findByTestId(CardTitle1).lenght).toBe(undefined);
  });

  it('Ao clicar no botão "All" o filtro deve ser removido', async () => {
    const { history, findByTestId, getByTestId } = renderWithRouter(<App />);
    history.push(doneAddress);
    const foodButton = getByTestId(foodFilterButton);
    userEvent.click(foodButton);
    const allButton = getByTestId('filter-by-all-btn');
    userEvent.click(allButton);
    const drinkTitle = await findByTestId(CardTitle1);
    const foodTitle = await findByTestId(CardTitle0);
    expect(drinkTitle).toHaveTextContent(doneRecipes[1].name);
    expect(foodTitle).toHaveTextContent(doneRecipes[0].name);
  });
});

describe('O botão "share" deve copiar a URL da tela de detalhes da receita', () => {
  it('A URL da tela de detalhes da receita é copiada', async () => {
    const { history, findByTestId } = renderWithRouter(<App />);
    history.push(doneAddress);
    const shareBtn = await findByTestId(shareBtn0);
    document.execCommand = jest.fn();
    userEvent.click(shareBtn);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('Aparece a mensagem Link Copiado na tela', async () => {
    const { history, findByTestId, getByText } = renderWithRouter(<App />);
    history.push(doneAddress);
    const shareBtn = await findByTestId(shareBtn0);
    document.execCommand = jest.fn();
    userEvent.click(shareBtn);
    const message = getByText('Link copiado!');
    expect(message).toBeInTheDocument();
  });
});
