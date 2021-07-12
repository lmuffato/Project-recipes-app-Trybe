import React from 'react';
import userEvent from '@testing-library/user-event';
import renderMock from './renderWithRouterAndRedux';
import Header from '../pages/components/Header';
import '@testing-library/jest-dom';

describe('1 - Test if Header renders with correct elements', () => {
  afterAll(() => done());

  it('Drinks page has correct elements and title "Bebidas"', () => {
    const { getByRole, getByText, history } = renderMock(<Header type="drinks" />);

    const title = getByText(/bebidas/i);
    const searchBtn = getByRole('img', { name: /search icon/i });
    const profileLink = getByRole('img', { name: /profile icon/i });

    expect(title).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(profileLink);
    expect(history.location.pathname).toBe('/perfil');
  });

  it('Meals page has correct elements and has title "Comidas"', () => {
    const { getByText, getByRole, history } = renderMock(<Header type="meals" />);

    const title = getByText(/comidas/i);

    const searchBtn = getByRole('img', { name: /search icon/i });
    const profileLink = getByRole('img', { name: /profile icon/i });

    expect(title).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(profileLink);
    expect(history.location.pathname).toBe('/perfil');
  });

  it('Search page has correct elements and title "Explorar"', () => {
    const { getByText, queryByRole, history } = renderMock(<Header type="search" />);

    const title = getByText(/explorar/i);

    const searchBtn = queryByRole('img', { name: /search icon/i });
    const profileLink = queryByRole('img', { name: /profile icon/i });

    expect(title).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    userEvent.click(profileLink);
    expect(history.location.pathname).toBe('/perfil');
  });

  it('Search Meals page has correct elements and title "Explorar Comidas"', () => {
    const { getByText, queryByRole, history } = renderMock(
      <Header type="search-meals" />,
    );

    const title = getByText(/explorar comidas/i);

    const searchBtn = queryByRole('img', { name: /search icon/i });
    const profileLink = queryByRole('img', { name: /profile icon/i });

    expect(title).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    userEvent.click(profileLink);
    expect(history.location.pathname).toBe('/perfil');
  });

  it('Search Drinks page has correct elements and title "Explorar Bebidas"', () => {
    const { getByText, queryByRole, history } = renderMock(
      <Header type="search-drinks" />,
    );

    const title = getByText(/explorar bebidas/i);

    const searchBtn = queryByRole('img', { name: /search icon/i });
    const profileLink = queryByRole('img', { name: /profile icon/i });

    expect(title).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    userEvent.click(profileLink);
    expect(history.location.pathname).toBe('/perfil');
  });

  it('Search Area page has correct elements and title "Explorar Origem"', () => {
    const { getByText, queryByRole, history } = renderMock(
      <Header type="search-area" />,
    );

    const title = getByText(/explorar origem/i);

    const searchBtn = queryByRole('img', { name: /search icon/i });
    const profileLink = queryByRole('img', { name: /profile icon/i });

    expect(title).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(profileLink);
    expect(history.location.pathname).toBe('/perfil');
  });

  it('Profile page has correct elements and title "Perfil', () => {
    const { getByText, queryByRole, history } = renderMock(
      <Header type="profile" />,
    );

    const title = getByText(/perfil/i);

    const searchBtn = queryByRole('img', { name: /search icon/i });
    const profileLink = queryByRole('img', { name: /profile icon/i });

    expect(title).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    userEvent.click(profileLink);
    expect(history.location.pathname).toBe('/perfil');
  });

  it('Search Ingredients page has correct'
   + 'elements and title "Explorar Ingredientes', () => {
    const { getByText, queryByRole, history } = renderMock(
      <Header type="search-ingredients" />,
    );

    const title = getByText(/Explorar Ingredientes/i);

    const searchBtn = queryByRole('img', { name: /search icon/i });
    const profileLink = queryByRole('img', { name: /profile icon/i });

    expect(title).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    userEvent.click(profileLink);
    expect(history.location.pathname).toBe('/perfil');
  });
});
