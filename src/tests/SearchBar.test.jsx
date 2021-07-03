import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../context/RecipesContext';

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

describe('test the Api use', () => {
  const handleApi = jest.fn();
  const context = {
    results: [{
      strMeal: 'Apple Frangipan Tart',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
      idMeal: 1,
    }],
    handleApi,
  };
  const contextWithMultiplesElements = {
    results: [{
      strMeal: 'Apple Tart',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
      idMeal: 1,
    }, {
      strMeal: 'Apple Frangipan Tart',
      strMealThumb: 'teste',
      idMeal: 2,
    }],
    handleApi,
  };
  it('test the button', () => {
    const { getByTestId } = renderWithRouter(
      <RecipesContext.Provider value={ context }>
        <SearchBar />
      </RecipesContext.Provider>,
    );
    const button = getByTestId('exec-search-btn');
    userEvent.click(button);
    expect(handleApi).toHaveBeenCalled();
  });
  it('test the rendering of redirect', () => {
    const { history } = renderWithRouter(
      <RecipesContext.Provider value={ context }>
        <SearchBar place="meal" />
      </RecipesContext.Provider>,
    );
    const path = history.location.pathname;
    expect(path).toBe('/comidas/1');
  });
  it('test the rendering of api elements', () => {
    const { getAllByRole } = renderWithRouter(
      <RecipesContext.Provider value={ contextWithMultiplesElements }>
        <SearchBar />
      </RecipesContext.Provider>,
    );
    const headings = getAllByRole('heading');
    expect(headings.length).toBe(2);
    const images = getAllByRole('img');
    expect(images.length).toBe(2);
  });
});
