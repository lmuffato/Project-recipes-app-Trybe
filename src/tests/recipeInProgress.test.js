import React from 'react';

import { screen } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import { waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';
import App from '../App';

const ROTA_RECEITA_CORBA = 'comidas/52977/in-progress';

describe('Testes da tela de receita em andamento', () => {
  it('A receita possui ingredientes listados', async () => {
    await act(async () => {
      await renderWithRouterHooksAndProvider(<App />, ROTA_RECEITA_CORBA);

      const lentils = await waitForElement(() => screen.getByText(/1 cup lentils/i));
      const onions = await waitForElement(() => screen.getByText(/1 large onion/i));
      const tomatoes = await waitForElement(() => screen.getByText(
        /1 tbs tomato puree/i,
      ));

      expect(lentils).toBeInTheDocument();
      expect(onions).toBeInTheDocument();
      expect(tomatoes).toBeInTheDocument();
    });
  });

  it('A receita possui ingredientes listados', async () => {
    await act(async () => {
      const { history } = await renderWithRouterHooksAndProvider(<App />,
        ROTA_RECEITA_CORBA);

      const lentils = await waitForElement(() => screen.getByRole('checkbox',
        { name: /1 cup lentils/i }));
      const onions = await waitForElement(() => screen.getByRole('checkbox',
        { name: /1 large onion/i }));

      await userEvent.click(lentils);
      await userEvent.click(onions);

      await history.push(ROTA_RECEITA_CORBA);

      expect(lentils).toBeChecked();
      expect(onions).toBeChecked();
    });
  });
});
