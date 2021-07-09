import React from 'react';
import { screen } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Explore from '../pages/Explore';
import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import DoneRecipes from '../pages/DoneRecipes';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreOrigin from '../pages/ExploreArea';
import App from '../App';

const HOMEPAGE_TITLE_TESTID = 'page-title';
const SEARCH_ICON_TESTID = 'search-top-btn';
const PROFILE_ICON_TESTID = 'profile-top-btn';
const PROFILE_ICON_SVG_PATH = 'profileIcon.svg';

describe('4 - Crie um componente Header de acordo com os seguintes parâmetros', () => {
  it('O header possui um título para a página principal', () => {
    act(() => {
      renderWithRouterHooksAndProvider(<Home />, '/comidas');
      const pageTitle = screen.getByTestId(HOMEPAGE_TITLE_TESTID);
      expect(pageTitle).toBeInTheDocument();
    });
  });

  it('Checa se o título da página principal de comidas está correto', () => {
    act(() => {
      const { getByRole } = renderWithRouterHooksAndProvider(<Home type="meals" />,
        '/comidas');
      const homePage = getByRole('heading', {
        name: 'Comidas',
        level: 1,
      });
      expect(homePage).toBeInTheDocument();
    });
  });

  it('O header possui um título para a página principal de bebidas', () => {
    act(() => {
      renderWithRouterHooksAndProvider(<Home />, '/bebidas');
      const pageTitle = screen.getByTestId(HOMEPAGE_TITLE_TESTID);
      expect(pageTitle).toBeInTheDocument();
    });
  });

  it('Checa se o título da página principal de bebidas está correto', () => {
    act(() => {
      const { getByRole } = renderWithRouterHooksAndProvider(<Home type="drinks" />,
        '/bebidas');
      const homePage = getByRole('heading', {
        name: 'Bebidas',
        level: 1,
      });
      expect(homePage).toBeInTheDocument();
    });
  });

  it('O header possui um título para a página de perfil', () => {
    act(() => {
      renderWithRouterHooksAndProvider(<Profile />, '/perfil');
      const pageTitle = screen.getByTestId(HOMEPAGE_TITLE_TESTID);
      expect(pageTitle).toBeInTheDocument();
    });
  });

  it('Checa se o título da página de perfil está correto', () => {
    act(() => {
      const { getByRole } = renderWithRouterHooksAndProvider(<Profile />,
        '/perfil');
      const profilePage = getByRole('heading', {
        name: 'Perfil',
        level: 1,
      });
      expect(profilePage).toBeInTheDocument();
    });
  });

  it('O header possui um título para a página de receitas favoritas', () => {
    act(() => {
      renderWithRouterHooksAndProvider(<FavoriteRecipes />, '/receitasfavoritas');
      const pageTitle = screen.getByTestId(HOMEPAGE_TITLE_TESTID);
      expect(pageTitle).toBeInTheDocument();
    });
  });

  it('Checa se o título da página de receitas favoritas está correto', () => {
    act(() => {
      const { getByRole } = renderWithRouterHooksAndProvider(<FavoriteRecipes />,
        '/receitasfavoritas');
      const favoriteRecipesPage = getByRole('heading', {
        name: 'Receitas Favoritas',
        level: 1,
      });
      expect(favoriteRecipesPage).toBeInTheDocument();
    });
  });

  it('O header possui um título para a página de receitas feitas', () => {
    act(() => {
      renderWithRouterHooksAndProvider(<DoneRecipes />, '/receitasfeitas');
      const pageTitle = screen.getByTestId(HOMEPAGE_TITLE_TESTID);
      expect(pageTitle).toBeInTheDocument();
    });
  });

  it('Checa se o título da página de receitas feitas está correto', () => {
    act(() => {
      const { getByRole } = renderWithRouterHooksAndProvider(<DoneRecipes />,
        '/receitasfeitas');
      const doneRecipesPage = getByRole('heading', {
        name: 'Receitas Feitas',
        level: 1,
      });
      expect(doneRecipesPage).toBeInTheDocument();
    });
  });

  it('O header possui um título para a página de explorar', () => {
    act(() => {
      renderWithRouterHooksAndProvider(<Explore />, '/explorar');
      const pageTitle = screen.getByTestId(HOMEPAGE_TITLE_TESTID);
      expect(pageTitle).toBeInTheDocument();
    });
  });

  it('Checa se o título da página de receitas feitas está correto', () => {
    act(() => {
      const { getByRole } = renderWithRouterHooksAndProvider(<Explore />,
        '/explorar');
      const explorePage = getByRole('heading', {
        name: 'Explorar',
        level: 1,
      });
      expect(explorePage).toBeInTheDocument();
    });
  });

  it('O header possui um título para as páginas de explorar comidas', () => {
    act(() => {
      renderWithRouterHooksAndProvider(<ExploreFoods />, '/explorar/comidas');
      const pageTitle = screen.getByTestId(HOMEPAGE_TITLE_TESTID);
      expect(pageTitle).toBeInTheDocument();
    });
  });

  it('O header possui um título para as páginas de explorar bebidas', () => {
    act(() => {
      renderWithRouterHooksAndProvider(<ExploreDrinks />, '/explorar/bebidas');
      const pageTitle = screen.getByTestId(HOMEPAGE_TITLE_TESTID);
      expect(pageTitle).toBeInTheDocument();
    });
  });

  it('Checa se os títulos das páginas de explorar comidas e bebidas '
    + 'está correto', () => {
    act(() => {
      const { getByRole } = renderWithRouterHooksAndProvider(<ExploreFoods />,
        '/explorar/comidas');
      const exploreFoodsPage = getByRole('heading', {
        name: 'Explorar Comidas',
        level: 1,
      });
      expect(exploreFoodsPage).toBeInTheDocument();
    });

    act(() => {
      const { getByRole } = renderWithRouterHooksAndProvider(<ExploreDrinks />,
        '/explorar/bebidas');
      const exploreDrinksPage = getByRole('heading', {
        name: 'Explorar Bebidas',
        level: 1,
      });
      expect(exploreDrinksPage).toBeInTheDocument();
    });
  });

  it('O header possui um título para as páginas de explorar por '
    + 'locais de origem', () => {
    act(() => {
      const { getByRole } = renderWithRouterHooksAndProvider(<ExploreOrigin />,
        '/explorar/comidas/area');
      const explorePage = getByRole('heading', {
        name: 'Explorar Origem',
        level: 1,
      });
      expect(explorePage).toBeInTheDocument();
    });
  });
});

