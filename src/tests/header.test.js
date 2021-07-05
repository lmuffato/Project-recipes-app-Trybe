import userEvent from '@testing-library/user-event';
import React from 'react';
import Header from '../Components/Header';
import RecipeMainPage from '../Pages/RecipeMainPage';
import renderWithRouter from './renderWithRoute';
import * as fetchMealsAndDrinks from '../services';
import { apiReturnIngredient, apiReturnName } from './data';

describe('Testa o Componente Header', () => {
  it('o componente deve ser exibido na tela de inicial contendo todos os icones', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Header>Comidas</Header>);

    const PROFILE_ICON = getByRole('img', { name: /user/i });
    const HEADING_TEXT = getByRole('heading', { name: /comidas/i });
    const SEARCH_ICON = getByTestId('search-top-btn');
    expect(PROFILE_ICON).toBeInTheDocument();
    expect(HEADING_TEXT).toBeInTheDocument();
    expect(SEARCH_ICON).toBeInTheDocument();
  });

  it('Ao clicar no icone de perfil, deve-se ir para a tela de perfil', () => {
    const { getByRole, history } = renderWithRouter(<RecipeMainPage header="Comidas" />);

    const PROFILE_ICON = getByRole('img', { name: /user/i });
    userEvent.click(PROFILE_ICON);
    const { pathname } = history.location;
    expect(pathname).toEqual('/perfil');
  });

  it('Ao clicar no icone de search as opções de pesquisa devem aparecer', () => {
    const {
      getByRole, getByText, getByTestId,
    } = renderWithRouter(<RecipeMainPage header="Bebidas" />);

    const SEARCH_ICON = getByTestId(/search-top-btn/i);
    userEvent.click(SEARCH_ICON);

    const INPUT_BAR = getByRole('textbox');
    const RADIO_FIRST_LETTER = getByText(/primeira letra/i);
    const RADIO_NAME = getByText(/nome/i);
    const RADIO_INGREDIENT = getByText(/ingrediente/i);
    const SEARCH_BUTTON = getByRole('button', { name: /buscar/i });

    expect(INPUT_BAR).toBeInTheDocument();
    expect(RADIO_FIRST_LETTER).toBeInTheDocument();
    expect(RADIO_NAME).toBeInTheDocument();
    expect(RADIO_INGREDIENT).toBeInTheDocument();
    expect(SEARCH_BUTTON).toBeInTheDocument();
  });

  it('testa se o a barra de pesquisa tem os comportamentos esperados', async () => {
    const {
      getByRole, getByTestId, findByTestId, findByText, history, getByText,
    } = renderWithRouter(<RecipeMainPage header="Comidas" />);

    history.push('/comidas');
    expect(history.location.pathname).toEqual('/comidas');

    const MAX_CARDS = 12;
    // Source: https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
    const cardIds = [...Array(MAX_CARDS).keys()]
      .map((e, i) => `${i}-recipe-card`);

    const SEARCH_ICON = getByTestId('search-top-btn');
    userEvent.click(SEARCH_ICON);
    const INPUT_BAR = getByRole('textbox');
    const RADIO_INGREDIENT = getByTestId('ingredient-search-radio');
    const RADIO_NAME = getByTestId('name-search-radio');
    const RADIO_FIRST_LETTER = getByTestId('first-letter-search-radio');
    const SEARCH_BUTTON = getByRole('button', { name: /buscar/i });

    // Caso retorne mais de 12 receitas
    let mockFetch = jest.spyOn(fetchMealsAndDrinks, 'default')
      .mockResolvedValueOnce(apiReturnIngredient.meals);

    userEvent.type(INPUT_BAR, 'sugar');
    userEvent.click(RADIO_INGREDIENT);
    userEvent.click(SEARCH_BUTTON);

    expect(mockFetch).toHaveBeenCalled();
    expect(await findByText(/Apam/i)).toBeInTheDocument();
    // Usando HOF para checar todos os ids
    const promisses = cardIds.map((id) => findByTestId(id));
    const returnedCards = await Promise.all(promisses);
    returnedCards.forEach((card) => expect(card).toBeInTheDocument());

    // Quando a api retorna apenas um resultado
    mockFetch = jest.spyOn(fetchMealsAndDrinks, 'default')
      .mockResolvedValueOnce(apiReturnName.meals);

    userEvent.type(INPUT_BAR, 'Arrabiata');
    userEvent.click(RADIO_NAME);
    userEvent.click(SEARCH_BUTTON);

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(history.location.pathname).toEqual('/comidas/52771');

    // Quando a api não retorna nada
    mockFetch = jest.spyOn(fetchMealsAndDrinks, 'default')
      .mockResolvedValueOnce([]);

    userEvent.type(INPUT_BAR, 'xablau');
    userEvent.click(RADIO_NAME);
    userEvent.click(SEARCH_BUTTON);

    // Como testar alerts?
    expect(
      getByText('Sinto muito, não encontramos nenhuma receita para esses filtros.'),
    ).toBeInTheDocument();

    // Caso o input tenha mais de uma letra
    userEvent.type(INPUT_BAR, 'xablau');
    userEvent.click(RADIO_FIRST_LETTER);
    userEvent.click(SEARCH_BUTTON);

    expect(getByText(
      'Sua busca deve conter somente 1 (um) caracter',
    )).toBeInTheDocument();
  });
});
