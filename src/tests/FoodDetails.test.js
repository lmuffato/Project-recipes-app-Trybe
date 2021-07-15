import userEvent from '@testing-library/user-event';
import getTest from './helper/mocks/getTestInfo';
import renderWithRCA from './helper/renders/renderWithRouterAndContextAPI';

const { headerRenderTests, footerRenderTests, doTheLoginProcess } = getTest();
const { itDoesntRenderHeader } = headerRenderTests();
const { itDoesntRenderFooter } = footerRenderTests();

describe('FoodDetails screen', () => {
  describe('Check Header and Footer components', () => {
    it('doesnt render the Header and Footer on the FoodDetails screen', () => {
      const { queryByTestId } = renderWithRCA();
      itDoesntRenderHeader(queryByTestId);
      itDoesntRenderFooter(queryByTestId);
    });
  });

  describe('FoodDetails Screen', () => {
    it('tests lists', async () => {
      const { getByTestId, findByTestId, history } = renderWithRCA();
      doTheLoginProcess(getByTestId, userEvent);

      userEvent.click(await findByTestId('0-recipe-card'));
      expect(history.location.pathname).toBe('/comidas/52977');

      const ingredientList = await findByTestId(
        '1-ingredient-name-and-measure',
      );
      expect(ingredientList).toHaveTextContent('Onion - 1 large');
    });

    it('tests button favorite', async () => {
      const { getByTestId, findByTestId, history } = renderWithRCA();
      doTheLoginProcess(getByTestId, userEvent);

      userEvent.click(await findByTestId('0-recipe-card'));
      expect(history.location.pathname).toBe('/comidas/52977');

      const buttonStartRecipe = await findByTestId('start-recipe-btn');
      userEvent.click(buttonStartRecipe);

      const buttonFavorite = await findByTestId('favorite-btn');
      userEvent.click(buttonFavorite.parentElement);
    });
  });
});
