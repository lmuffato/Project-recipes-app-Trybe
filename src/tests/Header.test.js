import React from 'react';

import userEvent from '@testing-library/user-event';

import Drinks from '../pages/Drinks';
import DrinkExplore from '../pages/DrinkExplore';
import DrinkIngredientExplore from '../pages/DrinkIngredientExplore';
import Explore from '../pages/Explore';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import FoodArea from '../pages/FoodArea';
import Foods from '../pages/Foods';
import FoodExplore from '../pages/FoodExplore';
import FoodIngredientExplore from '../pages/FoodIngredientExplore';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import RecipesDone from '../pages/RecipesDone';
// import FoodDetails from '../pages/FoodDetails';
// import DrinkDetails from '../pages/DrinkDetails';
// import FoodProgress from '../pages/FoodProgress';
// import DrinkProgress from '../pages/DrinkProgress';

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

  // it('doesnt render the Header on the FoodDetails screen', () => {
  //   const { queryByTestId } = renderWithRouter(<FoodDetails />);
  //   itDoesntRenderHeader(queryByTestId);
  // });

  // it('doesnt render the Header on the DrinkDetails screen', () => {
  //   const { queryByTestId } = renderWithRouter(<DrinkDetails />);
  //   itDoesntRenderHeader(queryByTestId);
  // });

  // it('doesnt render the Header on the FoodProgress screen', () => {
  //   const { queryByTestId } = renderWithRouter(<FoodProgress />);
  //   itDoesntRenderHeader(queryByTestId);
  // });

  // it('doesnt render the Header on the DrinkProgress screen', () => {
  //   const { queryByTestId } = renderWithRouter(<DrinkProgress />);
  //   itDoesntRenderHeader(queryByTestId);
  // });

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

  it('renders the correct icons on the FoodIngredientExplore screen', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <FoodIngredientExplore />,
    );
    itDoesntRenderSearchIcon(queryByTestId, getByTestId);
  });

  it('renders the correct icons on the DrinkIngredientExplore screen', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <DrinkIngredientExplore />,
    );
    itDoesntRenderSearchIcon(queryByTestId, getByTestId);
  });

  it('renders the correct icons on the FoodArea screen', () => {
    const { getByTestId } = renderWithRouter(<FoodArea />);
    itRenderAllIcons(getByTestId);
  });

  it('renders the correct icons on the Profile screen', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(<Profile />);
    itDoesntRenderSearchIcon(queryByTestId, getByTestId);
  });

  it('renders the correct icons on the FavoriteRecipes screen', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <FavoriteRecipes />,
    );
    itDoesntRenderSearchIcon(queryByTestId, getByTestId);
  });

  it('renders the correct icons on the RecipesDone screen', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(<RecipesDone />);
    itDoesntRenderSearchIcon(queryByTestId, getByTestId);
  });
});

describe('Requirement 11', () => {
  it('changes to the Profile Page', () => {
    const { getByRole, history } = renderWithRouter(<Foods />);

    const profilePageButton = getByRole('button', {
      name: /profile avatar/i,
    });
    userEvent.click(profilePageButton);

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
    userEvent.click(searchButton);
    expect(queryByRole('textbox')).toBeInTheDocument();
  });
});
