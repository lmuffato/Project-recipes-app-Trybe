import userEvent from '@testing-library/user-event';
import React from 'react';
import Foods from '../pages/recipes-main/Foods/Foods';
import renderWithRouter from './renderWithRouter';

describe.skip('Teste mock Usando FindByTestId', () => {
  it('Test mock Foods', async () => {
    const { history, findByTestId } = renderWithRouter(<Foods />);
    history.push('/comidas');
    const pathName = history.location.pathname;
    expect(pathName).toBe('/comidas');
    const filterBeef = await findByTestId('Beef-category-filter');
    expect(filterBeef).toBeInTheDocument();
    userEvent.click(filterBeef);
  });
});
