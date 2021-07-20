import React from 'react';
import { screen } from '@testing-library/dom';
import { waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Explore from '../pages/Explore';
import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import DoneRecipes from '../pages/DoneRecipes';
import ExploreOrigin from '../pages/ExploreOrigin';

import App from '../App';

const HOMEPAGE_TITLE_TESTID = 'page-title';
// const SEARCH_ICON_TESTID = 'search-top-btn';
const PROFILE_ICON_TESTID = 'profile-top-btn';
const PROFILE_ICON_SVG_PATH = 'profileIcon.svg';
const VALID_EMAIL = 'teste@teste.com';
const VALID_PASSWORD = '1234567';
const BUTTON_TEST_ID = 'login-submit-btn';
const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';

describe('4 - Crie um componente Header de acordo com os seguintes parâmetros', () => {
  it('O header possui um título para a página principal', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<Home />, '/comidas');
      const pageTitle = await screen.getByTestId(HOMEPAGE_TITLE_TESTID);
      expect(pageTitle).toBeInTheDocument();
    });
  });

  it('Checa se o título da página principal de comidas está correto', async () => {
    await act(async () => {
      const { getByRole } = await renderWithRouterHooksAndProvider(<Home type="meals" />,
        '/comidas');
      const homePage = await getByRole('heading', {
        name: /comidas/i,
        level: 1,
      });
      expect(homePage).toBeInTheDocument();
    });
  });

  it('O header possui um título para a página principal de bebidas', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<Home />, '/bebidas');
      const pageTitle = await screen.getByRole('heading', { name: /bebidas/i });
      expect(pageTitle).toBeInTheDocument();
    });
  });

  it('Checa se o título da página principal de bebidas está correto', async () => {
    await act(async () => {
      const { getByRole } = await renderWithRouterHooksAndProvider(<Home type="drinks" />,
        '/bebidas');
      const homePage = await getByRole('heading', {
        name: /bebidas/i,
        level: 1,
      });
      expect(homePage).toBeInTheDocument();
    });
  });

  it('O header possui um título para a página de perfil', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<Profile />, '/perfil');
      const pageTitle = await screen.getByTestId(HOMEPAGE_TITLE_TESTID);
      expect(pageTitle).toBeInTheDocument();
    });
  });

  it('Checa se o título da página de perfil está correto', async () => {
    await act(async () => {
      const { getByRole } = await renderWithRouterHooksAndProvider(<Profile />,
        '/perfil');
      const profilePage = getByRole('heading', {
        name: /perfil/i,
        level: 1,
      });
      expect(profilePage).toBeInTheDocument();
    });
  });

  it('O header possui um título para a página de receitas favoritas', () => {
    act(() => {
      renderWithRouterHooksAndProvider(<FavoriteRecipes />, 'receitas-favoritas');
      const pageTitle = screen.getByTestId(HOMEPAGE_TITLE_TESTID);
      expect(pageTitle).toBeInTheDocument();
    });
  });

  it('Checa se o título da página de receitas favoritas está correto', async () => {
    await act(async () => {
      const { getByRole } = await renderWithRouterHooksAndProvider(<FavoriteRecipes />,
        '/receitas-favoritas');
      const favoriteRecipesPage = getByRole('heading', {
        name: /Receitas Favoritas/,
        level: 1,
      });
      expect(favoriteRecipesPage).toBeInTheDocument();
    });
  });

  it('O header possui um título para a página de receitas feitas', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<DoneRecipes />, '/receitas-feitas');
      const pageTitle = await waitForElement(() => screen.getByRole('heading', {
        name: /Receitas Feitas/, level: 1 }));
      expect(pageTitle).toBeInTheDocument();
    });
  });

  it('Checa se o título da página de receitas feitas está correto', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<App />, '/receitas-feitas');
      const doneRecipesPage = await screen.getByRole('heading', {
        name: /Receitas Feitas/,
        level: 1,
      });
      expect(doneRecipesPage).toBeInTheDocument();
    });
  });

  it('O header possui um título para a página de explorar', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<Explore />, '/explorar');
      await waitForElement(() => screen.getByRole(
        'heading', { name: /Explorar/, level: 1 },
      ));
      // const pageTitle = await screen.getByRole('heading', { name: /Explorar/, level: 1 });
      expect(screen.getByRole(
        'heading', { name: /Explorar/, level: 1 },
      )).toBeInTheDocument();
    });
  });

  it('Checa se o título da página de explorar está correto', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<Explore />,
        '/explorar');
      const explorePage = await screen.getByRole('heading', {
        name: 'Explorar',
        level: 1,
      });
      expect(explorePage).toBeInTheDocument();
    });
  });

  it('O header possui um título para as páginas de explorar comidas', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<App />, '/explorar/comidas');
      const pageTitle = await waitForElement(() => screen.getByRole('heading', {
        name: /Explorar Comidas/i, level: 1,
      }));
      expect(pageTitle).toBeInTheDocument();
    });
  });

  it('O header possui um título para as páginas de explorar bebidas', async () => {
    await act(async () => {
      const { history } = await renderWithRouterHooksAndProvider(<App />);
      const email = await screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const password = await screen.getByTestId(PASSWORD_INPUT_TEST_ID);
      const button = await screen.getByTestId(BUTTON_TEST_ID);
      // const profileBTN = await screen.getByTestId(PROFILE_ICON_TESTID);

      await userEvent.type(email, VALID_EMAIL);
      await userEvent.type(password, VALID_PASSWORD);
      await userEvent.click(button);
      await history.push('/explorar/bebidas');
      const pageTitle = await waitForElement(() => screen.getByRole('heading',
        { name: /Explorar Bebidas/i }));
      expect(pageTitle).toBeInTheDocument();
    });
  });

  it('O header possui um título para as páginas de explorar por '
    + 'locais de origem', async () => {
    await act(async () => {
      const { getByRole } = await renderWithRouterHooksAndProvider(<ExploreOrigin />,
        '/explorar/comidas/area');
      const explorePage = await getByRole('heading', {
        name: /Explorar Origem/i,
        level: 1,
      });
      await expect(explorePage).toBeInTheDocument();
    });
  });
});

