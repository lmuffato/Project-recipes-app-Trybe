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
  footer: 'footer',
  drinksBottonBtn: 'drinks-bottom-btn',
  exploreBottonBtn: 'explore-bottom-btn',
  foodBottonBtn: 'food-bottom-btn',
  drinkIcon: 'drinks-bottom-btn',
  exploreIcon: 'explore-bottom-btn',
  mealIcon: 'food-bottom-btn',
};

describe('Requirement 19', () => {
  it('renders footer', () => {
    const { getByTestId } = renderWithRouter(<Foods />);
    const footer = getByTestId(testids.footer);
    expect(footer).toBeInTheDocument();
  });

  it('renders Drinks Botton Button', () => {
    const { getByTestId } = renderWithRouter(<Foods />);
    const drinkBottonButton = getByTestId(testids.drinksBottonBtn);
    expect(drinkBottonButton).toBeInTheDocument();
  });

  it('renders Explore Button', () => {
    const { getByTestId } = renderWithRouter(<Foods />);
    const exploreButton = getByTestId(testids.exploreBottonBtn);
    expect(exploreButton).toBeInTheDocument();
  });

  it('renders Drinks Botton Button', () => {
    const { getByTestId } = renderWithRouter(<Foods />);
    const foodBottonButton = getByTestId(testids.foodBottonBtn);
    expect(foodBottonButton).toBeInTheDocument();
  });
});

describe('Requirement 20', () => {
  it('expect Footer position to be fixed', () => {
    const { getByTestId } = renderWithRouter(<Foods />);
    const footer = getByTestId(testids.footer);
    expect(footer).toHaveStyle('bottom: 0px');
  });
  it('expect Footer icons src to match', () => {
    const { getByTestId } = renderWithRouter(<Foods />);
    const drinkIcon = getByTestId(testids.drinkIcon);
    expect(drinkIcon.src).toBe('http://localhost/drinkIcon.svg');
    const exploreIcon = getByTestId(testids.exploreIcon);
    expect(exploreIcon.src).toBe('http://localhost/exploreIcon.svg');
    const mealIcon = getByTestId(testids.mealIcon);
    expect(mealIcon.src).toBe('http://localhost/mealIcon.svg');
  });
});

describe('Requirement 21', () => {
  const itDoesntRenderFooter = (query) => {
    expect(query(testids.drinkIcon)).toBeNull();
    expect(query(testids.exploreIcon)).toBeNull();
    expect(query(testids.mealIcon)).toBeNull();
  };

  const itRenderAllIcons = (get) => {
    expect(get(testids.drinkIcon)).toBeInTheDocument();
    expect(get(testids.exploreIcon)).toBeInTheDocument();
    expect(get(testids.mealIcon)).toBeInTheDocument();
  };

  it('doesnt render the Footer on the Login screen', () => {
    const { queryByTestId } = renderWithRouter(<Login />);
    itDoesntRenderFooter(queryByTestId);
  });

  it('renders the correct icons on the Foods screen', () => {
    const { getByTestId } = renderWithRouter(<Foods />);
    itRenderAllIcons(getByTestId);
  });

  it('renders the correct icons on the Drinks screen', () => {
    const { getByTestId } = renderWithRouter(<Drinks />);
    itRenderAllIcons(getByTestId);
  });

  // it('doesnt render the Footer on the FoodDetails screen', () => {
  //   const { queryByTestId } = renderWithRouter(<FoodDetails />);
  //   itDoesntRenderFooter(queryByTestId);
  // });

  // it('doesnt render the Footer on the DrinkDetails screen', () => {
  //   const { queryByTestId } = renderWithRouter(<DrinkDetails />);
  //   itDoesntRenderFooter(queryByTestId);
  // });

  // it('doesnt render the Footer on the FoodProgress screen', () => {
  //   const { queryByTestId } = renderWithRouter(<FoodProgress />);
  //   itDoesntRenderFooter(queryByTestId);
  // });

  // it('doesnt render the Footer on the DrinkProgress screen', () => {
  //   const { queryByTestId } = renderWithRouter(<DrinkProgress />);
  //   itDoesntRenderFooter(queryByTestId);
  // });

  it('renders the correct icons on the Explore screen', () => {
    const { getByTestId } = renderWithRouter(<Explore />);
    itRenderAllIcons(getByTestId);
  });

  it('renders the correct icons on the FoodExplore screen', () => {
    const { getByTestId } = renderWithRouter(<FoodExplore />);
    itRenderAllIcons(getByTestId);
  });

  it('renders the correct icons on the DrinkExplore screen', () => {
    const { getByTestId } = renderWithRouter(<DrinkExplore />);
    itRenderAllIcons(getByTestId);
  });

  it('renders the correct icons on the FoodIngredientExplore screen', () => {
    const { getByTestId } = renderWithRouter(<FoodIngredientExplore />);
    itRenderAllIcons(getByTestId);
  });

  it('renders the correct icons on the DrinkIngredientExplore screen', () => {
    const { getByTestId } = renderWithRouter(<DrinkIngredientExplore />);
    itRenderAllIcons(getByTestId);
  });

  it('renders the correct icons on the FoodArea screen', () => {
    const { getByTestId } = renderWithRouter(<FoodArea />);
    itRenderAllIcons(getByTestId);
  });

  it('renders the correct icons on the Profile screen', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    itRenderAllIcons(getByTestId);
  });

  it('doesnt render the Footer on the RecipesDone screen', () => {
    const { queryByTestId } = renderWithRouter(<RecipesDone />);
    itDoesntRenderFooter(queryByTestId);
  });

  it('doesnt render the Footer on the FavoriteRecipes screen', () => {
    const { queryByTestId } = renderWithRouter(<FavoriteRecipes />);
    itDoesntRenderFooter(queryByTestId);
  });
});

describe('Requirement 22', () => {
  it('changes to Cocktails page', () => {
    const { getByRole, history } = renderWithRouter(<Foods />);
    const cocktailBtn = getByRole('button', {
      name: /drink/i,
    });
    userEvent.click(cocktailBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });
});

describe('Requirement 23', () => {
  it('changes to Explore page', () => {
    const { getByRole, history } = renderWithRouter(<Foods />);
    const exploreBtn = getByRole('button', {
      name: /explore/i,
    });
    userEvent.click(exploreBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });
});

describe('Requirement 24', () => {
  it('change to Foods page', () => {
    const { getByRole, history } = renderWithRouter(<Foods />);
    const foodBtn = getByRole('button', {
      name: /food/i,
    });
    userEvent.click(foodBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
