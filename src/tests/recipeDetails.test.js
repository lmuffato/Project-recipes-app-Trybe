import React from 'react';

import { screen } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import { waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';
import App from '../App';

describe('Testes da página Detalhes da Receita', () => {
  it('Espera que redirecione para a página de detalhes', async () => {
    await act(async () => {
      const { history } = await renderWithRouterHooksAndProvider(<App />, '/comidas');

      const recipeCard = await waitForElement(() => screen.getByTestId('0-recipe-card'));
      await userEvent.click(recipeCard);

      expect(history.location.pathname).toMatch('/comidas/52977');
    });
  });

  it('Página de detalhes da receita tem título da receita', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<App />, '/comidas');
      const recipeCard = await waitForElement(() => screen.getByTestId('0-recipe-card'));
      await userEvent.click(recipeCard);

      const recipeTitle = await waitForElement(() => screen.getByTestId('recipe-title'));

      expect(recipeTitle).toBeInTheDocument();
    });
  });

  it('Página de detalhes possui instruções da receita', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<App />, '/comidas/52977');
      const recipeInstructions = await waitForElement(() => screen.getByText(
        /pick through your lentils for any foreign debris, rinse them 2 or 3 times,/i,
      ));

      expect(recipeInstructions).toBeInTheDocument();
    });
  });
});
