import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';

const { queryByTestId, getByTestId } = screen;

const {
  headerRenderTests,
  footerRenderTests,
  redirectToExploreTypeScreen,
} = getTest();

const { itDoesntRenderSearchIcon } = headerRenderTests();

const redirectToExploreDrinkIngredientScreen = () => {
  redirectToExploreTypeScreen(getByTestId, userEvent, 'drinks');

  const exploreByIngredientsButton = getByTestId('explore-by-ingredient');
  userEvent.click(exploreByIngredientsButton);
};

describe('DrinkExplore Screen', () => {
  describe('Check Header and Footer components', () => {
    it('does Header and Footer tests', async () => {
      await renderWithRouterAndContext();

      redirectToExploreDrinkIngredientScreen();

      itDoesntRenderSearchIcon(queryByTestId, getByTestId);
      footerRenderTests().itRenderAllIcons(getByTestId);
    });
  });
});
