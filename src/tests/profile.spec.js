import React from 'react';
import renderWithRouter from './renderWithRouter';
import Profile from '../pages/Profile';

describe('Profile screen', () => {
  it('Check if rendered the Profile page', () => {
    const { getByText } = renderWithRouter(<Profile />);
    const profileTitle = getByText('Perfil');

    expect(profileTitle).toBeInTheDocument();
  });

  it('Check if the email appears', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'test@test.com' }));
    const { getByTestId } = renderWithRouter(<Profile />);
    const email = getByTestId('profile-email');

    expect(email).toBeInTheDocument();
    expect(email.textContent).toBe('test@test.com');
  });

  test('Check if there are 3 buttons', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const profileDoneBtn = getByTestId('profile-done-btn');
    const profileFavoriteBtn = getByTestId('profile-favorite-btn');
    const profileLogoutBtn = getByTestId('profile-logout-btn');

    expect(profileDoneBtn).toBeInTheDocument();
    expect(profileFavoriteBtn).toBeInTheDocument();
    expect(profileLogoutBtn).toBeInTheDocument();
  });
});
