import userEvent from '@testing-library/user-event';
import React from 'react';
import Drinks from '../pages/Drinks';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const DRINK_CARDS_COUNT = 12;
const ordinaryButtonId = 'Ordinary Drink-category-filter';
const allButtonId = 'All-category-filter';

describe('tests drinks page ', () => {
  test('tests route', async () => {
    const { history, getByTestId } = renderWithRouterAndRedux(<Drinks />);
    history.push('/bebidas');
    const allButton = await getByTestId(allButtonId);
    userEvent.click(allButton);
    const path = history.location.pathname;

    expect(path).toBe('/bebidas');
  });

  test('tests drink cards quantity', async () => {
    const {
      history, findByText, findAllByTestId } = renderWithRouterAndRedux(<Drinks />);
    history.push('/bebidas');

    const drinkName = await findByText(/B-53/i);
    expect(drinkName).toBeInTheDocument();

    const drinksCards = await findAllByTestId(/recipe-card/i);
    expect(drinksCards.length).toBe(DRINK_CARDS_COUNT);

    drinksCards.forEach((drinkCard) => {
      expect(drinkCard).toBeInTheDocument();
    });
  });

  test('tests filter by categories buttons render', async () => {
    const { history, findByTestId } = renderWithRouterAndRedux(<Drinks />);
    history.push('/bebidas');

    const allButton = await findByTestId(allButtonId);
    expect(allButton).toBeInTheDocument(allButtonId);

    const ordinaryButton = await findByTestId(ordinaryButtonId);
    expect(ordinaryButton).toBeInTheDocument(ordinaryButtonId);

    const cocktailButton = await findByTestId('Cocktail-category-filter');
    expect(cocktailButton).toBeInTheDocument('Cocktail-category-filter');

    const milkButton = await findByTestId('Milk / Float / Shake-category-filter');
    expect(milkButton).toBeInTheDocument('Milk / Float / Shake-category-filter');

    const otherButton = await findByTestId('Other/Unknown-category-filter');
    expect(otherButton).toBeInTheDocument('Other/Unknown-category-filter');

    const cocoaButton = await findByTestId('Cocoa-category-filter');
    expect(cocoaButton).toBeInTheDocument('Cocoa-category-filter');
  });

  test('tests clicking on a category button', async () => {
    const { history, findByTestId, findByText } = renderWithRouterAndRedux(<Drinks />);
    history.push('/bebidas');

    const ordinaryButton = await findByTestId(ordinaryButtonId);
    userEvent.click(ordinaryButton);
    const text = await findByText('A Day at the Beach');
    expect(text).toBeInTheDocument();
  });
});
