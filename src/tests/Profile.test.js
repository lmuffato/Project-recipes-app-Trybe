import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Profile from '../pages/Profile';

const PROFILE_TITLE = 'page-title';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Login Page', route);

  return render(ui, { wrapper: BrowserRouter });
};

describe('tests `profile` page ', () => {
  it('1-contains a page title', () => {
    renderWithRouter(<Profile />);
    const profileTitle = screen.getByTestId(PROFILE_TITLE);
    expect(profileTitle).toBeInTheDocument();
  });
});
