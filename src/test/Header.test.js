import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Header está presente com os componentes corretos nas páginas corretas', () => {
  const rigthEmail = 'xablau@google.com';
  const loginBtnId = 'login-submit-btn';
  const profileTopBtn = 'profile-top-btn';
  const pageTitle = 'page-title';
  const searchTopBtn = 'search-top-btn';
  const emailInput = 'email-input';
  const passwordInput = 'password-input';
  it('Testa se o header está presente na página de comidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/comidas');
    const profileBtn = getByTestId(profileTopBtn);
    const title = getByTestId(pageTitle);
    const searchBtn = getByTestId(searchTopBtn);
    expect(profileBtn).toBeInTheDocument();
    expect(title.innerHTML).toBe('Comidas');
    expect(searchBtn).toBeInTheDocument();
  });

  it('Testa se o header está presente na página de bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/bebidas');
    const profileBtn = getByTestId(profileTopBtn);
    const title = getByTestId(pageTitle);
    const searchBtn = getByTestId(searchTopBtn);
    expect(profileBtn).toBeInTheDocument();
    expect(title.innerHTML).toBe('Bebidas');
    expect(searchBtn).toBeInTheDocument();
  });

  it('Testa se o header está presente na página de explorar', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/explorar');
    const profileBtn = getByTestId(profileTopBtn);
    const title = getByTestId(pageTitle);
    expect(profileBtn).toBeInTheDocument();
    expect(title.innerHTML).toBe('Explorar');
  });

  it('Testa se o header está presente na página de explorar comidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/explorar/comidas');
    const profileBtn = getByTestId(profileTopBtn);
    const title = getByTestId(pageTitle);
    expect(profileBtn).toBeInTheDocument();
    expect(title.innerHTML).toBe('Explorar Comidas');
  });

  it('Testa se o header está presente na página de explorar comidas/ingredientes', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/explorar/comidas/ingredientes');
    const profileBtn = getByTestId(profileTopBtn);
    const title = getByTestId(pageTitle);
    expect(profileBtn).toBeInTheDocument();
    expect(title.innerHTML).toBe('Explorar Ingredientes');
  });

  it('Testa se o header está presente na página de explorar comidas/Origem', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/explorar/comidas/area');
    const profileBtn = getByTestId(profileTopBtn);
    const title = getByTestId(pageTitle);
    expect(profileBtn).toBeInTheDocument();
    expect(title.innerHTML).toBe('Explorar Origem');
  });

  it('Testa se o header está presente na página de explorar bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/explorar/bebidas');
    const profileBtn = getByTestId(profileTopBtn);
    const title = getByTestId(pageTitle);
    expect(profileBtn).toBeInTheDocument();
    expect(title.innerHTML).toBe('Explorar Bebidas');
  });

  it('Testa se o header está presente na página de explorar bebidas/ingredientes', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/explorar/bebidas/ingredientes');
    const profileBtn = getByTestId(profileTopBtn);
    const title = getByTestId(pageTitle);
    expect(profileBtn).toBeInTheDocument();
    expect(title.innerHTML).toBe('Explorar Ingredientes');
  });

  it('Testa se o header está presente na página de perfil', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const email = getByTestId(emailInput);
    const senha = getByTestId(passwordInput);
    const loginBtn = getByTestId(loginBtnId);

    userEvent.type(email, rigthEmail);
    userEvent.type(senha, '1234567');
    userEvent.click(loginBtn);

    history.push('/perfil');
    const profileBtn = getByTestId(profileTopBtn);
    const title = getByTestId(pageTitle);
    expect(profileBtn).toBeInTheDocument();
    expect(title.innerHTML).toBe('Perfil');
  });

  it('Testa se o header está presente na página de Receitas Feitas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const email = getByTestId(emailInput);
    const senha = getByTestId(passwordInput);
    const loginBtn = getByTestId(loginBtnId);

    userEvent.type(email, rigthEmail);
    userEvent.type(senha, '1234567');
    userEvent.click(loginBtn);

    history.push('/receitas-feitas');
    const profileBtn = getByTestId(profileTopBtn);
    const title = getByTestId(pageTitle);
    expect(profileBtn).toBeInTheDocument();
    expect(title.innerHTML).toBe('Receitas Feitas');
  });

  it('Testa se o header está presente na página de Receitas Favoritas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const email = getByTestId(emailInput);
    const senha = getByTestId(passwordInput);
    const loginBtn = getByTestId(loginBtnId);

    userEvent.type(email, rigthEmail);
    userEvent.type(senha, '1234567');
    userEvent.click(loginBtn);

    history.push('/receitas-favoritas');
    const profileBtn = getByTestId(profileTopBtn);
    const title = getByTestId(pageTitle);
    expect(profileBtn).toBeInTheDocument();
    expect(title.innerHTML).toBe('Receitas Favoritas');
  });
});

describe('Botões do header realizam açoes corretamente', () => {
  const rigthEmail = 'xablau@google.com';
  const loginBtnId = 'login-submit-btn';
  const profileTopBtn = 'profile-top-btn';
  const pageTitle = 'page-title';
  const searchTopBtn = 'search-top-btn';
  const emailInput = 'email-input';
  const passwordInput = 'password-input';
  it('testa botão perfil', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const email = getByTestId(emailInput);
    const senha = getByTestId(passwordInput);
    const loginBtn = getByTestId(loginBtnId);

    userEvent.type(email, rigthEmail);
    userEvent.type(senha, '1234567');
    userEvent.click(loginBtn);

    const profileBtn = getByTestId(profileTopBtn);
    userEvent.click(profileBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });

  it('Testa se ao clicar no btn de busca renderiza o formulario de filtro', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    history.push('/comidas');
    const profileBtn = getByTestId(profileTopBtn);
    const title = getByTestId(pageTitle);
    const searchBtn = getByTestId(searchTopBtn);
    expect(profileBtn).toBeInTheDocument();
    expect(title.innerHTML).toBe('Comidas');
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);

    const search = getByTestId('search-input');
    const ingredient = getByTestId('ingredient-search-radio');
    const name = getByTestId('name-search-radio');
    const firstLetter = getByTestId('first-letter-search-radio');
    const BTNSearch = getByTestId('exec-search-btn');

    expect(search).toBeInTheDocument();
    expect(ingredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(BTNSearch).toBeInTheDocument();
  });
});
