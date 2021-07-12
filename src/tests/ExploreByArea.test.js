import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import * as api from '../services/searchAreas';
import renderWithRouter from './renderWithRouter';
import ExploreByArea from '../components/ExploreByArea';
import * as searchFood from '../services/searchFoods';
import * as searchFoodByArea from '../services/searchFoodByArea';

const render = async () => {
  await renderWithRouter(<ExploreByArea />);
};

describe('tests the component', () => {
  it('tests the api of areas functions call', async () => {
    api.default = jest.fn().mockReturnValue([]);
    searchFood.default = jest.fn().mockReturnValue([]);
    await act(render);
    expect(api.default).toHaveBeenCalled();
    expect(searchFood.default).toHaveBeenCalled();
  });
  it('tests the rendering', async () => {
    api.default = jest.fn().mockReturnValue(['teste1', 'teste2', 'teste3']);
    searchFood.default = jest.fn().mockReturnValue([{
      idMeal: '1234',
      strMeal: 'teste',
      strMealThumb: 'teste',
    }]);
    await act(render);
    const select = screen.getByTestId('explore-by-area-dropdown');
    expect(select).toBeInTheDocument();
    const option0 = screen.getByTestId('teste1-option');
    expect(option0).toBeInTheDocument();
    const option1 = screen.getByTestId('teste2-option');
    expect(option1).toBeInTheDocument();
    const card = screen.getByTestId('0-recipe-card');
    expect(card).toBeInTheDocument();
  });
  it('tests the user events', async () => {
    api.default = jest.fn().mockReturnValue(['teste1', 'teste2', 'teste3']);
    searchFoodByArea.default = jest.fn().mockReturnValue([]);
    searchFood.default = jest.fn().mockReturnValue([{
      idMeal: '1234',
      strMeal: 'teste',
      strMealThumb: 'teste',
    }]);
    const { history } = await renderWithRouter(<ExploreByArea />);
    expect(searchFood.default).toHaveBeenCalledTimes(1);
    const card = await screen.findByTestId('0-recipe-card');
    userEvent.click(card);
    const path = history.location.pathname;
    expect(path).toBe('/comidas/1234');
    const select = screen.getByTestId('explore-by-area-dropdown');
    userEvent.selectOptions(select, 'teste1');
    await expect(searchFoodByArea.default).toHaveBeenCalledTimes(1);
  });
});
