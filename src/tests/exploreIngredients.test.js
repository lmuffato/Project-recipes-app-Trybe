import React from 'react';

import { screen } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';
import { waitForElement } from '@testing-library/react';
import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';
import App from '../App';

const INGREDIENT_TEST_ID = '0-ingredient-card';
const INGREDIENT_CARD_NAME = '0-card-name';

describe('Testes da página Explorar Bebidas por ingredientes', () => {
  it('Espera que tenha o primeiro card de ingrediente', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<App />, '/explorar/bebidas/ingredientes');

      const ingredientCard = await waitForElement(() => screen.getByTestId(
        INGREDIENT_TEST_ID,
      ));

      expect(ingredientCard).toBeInTheDocument();
    });
  });

  it('Espera que tenha o primeiro card de ingrediente na pág'
    + ' Explorar Comidas por ingredientes', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<App />, '/explorar/comidas/ingredientes');

      const ingredientCardName = await waitForElement(() => screen.getByTestId(
        INGREDIENT_CARD_NAME,
      ));

      expect(ingredientCardName).toBeInTheDocument();
    });
  });
});
