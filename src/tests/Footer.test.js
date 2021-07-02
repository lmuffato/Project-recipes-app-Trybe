import React from 'react';
import userEvent from '@testing-library/user-event';
import Foods from '../pages/Foods';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';

const { RecipeContext, renderEmptyValue, testsIds } = getTest('/comidas');
const { footerTestIds } = testsIds;

describe('Requirement 19', () => {
  it('renders footer', () => {
    const { getByTestId } = renderWithRouterAndContext(
      <Foods />,
      RecipeContext,
      renderEmptyValue,
    );
    const footer = getByTestId(footerTestIds.footer);
    expect(footer).toBeInTheDocument();
  });

  it('renders Drinks Botton Button', () => {
    const { getByTestId } = renderWithRouterAndContext(
      <Foods />,
      RecipeContext,
      renderEmptyValue,
    );
    const drinkBottonButton = getByTestId(footerTestIds.drinksBottonBtn);
    expect(drinkBottonButton).toBeInTheDocument();
  });

  it('renders Explore Button', () => {
    const { getByTestId } = renderWithRouterAndContext(
      <Foods />,
      RecipeContext,
      renderEmptyValue,
    );
    const exploreButton = getByTestId(footerTestIds.exploreBottonBtn);
    expect(exploreButton).toBeInTheDocument();
  });

  it('renders Drinks Botton Button', () => {
    const { getByTestId } = renderWithRouterAndContext(
      <Foods />,
      RecipeContext,
      renderEmptyValue,
    );
    const foodBottonButton = getByTestId(footerTestIds.foodBottonBtn);
    expect(foodBottonButton).toBeInTheDocument();
  });
});

describe('Requirement 20', () => {
  it('expect Footer position to be fixed', () => {
    const { getByTestId } = renderWithRouterAndContext(
      <Foods />,
      RecipeContext,
      renderEmptyValue,
    );
    const footer = getByTestId(footerTestIds.footer);
    expect(footer.style.bottom).toBe('0px');
    expect(footer.style.position).toBe('fixed');
  });
  it('expect Footer icons src to match', () => {
    const { getByTestId } = renderWithRouterAndContext(
      <Foods />,
      RecipeContext,
      renderEmptyValue,
    );
    const drinkIcon = getByTestId(footerTestIds.drinkIcon);
    expect(drinkIcon.src).toBe('http://localhost/drinkIcon.svg');
    const exploreIcon = getByTestId(footerTestIds.exploreIcon);
    expect(exploreIcon.src).toBe('http://localhost/exploreIcon.svg');
    const mealIcon = getByTestId(footerTestIds.mealIcon);
    expect(mealIcon.src).toBe('http://localhost/mealIcon.svg');
  });
});

describe('Requirement 22', () => {
  it('changes to Cocktails page', () => {
    const { getByRole, history } = renderWithRouterAndContext(
      <Foods />,
      RecipeContext,
      renderEmptyValue,
    );
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
    const { getByRole, history } = renderWithRouterAndContext(
      <Foods />,
      RecipeContext,
      renderEmptyValue,
    );
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
    const { getByRole, history } = renderWithRouterAndContext(
      <Foods />,
      RecipeContext,
      renderEmptyValue,
    );
    const foodBtn = getByRole('button', {
      name: /food/i,
    });
    userEvent.click(foodBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
