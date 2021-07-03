import { screen, render, fireEvent } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CocktailsProvider from '../context/CocktailsProvider';
import MealsProvider from '../context/MealsProvider';
import UserContext from '../context/UserContext';
import MainRecipes from '../pages/MainRecipes';
import { mockApiByName, mockApiByMainIngredient } from './mock/mockMealAPI';

const renderWithRouterAndContext = (ui,
  { providerProps, route = '/comidas' } = {}) => {
  const history = createMemoryHistory();
  history.push(route);
  return ({
    ...render(
      <CocktailsProvider>
        <MealsProvider>
          <UserContext.Provider { ...providerProps }>
            <Router history={ history }>{ ui }</Router>
          </UserContext.Provider>
        </MealsProvider>
      </CocktailsProvider>,
      { wrapper: BrowserRouter },
    ),
    history,
  });
};

const SEARCH_INPUT = 'search-input';
const VALID_NAME = 'Spicy Arrabiata Penne';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const NAME_SEARCH_RADIO = 'name-search-radio';
const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';
const SEARCH_TOP_BUTTON = 'search-top-btn';

describe('test if SearchBar component', () => {
  it('01. renders when search button is clicked on MainRecipes', () => {
    renderWithRouterAndContext(<MainRecipes />);
    const searchButton = screen.getByTestId(SEARCH_TOP_BUTTON);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);
    const input = screen.getByTestId(SEARCH_INPUT);
    const ingredientRadio = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
    const requestApiButton = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(input).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(requestApiButton).toBeInTheDocument();
  });
  it('02. is possible to type on input on MainRecipes', () => {
    renderWithRouterAndContext(<MainRecipes />);
    const searchButton = screen.getByTestId(SEARCH_TOP_BUTTON);
    userEvent.click(searchButton);
    const input = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(input, VALID_NAME);
    expect(input).toHaveValue(VALID_NAME);
  });

  it('03. works when clicks in different radios', () => {
    renderWithRouterAndContext(<MainRecipes />);
    const searchButton = screen.getByTestId(SEARCH_TOP_BUTTON);
    userEvent.click(searchButton);
    const radioInputs = screen.getAllByRole('radio');
    radioInputs.forEach((radio) => {
      const othersRadio = radioInputs.filter((element) => element.value !== radio.value);
      userEvent.click(radio);
      expect(radio.checked).toBe(true);
      othersRadio.forEach((element) => expect(element.checked).toBe(false));
    });
  });
});

describe('test if SearchBar component when renders the Api', () => {
  it('redirects when returns just one recipe', async () => {
    const { history } = renderWithRouterAndContext(<MainRecipes />);

    const searchButton = screen.getByTestId(SEARCH_TOP_BUTTON);
    userEvent.click(searchButton);

    const input = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(input, VALID_NAME);

    const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    fireEvent.click(nameRadio);

    const requestApiButton = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(requestApiButton);
    const meals = await mockApiByName();

    const newMeals = { meals: [
      {
        idMeal: '52771',
        strMeal: 'Spicy Arrabiata Penne',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
    ],
    };
    const path = history.location.pathname;
    expect(path).toBe('/comidas/52771');
    expect(meals).toMatchObject(newMeals);
  });

  const mealsByIngredient = { meals: [{
    strMeal: 'Brown Stew Chicken',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg',
    idMeal: '52940' },
  { strMeal: 'Chicken & mushroom Hotpot',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg',
    idMeal: '52846' },
  { strMeal: 'Chicken Alfredo Primavera',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg',
    idMeal: '52796' },
  { strMeal: 'Chicken Basquaise',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wruvqv1511880994.jpg',
    idMeal: '52934' },
  { strMeal: 'Chicken Congee',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1529446352.jpg',
    idMeal: '52956' },
  { strMeal: 'Chicken Handi',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg',
    idMeal: '52795' },
  { strMeal: 'Kentucky Fried Chicken',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/xqusqy1487348868.jpg',
    idMeal: '52813' },
  { strMeal: 'Kung Pao Chicken',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/1525872624.jpg',
    idMeal: '52945' },
  { strMeal: 'Pad See Ew',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/uuuspp1468263334.jpg',
    idMeal: '52774' },
  { strMeal: 'Piri-piri chicken and slaw',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/hglsbl1614346998.jpg',
    idMeal: '53039' },
  { strMeal: 'Thai Green Curry',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/sstssx1487349585.jpg',
    idMeal: '52814' }] };

  it('test the rendering of api elements', async () => {
    renderWithRouterAndContext(<MainRecipes />);
    const searchButton = screen.getByTestId(SEARCH_TOP_BUTTON);
    userEvent.click(searchButton);

    const input = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(input, 'chicken');

    const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    fireEvent.click(nameRadio);

    const requestApiButton = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(requestApiButton);
    const requestApi = await mockApiByMainIngredient();

    const length = 12;
    const cardsImages = screen.getAllByAltText('recipe');

    expect(cardsImages.length).toBe(length);
    expect(requestApi).toMatchObject(mealsByIngredient);
  });
});
