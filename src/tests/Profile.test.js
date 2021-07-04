import React from 'react';
// import userEvent from '@testing-library/user-event';
// import Login from '../pages/Login';
import Profile from '../pages/Profile';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import renderWithRouter from './helper/renders/renderWithRouter';
import getTest from './helper/mocks/getTestInfo';
import { RecipeContextProvider } from '../store/RecipeContext';

const { renderEmptyValue, headerRenderTests, footerRenderTests } = getTest('/profile');

const { itDoesntRenderSearchIcon } = headerRenderTests();

describe('Profile Screen', () => {
  describe('Check Header and Footer components', () => {
    it('does Header and Footer tests', () => {
      const { getByTestId, queryByTestId, history } = renderWithRouterAndContext(
        <Profile />,
        renderEmptyValue,
      );

      // LOGIN TEST
      // const emailInput = getByTestId('email-input');
      // const passwordInput = getByTestId('password-input');
      // const loginButton = getByTestId('login-submit-btn');

      // userEvent.type(emailInput, 'email@email.com');
      // userEvent.type(passwordInput, '123456789');
      // userEvent.click(loginButton);

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
  });
});
