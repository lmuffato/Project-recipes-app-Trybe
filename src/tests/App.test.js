import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const renderAppWithRouter = () => renderWithRouter(<App />);

describe('Página de Login', () => {
  test('Exibe um heading com o "Título" escrito', () => {
    const { getByRole } = renderAppWithRouter();
    const loginTitle = getByRole('heading', { level: 1, name: 'Login' });
    expect(loginTitle).toBeInTheDocument();
  });
  test('Exibe um heading com o "Título" escrito', () => {
    const { getByTestId } = renderAppWithRouter();
    const emailInput = getByTestId('email-input');
  });
});
