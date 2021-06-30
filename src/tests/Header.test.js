import React from 'react';
import userEvent from '@testing-library/user-event';
import Comidas from '../pages/Comidas';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const TITLE = /comidas/i;
const DATA_TESTID = 'data-testid';

describe(`9 - Implemente os elementos do header na tela principal de receitas,
  respeitando os atributos descritos no protótipo`, () => {
  it(`Tem os data-testids 'profile-top-btn', 'page-title' e
    'search-top-btn'`, () => {
    const { getByTestId, getByText } = renderWithRouter(<Comidas />);

    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('search-top-btn')).toBeInTheDocument();
    const pageTitle = getByText(TITLE);
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.getAttribute(DATA_TESTID)).toEqual('page-title');
  });
});

describe(`10 - Implemente um ícone para a tela de perfil, um título e
  um ícone para a busca, caso exista no protótipo`, () => {
  const testExistHeader = (route) => {
    const { history, queryByTestId } = renderWithRouter(<App />);
    history.push(route);
    expect(queryByTestId('page-title')).toBeNull();
  };
  const testHeaderComponents = (route) => {
    const { history, getByTestId } = renderWithRouter(<App />);
    history.push(route);
    const profileTopBtn = getByTestId('profile-top-btn');
    expect(profileTopBtn.firstElementChild).toHaveAttribute('src', profileIcon);
    const searchTopBtn = getByTestId('search-top-btn');
    expect(searchTopBtn.firstElementChild).toHaveAttribute('src', searchIcon);
  };
  it('Não tem header na tela de login', () => {
    testExistHeader('/');
  });
  it(`O header tem os ícones corretos na tela de principal de
    receitas de comidas`, () => {
    testHeaderComponents('/comidas');
  });
  it(`O header tem os ícones corretos na tela de principal de
    receitas de bebidas`, () => {
    testHeaderComponents('/bebidas');
  });
  it('Não tem header na tela de detalhes de uma receita de comida', () => {
    testExistHeader('/comidas/0');
  });
  it('Não tem header na tela de detalhes de uma receita de bebida', () => {
    testExistHeader('/bebidas/0');
  });
  it('Não tem header na tela de receita em processo de comida', () => {
    testExistHeader('/comidas/0/in-progress');
  });
  it('Não tem header na tela de receita em processo de bebida', () => {
    testExistHeader('/bebidas/0/in-progress');
  });

  it('O header tem os ícones corretos na tela de explorar', () => {
    testHeaderComponents('/explorar');
  });
  it('O header tem os ícones corretos na tela de explorar comidas', () => {
    testHeaderComponents('/explorar/comidas');
  });
  it('O header tem os ícones corretos na tela de explorar bebidas', () => {
    testHeaderComponents('/explorar/bebidas');
  });
  it(`O header tem os ícones corretos na tela de explorar comidas por
    ingrediente`, () => {
    testHeaderComponents('/explorar/comidas/ingredientes');
  });
  it(`O header tem os ícones corretos na tela de explorar bebidas por
    ingrediente`, () => {
    testHeaderComponents('/explorar/bebidas/ingredientes');
  });
  it(`O header tem os ícones corretos na tela de explorar comidas por
    local de origem`, () => {
    testHeaderComponents('/explorar/comidas/area');
  });
  it('O header tem os ícones corretos na tela de perfil', () => {
    testHeaderComponents('/perfil');
  });
  it('O header tem os ícones corretos na tela de receitas feitas', () => {
    testHeaderComponents('/receitas-feitas');
  });
  it('O header tem os ícones corretos na tela de receitas favoritas', () => {
    testHeaderComponents('/receitas-favoritas');
  });
});

describe(`11 - Redirecione a pessoa usuária para a tela de perfil ao clicar
  no botão de perfil`, () => {
  it('A mudança de tela ocorre corretamente', () => {
    const { getByTestId, history } = renderWithRouter(<Comidas />);
    const linkToPerfil = getByTestId('profile-top-btn');
    userEvent.click(linkToPerfil);
    expect(history.location.pathname).toEqual('/perfil');
  });
});
