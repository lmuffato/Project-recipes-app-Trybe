import React from 'react';
import { screen } from '@testing-library/react';
import Header from '../components/Header';
import renderWithRouter from './renderWithRouter';

describe('Header component tests', () => {
  it('Check if you have a profile picture', () => {
    renderWithRouter(<Header />);
    const img = screen.getByAltText('Profile');

    expect(img).toBeInTheDocument();
  });

  it('Check if you have a profile picture', () => {
    renderWithRouter(<Header />);
    const img = screen.getByTestId('page-title');

    expect(img).toBeInTheDocument();
  });
});
