import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';

const { queryByTestId, getByTestId } = screen;

const {
  headerRenderTests,
  footerRenderTests,
  redirectToProfileScreen,
} = getTest();
const { itDoesntRenderSearchIcon } = headerRenderTests();
const { itDoesntRenderFooter } = footerRenderTests();

const redirectToFavoriteRecipeScreen = () => {
  redirectToProfileScreen(getByTestId, userEvent);

  const favoriteRecipePageButton = getByTestId('profile-favorite-btn');
  userEvent.click(favoriteRecipePageButton);
};

describe('FavoriteRecipes screen', () => {
  describe('Check Header and Footer components', () => {
    it('doesnt render the Header and Footer on the FavoriteRecipes screen', async () => {
      await renderWithRouterAndContext();

      redirectToFavoriteRecipeScreen();

      itDoesntRenderSearchIcon(queryByTestId, getByTestId);
      itDoesntRenderFooter(queryByTestId);
    });
  });

  describe('Check the elements on Favorite Recipes Screen', () => {
    it('check all buttons', async () => {
      await renderWithRouterAndContext();
      redirectToFavoriteRecipeScreen();

      const filterByAll = getByTestId('filter-by-all-btn');
      userEvent.click(filterByAll);

      const filterByFood = getByTestId('filter-by-food-btn');
      userEvent.click(filterByFood);

      const filterByDrink = getByTestId('filter-by-drink-btn');
      userEvent.click(filterByDrink);
    });
  });
});
