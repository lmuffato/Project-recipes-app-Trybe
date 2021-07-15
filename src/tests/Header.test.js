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
const searchBtnId = 'search-top-btn';

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
  const searchBtn = queryByTestId(searchBtnId);
  expect(searchBtn).not.toBeInTheDocument();
};

const enterTheExplorePage = (getByTestId) => {
  handleLogin(getByTestId);
  clickBtn(getByTestId, 'explore-bottom-btn');
};

// const allIcons = ['drinks-bottom-btn', 'explore-bottom-btn', 'food-bottom-btn', 'profile-top-btn', searchBtnId];

describe('testing if the header is rendered', () => {
  it('header is not rendered on login page', () => {
    const { queryByTestId } = renderWithRouter(<App />);
    const header = queryByTestId('header');
    expect(header).not.toBeInTheDocument();
  });
  it('check if the header is rendered in the MainRecipesPage Meals page', async () => {
    const { getByTestId, getByText, findByTestId } = renderWithRouter(<App />);
    handleLogin(getByTestId);
    checkTitlePage(getByText, /comidas/i);
    const searchBtn = await findByTestId(searchBtnId);
    expect(searchBtn).toBeInTheDocument();
  });
  it('check if the header is rendered in the MainRecipesPage Drinks page', async () => {
    const { getByTestId, getByText, findByTestId } = renderWithRouter(<App />);
    handleLogin(getByTestId);
    clickBtn(getByTestId, 'drinks-bottom-btn');
    checkTitlePage(getByText, /bebidas/i);
    checkHeaderAndProfileIncon(getByTestId);
    const searchBtn = await findByTestId(searchBtnId);
    expect(searchBtn).toBeInTheDocument();
  });
  it('check if the header is rendered in the Explore page', async () => {
    const { getByTestId, findByRole, queryByTestId, history } = renderWithRouter(<App />);
    enterTheExplorePage(getByTestId);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');

    const title = await findByRole('heading', {
      level: 1,
      name: /explorar/i,
    });
    expect(title).toBeInTheDocument();
    checkHeaderAndProfileIncon(getByTestId);
    // notHaveTheSearchBtn(queryByTestId);

    const searchBtn = queryByTestId(searchBtnId);
    expect(searchBtn).not.toBeInTheDocument();
  });
  it('check if the header is rendered in the Explore foods page', async () => {
    const { getByTestId, queryByTestId, findByRole, history } = renderWithRouter(<App />);
    enterTheExplorePage(getByTestId);

    clickBtn(getByTestId, exploreFood);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');

    const title = await findByRole('heading', {
      level: 1,
      name: /explorar comidas/i,
    });
    expect(title).toBeInTheDocument();

    checkHeaderAndProfileIncon(getByTestId);
    notHaveTheSearchBtn(queryByTestId);
  });
  it('check if the header is rendered in the Explore drinks page', async () => {
    const { getByTestId, findByTestId, findByRole, history } = renderWithRouter(<App />);
    enterTheExplorePage(getByTestId);

    clickBtn(getByTestId, 'explore-drinks');
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');

    const title = await findByRole('heading', {
      level: 1,
      name: /explorar bebidas/i,
    });
    expect(title).toBeInTheDocument();

    checkHeaderAndProfileIncon(getByTestId);
    // notHaveTheSearchBtn(queryByTestId);
    const searchBtn = await findByTestId(searchBtnId);
    expect(searchBtn).not.toBeInTheDocument();
  });
  it('check if the header is rendered in the Explore FoodsIngredients page', async () => {
    const { getByTestId, queryByTestId, findByRole, history } = renderWithRouter(<App />);
    enterTheExplorePage(getByTestId);

    clickBtn(getByTestId, exploreFood);

    clickBtn(getByTestId, 'explore-by-ingredient');
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');

    const title = await findByRole('heading', {
      level: 1,
      name: /explorar ingredientes/i,
    });
    expect(title).toBeInTheDocument();

    checkHeaderAndProfileIncon(getByTestId);
    notHaveTheSearchBtn(queryByTestId);
  });
  it(
    'check if the header is rendered in the Explore DrinksIngredients page', async () => {
      const {
        getByTestId, queryByTestId, findByRole, history } = renderWithRouter(<App />);
      enterTheExplorePage(getByTestId);

      clickBtn(getByTestId, 'explore-drinks');

      clickBtn(getByTestId, 'explore-by-ingredient');
      const { pathname } = history.location;
      expect(pathname).toBe('/explorar/bebidas/ingredientes');

      const title = await findByRole('heading', {
        level: 1,
        name: /explorar ingredientes/i,
      });
      expect(title).toBeInTheDocument();

      checkHeaderAndProfileIncon(getByTestId);
      notHaveTheSearchBtn(queryByTestId);
    },
  );
  it('check if the header is rendered in the Explore FoodsArea page', async () => {
    const { getByTestId, findByRole, findByTestId, history } = renderWithRouter(<App />);
    enterTheExplorePage(getByTestId);
    clickBtn(getByTestId, exploreFood);
    clickBtn(getByTestId, 'explore-by-area');
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/area');

    const title = await findByRole('heading', {
      level: 1,
      name: /explorar origem/i,
    });
    expect(title).toBeInTheDocument();

    checkHeaderAndProfileIncon(getByTestId);
    const searchBtn = await findByTestId(searchBtnId);
    expect(searchBtn).toBeInTheDocument();
  });
  it('check if the header is rendered in the DoneRecipes page', async () => {
    const { getByTestId, findByRole, queryByTestId, history } = renderWithRouter(<App />);
    handleLogin(getByTestId);

    clickBtn(getByTestId, profileTopBtnId);
    clickBtn(getByTestId, 'profile-done-btn');
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-feitas');

    const title = await findByRole('heading', {
      level: 1,
      name: /receitas feitas/i,
    });
    expect(title).toBeInTheDocument();

    checkHeaderAndProfileIncon(getByTestId);
    notHaveTheSearchBtn(queryByTestId);
  });
  it('check if the header is rendered in the FavoritesRecipes page', async () => {
    const { getByTestId, findByRole, queryByTestId, history } = renderWithRouter(<App />);
    handleLogin(getByTestId);

    clickBtn(getByTestId, profileTopBtnId);
    clickBtn(getByTestId, 'profile-favorite-btn');
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-favoritas');

    const title = await findByRole('heading', {
      level: 1,
      name: /receitas favoritas/i,
    });
    expect(title).toBeInTheDocument();

    checkHeaderAndProfileIncon(getByTestId);
    notHaveTheSearchBtn(queryByTestId);
  });
  it('check if the header is rendered in the Profile page', async () => {
    const { getByTestId, findByRole, history } = renderWithRouter(<App />);
    handleLogin(getByTestId);

    clickBtn(getByTestId, profileTopBtnId);
    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');

    const title = await findByRole('heading', {
      level: 1,
      name: /perfil/i,
    });
    expect(title).toBeInTheDocument();

    checkHeaderAndProfileIncon(getByTestId);
    // notHaveTheSearchBtn(queryByTestId);
  });
});
