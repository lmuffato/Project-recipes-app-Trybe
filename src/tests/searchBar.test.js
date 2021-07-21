import { waitForElement, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';

const RECIPE_TITLE = 'recipe-title';
const FIRST_IMAGE = '0-card-img';
const SEARCH_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';

describe('Testa funcionalidade de searchBar', () => {
  it('Busca receita por ingrediente', async () => {
    const { getByTestId, getByText } = await renderWithRouterHooksAndProvider(
      <App />,
      '/comidas',
    );

    await waitForElement(() => getByTestId(SEARCH_BTN));
    expect(getByTestId(SEARCH_BTN)).toBeInTheDocument();
    fireEvent.click(getByTestId(SEARCH_BTN));

    fireEvent.change(getByTestId(SEARCH_INPUT), {
      target: { value: 'lemon' },
    });
    fireEvent.click(getByTestId('ingredient-search-radio'));
    fireEvent.click(getByTestId('exec-search-btn'));

    await waitForElement(() => getByText('BeaverTails'));
    expect(getByTestId(FIRST_IMAGE).src).toMatch('https://www.themealdb.com/images/media/meals/1548772327.jpg');
    expect(getByText('Baked salmon with fennel & tomatoes')).toBeInTheDocument();
    expect(getByText('BeaverTails')).toBeInTheDocument();
  });

  it('Busca receita por nome', async () => {
    const { getByTestId } = await renderWithRouterHooksAndProvider(
      <App />,
      '/comidas',
    );

    await waitForElement(() => getByTestId(SEARCH_BTN));
    expect(getByTestId(SEARCH_BTN)).toBeInTheDocument();
    fireEvent.click(getByTestId(SEARCH_BTN));

    fireEvent.change(getByTestId(SEARCH_INPUT), {
      target: { value: 'pasta' },
    });
    fireEvent.click(getByTestId('name-search-radio'));
    fireEvent.click(getByTestId('exec-search-btn'));

    await waitForElement(() => getByTestId(RECIPE_TITLE));
    expect(getByTestId(RECIPE_TITLE)).toBeInTheDocument();
    expect(getByTestId('recipe-photo').src).toMatch('https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg');
    expect(getByTestId('video')).toBeInTheDocument();
  });

  it('Limpa input de busca', async () => {
    const { getByTestId, getByText } = await renderWithRouterHooksAndProvider(
      <App />,
      '/comidas',
    );

    await waitForElement(() => getByTestId(SEARCH_BTN));
    expect(getByTestId(SEARCH_BTN)).toBeInTheDocument();
    fireEvent.click(getByTestId(SEARCH_BTN));

    const searcInput = getByTestId(SEARCH_INPUT);
    fireEvent.change(searcInput, {
      target: { value: 'besteira qualquer' },
    });
    expect(searcInput.value).toBe('besteira qualquer');
    fireEvent.click(getByText('Resetar'));

    expect(searcInput.value).toBe('');
  });
});
