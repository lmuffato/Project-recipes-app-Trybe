import React from 'react';
import MealCards from '../pages/components/MealsPage/MealCards';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const MEAL_CARDS_COUNT = 12;

describe('tests meal page ', () => {
  test('tests route', () => {
    const { history } = renderWithRouterAndRedux(<MealCards />);
    history.push('/comidas');
    const path = history.location.pathname;

    expect(path).toBe('/comidas');
  });

  test('tests meal cards', async () => {
    const {
      history, findByText, findAllByTestId } = renderWithRouterAndRedux(<MealCards />);
    history.push('/comidas');

    const mealName = await findByText(/lasagne/i);
    expect(mealName).toBeInTheDocument();

    const mealCards = await findAllByTestId(/recipe-card/i);
    expect(mealCards.length).toBe(MEAL_CARDS_COUNT);

    mealCards.forEach((mealCard) => {
      expect(mealCard).toBeInTheDocument();
    });
  });
});
