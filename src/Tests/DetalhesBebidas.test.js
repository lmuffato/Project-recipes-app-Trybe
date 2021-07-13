import React from 'react';
import { screen } from '@testing-library/react';
import DetalhesBebidas from '../pages/DetalhesBebidas';
import renderWithRouter from './renderWithRouter';

describe('Beverage Details Screen Tests', () => {
  it('Check if you have a photo', () => {
    renderWithRouter(<DetalhesBebidas />);
    const photo = screen.getByAltText('');

    expect(photo).toBeInTheDocument();
  });

  it('Check if you have a title recipe', () => {
    renderWithRouter(<DetalhesBebidas />);
    const title = screen.getByTestId('recipe-title');

    expect(title).toBeInTheDocument();
  });

  it('Check if you have a button share', () => {
    renderWithRouter(<DetalhesBebidas />);
    const share = screen.getByTestId('share-btn');

    expect(share).toBeInTheDocument();
  });

  it('Check if you have a share icon', () => {
    renderWithRouter(<DetalhesBebidas />);
    const sharebtn = screen.getByAltText('share-button');

    expect(sharebtn).toBeInTheDocument();
  });

  it('Check if you have a title recipe', () => {
    renderWithRouter(<DetalhesBebidas />);
    const fav = screen.getByAltText('favorite-button');

    expect(fav).toBeInTheDocument();
  });
});
