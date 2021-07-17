import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const idsLogin = ['email-input', 'password-input', 'login-submit-btn'];
const loginData = { user: 'teste@teste.com', password: '1234567' };

const exploreFood = 'explore-food';
const profileTopBtnId = 'profile-top-btn';
const searchBtnId = 'search-top-btn';

const handleLogin = (getByTestId) => {
  const userInput = getByTestId(idsLogin[0]);
  const userPasswordInput = getByTestId(idsLogin[1]);
  const loginSubmitBtn = getByTestId(idsLogin[2]);

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

const findNamePage = async (findByRole, name) => {
  const title = await findByRole('heading', {
    level: 1,
    name,
  });
  expect(title).toBeInTheDocument();
};

const findSearchBtn = async (findByTestId) => {
  const searchBtn = await findByTestId(searchBtnId);
  expect(searchBtn).toBeInTheDocument();
};

const notFindSearchBtn = (queryByTestId) => {
  const searchBtn = queryByTestId(searchBtnId);
  expect(searchBtn).not.toBeInTheDocument();
};

const clickBtn = (getByTestId, id) => {
  const btn = getByTestId(id);
  expect(btn).toBeInTheDocument();
  userEvent.click(btn);
};

const enterTheExplorePage = (getByTestId) => {
  handleLogin(getByTestId);
  clickBtn(getByTestId, 'explore-bottom-btn');
};

const enterTheProfilePage = (getByTestId) => {
  handleLogin(getByTestId);
  clickBtn(getByTestId, profileTopBtnId);
};

describe('testing if the header is rendered correctly on each path', () => {
  it('header is not rendered on login page', () => {
    const { queryByTestId } = renderWithRouter(<App />);
    const header = queryByTestId('header');
    expect(header).not.toBeInTheDocument();
  });

  it('header is rendered in the MainRecipesPage Meals page', async () => {
    const { getByTestId, findByRole, findByTestId } = renderWithRouter(<App />);
    handleLogin(getByTestId);
    await findNamePage(findByRole, /comidas/i);
    await findSearchBtn(findByTestId);
  });

  it('header is rendered in the MainRecipesPage Drinks page', async () => {
    const { getByTestId, findByTestId, findByRole } = renderWithRouter(<App />);
    handleLogin(getByTestId);
    clickBtn(getByTestId, 'drinks-bottom-btn');

    checkHeaderAndProfileIncon(getByTestId);
    await findNamePage(findByRole, /bebidas/i);
    await findSearchBtn(findByTestId);
  });

  it('header is rendered in the Explore page', async () => {
    const { getByTestId, findByRole, queryByTestId, history } = renderWithRouter(<App />);
    enterTheExplorePage(getByTestId);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');

    await findNamePage(findByRole, /explorar/i);
    notFindSearchBtn(queryByTestId);
    checkHeaderAndProfileIncon(getByTestId);
  });

  it('header is rendered in the Explore foods page', async () => {
    const { getByTestId, queryByTestId, findByRole, history } = renderWithRouter(<App />);
    enterTheExplorePage(getByTestId);
    clickBtn(getByTestId, exploreFood);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');

    await findNamePage(findByRole, /explorar comidas/i);
    notFindSearchBtn(queryByTestId);
    checkHeaderAndProfileIncon(getByTestId);
  });

  it('header is rendered in the Explore drinks page', async () => {
    const { getByTestId, queryByTestId, findByRole, history } = renderWithRouter(<App />);
    enterTheExplorePage(getByTestId);
    clickBtn(getByTestId, 'explore-drinks');
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');

    await findNamePage(findByRole, /explorar bebidas/i);
    notFindSearchBtn(queryByTestId);
    checkHeaderAndProfileIncon(getByTestId);
  });

  it('header is rendered in the Explore FoodsIngredients page', async () => {
    const { getByTestId, queryByTestId, findByRole, history } = renderWithRouter(<App />);
    enterTheExplorePage(getByTestId);
    clickBtn(getByTestId, exploreFood);
    clickBtn(getByTestId, 'explore-by-ingredient');
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');

    await findNamePage(findByRole, /explorar ingredientes/i);
    notFindSearchBtn(queryByTestId);
    checkHeaderAndProfileIncon(getByTestId);
  });

  it(
    'header is rendered in the Explore DrinksIngredients page', async () => {
      const {
        getByTestId, queryByTestId, findByRole, history } = renderWithRouter(<App />);
      enterTheExplorePage(getByTestId);
      clickBtn(getByTestId, 'explore-drinks');
      clickBtn(getByTestId, 'explore-by-ingredient');
      const { pathname } = history.location;
      expect(pathname).toBe('/explorar/bebidas/ingredientes');

      await findNamePage(findByRole, /explorar ingredientes/i);
      notFindSearchBtn(queryByTestId);
      checkHeaderAndProfileIncon(getByTestId);
    },
  );

  it('header is rendered in the Explore FoodsArea page', async () => {
    const { getByTestId, findByRole, findByTestId, history } = renderWithRouter(<App />);
    enterTheExplorePage(getByTestId);
    clickBtn(getByTestId, exploreFood);
    clickBtn(getByTestId, 'explore-by-area');
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/area');

    await findNamePage(findByRole, /explorar origem/i);
    await findSearchBtn(findByTestId);
    checkHeaderAndProfileIncon(getByTestId);
  });

  it('header is rendered in the Profile page', async () => {
    const { getByTestId, findByRole, queryByTestId, history } = renderWithRouter(<App />);
    enterTheProfilePage(getByTestId);
    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');

    await findNamePage(findByRole, /perfil/i);
    notFindSearchBtn(queryByTestId);
    checkHeaderAndProfileIncon(getByTestId);
  });

  it('header is rendered in the DoneRecipes page', async () => {
    const { getByTestId, findByRole, queryByTestId, history } = renderWithRouter(<App />);
    enterTheProfilePage(getByTestId);
    clickBtn(getByTestId, 'profile-done-btn');
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-feitas');

    await findNamePage(findByRole, /receitas feitas/i);
    notFindSearchBtn(queryByTestId);
    checkHeaderAndProfileIncon(getByTestId);
  });

  it('header is rendered in the FavoritesRecipes page', async () => {
    const { getByTestId, findByRole, queryByTestId, history } = renderWithRouter(<App />);
    enterTheProfilePage(getByTestId);
    clickBtn(getByTestId, 'profile-favorite-btn');
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-favoritas');

    await findNamePage(findByRole, /receitas favoritas/i);
    notFindSearchBtn(queryByTestId);
    checkHeaderAndProfileIncon(getByTestId);
  });
});
