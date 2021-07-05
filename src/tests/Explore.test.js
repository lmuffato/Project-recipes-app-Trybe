import React from 'react';

import Explore from '../pages/Explore';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';

const {
  renderEmptyValue,
  headerRenderTests,
  footerRenderTests,
} = getTest('/explorar');

const { itDoesntRenderSearchIcon } = headerRenderTests();

describe('Explore Screen', () => {
  describe('Check Header and Footer components', () => {
    it('does Header and Footer tests', () => {
      const { getByTestId, queryByTestId } = renderWithRouterAndContext(
        <Explore />,
        renderEmptyValue,
      );

      itDoesntRenderSearchIcon(queryByTestId, getByTestId);
      footerRenderTests().itRenderAllIcons(getByTestId);
    });
  });
});
