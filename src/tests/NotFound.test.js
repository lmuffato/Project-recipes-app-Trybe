import React from 'react';
import App from '../App';
import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';

it('Aparece mensagem de Not Found quando a rota é mudada para /explorar/bebidas/area',
  async () => {
    const { getByRole } = await renderWithRouterHooksAndProvider(
      <App />,
      '/explorar/bebidas/area',
    );

    const notFoundHeading = getByRole('heading', {
      name: 'Not Found',
      level: 1,
    });
    expect(notFoundHeading).toBeInTheDocument();
  });
