import { waitForElement } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';

const RECIPE_TITLE_TEST_ID = 'recipe-title';
const FIRST_IMAGE_TEST_ID = '0-card-img';

describe('Testes de rotas do App', () => {
  it('Aparece mensagem de Not Found quando a rota é mudada para /explorar/bebidas/area',
    () => {
      const { getByRole } = renderWithRouterHooksAndProvider(
        <App />,
        '/explorar/bebidas/area',
      );

      const notFoundHeading = getByRole('heading', {
        name: 'Not Found',
        level: 1,
      });
      expect(notFoundHeading).toBeInTheDocument();
    });

  it('Rota /explorar/bebidas/ingredientes renderiza corretamente',
    async () => {
      const { getByText, getByTestId } = renderWithRouterHooksAndProvider(
        <App />,
        '/explorar/bebidas/ingredientes',
      );

      await waitForElement(() => getByTestId(FIRST_IMAGE_TEST_ID));
      await waitForElement(() => getByText('Light rum'));

      expect(getByTestId(FIRST_IMAGE_TEST_ID)).toBeInTheDocument();
      expect(getByText('Light rum')).toBeInTheDocument();
    });

  it('Rota /explorar/comidas/ingredientes renderiza corretamente',
    async () => {
      const { getByText, getByTestId } = renderWithRouterHooksAndProvider(
        <App />,
        '/explorar/comidas/ingredientes',
      );

      await waitForElement(() => getByTestId(FIRST_IMAGE_TEST_ID));

      expect(getByTestId(FIRST_IMAGE_TEST_ID)).toBeInTheDocument();
      expect(getByText('Chicken')).toBeInTheDocument();
      expect(getByTestId('1-card-img')).toBeInTheDocument();
      expect(getByText('Salmon')).toBeInTheDocument();
    });

  it('Rota /comidas/:id renderiza corretamente',
    async () => {
      const { getByText, getByTestId } = renderWithRouterHooksAndProvider(
        <App />,
        '/comidas/52940',
      );

      await waitForElement(() => getByTestId(RECIPE_TITLE_TEST_ID));

      expect(getByTestId(RECIPE_TITLE_TEST_ID)).toBeInTheDocument();
      expect(getByTestId('recipe-category')).toBeInTheDocument();
      expect(getByText('Recomendadas')).toBeInTheDocument();
    });

  it('Rota /bebidas/:id renderiza corretamente',
    async () => {
      const { getByText, getByTestId } = renderWithRouterHooksAndProvider(
        <App />,
        '/bebidas/15997',
      );

      await waitForElement(() => getByTestId('recipe-photo'));

      expect(getByTestId('recipe-photo')).toBeInTheDocument();
      expect(getByTestId(RECIPE_TITLE_TEST_ID)).toBeInTheDocument();
      expect(getByTestId('recipe-category')).toBeInTheDocument();
      expect(getByText('Recomendadas')).toBeInTheDocument();
    });

  it('Rota /explorar/comidas/area renderiza corretamente',
    async () => {
      const { getByText, getByTestId } = renderWithRouterHooksAndProvider(
        <App />,
        '/explorar/comidas/area',
      );

      await waitForElement(() => getByTestId(FIRST_IMAGE_TEST_ID));

      expect(getByTestId(FIRST_IMAGE_TEST_ID)).toBeInTheDocument();
      expect(getByText('Corba')).toBeInTheDocument();
      expect(getByText('Kumpir')).toBeInTheDocument();
      expect(getByText('Tamiya')).toBeInTheDocument();
    });
});
