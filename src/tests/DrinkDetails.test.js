import userEvent from '@testing-library/user-event';
import getTest from './helper/mocks/getTestInfo';
import renderWithRCA from './helper/renders/renderWithRouterAndContextAPI';

const { headerRenderTests, footerRenderTests, doTheLoginProcess } = getTest();
const { itDoesntRenderHeader } = headerRenderTests();
const { itDoesntRenderFooter } = footerRenderTests();

describe('DrinkDetails screen', () => {
  describe('Check Header and Footer components', () => {
    it('doesnt render the Header and Footer on the DrinkDetails screen', () => {
      const { queryByTestId } = renderWithRCA();
      itDoesntRenderHeader(queryByTestId);
      itDoesntRenderFooter(queryByTestId);
    });
  });

  describe('FoodDetails Screen', () => {
    it('tests lists', async () => {
      const { getByTestId, findByTestId, history } = renderWithRCA();
      doTheLoginProcess(getByTestId, userEvent);

      const buttonToDrink = getByTestId('drinks-bottom-btn');
      userEvent.click(buttonToDrink);

      userEvent.click(await findByTestId('0-recipe-card'));
      expect(history.location.pathname).toBe('/bebidas/15997');

      const ingredientList = await findByTestId(
        '1-ingredient-name-and-measure',
      );
      expect(ingredientList).toHaveTextContent('Ginger ale - undefined');
    });

    it('tests button favorite', async () => {
      const { getByTestId, findByTestId, history } = renderWithRCA();
      doTheLoginProcess(getByTestId, userEvent);

      const buttonToDrink = getByTestId('drinks-bottom-btn');
      userEvent.click(buttonToDrink);

      userEvent.click(await findByTestId('0-recipe-card'));
      expect(history.location.pathname).toBe('/bebidas/15997');

      const buttonStartRecipe = await findByTestId('start-recipe-btn');
      userEvent.click(buttonStartRecipe);

      const buttonFavorite = await findByTestId('favorite-btn');
      userEvent.click(buttonFavorite.parentElement);
    });
  });
});
