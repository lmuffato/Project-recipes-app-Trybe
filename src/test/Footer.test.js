import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Footer está presente com os componentes corretos nas páginas corretas', () => {
  const rigthEmail = 'xablau@google.com';
  const loginBtnId = 'login-submit-btn';
  const footerTestId = 'footer';
  const drinksBtn = 'drinks-bottom-btn';
  const exploreBtn = 'explore-bottom-btn';
  const foodBtn = 'food-bottom-btn';
  const emailInput = 'password-input';
  const passwordInput = 'password-input';
  it('Testa se o footer está presente na página de comidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/comidas');
    const footer = getByTestId(footerTestId);
    const drinks = getByTestId(drinksBtn);
    const explore = getByTestId(exploreBtn);
    const food = getByTestId(foodBtn);
    expect(footer).toBeInTheDocument();
    expect(drinks).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(food).toBeInTheDocument();
  });

  it('Testa se o footer está presente na página de bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/bebidas');
    const footer = getByTestId(footerTestId);
    const drinks = getByTestId(drinksBtn);
    const explore = getByTestId(exploreBtn);
    const food = getByTestId(foodBtn);
    expect(footer).toBeInTheDocument();
    expect(drinks).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(food).toBeInTheDocument();
  });

  it('Testa se o footer está presente na página de Explorar', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/explorar');
    const footer = getByTestId(footerTestId);
    const drinks = getByTestId(drinksBtn);
    const explore = getByTestId(exploreBtn);
    const food = getByTestId(foodBtn);
    expect(footer).toBeInTheDocument();
    expect(drinks).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(food).toBeInTheDocument();
  });

  it('Testa se o footer está presente na página de Explorar/comidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/explorar/comidas');
    const footer = getByTestId(footerTestId);
    const drinks = getByTestId(drinksBtn);
    const explore = getByTestId(exploreBtn);
    const food = getByTestId(foodBtn);
    expect(footer).toBeInTheDocument();
    expect(drinks).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(food).toBeInTheDocument();
  });

  it('Testa se o footer está presente na página de Explorar/comidas/ingredientes', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/explorar/comidas/ingredientes');
    const footer = getByTestId(footerTestId);
    const drinks = getByTestId(drinksBtn);
    const explore = getByTestId(exploreBtn);
    const food = getByTestId(foodBtn);
    expect(footer).toBeInTheDocument();
    expect(drinks).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(food).toBeInTheDocument();
  });

  it('Testa se o footer está presente na página de Explorar/comidas/origem', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/explorar/comidas/area');
    const footer = getByTestId(footerTestId);
    const drinks = getByTestId(drinksBtn);
    const explore = getByTestId(exploreBtn);
    const food = getByTestId(foodBtn);
    expect(footer).toBeInTheDocument();
    expect(drinks).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(food).toBeInTheDocument();
  });

  it('Testa se o footer está presente na página de Explorar/bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/explorar/bebidas');
    const footer = getByTestId(footerTestId);
    const drinks = getByTestId(drinksBtn);
    const explore = getByTestId(exploreBtn);
    const food = getByTestId(foodBtn);
    expect(footer).toBeInTheDocument();
    expect(drinks).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(food).toBeInTheDocument();
  });

  it('Testa se o footer está presente na página de Explorar/bebidas/ingredientes', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/explorar/bebidas/ingredietes');
    const footer = getByTestId(footerTestId);
    const drinks = getByTestId(drinksBtn);
    const explore = getByTestId(exploreBtn);
    const food = getByTestId(foodBtn);
    expect(footer).toBeInTheDocument();
    expect(drinks).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(food).toBeInTheDocument();
  });

  it('Testa se o footer está presente na página de perfil', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const email = getByTestId(emailInput);
    const senha = getByTestId(passwordInput);
    const loginBtn = getByTestId(loginBtnId);

    userEvent.type(email, rigthEmail);
    userEvent.type(senha, '1234567');
    userEvent.click(loginBtn);

    history.push('/perfil');
    const footer = getByTestId(footerTestId);
    const drinks = getByTestId(drinksBtn);
    const explore = getByTestId(exploreBtn);
    const food = getByTestId(foodBtn);
    expect(footer).toBeInTheDocument();
    expect(drinks).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(food).toBeInTheDocument();
  });
});

describe('Footer redireciona ao clicar nos botões', () => {
  // const rigthEmail = 'xablau@google.com';
  // const loginBtnId = 'login-submit-btn';
  const footerTestId = 'footer';
  const drinksBtn = 'drinks-bottom-btn';
  const exploreBtn = 'explore-bottom-btn';
  const foodBtn = 'food-bottom-btn';
  // const emailInput = 'password-input';
  // const passwordInput = 'password-input';
  it('Testa se o footer da pg comidas redireciona para bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/comidas');
    const footer = getByTestId(footerTestId);
    const drinks = getByTestId(drinksBtn);
    const explore = getByTestId(exploreBtn);
    const food = getByTestId(foodBtn);
    expect(footer).toBeInTheDocument();
    expect(drinks).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(food).toBeInTheDocument();

    userEvent.click(drinks);

    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });

  it('Testa se o footer da pg comidas redireciona para explorar', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/comidas');
    const footer = getByTestId(footerTestId);
    const drinks = getByTestId(drinksBtn);
    const explore = getByTestId(exploreBtn);
    const food = getByTestId(foodBtn);
    expect(footer).toBeInTheDocument();
    expect(drinks).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(food).toBeInTheDocument();

    userEvent.click(explore);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });

  it('Testa se o footer da pg bebidas redireciona para comidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/bebidas');
    const footer = getByTestId(footerTestId);
    const drinks = getByTestId(drinksBtn);
    const explore = getByTestId(exploreBtn);
    const food = getByTestId(foodBtn);
    expect(footer).toBeInTheDocument();
    expect(drinks).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(food).toBeInTheDocument();

    userEvent.click(food);

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
