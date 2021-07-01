import React from 'react';

import DrinkDetails from '../pages/DrinkDetails';
import renderWithRouterAndContext from '../helper/tests/renderWithRouterAndContext';
import getTest from '../helper/tests/getTestInfo';

const { headerRenderTests, footerRenderTests } = getTest('/bebidas/:id');
const { itDoesntRenderHeader } = headerRenderTests();
const { itDoesntRenderFooter } = footerRenderTests();

describe('DrinkDetails screen', () => {
  describe('Check Header and Footer components', () => {
    it('doesnt render the Header and Footer on the DrinkDetails screen', () => {
      const { queryByTestId } = renderWithRouterAndContext(<DrinkDetails />);
      itDoesntRenderHeader(queryByTestId);
      itDoesntRenderFooter(queryByTestId);
    });
  });
});
