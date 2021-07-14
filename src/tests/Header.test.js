import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const emailInput = 'email-input';
const passwordInput = 'password-input';
const loginBtn = 'login-submit-btn';

const loginData = { user: 'teste@teste.com', password: '1234567' };

const exploreFood = 'explore-food';

const profileTopBtnId = 'profile-top-btn';

const handleLogin = (getByTestId) => {
  const userInput = getByTestId(emailInput);
  const userPasswordInput = getByTestId(passwordInput);
  const loginSubmitBtn = getByTestId(loginBtn);

  userEvent.type(userInput, loginData.user);
  userEvent.type(userPasswordInput, loginData.password);
  userEvent.click(loginSubmitBtn);

  const header = getByTestId('header');
  const profileIcon = getByTestId(profileTopBtnId);
  expect(header).toBeInTheDocument();
  expect(profileIcon).toBeInTheDocument();
};

const checkHeaderAndProfileIncon = (getByTestId) => {
  const header = getByTestId('header');
  const profileIcon = getByTestId(profileTopBtnId);
  expect(header).toBeInTheDocument();
  expect(profileIcon).toBeInTheDocument();
};

const checkTitlePage = (getByText, title) => {
  const titlePage = getByText(title);
  expect(titlePage).toBeInTheDocument();
};

const clickBtn = (getByTestId, id) => {
  const btn = getByTestId(id);
  expect(btn).toBeInTheDocument();
  userEvent.click(btn);
};

const notHaveTheSearchBtn = (queryByTestId) => {
  const searchBtn = queryByTestId('search-top-btn');
  expect(searchBtn).not.toBeInTheDocument();
};

const enterTheExplorePage = (getByTestId) => {
  handleLogin(getByTestId);
  clickBtn(getByTestId, 'explore-bottom-btn');
};

describe('testing if the header is rendered', () => {
  it('header is not rendered on login page', () => {
    const { queryByTestId } = renderWithRouter(<App />);

    const header = queryByTestId('header');
    expect(header).not.toBeInTheDocument();
  });

  it('check if the header is rendered in the MainRecipesPage page', () => {
    const { getByTestId, getByText, history } = renderWithRouter(<App />);

    handleLogin(getByTestId);
    checkTitlePage(getByText, /comidas/i);

    history.push('/bebidas');
    checkTitlePage(getByText, /bebidas/i);
  });

  it('check if the header is rendered in the Explore page', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    enterTheExplorePage(getByTestId);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');

    checkHeaderAndProfileIncon(getByTestId);
    // notHaveTheSearchBtn(queryByTestId);
  });

  it('check if the header is rendered in the Explore foods page', () => {
    const { getByTestId, queryByTestId, history } = renderWithRouter(<App />);

    enterTheExplorePage(getByTestId);

    clickBtn(getByTestId, exploreFood);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');

    checkHeaderAndProfileIncon(getByTestId);
    notHaveTheSearchBtn(queryByTestId);
  });

  it('check if the header is rendered in the Explore drinks page', () => {
    const { getByTestId, queryByTestId, history } = renderWithRouter(<App />);

    enterTheExplorePage(getByTestId);

    clickBtn(getByTestId, 'explore-drinks');
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');

    checkHeaderAndProfileIncon(getByTestId);
    notHaveTheSearchBtn(queryByTestId);
  });

  it('check if the header is rendered in the Explore FoodsIngredients page', () => {
    const { getByTestId, queryByTestId, history } = renderWithRouter(<App />);

    enterTheExplorePage(getByTestId);

    clickBtn(getByTestId, exploreFood);

    clickBtn(getByTestId, 'explore-by-ingredient');
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');

    checkHeaderAndProfileIncon(getByTestId);
    notHaveTheSearchBtn(queryByTestId);
  });

  it('check if the header is rendered in the Explore DrinksIngredients page', () => {
    const { getByTestId, queryByTestId, history } = renderWithRouter(<App />);

    enterTheExplorePage(getByTestId);

    clickBtn(getByTestId, 'explore-drinks');

    clickBtn(getByTestId, 'explore-by-ingredient');
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas/ingredientes');

    checkHeaderAndProfileIncon(getByTestId);
    notHaveTheSearchBtn(queryByTestId);
  });

  it('check if the header is rendered in the Explore FoodsArea page', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    enterTheExplorePage(getByTestId);

    clickBtn(getByTestId, exploreFood);

    clickBtn(getByTestId, 'explore-by-area');
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/area');

    checkHeaderAndProfileIncon(getByTestId);
    // const searchBtn = getByTestId('search-top-btn');
    // expect(searchBtn).toBeInTheDocument();
  });
  it('check if the header is rendered in the DoneRecipes page', () => {
    const { getByTestId, queryByTestId, history } = renderWithRouter(<App />);

    handleLogin(getByTestId);

    clickBtn(getByTestId, profileTopBtnId);
    clickBtn(getByTestId, 'profile-done-btn');
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-feitas');

    checkHeaderAndProfileIncon(getByTestId);
    notHaveTheSearchBtn(queryByTestId);
  });

  // it('check if the header is rendered in the FavoritesRecipes page', () => {
  //   const { getByTestId, queryByTestId, history } = renderWithRouter(<App />);

  //   handleLogin(getByTestId);

  //   clickBtn(getByTestId, profileTopBtnId);
  //   clickBtn(getByTestId, 'profile-favorite-btn');
  //   const { pathname } = history.location;
  //   expect(pathname).toBe('/receitas-favoritas');

  //   checkHeaderAndProfileIncon(getByTestId);
  //   notHaveTheSearchBtn(queryByTestId);
  // });

  it('check if the header is rendered in the DoneRecipes page', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    handleLogin(getByTestId);

    clickBtn(getByTestId, profileTopBtnId);
    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');

    checkHeaderAndProfileIncon(getByTestId);
    // notHaveTheSearchBtn(queryByTestId);
  });
});
