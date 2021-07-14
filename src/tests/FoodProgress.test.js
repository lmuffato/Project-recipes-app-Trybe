import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';
import renderWithRCA from './helper/renders/renderWithRouterAndContextAPI';

const { queryByTestId } = screen;
const { headerRenderTests, footerRenderTests, doTheLoginProcess } = getTest();
const { itDoesntRenderHeader } = headerRenderTests();
const { itDoesntRenderFooter } = footerRenderTests();

describe('FoodProgress screen', () => {
  describe('Check Header and Footer components', () => {
    it('doesnt render the Header and Footer on the FoodProgress screen', async () => {
      await renderWithRouterAndContext();
      itDoesntRenderHeader(queryByTestId);
      itDoesntRenderFooter(queryByTestId);
    });
  });

  describe('Testando', () => {
    it('tessssstando', async () => {
      const { getByTestId, findByText, history } = renderWithRCA();

      expect(history.location.pathname).toBe('/');

      doTheLoginProcess(getByTestId, userEvent);
      expect(history.location.pathname).toBe('/comidas');
      expect(await findByText(/corba/i));
    });
  });
});
