import React from 'react';
import userEvent from '@testing-library/user-event';
import favorite from './mockFavorite';
import App from '../App';
import Favorite from '../pages/Favorite';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const favoriteUrl = '/receitas-favoritas';

describe('1 - test if all favorite elements are in the login screen', () => {
  beforeAll(() => localStorage.setItem('favoriteRecipes', JSON.stringify(favorite)));

  it('test if app screen is "/receitas-favoritas"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(favoriteUrl);
    const { pathname } = history.location;
    expect(pathname).toBe(favoriteUrl);
  });
  it('test if header shows', () => {
    const { getByTestId } = renderWithRouterAndRedux(<Favorite />);
    const profileBtn = getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
  });
  it('test if filters shows', () => {
    const { getByText } = renderWithRouterAndRedux(<Favorite />);
    const allBtn = getByText('All');
    const foodBtn = getByText('Food');
    const drinksBtn = getByText('Drink');
    expect(allBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
  });
  it('test if recipe names shows', () => {
    const { getByText } = renderWithRouterAndRedux(<Favorite />);
    const firstRecipeName = getByText('Spicy Arrabiata Penne');
    expect(firstRecipeName).toBeInTheDocument();
    const secondRecipeName = getByText('Aquamarine');
    expect(secondRecipeName).toBeInTheDocument();
  });
  it('test if recipe images shows', () => {
    const { getByTestId } = renderWithRouterAndRedux(<Favorite />);
    const firstImage = getByTestId('0-horizontal-image');
    expect(firstImage).toBeInTheDocument();
    const secondImage = getByTestId('1-horizontal-image');
    expect(secondImage).toBeInTheDocument();
  });
  it('test if recipe info shows', () => {
    const { getByTestId, getByText } = renderWithRouterAndRedux(<Favorite />);
    const firstInfo = getByTestId('0-horizontal-top-text');
    expect(getByText('Italian - Vegetarian')).toBeInTheDocument();
    expect(firstInfo).toBeInTheDocument();
    const secondInfo = getByTestId('1-horizontal-top-text');
    expect(secondInfo).toBeInTheDocument();
    expect(getByText('Alcoholic')).toBeInTheDocument();
  });
  it('test if share buttons shows', () => {
    const { getByTestId } = renderWithRouterAndRedux(<Favorite />);
    const firstShare = getByTestId('0-horizontal-share-btn');
    expect(firstShare).toBeInTheDocument();
    const secondShare = getByTestId('1-horizontal-share-btn');
    expect(secondShare).toBeInTheDocument();
  });
  it('test if favorite buttons shows', () => {
    const { getByTestId } = renderWithRouterAndRedux(<Favorite />);
    const firstFavorite = getByTestId('0-horizontal-favorite-btn');
    expect(firstFavorite).toBeInTheDocument();
    const secondFavorite = getByTestId('1-horizontal-favorite-btn');
    expect(secondFavorite).toBeInTheDocument();
  });
});

describe('2 - test if all favorite buttons work', () => {
  beforeAll(() => localStorage.setItem('favoriteRecipes', JSON.stringify(favorite)));

  // it('test if share button copy link to clipboard', () => {
  //   const { getByTestId, getByText } = renderWithRouterAndRedux(<Favorite />);
  //   const firstShare = getByTestId('0-horizontal-share-btn');
  //   userEvent.click(firstShare);
  //   console.log(navigator);
  //   const copyLink = navigator.clipboard.text;
  //   expect(copyLink).toBeInTheDocument();
  // });
  // it('test if food filter works', () => {
  //   const { getByText } = renderWithRouterAndRedux(<Favorite />);
  //   const foodBtn = getByText('Food');
  //   const secondRecipeName = getByText('Aquamarine');
  //   expect(secondRecipeName).toBeInTheDocument();
  //   const firstRecipeName = getByText('Spicy Arrabiata Penne');
  //   userEvent.click(foodBtn);
  //   expect(firstRecipeName).toBeInTheDocument();
  //   expect(secondRecipeName).not.toBeInTheDocument();
  // });
  // it('test if drink filter works', () => {
  //   const { getByText } = renderWithRouterAndRedux(<Favorite />);
  //   const drinksBtn = getByText('Drink');
  //   const firstRecipeName = getByText('Spicy Arrabiata Penne');
  //   expect(firstRecipeName).toBeInTheDocument();
  //   userEvent.click(drinksBtn);
  //   expect(firstRecipeName).not.toBeInTheDocument();
  // });
  // it('test if "all" filter works', () => {
  //   const { getByText } = renderWithRouterAndRedux(<Favorite />);
  //   const drinksBtn = getByText('Drink');
  //   const allBtn = getByText('All');
  //   const firstRecipeName = getByText('Spicy Arrabiata Penne');
  //   userEvent.click(drinksBtn);
  //   expect(firstRecipeName).not.toBeInTheDocument();
  //   userEvent.click(allBtn);
  //   expect(firstRecipeName).toBeInTheDocument();
  // });
});

describe('3 - test if when recipe image and name is clicked change pages', () => {
  beforeAll(() => localStorage.setItem('favoriteRecipes', JSON.stringify(favorite)));
  it('test if when recipe image is clicked page changes', () => {
    const { getByTestId, history } = renderWithRouterAndRedux(<Favorite />);
    const firstImage = getByTestId('0-horizontal-image');
    userEvent.click(firstImage);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/52771');
  });
  it('test if when recipe name is clicked page changes', () => {
    const { getByText, history } = renderWithRouterAndRedux(<Favorite />);
    const secondRecipeName = getByText('Aquamarine');
    userEvent.click(secondRecipeName);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas/178319');
  });
});
