import React from 'react';
import { act, screen } from '@testing-library/react';
import renderWithRouterAndProvider from './renderWithRouterAndProvider';
import mockFetch from '../../cypress/mocks/fetch';
import Foods from '../pages/Foods';

beforeAll(() => jest.spyOn(window, 'fetch'));

beforeEach(() => window.fetch.mockImplementation(mockFetch));
describe('tests in /comidas', () => {
  it('Has a header Comidas in the page', () => {
    renderWithRouterAndProvider(
      <Foods />,
    );
    const header = screen.getByText('Comidas');
    expect(header).toBeInTheDocument();
  });
  it('Has 12 meals in the screen', async () => {
    renderWithRouterAndProvider(
      <Foods />,
    );
    await act(() => mockFetch());
    const expectedLength = 12;
    const meal0 = await screen.findByTestId('0-card-name');
    const meal11 = await screen.findByTestId('11-card-name');
    const meals = await screen.findAllByTestId(/^([0-9]|10|11)-card-name/); // source: https://forums.asp.net/t/2013292.aspx?Regex+for+range+of+numbers+1+11+
    expect(meal0 && meal11).toBeInTheDocument();
    expect(meals).toHaveLength(expectedLength);
  });

  // it('appear an alert when don\'t have a recipe with the filter', async () => {
  //   renderWithRouterAndProvider(
  //     <Foods />,
  //   );
  //   jest.spyOn(window, 'alert');
  //   window.alert.mockImplementation(mockFetch);
  //   await act(() => mockFetch());
  //   const seachBarBTN = screen.getByTestId('search-top-btn');
  //   expect(seachBarBTN).toBeInTheDocument();
  //   fireEvent.click(seachBarBTN);
  //   const searchBarInput = await screen.findByTestId('search-input');
  //   expect(searchBarInput).toBeInTheDocument();
  //   fireEvent.change(searchBarInput, { target: { value: 'nothing' } });
  //   const radioBtnIngredientt = await screen.findByTestId('ingredient-search-radio');
  //   expect(radioBtnIngredientt).toBeInTheDocument();
  //   fireEvent.click(radioBtnIngredientt);
  //   const searchBTN = await screen.findByTestId('exec-search-btn');
  //   expect(searchBTN).toBeInTheDocument();
  //   expect(global.alert).toBeCalled();
  // });
});
