import React from 'react';
import renderWithRouter from './renderWithRouter';
import Explore from '../pages/Explore';

describe('Explore screen', () => {
  it('Check if the Explore page has been rendered', () => {
    const { getByText } = renderWithRouter(<Explore />);
    const exploreTitle = getByText('Explorar');
    expect(exploreTitle).toBeInTheDocument();
  });
});
