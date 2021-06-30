import React from 'react';
import Foods from '../pages/Foods';
import renderWithRouter from '../helper/renderWithRouter';

describe('Requirement 9', () => {
  it('renders profile-top-btn', () => {
    const { getByTestId } = renderWithRouter(<Foods />);
    const profileTop = getByTestId('profile-top-btn');
    expect(profileTop).toBeInTheDocument();
  });

  it('renders page-title', () => {
    const { getByTestId } = renderWithRouter(<Foods />);
    const pageTitle = getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
  });

  it('renders search-top-btn', () => {
    const { getByTestId } = renderWithRouter(<Foods />);
    const searchTop = getByTestId('search-top-btn');
    expect(searchTop).toBeInTheDocument();
  });
});
