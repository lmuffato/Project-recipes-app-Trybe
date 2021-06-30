import React from 'react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testing if the header is rendered', () => {
  test('check if the header is rendered on the profile page', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const title = getByTestId('page-title');
    // const profile = getByTestId('profile-top-btn');
    // const search = getByTestId('search-top-btn');

    // userEvent.click(profile);
    // userEvent.click(search);

    expect(title).toHaveTextContent(/título/i);
  });
});
