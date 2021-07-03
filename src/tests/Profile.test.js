import React from 'react';
// import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouter from '../helper/renderWithRouter';

const testids = {
  profileEmail: 'profile-email',
  profileDoneButton: 'profile-done-btn',
  profileFavoriteButton: 'profile-favorite-btn',
  profileLogoutButton: 'profile-logout-btn',
};

describe('Profile Page Tests', () => {
  it('Render User Email', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const userEmail = getByTestId(profileEmail);
    expect(userEmail).toBeInTheDocument();
  });

  it('Render "Recipes Done Button"', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
  });

  it('Render "Favorite Recipes Button"', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
  });

  it('Render "Recipes Done Button"', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
  });
});
