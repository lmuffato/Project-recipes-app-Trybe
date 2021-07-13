import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Screen tests not found', () => {
  it('Check if the correct message appears', () => {
    renderWithRouter(<NotFound />);
    const txt = screen.getByText('Not Found');

    expect(txt).toBeInTheDocument();
  });
});
