import { waitForElement, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import ExploreContainer from '../styles/exploreIngredients';
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
});
