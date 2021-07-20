// import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import renderWithRouterAct from './renderWithRouterAct';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const VALID_EMAIL = 'teste@teste.com';
const VALID_PASSWORD = '1234567';
const BUTTON_TEST_ID = 'login-submit-btn';

const loginProcess = () => {
  renderWithRouterAct();
  const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
  const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
  const button = screen.getByTestId(BUTTON_TEST_ID);
  userEvent.type(email, VALID_EMAIL);
  userEvent.type(password, VALID_PASSWORD);
  fireEvent.click(button);
};

export default loginProcess;
