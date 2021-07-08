import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';

import Header from '../components/Header';
import App from '../App';
import Provider from '../store/Provider';

import {
  Foods,
  Drinks,
  Profile,
  FavoriteRecipes,
  Explore,
  DrinkExplore,
  FoodExplore,
  RecipesDone,
  ExploreArea,
  ExploreDrinksIngredients,
  ExploreFoodIngredients,
} from '../Pages';

const profileTopBtn = 'profile-top-btn';
const pageTitle = 'page-title';
const searchTopBtn = 'search-top-btn';

afterEach(() => jest.clearAllMocks());

describe('Check elements Header', () => {
  it('Check a profile button', () => {
    const { getByTestId } = renderWithRouter(<Header />);
    expect(getByTestId(profileTopBtn)).toBeInTheDocument();
  });

  it('Check is a title on the page', () => {
    const { getByTestId } = renderWithRouter(<Header />);
    expect(getByTestId(pageTitle)).toBeInTheDocument();
  });

  it('Check is a search button', () => {
    const { getByTestId } = renderWithRouter(<Header />);
    expect(getByTestId(searchTopBtn)).toBeInTheDocument();
  });
});

describe('check an icon for the profile screen, a title and an icon for the search',
  () => {
    const hasNoHeader = (get) => {
      expect(get(profileTopBtn)).not.toBe();
      expect(get(pageTitle)).not.toBe();
      expect(get(searchTopBtn)).not.toBe();
    };

    const hasHeader = (query) => {
      expect(query(profileTopBtn)).toBeInTheDocument();
      expect(query(pageTitle)).toBeInTheDocument();
      expect(query(searchTopBtn)).toBeInTheDocument();
    };

    it('Doesnt Header on the Login screen', () => {
      const { queryByTestId } = renderWithRouter(<App />);
      hasNoHeader(queryByTestId);
    });

    it('The header has the correct icons on the main Foods screen ', () => {
      const { queryByTestId } = renderWithRouter(
        <Provider>
          <Foods />
        </Provider>,
      );
      hasNoHeader(queryByTestId);
    });

    it('The header has the correct icons on the main Drinks screen ', () => {
      const { queryByTestId } = renderWithRouter(
        <Provider>
          <Drinks />
        </Provider>,
      );
      hasNoHeader(queryByTestId);
    });

    it('The header has the correct icons on the Explore screen', () => {
      const { queryByTestId } = renderWithRouter(<Explore />);
      hasNoHeader(queryByTestId);
    });

    it('The header has the correct icons on the FoodExplore screen', () => {
      const { queryByTestId } = renderWithRouter(
        <Provider>
          <FoodExplore />
        </Provider>,
      );
      hasNoHeader(queryByTestId);
    });

    it('The header has the correct icons on the DrinkExplore screen', () => {
      const { queryByTestId } = renderWithRouter(
        <Provider>
          <DrinkExplore />
        </Provider>,
      );
      hasNoHeader(queryByTestId);
    });

    it('The header has the correct icons on the ExploreArea screen', () => {
      const { queryByTestId } = renderWithRouter(<ExploreArea />);
      hasHeader(queryByTestId);
    });

    it('The header has the correct icons on the ExploreDrinksIngredients screen', () => {
      const { queryByTestId } = renderWithRouter(
        <Provider>
          <ExploreDrinksIngredients />
        </Provider>,
      );
      hasNoHeader(queryByTestId);
    });

    it('The header has the correct icons on the ExploreFoodsIngredients screen', () => {
      const { queryByTestId } = renderWithRouter(
        <Provider>
          <ExploreFoodIngredients />
        </Provider>,
      );
      hasNoHeader(queryByTestId);
    });

    it('The header has the correct icons on the ExploreFoodSource screen', () => {
      const { queryByTestId } = renderWithRouter(<ExploreArea />);
      hasHeader(queryByTestId);
    });

    it('The header has the correct icons on the Profile screen', () => {
      const { queryByTestId } = renderWithRouter(<Profile />);
      hasNoHeader(queryByTestId);
    });

    it('The header has the correct icons on the FavoriteRecipes screen', () => {
      const { queryByTestId } = renderWithRouter(<FavoriteRecipes />);
      hasNoHeader(queryByTestId);
    });

    it('The header has the correct icons on the RecipesDone screen', () => {
      const { queryByTestId } = renderWithRouter(<RecipesDone />);
      hasNoHeader(queryByTestId);
    });
  });

describe(
  'Search button when clicked, searchbar should shows. The same goes to hide it',
  () => {
    it('Shows and hides the search', () => {
      // eslint-disable-next-line no-unused-vars
      const { queryByRole } = renderWithRouter(<App />);
    });

    const searchButton = getByRole('img', {
      name: /search/i,
    });

    expect(queryByRole('text')).not.toBe();
    userEvent.click(searchButton);
    expect(queryByRole('text')).toBeInTheDocument();
  },
);
