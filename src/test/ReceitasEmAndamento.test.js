import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import oneDrink from '../../cypress/mocks/oneDrink';
import oneMeal from '../../cypress/mocks/oneMeal';

const btnFinish = 'finish-recipe-btn';
describe('Exibe elementos na tela caso seja uma bebida', () => {
  const path = '/bebidas/178319/in-progress';
  afterEach(() => jest.clearAllMocks());
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest
        .fn()
        .mockResolvedValue(oneDrink),
    });
  });
  test('Renderiza título da página', async () => {
    const { findByRole, history } = renderWithRouter(<App />);
    history.push(path);
    const title = await findByRole('heading', { name: /receita em andamento/i });
    expect(title).toBeInTheDocument();
    expect(title.innerHTML).toBe('Receita em Andamento');
  });

  test('Renderiza imagem na tela', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push(path);
    const img = await findByTestId('recipe-photo');
    expect(img).toBeInTheDocument();
  });

  test('Renderiza título da receita', async () => {
    const { findByRole, history } = renderWithRouter(<App />);
    history.push(path);
    const recipeTitle = await findByRole('heading', { name: /aquamarine/i });
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle.innerHTML).toBe('Aquamarine');
  });

  test('Renderiza header ingredientes', async () => {
    const { findByRole, history } = renderWithRouter(<App />);
    history.push(path);
    const headerIngredientes = await findByRole('heading', { name: /instruções/i });
    expect(headerIngredientes).toBeInTheDocument();
    expect(headerIngredientes.innerHTML).toBe('Instruções');
  });

  test('Renderiza texto de instrução', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push(path);
    const instructionText = await findByTestId('instructions');
    expect(instructionText).toBeInTheDocument();
  });

  test('Renderiza share button', async () => {
    const { findByRole, history } = renderWithRouter(<App />);
    history.push(path);
    const btnShare = await findByRole('button', { name: /sharebutton/i });
    expect(btnShare).toBeInTheDocument();
  });

  test('Renderiza favorite button', async () => {
    const { findByRole, history } = renderWithRouter(<App />);
    history.push(path);
    const btnFavorite = await findByRole('button', { name: /isfavorite/i });
    expect(btnFavorite).toBeInTheDocument();
  });

  test('Renderiza checkbox de ingredientes e ativa botão ao selecionar', async () => {
    const { history, findByTestId, findByRole } = renderWithRouter(<App />);
    history.push(path);
    const ingredient1 = await findByRole('checkbox', { name: /hpnotiq/i });
    const ingredient2 = await findByRole('checkbox', { name: /pineapple juice/i });
    const ingredient3 = await findByRole('checkbox', { name: /banana liqueur/i });

    const btn = await findByTestId(btnFinish);
    expect(btn.disabled).toBe(true);
    expect(ingredient1).toBeInTheDocument();
    expect(ingredient2).toBeInTheDocument();
    expect(ingredient3).toBeInTheDocument();
    userEvent.click(ingredient1);
    userEvent.click(ingredient2);
    userEvent.click(ingredient3);
    expect(btn.disabled).toBe(false);
    userEvent.click(ingredient3);
    expect(btn.disabled).toBe(true);
  });

  test('Renderiza categoria', async () => {
    const { findByRole, history } = renderWithRouter(<App />);
    history.push(path);

    const category = await findByRole('heading', { name: /cocktail alcoholic/i });

    expect(category).toBeInTheDocument();
    expect(category.innerHTML).toBe('Cocktail Alcoholic');
  });

  test('Botão de finalizar receita desativado', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push(path);

    const btn = await findByTestId(btnFinish);

    expect(btn).toBeInTheDocument();
    expect(btn.innerHTML).toBe('Finalizar Receita');
  });
});

