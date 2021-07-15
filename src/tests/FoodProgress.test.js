import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';
import renderWithRCA from './helper/renders/renderWithRouterAndContextAPI';
import { foodDataApi } from './helper/mocks/data';

const { queryByTestId } = screen;
const { headerRenderTests, footerRenderTests, doTheLoginProcess } = getTest();
const { itDoesntRenderHeader } = headerRenderTests();
const { itDoesntRenderFooter } = footerRenderTests();

const redirectToFoodProgress = async (history, getByTestId, findByTestId) => {
  doTheLoginProcess(getByTestId, userEvent);

  userEvent.click(await findByTestId('0-recipe-card'));
  expect(history.location.pathname).toBe('/comidas/52977');

  userEvent.click(getByTestId('start-recipe-btn'));
  expect(history.location.pathname).toBe('/comidas/52977/in-progress');
};

describe('FoodProgress screen', () => {
  describe('Check Header and Footer components', () => {
    it('doesnt render the Header and Footer on the FoodProgress screen', async () => {
      await renderWithRouterAndContext();
      itDoesntRenderHeader(queryByTestId);
      itDoesntRenderFooter(queryByTestId);
    });
  });

  describe('FoodProgress Screen', () => {
    it('tests lists', async () => {
      const { getByTestId, findByTestId, history } = renderWithRCA();

      redirectToFoodProgress(history, getByTestId, findByTestId);

      foodDataApi.ingredientsCorba.forEach(async (ingredient, index) => {
        const ingredientList = await findByTestId(`${index}-ingredient-step`);
        expect(ingredientList).toHaveTextContent(ingredient);
        expect(ingredientList.firstChild).toHaveAttribute('type', 'checkbox');
        userEvent.click(ingredientList.firstChild);
        expect(ingredientList).toHaveStyle('text-decoration: line-through');
      });
    });
  });
});

// it('tests checkboxes', async () => {
//   const { getByTestId, findByTestId, history } = renderWithRCA();

//   redirectToFoodProgress(history, getByTestId, findByTestId);
// });

// it('tests buttons', async () => {
//   const { getByTestId, findByTestId, history } = renderWithRCA();

//   redirectToFoodProgress(history, getByTestId, findByTestId);

//   // const buttonShare = getByTestId('share-btn');
//   // userEvent.click(buttonShare);
//   // expect(getByText(/link copiado!/i)).toBeInTheDocument();

//   // const buttonFavorite = getByRole('button', { name: /favorite/i });
//   // const imageFavorite = getByTestId('favorite-btn');
//   // expect(imageFavorite).toHaveAttribute('src', 'whiteHeartIcon.svg');
//   // userEvent.click(buttonFavorite);
//   // expect(imageFavorite).toHaveAttribute('src', 'blackHeartIcon.svg');
// });
