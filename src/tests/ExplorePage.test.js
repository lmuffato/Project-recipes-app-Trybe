import React from 'react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';
import ExploreFoods from '../pages/ExploreFoods';

const renderExploreWithRouter = () => renderWithRouter(<ExploreFoods />);
const EXPLORE_FOODS_BTN = 'explore-food';
const EXPLORE_DRINKS_BTN = 'explore-drinks';

describe('Pagina Explorar', () => {
  describe('Header', () => {
    test('Verifica se tem botão para o perfil', () => {
      const { getByTestId, history } = renderExploreWithRouter();
      const profileButton = getByTestId('profile-top-btn');
      expect(profileButton).toBeInTheDocument();
      userEvent.click(profileButton);
      expect(history.location.pathname).toBe('/perfil');
    });
    test('Verifica se exibe título "Explorar"', () => {
      const { getByTestId } = renderExploreWithRouter();
      const headerTitle = getByTestId('page-title');
      expect(headerTitle).toBeInTheDocument();
      expect(headerTitle).toHaveTextContent(/explorar/i);
    });
    test('Verifica se exibe botão para barra de pesquisa', () => {
      const { getByTestId } = renderExploreWithRouter();
      const searchBarButton = getByTestId(SEARCH_BAR_BUTTON);
      expect(searchBarButton).toBeDisabled();
      expect(searchBarButton).toHaveStyle({
        opacity: 0,
      });
    });
  });
  test('Verifica se há um botão escrito "Explorar Comidas"', () => {
    const { getByTestId } = renderExploreWithRouter();
    expect(getByTestId(EXPLORE_FOODS_BTN)).toBeInTheDocument();
    expect(getByTestId(EXPLORE_FOODS_BTN)).toHaveTextContent(/explorar comidas/i);
  });
  test('Ao clicar em comidas, vai à pagina de explorar comidas', () => {
    const { getByTestId, history } = renderExploreWithRouter();
    userEvent.click(getByTestId(EXPLORE_FOODS_BTN));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar/comidas');
  });
  test('Verifica se há um botão escrito "Explorar Bebidas"', () => {
    const { getByTestId } = renderExploreWithRouter();
    expect(getByTestId(EXPLORE_DRINKS_BTN)).toBeInTheDocument();
    expect(getByTestId(EXPLORE_DRINKS_BTN)).toHaveTextContent(/explorar bebidas/i);
  });
  test('Ao clicar em comidas, vai à pagina de explorar bebidas', () => {
    const { getByTestId, history } = renderExploreWithRouter();
    userEvent.click(getByTestId(EXPLORE_DRINKS_BTN));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar/bebidas');
  });
});
