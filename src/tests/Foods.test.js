import React from 'react';
import userEvent from '@testing-library/user-event';
import Foods from '../pages/Foods';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';
import { foodDataApi } from './helper/mocks/data';

const {
  renderEmptyValue,
  headerRenderTests,
  footerRenderTests,
  recipeCardsTest,
} = getTest('/comidas');

describe('Foods Screen', () => {
  describe('Check Header and Footer components', () => {
    it('does Header and Footer tests', () => {
      const { getByTestId } = renderWithRouterAndContext(
        <Foods />,
        renderEmptyValue,
      );

      headerRenderTests().itRenderAllIcons(getByTestId);
      footerRenderTests().itRenderAllIcons(getByTestId);
    });
  });

  describe('API tests', () => {
    it('checks API', async () => {
      const { getByRole } = renderWithRouterAndContext(
        <Foods />,
        renderEmptyValue,
      );

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

  describe('User search tests', () => {
    it('cheks initial foods', async () => {
      const { findByTestId } = renderWithRouterAndContext(
        <Foods />,
        renderEmptyValue,
      );

      foodDataApi.firstTwelve.forEach((recipe) => {
        recipeCardsTest(recipe, findByTestId);
      });
    });
  });
});
