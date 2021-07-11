import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';

const {
  headerRenderTests,
  footerRenderTests,
  redirectToProfileScreen,
} = getTest('/profile');
const { queryByTestId, getByTestId } = screen;
const { itDoesntRenderSearchIcon } = headerRenderTests();

describe('Profile Screen', () => {
  const backToProfilePage = () => userEvent.click(getByTestId('profile-top-btn'));

  describe('Check Header and Footer components', () => {
    it('does Header and Footer tests', async () => {
      await renderWithRouterAndContext();

      redirectToProfileScreen(getByTestId, userEvent);

      itDoesntRenderSearchIcon(queryByTestId, getByTestId);
      footerRenderTests().itRenderAllIcons(getByTestId);
    });
  });

  describe('Profile Page Tests', () => {
    it('tests the buttons on Profile Page', async () => {
      await renderWithRouterAndContext();

      const buttonRecipesDone = queryByTestId('profile-done-btn');
      userEvent.click(buttonRecipesDone);
      expect(window.location.pathname).toBe('/receitas-feitas');
      backToProfilePage();

      const buttonFavoritesRecipes = queryByTestId('profile-favorite-btn');
      userEvent.click(buttonFavoritesRecipes);
      expect(window.location.pathname).toBe('/receitas-favoritas');
      backToProfilePage();

      const buttonLogout = queryByTestId('profile-logout-btn');
      userEvent.click(buttonLogout);
      expect(window.location.pathname).toBe('/');
    });
  });
});
