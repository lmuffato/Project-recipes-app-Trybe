import React from 'react';

import Profile from '../pages/Profile';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/getTestInfo';

const {
  RecipeContext,
  renderEmptyValue,
  headerRenderTests,
  footerRenderTests,
} = getTest('/profile');

const { itDoesntRenderSearchIcon } = headerRenderTests();

describe('Profile Screen', () => {
  describe('Check Header and Footer components', () => {
    it('does Header and Footer tests', () => {
      const { getByTestId, queryByTestId } = renderWithRouterAndContext(
        <Profile />,
        RecipeContext,
        renderEmptyValue,
      );

      itDoesntRenderSearchIcon(queryByTestId, getByTestId);
      footerRenderTests().itRenderAllIcons(getByTestId);
    });
  });
});
