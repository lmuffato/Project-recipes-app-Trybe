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
const lengthRequired = 12;

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

describe('Header FoodPage', () => {
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

describe('Conteúdo FoodPage', () => {
  test('Exiba todas os botões de categoria descritos nas instruções e no protótipo',
    async () => {
      const { getByTestId } = renderFoodWithRouter();
      const categories = await (await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')).json();
      await categories.meals.forEach((category) => {
        const { strCategory: categoryName } = category;
        expect(getByTestId(`${categoryName}-category-filter`)).toBeInTheDocument();
      });
    });
  test('Exiba 12 cards de receitas', () => {
    const { getAllByTestId } = renderFoodWithRouter();
    expect(getAllByTestId('recipe-card')).toHaveLength(lengthRequired);
  });
  test('Todos os cards estejam preenchidos corretamente', async () => {
    const { getAllByTestId } = renderFoodWithRouter();
    const foodCardImg = getAllByTestId('recipe-card-img');
    const foodCardTitle = getAllByTestId('recipe-card-title');
    const initialRecipes = await (await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')).json();
    for (let recipe = 0; recipe <= lengthRequired; recipe += 1) {
      expect(foodCardImg[recipe].src).toBe(initialRecipes.meals[recipe].strMealThumb);
      expect(foodCardTitle[recipe].src).toBe(initialRecipes.meals[recipe].strMeal);
    }
  });
  test('Ao clicar no card, é encaminhado para a pagina de detlahes', async () => {
    const { getAllByTestId, history } = renderFoodWithRouter();
    const initialRecipes = await (await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')).json();
    userEvent.click(getAllByTestId('recipe-card')[0]);
    const { location: { pathname } } = history;
    const { meals } = initialRecipes;
    expect(pathname).toBe(`/${meals[0].idMeal}`);
  });
});

describe('Footer FoodPage', () => {
  test('Exibir footer com todos os elementos descritos no protótipo', () => {
    const { getByTestId } = renderFoodWithRouter();
    expect(getByTestId('footer')).toBeInTheDocument();
    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('explore-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('food-bottom-btn')).toBeInTheDocument();
  });
  test('Ao clicar no botão de BEBIDAS é redirecinado para a pagina', () => {
    const { getByTestId, history } = renderFoodWithRouter();
    userEvent.click(getByTestId('drinks-bottom-btn'));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/bebidas');
  });
  test('Ao clicar no botão de EXPLORAR é redirecionado para a pagina', () => {
    const { getByTestId, history } = renderFoodWithRouter();
    userEvent.click(getByTestId('explore-bottom-btn'));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar');
  });
});
