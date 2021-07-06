import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

function login() {
  const getInputEmail = screen.getByTestId('email-input');
  const getInputPassw = screen.getByTestId('password-input');
  const getBtnLogin = screen.getByTestId('login-submit-btn');
  userEvent.type(getInputEmail, 'teste@email.com');
  userEvent.type(getInputPassw, '12345678');
  userEvent.click(getBtnLogin);
}

describe('testing explore page', () => {
  test('access the explore page through the footer link', () => {
    const { history } = renderWithRouter(<App />);
    login();
    const getFooterExplore = screen.getByTestId('explore-bottom-btn');
    userEvent.click(getFooterExplore);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  })
  test('the existence os two buttons, one for food and other for drinks', () => {
    const { history } = renderWithRouter(<App />);
    login();
    history.push('/explorar');
    const getExploreFood = screen.getByTestId('explore-food');
    expect(getExploreFood).toBeInTheDocument();
    expect(getExploreFood).toHaveTextContent('Explorar Comidas');
    const getExploreDrink = screen.getByTestId('explore-drinks')
    expect(getExploreDrink).toBeInTheDocument();
    expect(getExploreDrink).toHaveTextContent('Explorar Bebidas');
  })
  test('if explore foods button redirect the page', () => {
    const { history } = renderWithRouter(<App />);
    login();
    history.push('/explorar');
    const getExploreFood = screen.getByTestId('explore-food');
    userEvent.click(getExploreFood);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');
  });
  test('if explore drinks redirect the page', () => {
    const { history } = renderWithRouter(<App />);
    login();
    history.push('/explorar');
    const getExploreDrink = screen.getByTestId('explore-drinks')
    userEvent.click(getExploreDrink);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');
  });
});