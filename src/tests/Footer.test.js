import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import Footer from '../pages/components/Footer';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('tests if the elements of the Footer component are being rendered', () => {
  test('Footer element, go to meals button, go to drinks button, explore button', () => {
    const { getByTestId } = renderWithRouterAndRedux(<Footer />);

    const footerElement = getByTestId('footer');
    expect(footerElement).toBeInTheDocument();

    const mealsBtn = getByTestId('food-bottom-btn');
    expect(mealsBtn).toBeInTheDocument();

    const drinksBtn = getByTestId('drinks-bottom-btn');
    expect(drinksBtn).toBeInTheDocument();

    const exploreBtn = getByTestId('explore-bottom-btn');
    expect(exploreBtn).toBeInTheDocument();
  });
});

describe('tests the routes after clicking the buttons', () => {
  test('food button', () => {
    const { getByTestId, history } = renderWithRouterAndRedux(<Footer />);
    const mealsBtn = getByTestId('food-bottom-btn');
    userEvent.click(mealsBtn);
    const path = history.location.pathname;
    expect(path).toBe('/comidas');
  });
  test('drinks button', () => {
    const { getByTestId, history } = renderWithRouterAndRedux(<Footer />);
    const drinksBtn = getByTestId('drinks-bottom-btn');
    userEvent.click(drinksBtn);
    const path = history.location.pathname;
    expect(path).toBe('/bebidas');
  });
  test('explore button', () => {
    const { getByTestId, history } = renderWithRouterAndRedux(<Footer />);
    const exploreBtn = getByTestId('explore-bottom-btn');
    userEvent.click(exploreBtn);
    const path = history.location.pathname;
    expect(path).toBe('/explorar');
  });
});

// https://spectrum.chat/testing-library/help-dom/fire-scroll-event-with-specified-x-y-positions~4798d1c8-2658-4479-a855-9c8f26c74385
// para fazer o teste da posição do Footer, utilizei umas das soluções dadas a pergunta feita no post acima;

test('tests if Footer component is positioned at the bottom of the page', () => {
  const { getByTestId } = renderWithRouterAndRedux(<Footer />);

  const footer = getByTestId('footer');
  fireEvent.scroll(window, { target: { scrollY: 101 } });
  expect(footer).toBeInTheDocument();
});
