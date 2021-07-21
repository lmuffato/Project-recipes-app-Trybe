import { waitForElement, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';

// implementação do mock de copia pro clipboard consultada no stackOverflow
// https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest
Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Funcionalidade de Copia pro clipboard', () => {
  describe('writeText', () => {
    jest.spyOn(navigator.clipboard, 'writeText');
    beforeAll(async () => {
      const { getByTestId, getByText } = await renderWithRouterHooksAndProvider(
        <App />,
        '/bebidas/17187',
      );
      await waitForElement(() => getByText('Derby'));
      expect(getByTestId('share-btn')).toBeInTheDocument();
      fireEvent.click(getByTestId('share-btn'));
    });

    it('Deve ter chamado clipboard.writeText', () => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/bebidas/17187');
    });
  });
});
