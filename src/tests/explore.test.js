import React from 'react';

import { screen } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';
import { fireEvent, waitForElement } from '@testing-library/react';
import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';
import App from '../App';

const THREE = 3;

describe('Testes da página Explorar', () => {
  it('Espera que tenha três headings contendo a palavra explorar', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<App />, '/explorar');

      const exploreHeadings = await waitForElement(() => screen.getAllByRole('heading',
        { name: /explorar/i }));

      expect(exploreHeadings).toHaveLength(THREE);
    });
  });

  it('Espera que tenha um botão explorar comida', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<App />, '/explorar');

      const exploreFoodsButton = await waitForElement(() => screen.getAllByRole('heading',
        { name: /explorar comidas/i }));

      expect(exploreFoodsButton).toHaveLength(1);
    });
  });

  it('Espera que tenha um botão explorar bebidas', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<App />, '/explorar');

      const exploreDrinksButton = await waitForElement(() => screen.getAllByRole(
        'heading',
        { name: /explorar bebidas/i },
      ));

      expect(exploreDrinksButton).toHaveLength(1);
    });
  });

  it('Tem botão explorar por ingredientes em explorar/bebidas', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<App />, '/explorar/bebidas');

      const exploreByIngredients = await waitForElement(() => screen.getByRole(
        'heading',
        { name: /por ingredientes/i, level: 2 },
      ));

      expect(exploreByIngredients).toBeInTheDocument();
    });
  });

  it('Tem botão explorar me surpreenda em explorar/bebidas', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<App />, '/explorar/bebidas');

      const exploreByIngredients = await waitForElement(() => screen.getByRole('heading',
        { name: /me surpreenda/i, level: 2 }));

      expect(exploreByIngredients).toBeInTheDocument();
    });
  });
});

describe('Testa toggle do searchbar na tela', () => {
  it('Rota /explorar/comidas/area renderiza SearchBar',
    async () => {
      const { getByText, getByTestId } = await renderWithRouterHooksAndProvider(
        <App />,
        '/explorar/comidas/area',
      );

      const EXPLORE_DROPDOWN = 'explore-by-area-dropdown';
      const SEARCH_BTN = 'search-top-btn';

      await waitForElement(() => getByTestId('0-card-img'));
      await waitForElement(() => getByTestId(EXPLORE_DROPDOWN));
      expect(getByTestId(SEARCH_BTN)).toBeInTheDocument();
      fireEvent.click(getByTestId(SEARCH_BTN));
      const searchInput = getByTestId('search-input');
      const searchBtn = getByTestId('exec-search-btn');
      const resetBtn = getByText('Resetar');
      expect(searchInput).toBeInTheDocument();
      expect(searchBtn).toBeInTheDocument();
      expect(resetBtn).toBeInTheDocument();
      fireEvent.click(getByTestId(SEARCH_BTN));
      expect(searchInput).not.toBeInTheDocument();
      expect(searchBtn).not.toBeInTheDocument();
      expect(resetBtn).not.toBeInTheDocument();
    });
});