describe('5 - O header possui os ícones corretos', () => {
  it('Página principal de comidas possui os ícones corretos', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<App />, '/comidas');
      const searchIcon = await waitForElement(() => screen.getByAltText(
        /Logo do ícone de busca/,
      ));
      const profileIcon = await screen.getByTestId(PROFILE_ICON_TESTID);
      expect(searchIcon).toBeInTheDocument();
      expect(profileIcon).toBeInTheDocument();
      expect(searchIcon.src).toContain('searchIcon.svg');
      expect(profileIcon.src).toContain(PROFILE_ICON_SVG_PATH);
    });
  });

  it('Página principal de bebidas possui os ícones corretos', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<App />, '/bebidas');

      const searchIcon = await waitForElement(() => screen.getByAltText(
        /Logo do ícone de busca/i,
      ));
      const profileIcon = await waitForElement(() => screen.getByTestId(
        PROFILE_ICON_TESTID,
      ));
      await expect(searchIcon).toBeInTheDocument();
      await expect(profileIcon).toBeInTheDocument();
      await expect(searchIcon.src).toContain('searchIcon.svg');
      await expect(profileIcon.src).toContain(PROFILE_ICON_SVG_PATH);
    });
  });

  it('Página perfil possui os ícones corretos', async () => {
    await act(async () => {
      const { history } = await renderWithRouterHooksAndProvider(
        <App />,
      );
      await history.push('/profile');
      const profileIcon = await screen.getByTestId(
        PROFILE_ICON_TESTID,
      );
      expect(profileIcon).toBeInTheDocument();
    });
  });
});
// Source: https://stackoverflow.com/questions/57971189/testing-react-do-not-await-the-result-of-calling-act-with-sync-logic
// https://stackoverflow.com/questions/56722139/when-testing-code-that-causes-react-state-updates-should-be-wrapped-into-act
// https://pt-br.reactjs.org/docs/test-utils.html#act
