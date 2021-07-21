import { waitForElement, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';

const RECIPE_TITLE_TEST_ID = 'recipe-title';
const CORBA = 'Corba';

describe('Testes Done Recipes', () => {
  it('Receita é adicionada corretamente', async () => {
    const { getByText, getByTestId } = await renderWithRouterHooksAndProvider(
      <App />,
      '/comidas/52977',
    );

    const FINISH_BTN = 'finish-recipe-btn';

    await waitForElement(() => getByTestId(RECIPE_TITLE_TEST_ID));
    expect(getByText('Corba')).toBeInTheDocument();
    const startRecipeBtn = getByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();

    fireEvent.click(startRecipeBtn);
    await waitForElement(() => getByTestId(FINISH_BTN));
    expect(getByTestId(FINISH_BTN)).toBeInTheDocument();
    expect(getByTestId(FINISH_BTN)).toBeDisabled();

    const TOTAL_INGREDIENTS = 12;
    for (let index = 0; index <= TOTAL_INGREDIENTS; index += 1) {
      fireEvent.click(getByTestId(`${index}-ingredient-step`));
    }

    expect(getByTestId(FINISH_BTN)).not.toBeDisabled();
    fireEvent.click(getByTestId(FINISH_BTN));
    await waitForElement(() => getByTestId('page-title'));
    expect(getByText('Receitas Feitas')).toBeInTheDocument();
    const corba = getByText(CORBA);
    fireEvent.click(getByTestId('filter-by-drink-btn'));
    expect(corba).not.toBeInTheDocument();
    fireEvent.click(getByTestId('filter-by-food-btn'));
    expect(getByText(CORBA)).toBeInTheDocument();
    fireEvent.click(getByTestId('filter-by-all-btn'));
    expect(getByText(CORBA)).toBeInTheDocument();
  });
});
