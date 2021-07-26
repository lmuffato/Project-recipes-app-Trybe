import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndProvider from './renderWithRouterAndProvider';

// const tamiya = [{
//   alcoholicOrNot: '',
//   area: 'Egyptian',
//   category: 'Vegetarian',
//   id: '53026',
//   image: 'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg',
//   name: 'Tamiya',
//   type: 'comida' }];
const myPath = '/comidas/53026';
const myEmail = 'seumelhor@email.com';
const emailInput = 'email-input';
const passwordInput = 'password-input';
const loginBtn = 'login-submit-btn';

describe('Recipe Details Tests', () => {
  it('Verify pages buttons', async () => {
    const { getByTestId, history } = await renderWithRouterAndProvider(<App />);

    userEvent.type(getByTestId(emailInput), myEmail);
    userEvent.type(getByTestId(passwordInput), '123456700');
    userEvent.click(getByTestId(loginBtn));

    history.push(myPath);

    const recipeBtn = getByTestId('start-recipe-btn');
    expect(recipeBtn).toBeInTheDocument();

    const shareBtn = getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    const favoriteBtn = getByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();
  });

  it('verify if Tamiya  is the recipe rendem by route /53026', async () => {
    const {
      getByTestId, getByText, history } = await renderWithRouterAndProvider(<App />);

    userEvent.type(getByTestId(emailInput), myEmail);
    userEvent.type(getByTestId(passwordInput), '123456700');
    userEvent.click(getByTestId(loginBtn));

    history.push(myPath);

    const recipeTamiya = getByText('Tamyia');
    expect(recipeTamiya).toBeInTheDocument();

    const categoryTamiya = getByText('Vetetarian');
    expect(categoryTamiya).toBeInTheDocument();
  });

  it('Verify all elements on page', async () => {
    const { getByTestId, history } = await renderWithRouterAndProvider(<App />);

    userEvent.type(getByTestId(emailInput), myEmail);
    userEvent.type(getByTestId(passwordInput), '123456700');
    userEvent.click(getByTestId(loginBtn));

    history.push(myPath);

    const category = getByTestId('recipe-category');
    expect(category).toBeInTheDocument();

    const image = getByTestId('recipe-photo');
    expect(image).toBeInTheDocument();

    const title = getByTestId('recipe-title');
    expect(title).toBeInTheDocument();

    const instructions = getByTestId('instructions');
    expect(instructions).toBeInTheDocument();

    const video = getByTestId('video');
    expect(video).toBeInTheDocument();
  });

  test('Go to in-progress by clicking on button', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(emailInput), myEmail);
    userEvent.type(getByTestId(passwordInput), '123456700');
    userEvent.click(getByTestId(loginBtn));

    history.push(myPath);

    const startRecipeBtn = getByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();

    userEvent.click(startRecipeBtn);

    expect(history.location.pathname).toBe(`${myPath}/in-progress`);
  });
});
