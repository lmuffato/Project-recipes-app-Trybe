import { waitForElement, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';

const RECIPE_TITLE_TEST_ID = 'recipe-title';
const CORBA = 'Corba';
const SHARE_BTN = 'share-btn';
// implementação do mock de copia pro clipboard consultada no stackOverflow
// https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest
Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Funcionalidade de Copia pro clipboard', () => {
  it('Testa copia pro clipboard', async () => {
    jest.spyOn(navigator.clipboard, 'writeText');
    const { getByTestId, getByText } = await renderWithRouterHooksAndProvider(
      <App />,
      '/bebidas/17187',
    );
    await waitForElement(() => getByText('Derby'));
    expect(getByTestId(SHARE_BTN)).toBeInTheDocument();
    fireEvent.click(getByTestId(SHARE_BTN));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/bebidas/17187');
    expect(getByText('Link copiado!')).toBeInTheDocument();
  });

  it('Testa copia pro clipboard na tela de receitas feitas', async () => {
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
    expect(corba).toBeInTheDocument();
    expect(getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    fireEvent.click(getByTestId('0-horizontal-share-btn'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/bebidas/17187');
    expect(getByText('Link copiado!')).toBeInTheDocument();
  });
});
