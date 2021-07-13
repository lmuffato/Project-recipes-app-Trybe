import React from 'react';
import { getByTestId } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import SearchBar from '../compenents/SearchBar';

describe('Testing SearchBar component', () => {
  it('contains an input text and three radio buttons', () => {
    renderWithRouter(<SearchBar />);

    const inputText = getByTestId('search-input');
    const ingredientRadioBtn = getByTestId('ingredient-search-radio');
    const nameRadioBtn = getByTestId('name-search-radio');
    const letterRadioBtn = getByTestId('first-letter-search-radio');

    expect(inputText).toBeInTheDocument();
    expect(ingredientRadioBtn).toBeInTheDocument();
    expect(nameRadioBtn).toBeInTheDocument();
    expect(letterRadioBtn).toBeInTheDocument();
  });

  // it('test ingredient radio button', () => {})

  // it('test name radio button', () => {})

  // it('test letter radio button', () => {})

  // it('test if the page redirect when only one recipe is found', () => {})
});
