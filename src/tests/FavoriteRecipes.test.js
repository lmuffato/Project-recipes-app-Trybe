import { waitForElement, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';

describe('Testa funcionalidade de receitas favoritas', () => {
  it('Ao entrar pela primeira vez mostra msg que não há receitas favoritas', async () => {
    const { getByTestId, getByText } = renderWithRouterHooksAndProvider(
      <App />,
      '/comidas',
    );

    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    fireEvent.click(getByTestId('profile-top-btn'));

    expect(getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(getByTestId('profile-logout-btn')).toBeInTheDocument();

    fireEvent.click(getByTestId('profile-favorite-btn'));
    const noFavoritesMsg = getByText('Você não possui receitas favoritas!');
    expect(noFavoritesMsg).toBeInTheDocument();
  });

  const FAVORITE_BTN = 'favorite-btn';
  const FIRST_IMG = '0-horizontal-image';

  it('Receita é favoritada corretamente',
    async () => {
      const {
        getByText,
        getByTestId,
        history,
      } = renderWithRouterHooksAndProvider(
        <App />,
        '/bebidas/15997',
      );

      await waitForElement(() => getByTestId('recipe-photo'));

      expect(getByTestId(FAVORITE_BTN)).toBeInTheDocument();
      fireEvent.click(getByTestId(FAVORITE_BTN));
      history.push('/receitas-favoritas');

      await waitForElement(() => getByTestId(FIRST_IMG));
      expect(getByTestId(FIRST_IMG)).toBeInTheDocument();
      expect(getByText('GG')).toBeInTheDocument();

      history.push('/bebidas/15997');
      await waitForElement(() => getByTestId('recipe-photo'));

      expect(getByTestId('share-btn')).toBeInTheDocument();
      expect(getByTestId(FAVORITE_BTN).src).toMatch(
        'blackHeartIcon.svg',
      );
      fireEvent.click(getByTestId(FAVORITE_BTN));
      expect(getByTestId(FAVORITE_BTN).src).toMatch(
        'whiteHeartIcon.svg',
      );
    });
});
