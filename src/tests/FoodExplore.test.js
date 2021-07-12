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

describe('FoodExplore Screen', () => {
  describe('Check Header and Footer components', () => {
    it('does Header and Footer tests', async () => {
      await renderWithRouterAndContext();

      redirectToExploreTypeScreen(getByTestId, userEvent, 'food');

      itDoesntRenderSearchIcon(queryByTestId, getByTestId);
      footerRenderTests().itRenderAllIcons(getByTestId);
    });
  });

  describe('Check Explore Food Page elements', () => {
    it('checks explore by ingredient button', async () => {
      await renderWithRouterAndContext();

      redirectToExploreTypeScreen(getByTestId, userEvent, 'food');

      const byIngredientsButton = getByTestId('explore-by-ingredient');
      userEvent.click(byIngredientsButton);
    });

    it('checks explore by area button', async () => {
      await renderWithRouterAndContext();

      redirectToExploreTypeScreen(getByTestId, userEvent, 'food');

      const byAreaButton = getByTestId('explore-by-area');
      userEvent.click(byAreaButton);
    });

    it('checks explore by surprime me button', async () => {
      await renderWithRouterAndContext();

      redirectToExploreTypeScreen(getByTestId, userEvent, 'food');

      const surpriseMeButton = getByTestId('explore-surprise');
      userEvent.click(surpriseMeButton);
    });
  });
});
