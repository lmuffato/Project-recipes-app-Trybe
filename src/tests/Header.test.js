import React from 'react';
// import { render, screen } from '@testing-library/react';
import Comidas from '../pages/Comidas';
import renderWithRouter from './renderWithRouter';

const TITLE = /comidas/i;
const DATA_TESTID = 'data-testid';

describe(`9 - Implemente os elementos do header na tela principal de receitas,
  respeitando os atributos descritos no protótipo`, () => {
  it(`Tem os data-testids 'profile-top-btn', 'page-title' e
    'search-top-btn'`, async () => {
    const { getAllByRole, getByText } = renderWithRouter(<Comidas />);

    const buttons = getAllByRole('button');
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[0].getAttribute(DATA_TESTID)).toEqual('profile-top-btn');
    expect(buttons[1]).toBeInTheDocument();
    expect(buttons[1].getAttribute(DATA_TESTID)).toEqual('search-top-btn');
    const pageTitle = getByText(TITLE);
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.getAttribute(DATA_TESTID)).toEqual('page-title');
  });
});