describe('Exibe elementos na tela caso seja uma comida', () => {
  const path = '/comidas/52771/in-progress';
  afterEach(() => jest.clearAllMocks());
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest
        .fn()
        .mockResolvedValue(oneMeal),
    });
  });
  test('Renderiza título da página', async () => {
    const { findByRole, history } = renderWithRouter(<App />);
    history.push(path);

    const pageTitle = await findByRole('heading', { name: /receita em andamento/i });

    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Receita em Andamento');
  });

  test('Renderiza imagem na tela', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push(path);

    const imgMeal = await findByTestId('recipe-photo');
    expect(imgMeal).toBeInTheDocument();
  });

  test('Renderiza título da receita', async () => {
    const { findByRole, history } = renderWithRouter(<App />);
    history.push(path);

    const mealTitle = await findByRole('heading', { name: /spicy Arrabiata Penne/i });

    expect(mealTitle).toBeInTheDocument();
    expect(mealTitle.innerHTML).toBe('Spicy Arrabiata Penne');
  });

  test('Renderiza header ingredientes', async () => {
    const { findByRole, history } = renderWithRouter(<App />);
    history.push(path);

    const ingredientsHeader = await findByRole('heading', { name: /instruções/i });

    expect(ingredientsHeader).toBeInTheDocument();
    expect(ingredientsHeader.innerHTML).toBe('Instruções');
  });

  test('Renderiza texto de instrução', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push(path);

    const instructions = await findByTestId('instructions');

    expect(instructions).toBeInTheDocument();
  });

  test('Renderiza share button', async () => {
    const { findByRole, history } = renderWithRouter(<App />);
    history.push(path);
    const shareBtn = await findByRole('button', { name: /sharebutton/i });
    expect(shareBtn).toBeInTheDocument();
  });

  test('Renderiza favorite button', async () => {
    const { findByRole, history } = renderWithRouter(<App />);
    history.push(path);

    const favoriteBtn = await findByRole('button', { name: /isfavorite/i });

    expect(favoriteBtn).toBeInTheDocument();
  });

  test('Renderiza checkbox de ingredientes e ativa botão ao selecionar', async () => {
    const { history, findByTestId, findByRole, findByText } = renderWithRouter(<App />);
    history.push(path);
    const ingredient1 = await findByRole('checkbox', { name: /penne rigate/i });
    const ingredient2 = await findByRole('checkbox', { name: /olive oil/i });
    const ingredient3 = await findByRole('checkbox', { name: /garlic/i });
    const ingredient4 = await findByRole('checkbox', { name: /chopped tomatoes/i });
    const ingredient5 = await findByRole('checkbox', { name: /red chile flakes/i });
    const ingredient6 = await findByRole('checkbox', { name: /italian seasoning/i });
    const ingredient7 = await findByRole('checkbox', { name: /basil/i });
    const ingredient8 = await findByRole('checkbox', { name: /Parmigiano-Reggiano/i });

    const btn = await findByTestId(btnFinish);
    expect(btn.disabled).toBe(true);

    expect(ingredient1).toBeInTheDocument();
    expect(ingredient2).toBeInTheDocument();
    expect(ingredient3).toBeInTheDocument();
    expect(ingredient4).toBeInTheDocument();
    expect(ingredient5).toBeInTheDocument();
    expect(ingredient6).toBeInTheDocument();
    expect(ingredient7).toBeInTheDocument();
    expect(ingredient8).toBeInTheDocument();
    userEvent.click(ingredient1);
    userEvent.click(ingredient2);
    userEvent.click(ingredient3);
    userEvent.click(ingredient4);
    userEvent.click(ingredient5);
    userEvent.click(ingredient6);
    userEvent.click(ingredient7);
    userEvent.click(ingredient8);

    expect(btn.disabled).toBe(false);
    userEvent.click(btn);
    const doneRecipes = await findByText(/receitas feitas/i);
    expect(doneRecipes).toBeInTheDocument();
  });

  test('Renderiza categoria', async () => {
    const { findByRole, history } = renderWithRouter(<App />);
    history.push(path);

    const mealCategory = await findByRole('heading', { name: /vegetarian/i });

    expect(mealCategory).toBeInTheDocument();
    expect(mealCategory.innerHTML).toBe('Vegetarian ');
  });

  test('Botão de finalizar receita desativado', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push(path);

    const btnFin = await findByTestId(btnFinish);

    expect(btnFin).toBeInTheDocument();
    expect(btnFin.innerHTML).toBe('Finalizar Receita');
  });
});
