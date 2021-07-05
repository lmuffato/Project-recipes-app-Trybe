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
    beforeEach(() => {
      fetch.mockClear();
    });

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(foodDataApi.corba),
    }));

    it('checks API', async () => {
      const { getByRole } = renderWithRouterAndContext(
        <Foods />,
        renderEmptyValue,
      );

      const searchIcon = getByRole('img', { name: /search/i });
      userEvent.click(searchIcon);

      const inputSearch = getByRole('textbox');
      const labelRadioNome = getByRole('radio', { name: /ingrediente/i });
      const buttonSearch = getByRole('button', { name: /buscar/i });

      userEvent.type(inputSearch, 'Corba');
      userEvent.click(labelRadioNome);
      userEvent.click(buttonSearch);

      expect(global.fetch).toBeCalled();
    });

    it('checks API when it doesnt return anything', () => {
      const { getByRole } = renderWithRouterAndContext(
        <Foods />,
        renderEmptyValue,
      );

      const searchIcon = getByRole('img', { name: /search/i });
      userEvent.click(searchIcon);

      const inputSearch = getByRole('textbox');
      const labelPrimeiraLetra = getByRole('radio', {
        name: /primeira letra/i,
      });
      const buttonSearch = getByRole('button', { name: /buscar/i });

      userEvent.type(inputSearch, '>');
      userEvent.click(labelPrimeiraLetra);
      userEvent.click(buttonSearch);

      expect(global.fetch).toBeCalled();
    });
  });

  describe('User search tests', () => {
    it('cheks initial foods', async () => {
      const { findByTestId, history } = renderWithRouterAndContext(
        <Foods />,
        renderEmptyValue,
      );

      expect(history.location.pathname).toBe('/comidas');

      foodDataApi.firstTwelve.forEach((recipe) => {
        recipeCardsTest(recipe, findByTestId);
      });
    });
  });
});
