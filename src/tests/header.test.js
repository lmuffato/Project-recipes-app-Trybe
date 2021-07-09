import userEvent from '@testing-library/user-event';
import React from 'react';
import { cleanup } from '@testing-library/react';
import Header from '../Components/Header';
import RecipeMainPage from '../Pages/RecipeMainPage';
import renderWithRouter from './renderWithRoute';
import * as fetchMealsAndDrinks from '../services';
import { apiReturnIngredient, apiReturnName } from './data';

const searchIconId = 'search-top-btn';

describe('Testa o Componente Header', () => {
  afterEach(() => cleanup);
  it('o componente deve ser exibido na tela de inicial contendo todos os icones', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Header>Comidas</Header>);

    const PROFILE_ICON = getByRole('img', { name: /user/i });
    const HEADING_TEXT = getByRole('heading', { name: /comidas/i });
    const SEARCH_ICON = getByTestId(searchIconId);
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

    const SEARCH_ICON = getByTestId(searchIconId);
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
      getByRole,
      getByTestId,
      findByTestId,
      findByText,
      history,
    } = renderWithRouter(<RecipeMainPage header="Comidas" />);

    history.push('/comidas');
    expect(history.location.pathname).toEqual('/comidas');

    // Source: https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
    const MAX_CARDS = 12;
    const cardIds = [...Array(MAX_CARDS).keys()]
      .map((e, i) => `${i}-recipe-card`);

    const SEARCH_ICON = getByTestId(searchIconId);
    userEvent.click(SEARCH_ICON);
    const INPUT_BAR = getByRole('textbox');
    const RADIO_INGREDIENT = getByTestId('ingredient-search-radio');
    const SEARCH_BUTTON = getByRole('button', { name: /buscar/i });

    // Mocks
    const mockFetch = jest.spyOn(fetchMealsAndDrinks, 'default')
      .mockResolvedValueOnce(apiReturnIngredient.meals);

    // Caso retorne mais de 12 receitas
    userEvent.type(INPUT_BAR, 'sugar');
    userEvent.click(RADIO_INGREDIENT);
    userEvent.click(SEARCH_BUTTON);

    expect(mockFetch).toHaveBeenCalled();
    expect(await findByText(/Apam/i)).toBeInTheDocument();
    // Usando HOF para checar todos os ids
    const promisses = cardIds.map((id) => findByTestId(id));
    const returnedCards = await Promise.all(promisses);
    returnedCards.forEach((card) => expect(card).toBeInTheDocument());
  });

  it.skip('Testa se redireciona para detalhes', async () => {
    const {
      getByRole, getByTestId, history, findByTestId,
    } = renderWithRouter(<RecipeMainPage header="Comidas" />);

    history.push('/comidas');

    const mockFetch = jest.spyOn(fetchMealsAndDrinks, 'default')
      .mockResolvedValueOnce(apiReturnName.meals);

    const SEARCH_ICON = getByTestId('searchIconId');
    userEvent.click(SEARCH_ICON);
    const INPUT_BAR = getByRole('textbox');
    const RADIO_NAME = getByTestId('name-search-radio');
    const SEARCH_BUTTON = getByRole('button', { name: /buscar/i });

    userEvent.type(INPUT_BAR, 'Arrabiata');
    userEvent.click(RADIO_NAME);
    userEvent.click(SEARCH_BUTTON);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(await findByTestId('start-recipe-btn')).toBeInTheDocument();
  });
});
