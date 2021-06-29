import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Header from '../components/Header';

const DATA_TESTID = 'data-testid';

describe(`9 - Implemente os elementos do header na tela principal de receitas,
  respeitando os atributos descritos no protótipo`, () => {
  it(`Tem os data-testids 'profile-top-btn', 'page-title' e
    'search-top-btn'`, async () => {
    await act(async () => {
      render(<Header />);
    });
    const buttons = screen.getAllByRole('button');
    const pageTitle = screen.getByText(/comidas/g);
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[0]).toHaveProperty(DATA_TESTID, 'profile-top-btn');
    expect(buttons[1]).toBeInTheDocument();
    expect(buttons[1]).toHaveProperty(DATA_TESTID, 'search-top-btn');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveProperty(DATA_TESTID, 'page-title');
  });
});
