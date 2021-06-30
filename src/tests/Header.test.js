import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

const PROFILE_TOP_BUTTON = 'profile-top-btn';
// const PAGE_TITLE = 'page-title';
const SEARCH_TOP_BUTTON = 'search-top-btn';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Login Page', route);

  return render(ui, { wrapper: BrowserRouter });
};

describe('tests `header` component ', () => {
  it('1-contains a profile button', () => {
    renderWithRouter(<Header />);
    const profileBttn = screen.getByTestId(PROFILE_TOP_BUTTON);
    expect(profileBttn).toBeInTheDocument();
  });

  // it('1-contains a page title', () => {
  //   renderWithRouter(<Header />);
  //   const pageTitle = screen.getByTestId(PAGE_TITLE);
  //   expect(pageTitle).toBeInTheDocument();
  // });

  it('1-contains a profile button', () => {
    renderWithRouter(<Header />);
    const searchBttn = screen.getByTestId(SEARCH_TOP_BUTTON);
    expect(searchBttn).toBeInTheDocument();
  });
});
