import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';
// import { meals } from '../../cypress/mocks/areas';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const LOGIN_BTN_TEST_ID = 'login-submit-btn';
const MOCK_EMAIL = 'alguem@alguem.com';

const EXPLORE_AREA_PAGE_PATH = '/explorar/comidas/area';

describe('Teste da página de Explorar Comidas por Area', () => {
  test('O header é renderizado corretamente', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(EXPLORE_AREA_PAGE_PATH);

    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toHaveTextContent('Explorar Origem');
    expect(getByTestId('search-top-btn')).toBeInTheDocument();
  });

  test('O dropdown é renderizado corretamente', () => {
    const { getByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(EXPLORE_AREA_PAGE_PATH);

    const dropdown = getByTestId('explore-by-area-dropdown');

    expect(dropdown).toBeInTheDocument();
  });

  test('Todas as opções estão no dropdown', async () => {
    const { getByTestId, findAllByTestId, history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(EXPLORE_AREA_PAGE_PATH);

    const optionRegex = /.-option/;
    const areaOptions = await findAllByTestId(optionRegex);

    areaOptions.forEach((area) => {
      expect(area).toBeInTheDocument();
    });
  });

  test('Testa uma opção de área', async () => {
    const {
      getByTestId,
      findByTestId,
      findByText,
      history } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(EXPLORE_AREA_PAGE_PATH);

    const dropdown = await findByTestId('explore-by-area-dropdown');

    expect(dropdown).toBeInTheDocument();

    fireEvent.change(dropdown, { target: { value: 'American' } });

    const bigMac = await findByText('Big Mac');
    expect(bigMac).toBeInTheDocument();
  });
});
