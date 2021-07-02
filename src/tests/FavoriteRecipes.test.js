import React from 'react';

import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/getTestInfo';

const {
  RecipeContext,
  renderEmptyValue,
  headerRenderTests,
  footerRenderTests,
} = getTest('/receitas-favoritas');
const { itDoesntRenderSearchIcon } = headerRenderTests();
const { itDoesntRenderFooter } = footerRenderTests();

describe('FavoriteRecipes screen', () => {
  describe('Check Header and Footer components', () => {
    it('doesnt render the Header and Footer on the FavoriteRecipes screen', () => {
      const { queryByTestId, getByTestId } = renderWithRouterAndContext(
        <FavoriteRecipes />,
        RecipeContext,
        renderEmptyValue,
      );
      itDoesntRenderSearchIcon(queryByTestId, getByTestId);
      itDoesntRenderFooter(queryByTestId);
    });
  });
});
