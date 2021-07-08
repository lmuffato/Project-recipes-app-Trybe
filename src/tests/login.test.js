import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { fireEvent, screen } from '@testing-library/dom';
// import App from '../App';
import Home from '../pages/Home';

import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';

describe('1 - Crie uma página inicial de login de acordo com os seguintes'
+ 'parâmetros:', () => {
  it('A rota para esta página deve ser \'/\'', () => {
    const { history } = renderWithRouterHooksAndProvider(<Home />, '/');
    expect(history.location.pathname).toBe('/');
  });
});
