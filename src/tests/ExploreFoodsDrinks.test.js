import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

function loginAndAcessExplorePage() {
  const getInputEmail = screen.getByTestId('email-input');
  const getInputPassw = screen.getByTestId('password-input');
  const getBtnLogin = screen.getByTestId('login-submit-btn');
  userEvent.type(getInputEmail, 'teste@email.com');
  userEvent.type(getInputPassw, '12345678');
  userEvent.click(getBtnLogin);
  const getFooterExplore = screen.getByTestId('explore-bottom-btn');
  userEvent.click(getFooterExplore);
}

function exploreFoodPage() {
  loginAndAcessExplorePage();
  const getExploreFood = screen.getByTestId('explore-food');
  userEvent.click(getExploreFood);
}

function exploreDrinksPage() {
  loginAndAcessExplorePage();
  const getExploreDrink = screen.getByTestId('explore-drinks');
  userEvent.click(getExploreDrink);
}

describe('testing explore foods page', () => {
  test('if explore foods page have three buttons', () => {
    const { history } = renderWithRouter(<App />);
    exploreFoodPage();
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');
    const byIngredientes = screen.getByTestId('explore-by-ingredient');
    expect(byIngredientes).toBeInTheDocument();
    expect(byIngredientes).toHaveTextContent('Por Ingredientes');
    const byArea = screen.getByTestId('explore-by-area');
    expect(byArea).toBeInTheDocument();
    expect(byArea).toHaveTextContent('Por Local de Origem');
    const surpriseMe = screen.getByTestId('explore-surprise');
    expect(surpriseMe).toBeInTheDocument();
    expect(surpriseMe).toHaveTextContent('Me Surpreenda!');
  });
  test('redirect of byIngredients button', () => {
    const { history } = renderWithRouter(<App />);
    exploreFoodPage();
    const byIngredientes = screen.getByTestId('explore-by-ingredient');
    userEvent.click(byIngredientes);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');
  });
  test('redirect of byArea button', () => {
    const { history } = renderWithRouter(<App />);
    exploreFoodPage();
    const byArea = screen.getByTestId('explore-by-area');
    userEvent.click(byArea);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/area');
  });
  test('redirect of bySurprise button', () => {
    const { history } = renderWithRouter(<App />);
    exploreFoodPage();
    const surpriseMe = screen.getByTestId('explore-surprise');
    userEvent.click(surpriseMe);
    const { pathname } = history.location;
    // expect(pathname).toBe('/explorar/comidas/');
    // COMO TESTAR O REDIRECT AQUI, SENDO QUE VEM 5 NUMERO APOS A /
  });
});

describe('testing explore drinks page', () => {
  test('if explore drinks page have two buttons', () => {
    const { history } = renderWithRouter(<App />);
    exploreDrinksPage();
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');
    const byIngredientes = screen.getByTestId('explore-by-ingredient');
    expect(byIngredientes).toBeInTheDocument();
    expect(byIngredientes).toHaveTextContent('Por Ingredientes');
    const surpriseMe = screen.getByTestId('explore-surprise');
    expect(surpriseMe).toBeInTheDocument();
    expect(surpriseMe).toHaveTextContent('Me Surpreenda!');
  });
  test('redirect of byIngredients button', () => {
    const { history } = renderWithRouter(<App />);
    exploreDrinksPage();
    const byIngredientes = screen.getByTestId('explore-by-ingredient');
    userEvent.click(byIngredientes);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas/ingredientes');
  });
  test('redirect of bySurprise button', () => {
    const { history } = renderWithRouter(<App />);
    exploreFoodPage();
    const surpriseMe = screen.getByTestId('explore-surprise');
    userEvent.click(surpriseMe);
    const { pathname } = history.location;
    // expect(pathname).toBe('/explorar/bebidas/');
    // COMO TESTAR O REDIRECT AQUI, SENDO QUE VEM 5 NUMERO APOS A /
  });
});
