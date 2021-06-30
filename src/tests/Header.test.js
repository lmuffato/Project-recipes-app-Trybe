import React from 'react';
import Header from '../components/Header';
import renderWithRouter from '../helper/renderWithRouter';

describe('Requirement 9', () => {
  const { getByTestId } = renderWithRouter(<Header />);

  it('renders profile-top-btn', () => {
    const profileTop = getByTestId('profile-top-btn');
    expect(profileTop).toBeInTheDocument();
  });

  it('renders page-title', () => {
    const pageTitle = getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
  });

  it('renders search-top-btn', () => {
    const searchTop = getByTestId('search-top-btn');
    expect(searchTop).toBeInTheDocument();
  });
});