describe('5 - O header possui os ícones corretos', () => {
  it('Página principal de comidas possui os ícones corretos', async () => {
    await act(async () => {
      const { history } = renderWithRouterHooksAndProvider(<App />);
      await history.push('/comidas');
      const searchIcon = screen.getByTestId(SEARCH_ICON_TESTID);
      const profileIcon = screen.getByTestId(PROFILE_ICON_TESTID);

      expect(searchIcon).toBeInTheDocument();
      expect(profileIcon).toBeInTheDocument();
      expect(searchIcon.src).toContain('searchIcon.svg');
      expect(profileIcon.src).toContain(PROFILE_ICON_SVG_PATH);
    });
  });

  it('Página principal de bebidas possui os ícones corretos', () => {
    act(() => {
      renderWithRouterHooksAndProvider(<Home />, '/bebidas');

      const searchIcon = screen.getByTestId(SEARCH_ICON_TESTID);
      const profileIcon = screen.getByTestId(PROFILE_ICON_TESTID);

      expect(searchIcon).toBeInTheDocument();
      expect(profileIcon).toBeInTheDocument();
      expect(searchIcon.src).toContain('searchIcon.svg');
      expect(profileIcon.src).toContain(PROFILE_ICON_SVG_PATH);
    });
  });

  it('Página perfil possui os ícones corretos', () => {
    act(() => {
      renderWithRouterHooksAndProvider(<Profile />, '/perfil');
      const profileIcon = screen.getByTestId(PROFILE_ICON_TESTID);

      expect(profileIcon).toBeInTheDocument();
      expect(profileIcon.src).toContain(PROFILE_ICON_SVG_PATH);
    });
  });
});
