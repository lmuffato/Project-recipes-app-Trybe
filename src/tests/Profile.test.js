import React from 'react';
import Profile from '../pages/Profile';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';

const { renderEmptyValue, headerRenderTests, footerRenderTests } = getTest('/profile');

const { itDoesntRenderSearchIcon } = headerRenderTests();

describe('Profile Screen', () => {
  describe('Check Header and Footer components', () => {
    it('does Header and Footer tests', () => {
      const { getByTestId, queryByTestId } = renderWithRouterAndContext(
        <Profile />,
        renderEmptyValue,
      );

      itDoesntRenderSearchIcon(queryByTestId, getByTestId);
      footerRenderTests().itRenderAllIcons(getByTestId);
    });
  });

  describe('Profile Page Tests', () => {
    it('Render User Email', () => {
      const { getByTestId } = renderWithRouterAndContext(
        <Profile />,
        renderEmptyValue,
      );
      const userEmail = getByTestId(profileEmail);
      expect(userEmail).toBeInTheDocument();
    });

    it('Render "Recipes Done Button"', () => {
      const { getByTestId } = renderWithRouterAndContext(
        <Profile />,
        renderEmptyValue,
      );
    });

    it('Render "Favorite Recipes Button"', () => {
      const { getByTestId } = renderWithRouterAndContext(
        <Profile />,
        renderEmptyValue,
      );
    });

    it('Render "Recipes Done Button"', () => {
      const { getByTestId } = renderWithRouterAndContext(
        <Profile />,
        renderEmptyValue,
      );
    });
  });
});
