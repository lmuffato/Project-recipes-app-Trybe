import React from 'react';

import DrinkExplore from '../pages/DrinkExplore';
import renderWithRouterAndContext from '../helper/tests/renderWithRouterAndContext';
import getTest from '../helper/tests/getTestInfo';

const {
  RecipeContext,
  renderEmptyValue,
  headerRenderTests,
  footerRenderTests,
} = getTest('/explorar/bebidas');

const { itDoesntRenderSearchIcon } = headerRenderTests();

describe('DrinkExplore Screen', () => {
  describe('Check Header and Footer components', () => {
    it('does Header and Footer tests', () => {
      const { getByTestId, queryByTestId } = renderWithRouterAndContext(
        <DrinkExplore />,
        RecipeContext,
        renderEmptyValue,
      );

      itDoesntRenderSearchIcon(queryByTestId, getByTestId);
      footerRenderTests().itRenderAllIcons(getByTestId);
    });
  });
});
