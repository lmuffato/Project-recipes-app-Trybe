import React from 'react';
import userEvent from '@testing-library/user-event';
import Foods from '../pages/Foods';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';

describe('Requirement 11', () => {
  it('changes to the Profile Page', () => {
    const { getByRole, history } = renderWithRouterAndContext(<Foods />, {
      value: {
        meals: [],
        drinks: [],
        list: { meals: [], drinks: [] },
        searchedByCategory: false,
      },
      initialEntries: ['/comidas'],
    });

    const profilePageButton = getByRole('button', {
      name: /profile avatar/i,
    });
    userEvent.click(profilePageButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });
});

describe('Requirement 12', () => {
  it('shows and hides the search input', () => {
    const { queryByRole, getByRole } = renderWithRouterAndContext(<Foods />, {
      value: { meals: [], drinks: [], list: { meals: [], drinks: [] } },
      initialEntries: ['/comidas'],
    });

    const searchButton = getByRole('img', {
      name: /search/i,
    });

    expect(queryByRole('textbox')).toBeNull();
    userEvent.click(searchButton);
    expect(queryByRole('textbox')).toBeInTheDocument();
  });
});
