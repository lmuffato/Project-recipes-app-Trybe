import React from 'react';

import DrinkProgress from '../pages/DrinkProgress';
import renderWithRouterAndContext from '../helper/tests/renderWithRouterAndContext';
import getTest from '../helper/tests/getTestInfo';

const { headerRenderTests, footerRenderTests } = getTest(
  '/bebidas/:id/in-progress',
);
const { itDoesntRenderHeader } = headerRenderTests();
const { itDoesntRenderFooter } = footerRenderTests();

describe('DrinkProgress screen', () => {
  describe('Check Header and Footer components', () => {
    it('doesnt render the Header and Footer on the DrinkProgress screen', () => {
      const { queryByTestId } = renderWithRouterAndContext(<DrinkProgress />);
      itDoesntRenderHeader(queryByTestId);
      itDoesntRenderFooter(queryByTestId);
    });
  });
});
