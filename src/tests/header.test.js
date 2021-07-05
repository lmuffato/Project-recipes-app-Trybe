import userEvent from '@testing-library/user-event';
import React from 'react';
import Header from '../Components/Header';
import RecipeMainPage from '../Pages/RecipeMainPage';
import renderWithRouter from './renderWithRoute';
import * as fetchMealsAndDrinks from '../services';
import apiReturnIngredient from './data';

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
      getByRole, getByTestId, findByTestId, findByText, history,
    } = renderWithRouter(<RecipeMainPage header="Comidas" />);

    history.push('/comidas');
    expect(history.location.pathname).toEqual('/comidas');

    const MAX_CARDS = 12;
    // Source: https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
    const cardIds = [...Array(MAX_CARDS).keys()]
      .map((e, i) => `${i}-recipe-cardaa`);

    const mockFetch = jest.spyOn(fetchMealsAndDrinks, 'default')
      .mockResolvedValue(apiReturnIngredient.meals);

    const SEARCH_ICON = getByTestId('search-top-btn');
    userEvent.click(SEARCH_ICON);

    const INPUT_BAR = getByRole('textbox');
    const RADIO_INGREDIENT = getByTestId('ingredient-search-radio');
    const SEARCH_BUTTON = getByRole('button', { name: /buscar/i });

    userEvent.type(INPUT_BAR, 'sugar');
    userEvent.click(RADIO_INGREDIENT);
    userEvent.click(SEARCH_BUTTON);

    expect(mockFetch).toHaveBeenCalled();
    expect(await findByText(/Apam/i)).toBeInTheDocument();
    const promisses = cardIds.map((id) => findByTestId(id));
    const returnedCards = await Promise.all(promisses);
    returnedCards.forEach((card) => expect(card).toBeInTheDocument());
  });
});
