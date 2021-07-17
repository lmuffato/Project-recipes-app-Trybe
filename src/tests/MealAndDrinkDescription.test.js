import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import handleLogin from './handleLogin';
import App from '../App';

const testRecipes = {
  meal: {
    idMeal: '52978',
    strArea: 'Turkish',
    strCategory: 'Side',
    mealIngredient: [
      'Potatoes', 'Butter', 'Cheese', 'Onion', 'Red Pepper', 'Red Chile Flakes',
    ],
    strInstructions: 'Boil everything',
    strMeal: 'Kumpir',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
    strMeasure: [
      '2 large', '2 tbs', '150g', '1 large', '1 large', 'Pinch',
    ],
    strYoutube: 'https://www.youtube.com/embed/IEDEtZ4UVtI',
  },
  drink: {

    idDrink: '15997',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    strDrink: 'GG',
    strCategory: 'Ordinary Drink',
    drinkIngredient: [
      'Potatoes', 'Butter', 'Cheese', 'Onion', 'Red Pepper', 'Red Chile Flakes',
    ],
    strInstructions: 'Pour the Galliano liqueur over ice',
    strAlcoholic: 'Optional alcohol',
    strMeasure: [
      '2 large', 'at teaste', 'at teaste',
    ],
  },
};

describe('Tests the component MealDescripiton', () => {
  it('verify if changes de pathname', async () => {
    const {
      getByTestId, findAllByTestId, findByAltText, history,
    } = renderWithRouter(<App />);

    handleLogin(getByTestId);

    const numberOfCards = 12;

    const { pathname } = history.location;
    const mealCard = await findAllByTestId(/recipe-card/);
    expect(pathname).toBe('/comidas');
    expect(mealCard.length).toBe(numberOfCards);

    userEvent.click(mealCard[1]);

    const altText = await findByAltText(/comidas/);
    const recipeId = altText.alt.split('/')[1];
    // console.log(recipeId);

    const mealPathname = history.location.pathname;

    expect(mealPathname).toBe(`/comidas/${recipeId}`);
  });

  it('verify if the component has all the data-testeids', async () => {
    const {
      findAllByTestId, findByTestId, findByAltText, history,
    } = renderWithRouter(<App />);
    const shareIcon = 'shareIcon.svg';
    const favoriteIcon = 'whiteHeartIcon.svg';
    const recomendationsSize = 6;

    history.push('/comidas/52978');

    const {
      strMealThumb, strMeal, strCategory, mealIngredient, strMeasure, strYoutube,
    } = testRecipes.meal;

    const recipeImg = await findByTestId('recipe-photo');
    const recipeTitle = await findByTestId('recipe-title');
    const shareImg = await findByAltText(/comidas/);
    const favoriteImg = await findByAltText('set favorite');
    const recipeCategory = await findByTestId('recipe-category');
    const ingredients = await findAllByTestId(/ingredient-name-and-measure/);
    const instructions = await findByTestId('instructions');
    const video = await findByTestId('video');
    const recomendations = await findAllByTestId(/recomendation-card/);

    expect(recipeImg).toHaveAttribute('src', strMealThumb);
    expect(recipeTitle.innerHTML).toBe(strMeal);
    expect(shareImg).toHaveAttribute('src', shareIcon);
    expect(favoriteImg).toHaveAttribute('src', favoriteIcon);
    expect(recipeCategory.innerHTML).toBe(strCategory);
    ingredients.forEach((ingredient, index) => {
      expect(ingredient.innerHTML)
        .toBe(`- ${mealIngredient[index]} - ${strMeasure[index]}`);
    });
    expect(instructions).toBeInTheDocument();
    expect(video).toHaveAttribute('src', strYoutube);
    expect(recomendations.length).toBe(recomendationsSize);
  });
});

describe('Tests the component DrinkDescripiton', () => {
  it('verify if changes de pathname', async () => {
    const {
      findAllByTestId, findByAltText, history,
    } = renderWithRouter(<App />);

    history.push('/bebidas');

    const numberOfCards = 12;

    // const { pathname } = history.location;
    const mealCard = await findAllByTestId(/recipe-card/);
    expect(mealCard.length).toBe(numberOfCards);

    userEvent.click(mealCard[1]);

    const altText = await findByAltText(/bebidas/);
    const recipeId = altText.alt.split('/')[1];
    // console.log(recipeId);

    const mealPathname = history.location.pathname;

    expect(mealPathname).toBe(`/bebidas/${recipeId}`);
  });

  it('verify if the component has all the data-testeids', async () => {
    const {
      findAllByTestId, findByTestId, findByAltText, history,
    } = renderWithRouter(<App />);
    const shareIcon = 'shareIcon.svg';
    const favoriteIcon = 'whiteHeartIcon.svg';
    const recomendationsSize = 6;

    history.push('/bebidas/15997');

    const {
      strDrinkThumb, strDrink, strCategory, strAlcoholic,
    } = testRecipes.drink;

    const recipeImg = await findByTestId('recipe-photo');
    const recipeTitle = await findByTestId('recipe-title');
    const shareImg = await findByAltText(/bebidas/);
    const favoriteImg = await findByAltText('set favorite');
    const recipeCategory = await findByTestId('recipe-category');
    // const drinkIngredients = await findAllByTestId(/ingredient-name-and-measure/);
    const instructions = await findByTestId('instructions');
    const recomendations = await findAllByTestId(/recomendation-card/);

    expect(recipeImg).toHaveAttribute('src', strDrinkThumb);
    expect(recipeTitle.innerHTML).toBe(strDrink);
    expect(shareImg).toHaveAttribute('src', shareIcon);
    expect(favoriteImg).toHaveAttribute('src', favoriteIcon);
    expect(recipeCategory.innerHTML).toBe(`${strCategory} ${strAlcoholic}`);
    expect(instructions).toBeInTheDocument();
    expect(recomendations.length).toBe(recomendationsSize);
  });
});
