import React from 'react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';
import FoodPage from '../pages/FoodPage';
import RecipeContext from '../context/RecipeContext';

const renderFoodWithRouter = () => renderWithRouter(<FoodPage />);
const SEARCH_BAR_BUTTON = 'search-top-btn';
const SEARCH_BAR_INPUT = 'search-input';
const SEARCH_NAME_INPUT_RATIO = 'name-search-radio';
const SEARCH_INGREDIENT_INPUT_RATIO = 'ingredient-search-radio';
const SEARCH_FIRST_LETTER_INPUT_RATIO = 'first-letter-search-radio';
const SEARCH_EXEC_BUTTON = 'exec-search-btn';

const SearchTest = async (ratioButton, value) => {
  const time = 1000;
  const { getByTestId } = renderFoodWithRouter();
  userEvent.click(getByTestId(SEARCH_BAR_BUTTON));
  userEvent.click(getByTestId(ratioButton));
  userEvent.type(getByTestId(SEARCH_BAR_INPUT), value);
  userEvent.click(getByTestId(SEARCH_EXEC_BUTTON));
  const { recipes } = React.useContext(RecipeContext);
  setInterval(() => expect(recipes
    .every((recipe) => recipe.strMeal.includes(value))).toBe(true), time);
};

describe('Header', () => {
  test('Verifica se tem botão para o perfil', () => {
    const { getByTestId, history } = renderFoodWithRouter();
    const profileButton = getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
    userEvent.click(profileButton);
    expect(history.location.pathname).toBe('/perfil');
  });
  test('Verifica se exibe título "Comidas"', () => {
    const { getByTestId } = renderFoodWithRouter();
    const headerTitle = getByTestId('page-title');
    expect(headerTitle).toBeInTheDocument();
    expect(headerTitle).toHaveTextContent(/comidas/i);
  });
  test('Verifica se exibe botão para barra de pesquisa', () => {
    const { getByTestId } = renderFoodWithRouter();
    const searchBarButton = getByTestId(SEARCH_BAR_BUTTON);
    expect(searchBarButton).toBeInTheDocument();
  });
  test('Verifica se ao clicar no botão de pesquisa exibe a barra', () => {
    const { getByTestId } = renderFoodWithRouter();
    userEvent.click(getByTestId(SEARCH_BAR_BUTTON));
    expect(getByTestId(SEARCH_BAR_INPUT)).toBeInTheDocument();
    expect(getByTestId(SEARCH_INGREDIENT_INPUT_RATIO)).toBeInTheDocument();
    expect(getByTestId(SEARCH_NAME_INPUT_RATIO)).toBeInTheDocument();
    expect(getByTestId(SEARCH_FIRST_LETTER_INPUT_RATIO)).toBeInTheDocument();
    expect(getByTestId(SEARCH_EXEC_BUTTON)).toBeInTheDocument();
  });
  describe('Requisições na barra de pesquisa:', () => {
    test('Ao filtrar por nome, recebe uma ou mais receitas com esse nome', () => {
      SearchTest(SEARCH_NAME_INPUT_RATIO, 'Beef');
    });
    test('Ao filtrar por ingrediente recebe apenas receitas com esse ingrediente', () => {
      SearchTest(SEARCH_INGREDIENT_INPUT_RATIO, 'Egg');
    });
    test('Ao filtrar por Primeira Letra recebe apenas receitas com a letra pesquisada',
      () => {
        const time = 1000;
        const { getByTestId } = renderFoodWithRouter();
        userEvent.click(getByTestId(SEARCH_BAR_BUTTON));
        userEvent.click(getByTestId(SEARCH_FIRST_LETTER_INPUT_RATIO));
        userEvent.type(getByTestId(SEARCH_BAR_INPUT), 'a');
        userEvent.click(getByTestId(SEARCH_EXEC_BUTTON));
        const { recipes } = React.useContext(RecipeContext);
        setInterval(() => expect(recipes
          .every((recipe) => recipe.strMeal[0])).toBe('a'), time);
      });
  });
});
