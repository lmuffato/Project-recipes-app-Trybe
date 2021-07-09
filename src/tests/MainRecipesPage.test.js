import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const emailInput = 'email-input';
const loginBtn = 'login-submit-btn';
const passwordInput = 'password-input';
const drinkIcon = 'drinks-bottom-btn';
const mealIcon = 'food-bottom-btn';
const exploreIcon = 'explore-bottom-btn';

const loginData = { user: 'teste@teste.com', password: '1234567' };

const handleLogin = (getByTestId) => {
  const userInput = getByTestId(emailInput);
  const userPasswordInput = getByTestId(passwordInput);
  const loginSubmitBtn = getByTestId(loginBtn);

  userEvent.type(userInput, loginData.user);
  userEvent.type(userPasswordInput, loginData.password);
  userEvent.click(loginSubmitBtn);
};

describe('Test the Main Recipes Page', () => {
  it('verify the pathname', async () => {
    const { history, getByTestId, findByTestId } = renderWithRouter(<App />);

    handleLogin(getByTestId);

    const header = getByTestId('header');
    const footer = getByTestId('footer');
    const iconDrink = getByTestId(drinkIcon);
    const iconExplore = getByTestId(exploreIcon);
    const iconMeal = getByTestId(mealIcon);
    const initialPathname = history.location.pathname;
    const mainRecipes = await findByTestId('main-recipes');

    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(iconDrink).toBeInTheDocument();
    expect(iconExplore).toBeInTheDocument();
    expect(iconMeal).toBeInTheDocument();
    expect(initialPathname).toBe('/comidas');
    expect(mainRecipes).toBeInTheDocument();

    userEvent.click(iconDrink);

    const drinkPathname = history.location.pathname;
    expect(drinkPathname).toBe('/bebidas');

    userEvent.click(iconMeal);

    const mealPathname = history.location.pathname;
    expect(mealPathname).toBe('/comidas');

    userEvent.click(iconExplore);

    const explorePathname = history.location.pathname;
    expect(explorePathname).toBe('/explorar');
  });
});
