import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import handleLogin from './handleLogin';
import FoodsArea from '../pages/FoodsArea';
import { filterdToMealsIngredientsMock } from './mocks';

const dropdownFoodsArea = 'explore-by-area-dropdown';

function exploreFoodsByArea(getByTestId) {
  handleLogin(getByTestId);
  const getFooterExplore = screen.getByTestId('explore-bottom-btn');
  userEvent.click(getFooterExplore);
  const getExploreFood = screen.getByTestId('explore-food');
  userEvent.click(getExploreFood);
  const areaBtn = screen.getByTestId('explore-by-area');
  userEvent.click(areaBtn);
}

describe('', () => {
  it('url is /explorar/comidas/area', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    exploreFoodsByArea(getByTestId);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/area');
  });
  it('have dropdown', () => {
    const { getByTestId } = renderWithRouter(<App />);
    exploreFoodsByArea(getByTestId);
    const dropdownBtn = getByTestId(dropdownFoodsArea);
    expect(dropdownBtn).toBeInTheDocument();
  });
  it('dropdown starts with options  "all" ', () => {
    const { getByTestId } = renderWithRouter(<App />);
    exploreFoodsByArea(getByTestId);
    const dropdownBtn = getByTestId(dropdownFoodsArea);
    expect(dropdownBtn).toHaveTextContent('All');
  });
  it('have 12 recipes in the page', async () => {
    const { getByTestId, findAllByTestId } = renderWithRouter(<App />);
    exploreFoodsByArea(getByTestId);
    const number12 = 12;
    const recipeCard = await findAllByTestId(/recipe-card/);
    expect(recipeCard.length).toBe(number12);
  });
  /* it('change dropdown option change the recipes inside', async () => {
    global.fetch = jest.fn()
      .mockResolvedValue({ json: async () => filterdToMealsIngredientsMock });
    const {
      findByTestId, getByRole } = renderWithRouter(<FoodsArea />);
    userEvent.selectOptions(getByRole('option'), await findByTestId('Chinese'));
    // o retorno das options é undefined.
    // expect(mockrecipes).notToBeInTheDocument();
    // no mock, receita 1 é Jamaican, 2 Bridish, 3 Portuguese, 4 Thai
  }); */
});
