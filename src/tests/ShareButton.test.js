import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const LOGIN_BTN_TEST_ID = 'login-submit-btn';
const MOCK_EMAIL = 'alguem@alguem.com';

describe('Teste dos botoes de categoria página de Comidas', () => {
  test('filtro é aplicado ao clicar no botão', () => {
    const { getByTestId, getByText, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/comidas/52977');

    const shareBtn = getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    userEvent.click(shareBtn);

    expect(getByText('Link copiado!')).toBeInTheDocument();
  });
});
