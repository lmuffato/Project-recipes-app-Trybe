import React from 'react';

import FoodDetails from '../pages/FoodDetails';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/getTestInfo';

const { headerRenderTests, footerRenderTests } = getTest('/comidas/:id');
const { itDoesntRenderHeader } = headerRenderTests();
const { itDoesntRenderFooter } = footerRenderTests();

describe('FoodDetails screen', () => {
  describe('Check Header and Footer components', () => {
    it('doesnt render the Header and Footer on the FoodDetails screen', () => {
      const { queryByTestId } = renderWithRouterAndContext(<FoodDetails />);
      itDoesntRenderHeader(queryByTestId);
      itDoesntRenderFooter(queryByTestId);
    });
  });
});
