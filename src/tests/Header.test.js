import React from 'react';

import { fireEvent } from '@testing-library/react';

import Drinks from '../pages/Drinks';
import DrinkExplore from '../pages/DrinkExplore';
import Explore from '../pages/Explore';
import Foods from '../pages/Foods';
import FoodExplore from '../pages/FoodExplore';
import Login from '../pages/Login';

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

describe('Requirement 10', () => {
  const itDoesntRenderHeader = (query) => {
    expect(query(testids.profileTopButton)).toBeNull();
    expect(query(testids.pageTitle)).toBeNull();
    expect(query(testids.searchTopButton)).toBeNull();
  };

  const itRenderAllIcons = (get) => {
    expect(get(testids.profileTopButton)).toBeInTheDocument();
    expect(get(testids.pageTitle)).toBeInTheDocument();
    expect(get(testids.searchTopButton)).toBeInTheDocument();
  };

  const itDoesntRenderSearchIcon = (query, get) => {
    expect(get(testids.profileTopButton)).toBeInTheDocument();
    expect(get(testids.pageTitle)).toBeInTheDocument();
    expect(query(testids.searchTopButton)).toBeNull();
  };

  it('doesnt render the Header on the Login screen', () => {
    const { queryByTestId } = renderWithRouter(<Login />);
    itDoesntRenderHeader(queryByTestId);
  });

  it('renders the correct icons on the Foods screen', () => {
    const { getByTestId } = renderWithRouter(<Foods />);
    itRenderAllIcons(getByTestId);
  });

  it('renders the correct icons on the Drinks screen', () => {
    const { getByTestId } = renderWithRouter(<Drinks />);
    itRenderAllIcons(getByTestId);
  });

  it('renders the correct icons on the Explore screen', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(<Explore />);
    itDoesntRenderSearchIcon(queryByTestId, getByTestId);
  });

  it('renders the correct icons on the FoodExplore screen', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(<FoodExplore />);
    itDoesntRenderSearchIcon(queryByTestId, getByTestId);
  });

  it('renders the correct icons on the DrinkExplore screen', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(<DrinkExplore />);
    itDoesntRenderSearchIcon(queryByTestId, getByTestId);
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
