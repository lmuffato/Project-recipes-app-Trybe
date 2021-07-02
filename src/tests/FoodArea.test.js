import React from 'react';

import FoodArea from '../pages/FoodArea';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';

const {
  RecipeContext,
  renderEmptyValue,
  headerRenderTests,
  footerRenderTests,
} = getTest('/explorar/comidas/area');

describe('FoodArea Screen', () => {
  describe('Check Header and Footer components', () => {
    it('does Header and Footer tests', () => {
      const { getByTestId } = renderWithRouterAndContext(
        <FoodArea />,
        RecipeContext,
        renderEmptyValue,
      );

      headerRenderTests().itRenderAllIcons(getByTestId);
      footerRenderTests().itRenderAllIcons(getByTestId);
    });
  });
});
