import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import getTestInfo from './helper/mocks/getTestInfo';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';

const { getByRole, queryByRole, getByTestId } = screen;
const { doTheLoginProcess } = getTestInfo();

describe('Requirement 11', () => {
  it('changes to the Profile Page', async () => {
    await renderWithRouterAndContext();

    doTheLoginProcess(getByTestId, userEvent);

    const profilePageButton = getByRole('button', {
      name: /profile avatar/i,
    });
    userEvent.click(profilePageButton);
  });
});

describe('Requirement 12', () => {
  it('shows and hides the search input', async () => {
    await renderWithRouterAndContext();

    doTheLoginProcess(getByTestId, userEvent);

    const searchButton = getByRole('img', {
      name: /search/i,
    });

    expect(queryByRole('textbox')).toBeNull();
    userEvent.click(searchButton);
    expect(queryByRole('textbox')).toBeInTheDocument();
  });
});
