import { screen } from '@testing-library/dom';
import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import meals from './helper/mocks/api/meals';
import getTest from './helper/mocks/getTestInfo';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';

const { queryByTestId, getByTestId } = screen;
const {
  headerRenderTests,
  footerRenderTests,
  redirectToProfileScreen,
} = getTest();
const { itDoesntRenderSearchIcon } = headerRenderTests();
const { itDoesntRenderFooter } = footerRenderTests();

const mockFetch = () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    status: 200,
    ok: true,
    json: () => Promise.resolve({ meals }),
  }));
};

describe('RecipesDone screen', () => {
  beforeAll(mockFetch);
  beforeEach(cleanup);

  describe('Check Header and Footer components', () => {
    it('doesnt render the Header and Footer on the RecipesDone screen', async () => {
      await renderWithRouterAndContext();

      redirectToProfileScreen(getByTestId, userEvent);

      const buttonRecipesDone = getByTestId('profile-done-btn');
      userEvent.click(buttonRecipesDone);

      itDoesntRenderSearchIcon(queryByTestId, getByTestId);
      itDoesntRenderFooter(queryByTestId);
    });
  });

  describe('Recipes Done Page tests', () => {
    it('tests the buttons on Recipes Done page', async () => {
      await renderWithRouterAndContext();

      redirectToProfileScreen(getByTestId, userEvent);

      const buttonRecipesDone = getByTestId('profile-done-btn');
      userEvent.click(buttonRecipesDone);

      const buttonAll = getByTestId('filter-by-all-btn');
      const buttonFoods = getByTestId('filter-by-food-btn');
      const buttonDrinks = getByTestId('filter-by-drink-btn');

      userEvent.click(buttonAll);
      userEvent.click(buttonFoods);
      userEvent.click(buttonDrinks);

      // const buttonProfilePage = getByTestId('profile-top-btn');
      // userEvent.click(buttonProfilePage);

      // const buttonFoodMainPage = getByTestId('food-bottom-btn');
      // userEvent.click(buttonFoodMainPage);
      // expect(window.location.pathname).toBe('/comidas');

      // expect(global.fetch).toHaveBeenCalled();

      // const corbaFood = await screen.findByText('Corba');
      // userEvent.click(corbaFood);
    });
  });
});
