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

      redirectToExploreTypeScreen(getByTestId, userEvent, 'drinks');

      itDoesntRenderSearchIcon(queryByTestId, getByTestId);
      footerRenderTests().itRenderAllIcons(getByTestId);
    });
  });

  describe('Check Explore Food Page elements', () => {
    it('checks explore by ingredient button', async () => {
      await renderWithRouterAndContext();

      redirectToExploreTypeScreen(getByTestId, userEvent, 'drinks');

      const byIngredientsButton = getByTestId('explore-by-ingredient');
      userEvent.click(byIngredientsButton);
    });

    it('checks explore by surprime me button', async () => {
      await renderWithRouterAndContext();

      redirectToExploreTypeScreen(getByTestId, userEvent, 'drinks');

      const surpriseMeButton = getByTestId('explore-surprise');
      userEvent.click(surpriseMeButton);
    });
  });
});
