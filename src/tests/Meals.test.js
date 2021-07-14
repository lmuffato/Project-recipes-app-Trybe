import userEvent from '@testing-library/user-event';
import React from 'react';
import Meals from '../pages/Meals';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const MEAL_CARDS_COUNT = 12; // no magic numbers
const breakfastButtonId = 'Breakfast-category-filter';
const allButtonId = 'All-category-filter';

describe('tests meal page ', () => {
  test('tests route', async () => {
    const { history, getByTestId } = renderWithRouterAndRedux(<Meals />);
    history.push('/comidas');

    const allButton = await getByTestId(allButtonId);
    userEvent.click(allButton);
    const path = history.location.pathname;

    expect(path).toBe('/comidas');
  });

  test('tests meal cards quantity', async () => {
    const {
      history, findByText, findAllByTestId } = renderWithRouterAndRedux(<Meals />);
    history.push('/comidas');

    const mealName = await findByText(/lasagne/i);
    expect(mealName).toBeInTheDocument();

    const mealCards = await findAllByTestId(/recipe-card/i);
    expect(mealCards.length).toBe(MEAL_CARDS_COUNT);

    mealCards.forEach((mealCard) => {
      expect(mealCard).toBeInTheDocument();
    });
  });

  test('tests filter by categories buttons render', async () => {
    const { history, findByTestId } = renderWithRouterAndRedux(<Meals />);
    history.push('/comidas');

    const allButton = await findByTestId(allButtonId);
    expect(allButton).toBeInTheDocument(allButtonId);

    const breakfastButton = await findByTestId(breakfastButtonId);
    expect(breakfastButton).toBeInTheDocument(breakfastButtonId);

    const chickenButton = await findByTestId('Chicken-category-filter');
    expect(chickenButton).toBeInTheDocument('Chicken-category-filter');

    const dessertButton = await findByTestId('Dessert-category-filter');
    expect(dessertButton).toBeInTheDocument('Dessert-category-filter');

    const goatButton = await findByTestId('Goat-category-filter');
    expect(goatButton).toBeInTheDocument('Goat-category-filter');

    const beefButton = await findByTestId('Beef-category-filter');
    expect(beefButton).toBeInTheDocument('Beef-category-filter');
  });

  test('tests clicking on a category button', async () => {
    const { history, findByTestId, findByText } = renderWithRouterAndRedux(<Meals />);
    history.push('/comidas');

    const breakfastButton = await findByTestId(breakfastButtonId);
    userEvent.click(breakfastButton);
    const text = await findByText('English Breakfast');
    expect(text).toBeInTheDocument();
  });
});
