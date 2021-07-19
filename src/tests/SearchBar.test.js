import React from 'react';
import { getByTestId } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import SearchBar from '../compenents/SearchBar';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testing SearchBar component', () => {
  const pathName = '/comidas';

  it('contains an input text and three radio buttons', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push(pathName);

    const findSearchBtn = async (findByTestId) => {
      // const searchBtn = await findByTestId(searchBtnId);
      // expect(searchBtn).toBeInTheDocument();

      const inputText = getByTestId('search-input');
      const ingredientRadioBtn = getByTestId('ingredient-search-radio');
      const nameRadioBtn = getByTestId('name-search-radio');
      const letterRadioBtn = getByTestId('first-letter-search-radio');
      expect(inputText).toBeInTheDocument();
      expect(ingredientRadioBtn).toBeInTheDocument();
      expect(nameRadioBtn).toBeInTheDocument();
      expect(letterRadioBtn).toBeInTheDocument();
    };


  });

  // it('test ingredient radio button', () => {})

  // it('test name radio button', () => {})

  // it('test letter radio button', () => {})

  // it('test if the page redirect when only one recipe is found', () => {})
});
