import React from 'react';
import SearchBar from '../components/SearchBar';
import renderWithRouter from './renderWithRoute';

describe('Test if exists certain elements on the component', () => {
  it('Test if exists the placeholder, and the radio buttons', () => {
    const { getByPlaceholderText, getByTestId } = renderWithRouter(<SearchBar />);
    const inputName = getByPlaceholderText(/search.../i);
    const radioIngredient = getByTestId('ingredient');

    expect(inputName).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
  });
  it('Tests the search button on de header', () => {
    const { getByText } = renderWithRouter(
      <SearchBar />,
    );
    const searchBtn = getByText(/buscar comida/i);
    expect(searchBtn).toBeInTheDocument();
  });
});
