import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import SearchBar from '../components/SearchBar';

test('test the rendering', () => {
  const { getByTestId } = renderWithRouter(
    <SearchBar searchActive />,
  );
  const searchInput = getByTestId('search-input');
  expect(searchInput).toBeInTheDocument();
  const radioIngredient = getByTestId('ingredient-search-radio');
  expect(radioIngredient).toBeInTheDocument();
  const nameRadio = getByTestId('name-search-radio');
  expect(nameRadio).toBeInTheDocument();
  const letterRadio = getByTestId('first-letter-search-radio');
  expect(letterRadio).toBeInTheDocument();
});

describe('tests the input events', () => {
  it('test the text input', () => {
    const { getByTestId } = renderWithRouter(
      <SearchBar searchActive />,
    );
    const searchInput = getByTestId('search-input');
    userEvent.type(searchInput, 'é somente um teste');
    expect(searchInput).toHaveValue('é somente um teste');
  });
  it('tests the radios', () => {
    const { getAllByRole } = renderWithRouter(
      <SearchBar searchActive />,
    );
    const radios = getAllByRole('radio');
    radios.forEach((radio) => {
      const othersRadio = radios.filter((element) => element.value !== radio.value);
      userEvent.click(radio);
      expect(radio.checked).toBe(true);
      othersRadio.forEach((element) => expect(element.checked).toBe(false));
    });
  });
});
