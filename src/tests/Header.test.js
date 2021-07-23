import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Provider from '../contexts/Provider';
import MyContext from '../contexts/MyContext';
import renderWithRouter from './renderWithRouter';
import meals from '../../cypress/mocks/meals';

describe('Test Header', () => {
  it('Test profile button', async () => {
    const { getByTestId, getByText, history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('/comidas');

    const myTittle = getByText('Comidas');
    expect(myTittle).toBeInTheDocument();

    const profileBtn = getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();

    fireEvent.click(profileBtn);
    const { location } = history;
    const { pathname } = location;
    expect(pathname).toBe('/perfil');
  });

  it('Test search bar', async () => {
    // global.fetch = jest.fn(() => (
    //   Promise.resolve({
    //     json: () => Promise.resolve(meals),
    //   })));

    const { getByTestId, getByText, history } = await renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    history.push('/comidas');

    const searchBtn = getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();

    fireEvent.click(searchBtn);
    const buscarBtn = getByTestId('exec-search-btn');
    expect(buscarBtn).toBeInTheDocument();

    const searchInput = getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    const ingredientRadio = getByTestId('ingredient-search-radio');
    expect(ingredientRadio).toBeInTheDocument();

    const nameRadio = getByTestId('name-search-radio');
    expect(nameRadio).toBeInTheDocument();

    const firstLetterRadio = getByTestId('first-letter-search-radio');
    expect(firstLetterRadio).toBeInTheDocument();

    // fireEvent.click(ingredientRadio);
    // userEvent.type(searchInput, 'chicken');
    // fireEvent.click(buscarBtn);

    const firstRecipe = await getByText('Corba');
    expect(firstRecipe).toBeInTheDocument();
  });
});
