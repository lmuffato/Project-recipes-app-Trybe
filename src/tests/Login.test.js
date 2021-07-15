import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';

const { queryByTestId, getByTestId } = screen;

const { headerRenderTests, footerRenderTests } = getTest('/');
const { itDoesntRenderHeader } = headerRenderTests();
const { itDoesntRenderFooter } = footerRenderTests();

describe('Login screen', () => {
  describe('Check Header and Footer components', async () => {
    it('doesnt render the Header and Footer on the Login screen', async () => {
      await renderWithRouterAndContext();

      itDoesntRenderHeader(queryByTestId);
      itDoesntRenderFooter(queryByTestId);
    });
  });

  it('does and checks the user login process', async () => {
    await renderWithRouterAndContext();

    const passwordInput = getByTestId('password-input');
    const emailInput = getByTestId('email-input');
    const loginSubmitButton = getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'renzo@gmail.com');
    userEvent.type(passwordInput, '12345');
    expect(loginSubmitButton).toHaveAttribute('disabled');

    userEvent.type(passwordInput, '1234567');
    expect(loginSubmitButton).not.toHaveAttribute('disabled');
    userEvent.click(loginSubmitButton);
  });
});
