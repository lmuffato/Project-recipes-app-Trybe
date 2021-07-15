import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import renderWithRCA from './helper/renders/renderWithRouterAndContextAPI';
import getTest from './helper/mocks/getTestInfo';
import { drinkDataApi } from './helper/mocks/data';

const { queryByTestId } = screen;
const { headerRenderTests, footerRenderTests, doTheLoginProcess } = getTest(
  '/bebidas/:id/in-progress',
);
const { itDoesntRenderHeader } = headerRenderTests();
const { itDoesntRenderFooter } = footerRenderTests();

const redirectToDrinkProgress = async (history, getByTestId, findByTestId) => {
  doTheLoginProcess(getByTestId, userEvent);

  userEvent.click(getByTestId('drinks-bottom-btn'));

  userEvent.click(await findByTestId('0-recipe-card'));
  expect(history.location.pathname).toBe('/bebidas/15997');

  userEvent.click(getByTestId('start-recipe-btn'));
  expect(history.location.pathname).toBe('/bebidas/15997/in-progress');
};

describe('DrinkProgress screen', () => {
  describe('Check Header and Footer components', () => {
    it('doesnt render the Header and Footer on the DrinkProgress screen', async () => {
      await renderWithRouterAndContext();
      itDoesntRenderHeader(queryByTestId);
      itDoesntRenderFooter(queryByTestId);
    });
  });

  describe('Check elements on Drink Progress Screen', () => {
    it('tests lists', () => {
      const { getByTestId, findByTestId, history } = renderWithRCA();
      redirectToDrinkProgress(history, getByTestId, findByTestId);

      drinkDataApi.ingredientsDrink.forEach(async (ingredient, index) => {
        const ingredientList = await findByTestId(`${index}-ingredient-step`);
        expect(ingredientList).toHaveTextContent(ingredient);
        expect(ingredientList.firstChild).toHaveAttribute('type', 'checkbox');
        userEvent.click(ingredientList.firstChild);
        expect(ingredientList).toHaveStyle('text-decoration: line-through');
      });
    });
  });
});
