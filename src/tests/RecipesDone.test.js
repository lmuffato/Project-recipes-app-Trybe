import React from 'react';

import RecipesDone from '../pages/RecipesDone';
import renderWithRouterAndContext from '../helper/tests/renderWithRouterAndContext';
import getTest from '../helper/tests/getTestInfo';

const {
  RecipeContext,
  renderEmptyValue,
  headerRenderTests,
  footerRenderTests,
} = getTest('/receitas-feitas');
const { itDoesntRenderSearchIcon } = headerRenderTests();
const { itDoesntRenderFooter } = footerRenderTests();

describe('RecipesDone screen', () => {
  describe('Check Header and Footer components', () => {
    it('doesnt render the Header and Footer on the RecipesDone screen', () => {
      const { queryByTestId, getByTestId } = renderWithRouterAndContext(
        <RecipesDone />,
        RecipeContext,
        renderEmptyValue,
      );
      itDoesntRenderSearchIcon(queryByTestId, getByTestId);
      itDoesntRenderFooter(queryByTestId);
    });
  });
});
