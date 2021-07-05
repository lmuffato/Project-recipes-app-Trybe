import { screen } from '@testing-library/dom';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';

const { queryByTestId, getByTestId } = screen;
const {
  headerRenderTests,
  footerRenderTests,
} = getTest('/receitas-feitas');
const { itDoesntRenderSearchIcon } = headerRenderTests();
const { itDoesntRenderFooter } = footerRenderTests();

describe('RecipesDone screen', () => {
  describe('Check Header and Footer components', () => {
    it('doesnt render the Header and Footer on the RecipesDone screen', async () => {
      await renderWithRouterAndContext();

      itDoesntRenderSearchIcon(queryByTestId, getByTestId);
      itDoesntRenderFooter(queryByTestId);
    });
  });
});
