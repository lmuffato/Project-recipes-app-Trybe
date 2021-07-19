import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testing Recipes Main Screen Foods and Drinks', () => {
  it('Testing food main page', () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    history.push('/comidas');
    const pathName = history.location.pathname;
    expect(pathName).toBe('/comidas');
    const title = getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });

  it('Testing on the main food page there is a search button', () => {
    const { history, getByTestId, getByText } = renderWithRouter(<App />);
    history.push('/comidas');
    const search = getByTestId('search-top-btn');
    expect(search).toBeInTheDocument();
    userEvent.click(search);
    const inputSearch = getByTestId('search-input');
    const btnRadioIng = getByText(/ingrediente/i);
    const btnSearch = getByTestId('exec-search-btn');
    expect(inputSearch).toBeInTheDocument();
    expect(btnRadioIng).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
  });

  it('Testing if the explore icon is on the screen - Foods', () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    history.push('/comidas');
    const explore = getByTestId('explore-bottom-btn');
    expect(explore).toBeInTheDocument();
    userEvent.click(explore);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/explorar');
  });

  it('Testing drinks main page', () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    history.push('/comidas');
    const btnDrinks = getByTestId('drinks-bottom-btn');
    userEvent.click(btnDrinks);
    history.push('/bebidas');
    const pathName = history.location.pathname;
    expect(pathName).toBe('/bebidas');
  });

  it('Testing on the main drinks page there is a search button', () => {
    const { history, getByTestId, getByText } = renderWithRouter(<App />);
    history.push('/bebidas');
    const search = getByTestId('search-top-btn');
    expect(search).toBeInTheDocument();
    userEvent.click(search);
    const btnRadioIng = getByText(/ingrediente/i);
    const inputSearch = getByTestId('search-input');
    const btnSearch = getByTestId('exec-search-btn');
    expect(btnRadioIng).toBeInTheDocument();
    expect(inputSearch).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
  });

  it('Testing if the entire filter button is present in the main drinks screen', () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    history.push('/bebidas');
    const filterAll = getByTestId('All-category-filter');
    expect(filterAll).toBeInTheDocument();
  });
  it('Testing if the explore icon is on the screen - Drinks', () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    history.push('/bebidas');
    const explore = getByTestId('explore-bottom-btn');
    expect(explore).toBeInTheDocument();
    userEvent.click(explore);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/explorar');
  });
});
