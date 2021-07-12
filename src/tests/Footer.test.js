import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';

import App from '../App';
import Footer from '../components/Footer';
import Provider from '../store/Provider';

import {
  Login,
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

const footer = 'footer';
const drinksBottomBtn = 'drinks-bottom-btn';
const exploreBottomBtn = 'explore-bottom-btn';
const foodBottomBtn = 'food-bottom-btn';

afterEach(() => jest.clearAllMocks());

describe('Check elements Footer', () => {
  it('Check all data-testId', () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    expect(getByTestId(footer)).toBeInTheDocument();
    expect(getByTestId(drinksBottomBtn)).toBeInTheDocument();
    expect(getByTestId(exploreBottomBtn)).toBeInTheDocument();
    expect(getByTestId(foodBottomBtn)).toBeInTheDocument();
  });
});

// describe('Position the footer fixedly and present 3 icons',
//   'food, drinks exploration. The footer must always be fixed to the end of the page',
//   () => {
//     it('Position the footer fixedly on the food', () => {
//       const { getByTestId } = renderWithRouter(<Footer />);
//     });

//   });

describe('Display the Footer only on the screens indicated by the prototype', () => {
  const hasNoFooter = (get) => {
    expect(get(footer)).not.toBe();
    expect(get(drinksBottomBtn)).not.toBe();
    expect(get(exploreBottomBtn)).not.toBe();
    expect(get(foodBottomBtn)).not.toBe();
  };

  const hasFooter = (query) => {
    expect(query(footer)).toBeInTheDocument();
    expect(query(exploreBottomBtn)).toBeInTheDocument();
    expect(query(exploreBottomBtn)).toBeInTheDocument();
    expect(query(foodBottomBtn)).toBeInTheDocument();
  };

  it('Doesnt Footer on the Login screen', () => {
    const { queryByTestId } = renderWithRouter(
      <Provider>
        <Login />
      </Provider>,
    );
    hasNoFooter(queryByTestId);
  });

  it('The Footer has the correct icons on the main Foods screen', () => {
    const { queryByTestId } = renderWithRouter(
      <Provider>
        <Foods />
      </Provider>,
    );
    hasFooter(queryByTestId);
  });

  it('The Footer has the correct icons on the main Drinks screen', () => {
    const { queryByTestId } = renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
    );
    hasFooter(queryByTestId);
  });

  it('The Footer has the correct icons on the main Explore screen', () => {
    const { queryByTestId } = renderWithRouter(
      <Provider>
        <Explore />
      </Provider>,
    );
    hasFooter(queryByTestId);
  });

  it('The Footer has the correct icons on the FoodExplore screen', () => {
    const { queryByTestId } = renderWithRouter(
      <Provider>
        <FoodExplore />
      </Provider>,
    );
    hasFooter(queryByTestId);
  });

  it('The Footer has the correct icons on the DrinkExplore screen', () => {
    const { queryByTestId } = renderWithRouter(
      <Provider>
        <DrinkExplore />
      </Provider>,
    );
    hasFooter(queryByTestId);
  });

  it('The Footer has the correct icons on the ExploreArea screen', () => {
    const { queryByTestId } = renderWithRouter(<ExploreArea />);
    hasFooter(queryByTestId);
  });

  it('The Footer has the correct icons on the ExploreDrinksIngredients screen', () => {
    const { queryByTestId } = renderWithRouter(
      <Provider>
        <ExploreDrinksIngredients />
      </Provider>,
    );
    hasFooter(queryByTestId);
  });

  it('The Footer has the correct icons on the ExploreFoodsIngredients screen', () => {
    const { queryByTestId } = renderWithRouter(
      <Provider>
        <ExploreFoodIngredients />
      </Provider>,
    );
    hasFooter(queryByTestId);
  });

  it('The Footer has the correct icons on the ExploreFoodSource screen', () => {
    const { queryByTestId } = renderWithRouter(<ExploreArea />);
    hasFooter(queryByTestId);
  });

  it('The Footer has the correct icons on the Profile screen', () => {
    const { queryByTestId } = renderWithRouter(<Profile />);
    hasFooter(queryByTestId);
  });

  it('The Footer has the correct icons on the FavoriteRecipes screen', () => {
    const { queryByTestId } = renderWithRouter(<FavoriteRecipes />);
    hasNoFooter(queryByTestId);
  });

  it('The Footer has the correct icons on the RecipesDone screen', () => {
    const { queryByTestId } = renderWithRouter(<RecipesDone />);
    hasNoFooter(queryByTestId);
  });
});

describe('Footer.jsx component', () => {
  it('should render', () => {
    const { history, getByTestId } = renderWithRouter(
      <Provider>
        <Footer />
      </Provider>,
    );

    expect(window.location.href).toBe('http://localhost/');
    console.log(history.location.pathname);

    const drinksBtn = getByTestId(drinksBottomBtn);
    userEvent.click(drinksBtn);

    expect(history.location.pathname).toBe('/bebidas');

    const exploreBtn = getByTestId(exploreBottomBtn);
    userEvent.click(exploreBtn);

    expect(history.location.pathname).toBe('/explorar');

    const foodBtn = getByTestId(foodBottomBtn);
    userEvent.click(foodBtn);

    expect(history.location.pathname).toBe('/comidas');
  });
});
