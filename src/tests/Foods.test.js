import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';
import { foodDataApi } from './helper/mocks/data';

const {
  headerRenderTests,
  footerRenderTests,
} = getTest('/comidas');

const { getByTestId } = screen;

describe('Foods Screen', () => {
  describe('Check Header and Footer components', () => {
    it('does Header and Footer tests', async () => {
      await renderWithRouterAndContext();

      headerRenderTests().itRenderAllIcons(getByTestId);
      footerRenderTests().itRenderAllIcons(getByTestId);
    });
  });

  describe('API tests', () => {
    it('checks API', async () => {
      await renderWithRouterAndContext();

      const apiResponse = Promise.resolve({
        json: () => Promise.resolve(foodDataApi.corba),
        ok: true,
      });

      const mockRecipeApi = jest
        .spyOn(global, 'fetch')
        .mockImplementation(() => apiResponse);

      const searchIcon = getByRole('img', { name: /search/i });
      userEvent.click(searchIcon);

      const inputSearch = getByRole('textbox');
      const labelRadioNome = getByRole('radio', { name: /nome/i });
      const buttonSearch = getByRole('button', { name: /buscar/i });

      userEvent.type(inputSearch, 'Corba');
      userEvent.click(labelRadioNome);
      userEvent.click(buttonSearch);

      expect(mockRecipeApi).toBeCalled();
    });
  });
});
