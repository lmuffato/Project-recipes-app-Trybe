import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';
import renderWithRCA from './helper/renders/renderWithRouterAndContextAPI';

const { queryByTestId, getByTestId } = screen;

const {
  headerRenderTests,
  footerRenderTests,
  redirectToExploreTypeScreen,
} = getTest();

const { itDoesntRenderSearchIcon } = headerRenderTests();

const redirectToExploreDrinkIngredientScreen = () => {
  redirectToExploreTypeScreen(getByTestId, userEvent, 'food');

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

  describe('Check the elements on FoodIngredientExplore Screen', () => {
    it('tests the RecipeIngredientCard', async () => {
      const { history, findByTestId } = renderWithRCA();
      history.push('/explorar/comidas/ingredientes');
      userEvent.click(await findByTestId('0-ingredient-card'));
      expect(history.location.pathname).toBe('/comidas');
      expect(await findByTestId('0-card-name')).toHaveTextContent(
        'Brown Stew Chicken',
      );
    });
  });
});
