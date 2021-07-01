import React from 'react';

import FoodExplore from '../pages/FoodExplore';
import renderWithRouterAndContext from '../helper/tests/renderWithRouterAndContext';
import getTest from '../helper/tests/getTestInfo';

const {
  RecipeContext,
  renderEmptyValue,
  headerRenderTests,
  footerRenderTests,
} = getTest('/explorar/comidas');

const { itDoesntRenderSearchIcon } = headerRenderTests();

describe('FoodExplore Screen', () => {
  describe('Check Header and Footer components', () => {
    it('does Header and Footer tests', () => {
      const { getByTestId, queryByTestId } = renderWithRouterAndContext(
        <FoodExplore />,
        RecipeContext,
        renderEmptyValue,
      );

      itDoesntRenderSearchIcon(queryByTestId, getByTestId);
      footerRenderTests().itRenderAllIcons(getByTestId);
    });
  });
});
