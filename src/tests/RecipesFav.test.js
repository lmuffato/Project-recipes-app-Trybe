import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const foodName = 'Spicy Arrabiata Penne';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: foodName,
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

describe('Test Favorite Recipes page', () => {
  const myPath = '/receitas-favoritas';
  it('Test profile button', () => {
    const { getByTestId, getByText, history } = renderWithRouter(<App />);
    history.push(myPath);

    const myTittle = getByText('Receitas Favoritas');
    expect(myTittle).toBeInTheDocument();

    const profileBtn = getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();

    fireEvent.click(profileBtn);
    const { location } = history;
    const { pathname } = location;
    expect(pathname).toBe('/perfil');
  });

  it('Check all elements on the screen', () => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push(myPath);

    const myHeart = getByTestId('0-horizontal-favorite-btn');
    const mySecondHeart = getByTestId('1-horizontal-favorite-btn');
    const shareBtn = getByTestId('0-horizontal-share-btn');
    const shareSecondBtn = getByTestId('0-horizontal-share-btn');
    const myImage = getByTestId('0-horizontal-image');
    const mySecondImage = getByTestId('0-horizontal-image');
    const myTopText = getByTestId('0-horizontal-top-text');
    const mySecondTopText = getByTestId('1-horizontal-top-text');
    const myName = getByTestId('0-horizontal-name');
    const mySecondName = getByTestId('0-horizontal-name');
    const filterAllBtn = getByTestId('filter-by-all-btn');
    const filterByFoodBtn = getByTestId('filter-by-food-btn');
    const filterByDrinkBtn = getByTestId('filter-by-drink-btn');

    expect(myHeart).toBeInTheDocument();
    expect(mySecondHeart).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(shareSecondBtn).toBeInTheDocument();
    expect(myImage).toBeInTheDocument();
    expect(mySecondImage).toBeInTheDocument();
    expect(myTopText).toBeInTheDocument();
    expect(mySecondTopText).toBeInTheDocument();
    expect(myName).toBeInTheDocument();
    expect(mySecondName).toBeInTheDocument();
    expect(filterAllBtn).toBeInTheDocument();
    expect(filterByDrinkBtn).toBeInTheDocument();
    expect(filterByFoodBtn).toBeInTheDocument();
  });

  it('Check filter buttons', () => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { getByText, getByTestId, history } = renderWithRouter(<App />);
    history.push(myPath);

    const myName = getByText(foodName);
    const myDrinkName = getByText('Aquamarine');
    expect(myName).toBeInTheDocument();
    expect(myDrinkName).toBeInTheDocument();
    const filterByDrinkBtn = getByTestId('filter-by-drink-btn');
    const filterAllBtn = getByTestId('filter-by-all-btn');
    const filterByFoodBtn = getByTestId('filter-by-food-btn');
    fireEvent.click(filterByDrinkBtn);
    expect(myName).not.toBeInTheDocument();
    fireEvent.click(filterByFoodBtn);
    expect(getByText(foodName)).toBeInTheDocument();
    expect(myDrinkName).not.toBeInTheDocument();
    fireEvent.click(filterAllBtn);

    expect(getByText(foodName)).toBeInTheDocument();
    expect(getByText('Aquamarine')).toBeInTheDocument();
  });

  it('Check favoriteBtn button', () => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { getByText, getByTestId, history } = renderWithRouter(<App />);
    history.push(myPath);

    const myHeart = getByTestId('0-horizontal-favorite-btn');
    expect(myHeart).toBeInTheDocument();
    const myName = getByText(foodName);
    expect(myName).toBeInTheDocument();
    fireEvent.click(myHeart);
    expect(myName).toBeInTheDocument();
  });
});
