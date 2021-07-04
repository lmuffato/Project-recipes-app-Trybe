import React from 'react';
import userEvent from '@testing-library/user-event';
import Drinks from '../pages/Drinks';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';
import { drinkDataApi } from './helper/mocks/data';

const {
  renderEmptyValue,
  headerRenderTests,
  footerRenderTests,
  recipeCardsTest,
} = getTest('/bebidas');

describe('Drinks Screen', () => {
  describe('Check Header and Footer components', () => {
    it('does Header and Footer tests', () => {
      const { getByTestId } = renderWithRouterAndContext(
        <Drinks />,
        renderEmptyValue,
      );

      headerRenderTests().itRenderAllIcons(getByTestId);
      footerRenderTests().itRenderAllIcons(getByTestId);
    });
  });

  describe('API tests', () => {
    describe('API tests', () => {
      beforeEach(() => {
        fetch.mockClear();
      });

      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(drinkDataApi.darkCaipirinha),
      }));

      it('checks API', async () => {
        const { getByRole } = renderWithRouterAndContext(
          <Drinks />,
          renderEmptyValue,
        );

        const searchIcon = getByRole('img', { name: /search/i });
        userEvent.click(searchIcon);

        const inputSearch = getByRole('textbox');
        const labelRadioNome = getByRole('radio', { name: /nome/i });
        const buttonSearch = getByRole('button', { name: /buscar/i });

        userEvent.type(inputSearch, 'Dark Caipirinha');
        userEvent.click(labelRadioNome);
        userEvent.click(buttonSearch);

        expect(global.fetch).toBeCalled();
      });

      it('checks API when it doesnt return anything', () => {
        const { getByRole } = renderWithRouterAndContext(
          <Drinks />,
          renderEmptyValue,
        );

        const searchIcon = getByRole('img', { name: /search/i });
        userEvent.click(searchIcon);

        const inputSearch = getByRole('textbox');
        const labelPrimeiraLetra = getByRole('radio', { name: /primeira letra/i });
        const buttonSearch = getByRole('button', { name: /buscar/i });

        userEvent.type(inputSearch, '>');
        userEvent.click(labelPrimeiraLetra);
        userEvent.click(buttonSearch);

        expect(global.fetch).toBeCalled();
      });
    });
  });

  describe('User search tests', () => {
    it('cheks initial foods', async () => {
      const { findByTestId } = renderWithRouterAndContext(
        <Drinks />,
        renderEmptyValue,
      );

      drinkDataApi.firstTwelve.forEach((recipe) => {
        recipeCardsTest(recipe, findByTestId);
      });
    });
  });
});
