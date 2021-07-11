import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';

const { getByTestId, queryByTestId } = screen;

const {
  doTheLoginProcess,
  headerRenderTests,
  footerRenderTests,
} = getTest();

const { itDoesntRenderSearchIcon } = headerRenderTests();

const redirectToExploreScreen = () => {
  doTheLoginProcess(getByTestId, userEvent);

  const exploreBtnIcon = getByTestId('explore-bottom-btn');
  userEvent.click(exploreBtnIcon);
};

describe('Explore Screen', () => {
  describe('Check Header and Footer components', () => {
    it('does Header and Footer tests', async () => {
      await renderWithRouterAndContext();

      redirectToExploreScreen();

      itDoesntRenderSearchIcon(queryByTestId, getByTestId);
      footerRenderTests().itRenderAllIcons(getByTestId);
    });
  });

  describe('Check elements on Explore Page', () => {
    it('check Explore Foods button', async () => {
      await renderWithRouterAndContext();
      redirectToExploreScreen();

      const exploreFoodsButton = getByTestId('explore-food');
      expect(exploreFoodsButton).toHaveTextContent('Explorar Comidas');
      userEvent.click(exploreFoodsButton);
    });
    it('check Explore Drinks button', async () => {
      await renderWithRouterAndContext();
      redirectToExploreScreen();

      const exploreDrinksButton = getByTestId('explore-drinks');
      expect(exploreDrinksButton).toHaveTextContent('Explorar Bebidas');

      userEvent.click(exploreDrinksButton);
    });
  });
});
