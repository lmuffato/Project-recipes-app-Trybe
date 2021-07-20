import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';

import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';
import Home from '../pages/Home';

describe('', () => {
  it('', () => {
    act(() => {
      renderWithRouterHooksAndProvider(<Home type="meals" />, 'comidas');
    });
  });
});
