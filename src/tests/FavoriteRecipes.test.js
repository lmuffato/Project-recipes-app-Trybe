import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const spicyArrabiataPenne = 'Spicy Arrabiata Penne';
const favoriteRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: spicyArrabiataPenne,
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

describe('Test FavoriteRecipes page', () => {
  const pathName = '/receitas-favoritas';

  it('expected the elements to be on the screen', () => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push(pathName);

    const byAllBtn = getByTestId('filter-by-all-btn');
    const byFoodBtn = getByTestId('filter-by-food-btn');
    const byDrinkBtn = getByTestId('filter-by-drink-btn');
    expect(byAllBtn).toBeInTheDocument();
    expect(byFoodBtn).toBeInTheDocument();
    expect(byDrinkBtn).toBeInTheDocument();

    const mealCard = getByTestId('0-horizontal-image');
    const mealTopText = getByTestId('0-horizontal-top-text');
    const mealName = getByTestId('0-horizontal-name');
    const mealFavoriteBtn = getByTestId('0-horizontal-favorite-btn');
    const mealShareBtn = getByTestId('0-horizontal-share-btn');
    expect(mealCard).toBeInTheDocument();
    expect(mealTopText).toBeInTheDocument();
    expect(mealName).toBeInTheDocument();
    expect(mealFavoriteBtn).toBeInTheDocument();
    expect(mealShareBtn).toBeInTheDocument();

    const cocktailCard = getByTestId('1-horizontal-image');
    const cocktailTopText = getByTestId('1-horizontal-top-text');
    const cocktailName = getByTestId('1-horizontal-name');
    const cocktailFavoriteBtn = getByTestId('1-horizontal-favorite-btn');
    const cocktailShareBtn = getByTestId('1-horizontal-share-btn');
    expect(cocktailFavoriteBtn).toBeInTheDocument();
    expect(cocktailShareBtn).toBeInTheDocument();
    expect(cocktailCard).toBeInTheDocument();
    expect(cocktailTopText).toBeInTheDocument();
    expect(cocktailName).toBeInTheDocument();
  });

  it('verify the filter buttons', () => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { getByText, getByTestId, history } = renderWithRouter(<App />);
    history.push(pathName);

    const mealName = getByText(spicyArrabiataPenne);
    const cocktailName = getByText('Aquamarine');
    expect(mealName).toBeInTheDocument();
    expect(cocktailName).toBeInTheDocument();

    const filterByFood = getByTestId('filter-by-food-btn');
    userEvent.click(filterByFood);
    expect(cocktailName).not.toBeInTheDocument();

    const filterByDrink = getByTestId('filter-by-drink-btn');
    userEvent.click(filterByDrink);
    expect(mealName).not.toBeInTheDocument();

    const filterByAll = getByTestId('filter-by-all-btn');
    userEvent.click(filterByAll);
    expect(getByText(spicyArrabiataPenne)).toBeInTheDocument();
    expect(getByText('Aquamarine')).toBeInTheDocument();
  });

  it('verify if the page is redirecting to detailsRecipe page', () => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push(pathName);

    const mealName = getByTestId('0-horizontal-name');
    userEvent.click(mealName);
    expect(history.location.pathname).toEqual('/comidas/52771');

    history.push(pathName);
    const cocktailCard = getByTestId('1-horizontal-image');
    userEvent.click(cocktailCard);
    expect(history.location.pathname).toEqual('/bebidas/178319');
  });

  it('verify if the recipe is removed from favorite', () => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { getByText, getByTestId, history } = renderWithRouter(<App />);
    history.push(pathName);

    const cocktailName = getByText('Aquamarine');
    expect(cocktailName).toBeInTheDocument();
    const cocktailFavoriteBtn = getByTestId('1-horizontal-favorite-btn');
    fireEvent.click(cocktailFavoriteBtn);
    expect(cocktailName).not.toBeInTheDocument();

    const mealName = getByText(spicyArrabiataPenne);
    expect(mealName).toBeInTheDocument();
    const mealFavoriteBtn = getByTestId('0-horizontal-favorite-btn');
    fireEvent.click(mealFavoriteBtn);
    expect(mealName).not.toBeInTheDocument();
  });

  // it('checks if details recipe url is copied to clipboard', () => {
  //   window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  //   const { getByText, getByTestId, history } = renderWithRouter(<App />);
  //   history.push(pathName);

  //   const mealName = getByText('Spicy Arrabiata Penne');
  //   expect(mealName).toBeInTheDocument();

  //   const mealShareBtn = getByTestId('0-horizontal-share-btn');
  //   userEvent.click(mealShareBtn);

  //   const isCopy = getByText('Link copiado!');
  //   expect(isCopy).toBeInTheDocument();
  // });
});
