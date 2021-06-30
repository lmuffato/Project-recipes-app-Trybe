import React from 'react';

import { fireEvent } from '@testing-library/react';

import Foods from '../pages/Foods';

import renderWithRouter from '../helper/renderWithRouter';

const testids = {
  profileTopButton: 'profile-top-btn',
  pageTitle: 'page-title',
  searchTopButton: 'search-top-btn',
};

describe('Requirement 9', () => {
  it('renders profile-top-btn', () => {
    const { getByTestId } = renderWithRouter(<Foods />);
    const profileTop = getByTestId(testids.profileTopButton);
    expect(profileTop).toBeInTheDocument();
  });

  it('renders page-title', () => {
    const { getByTestId } = renderWithRouter(<Foods />);
    const pageTitle = getByTestId(testids.pageTitle);
    expect(pageTitle).toBeInTheDocument();
  });

  it('renders search-top-btn', () => {
    const { getByTestId } = renderWithRouter(<Foods />);
    const searchTop = getByTestId(testids.searchTopButton);
    expect(searchTop).toBeInTheDocument();
  });
});

describe('Requirement 11', () => {
  it('changes to the Profile Page', () => {
    const { getByRole, history } = renderWithRouter(<Foods />);

    const profilePageButton = getByRole('button', {
      name: /profile avatar/i,
    });
    fireEvent.click(profilePageButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });
});

describe('Requirement 12', () => {
  it('shows and hides the seach input', () => {
    const { queryByRole, getByRole } = renderWithRouter(<Foods />);

    const searchButton = getByRole('img', {
      name: /search/i,
    });

    expect(queryByRole('textbox')).toBeNull();
    fireEvent.click(searchButton);
    expect(queryByRole('textbox')).toBeInTheDocument();
  });
});
