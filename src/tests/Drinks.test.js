import React from 'react';
import userEvent from '@testing-library/user-event';
import Drinks from '../pages/Drinks';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';
import { drinkDataApi } from './helper/mocks/data';

const {
  RecipeContext,
  renderEmptyValue,
  headerRenderTests,
  footerRenderTests,
} = getTest('/bebidas');

describe('Drinks Screen', () => {
  describe('Check Header and Footer components', () => {
    it('does Header and Footer tests', () => {
      const { getByTestId } = renderWithRouterAndContext(
        <Drinks />,
        RecipeContext,
        renderEmptyValue,
      );

      headerRenderTests().itRenderAllIcons(getByTestId);
      footerRenderTests().itRenderAllIcons(getByTestId);
    });
  });

  describe('API tests', () => {
    describe('API tests', () => {
      it('checks API', async () => {
        const { getByRole } = renderWithRouterAndContext(
          <Drinks />,
          RecipeContext,
          renderEmptyValue,
        );

        const apiResponse = Promise.resolve({
          json: () => Promise.resolve(drinkDataApi.darkCaipirinha),
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

        userEvent.type(inputSearch, 'Dark Caipirinha');
        userEvent.click(labelRadioNome);
        userEvent.click(buttonSearch);

        expect(mockRecipeApi).toBeCalled();
      });
    });
  });
});
