import { waitForElement, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';

const RECIPE_TITLE = 'recipe-title';
const FIRST_IMAGE = '0-card-img';
const SEARCH_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const EXEC_SEARCH_BTN = 'exec-search-btn';

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
    fireEvent.click(getByTestId(EXEC_SEARCH_BTN));

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
    fireEvent.click(getByTestId(EXEC_SEARCH_BTN));

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

  it('Busca receita por primeira letra', async () => {
    const { getByTestId, getByText } = await renderWithRouterHooksAndProvider(
      <App />,
      '/comidas',
    );

    await waitForElement(() => getByTestId(SEARCH_BTN));
    expect(getByTestId(SEARCH_BTN)).toBeInTheDocument();
    fireEvent.click(getByTestId(SEARCH_BTN));

    fireEvent.change(getByTestId(SEARCH_INPUT), {
      target: { value: 'a' },
    });
    fireEvent.click(getByTestId('first-letter-search-radio'));
    fireEvent.click(getByTestId(EXEC_SEARCH_BTN));

    await waitForElement(() => getByText('Apple Frangipan Tart'));
    expect(getByTestId(FIRST_IMAGE).src).toMatch('https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg');
    expect(getByText('Apple & Blackberry Crumble')).toBeInTheDocument();
    expect(getByText('Ayam Percik')).toBeInTheDocument();
  });

  it('Busca bebida por primeira letra', async () => {
    const { getByTestId, getByText } = await renderWithRouterHooksAndProvider(
      <App />,
      '/bebidas',
    );

    await waitForElement(() => getByTestId(SEARCH_BTN));
    expect(getByTestId(SEARCH_BTN)).toBeInTheDocument();
    fireEvent.click(getByTestId(SEARCH_BTN));

    fireEvent.change(getByTestId(SEARCH_INPUT), {
      target: { value: 'd' },
    });
    fireEvent.click(getByTestId('first-letter-search-radio'));
    fireEvent.click(getByTestId(EXEC_SEARCH_BTN));

    await waitForElement(() => getByText('Derby'));
    expect(getByTestId(FIRST_IMAGE).src).toMatch('https://www.thecocktaildb.com/images/media/drink/52weey1606772672.jpg');
    expect(getByText('Derby')).toBeInTheDocument();
    expect(getByText('Diesel')).toBeInTheDocument();
  });

  it('Busca bebida por ingrediente', async () => {
    const { getByTestId, getByText } = await renderWithRouterHooksAndProvider(
      <App />,
      '/bebidas',
    );

    await waitForElement(() => getByTestId(SEARCH_BTN));
    expect(getByTestId(SEARCH_BTN)).toBeInTheDocument();
    fireEvent.click(getByTestId(SEARCH_BTN));

    fireEvent.change(getByTestId(SEARCH_INPUT), {
      target: { value: 'vodka' },
    });
    fireEvent.click(getByTestId('ingredient-search-radio'));
    fireEvent.click(getByTestId(EXEC_SEARCH_BTN));

    await waitForElement(() => getByText('155 Belmont'));
    expect(getByTestId(FIRST_IMAGE).src).toMatch('https://www.thecocktaildb.com/images/media/drink/yqvvqs1475667388.jpg');
    expect(getByText('501 Blue')).toBeInTheDocument();
    expect(getByText('57 Chevy with a White License Plate')).toBeInTheDocument();
  });

  it('Busca bebida por nome', async () => {
    const { getByText, getByTestId } = await renderWithRouterHooksAndProvider(
      <App />,
      '/bebidas',
    );

    await waitForElement(() => getByTestId(SEARCH_BTN));
    expect(getByTestId(SEARCH_BTN)).toBeInTheDocument();
    fireEvent.click(getByTestId(SEARCH_BTN));

    fireEvent.change(getByTestId(SEARCH_INPUT), {
      target: { value: '747' },
    });
    fireEvent.click(getByTestId('name-search-radio'));
    fireEvent.click(getByTestId(EXEC_SEARCH_BTN));

    await waitForElement(() => getByTestId(FIRST_IMAGE));
    expect(getByTestId(FIRST_IMAGE).src).toMatch('https://www.thecocktaildb.com/images/media/drink/xxsxqy1472668106.jpg');
    expect(getByText('747')).toBeInTheDocument();
    expect(getByText('747 Drink')).toBeInTheDocument();
  });
});
