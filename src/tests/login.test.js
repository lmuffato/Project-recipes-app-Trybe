import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';

import { fireEvent } from '@testing-library/react';
import App from '../App';

import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';
import Login from '../pages/Login';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const VALID_EMAIL = 'teste@teste.com';
const VALID_PASSWORD = '1234567';
const BUTTON_TEST_ID = 'login-submit-btn';

describe('1 - Crie uma página inicial de login de acordo com os seguintes '
+ 'parâmetros:', () => {
  it('A rota para esta página deve ser \'/\'', () => {
    act(() => {
      const { history } = renderWithRouterHooksAndProvider(<App />, '/');

      expect(history.location.pathname).toBe('/');
    });
  });
  it('Pessoa usuária consegue inserir email e senha', () => {
    act(() => {
      renderWithRouterHooksAndProvider(<App />, '/');

      const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
      expect(email).toBeInTheDocument();
      expect(password).toBeInTheDocument();
    });
  });
  it('A tela de login possui um botão com o texto \'Entrar\'', () => {
    act(() => {
      renderWithRouterHooksAndProvider(<App />, '/');

      const button = screen.getByRole('button', {
        name: /entrar/i,
      });
      expect(button).toBeInTheDocument();
    });
  });
});

describe('2 - Na tela de login são realizadas as seguintes verificações: ', () => {
  it('O botão Entrar está desabilitado quando a página é renderizada', () => {
    act(() => {
      renderWithRouterHooksAndProvider(<App />, '/');

      const button = screen.getByRole('button', {
        name: /entrar/i,
      });
      expect(button).toBeDisabled();
    });
  });
  it('O botão de Entrar continua desabilitado quando um email'
  + 'inválido é inserido', () => {
    act(() => {
      renderWithRouterHooksAndProvider(<App />, '/');

      const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
      const button = screen.getByRole('button', {
        name: /entrar/i,
      });

      userEvent.type(email, 'email');
      userEvent.type(password, VALID_PASSWORD);
      expect(button).toBeDisabled();

      userEvent.type(email, 'teste@com@');
      userEvent.type(password, VALID_PASSWORD);
      expect(button).toBeDisabled();

      userEvent.type(email, 'teste@email..');
      userEvent.type(password, VALID_PASSWORD);
      expect(button).toBeDisabled();
    });
  });

  it('O botão de Entrar continua desabilitado quando uma '
  + 'senha inválida é inserida', () => {
    act(() => {
      renderWithRouterHooksAndProvider(<App />, '/');

      const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
      const button = screen.getByRole('button', {
        name: /entrar/i,
      });

      userEvent.type(email, VALID_EMAIL);
      userEvent.type(password, '123');
      expect(button).toBeDisabled();

      userEvent.type(email, VALID_EMAIL);
      userEvent.type(password, '12345');
      expect(button).toBeDisabled();

      userEvent.type(email, VALID_EMAIL);
      userEvent.type(password, '     ');
      expect(button).toBeDisabled();

      userEvent.type(email, VALID_EMAIL);
      userEvent.type(password, '');
      expect(button).toBeDisabled();
    });
  });

  it('O botão de Entrar está habilitado quando um email e senha '
  + 'válidos são digitados nos campos do formulário', async () => {
    await act(async () => {
      renderWithRouterHooksAndProvider(<App />, '/');

      const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
      const button = screen.getByRole('button', {
        name: /entrar/i,
      });

      await userEvent.type(email, VALID_EMAIL);
      await userEvent.type(password, VALID_PASSWORD);

      expect(button).not.toBeDisabled();
    });
  });
});

describe('3 - Verifica se o email da pessoa usuária é salvo no Local Storage '
 + 'e se a pessoa usuária é redirecionada para a tela principal após o login', () => {
  it('A rota deve ser mudada para \'/comidas\' após o clique no botão', async () => {
    await act(async () => {
      const { history } = renderWithRouterHooksAndProvider(<App />, '/');

      const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
      const button = screen.getByTestId(BUTTON_TEST_ID);

      await userEvent.type(email, VALID_EMAIL);
      await userEvent.type(password, VALID_PASSWORD);
      await fireEvent.click(button);

      expect(history.location.pathname).toMatch('/comidas');
    });
  });

  it('O email da pessoa usuária e dois tokens são salvos '
    + 'corretamente no Local Storage', async () => {
    await act(async () => {
      renderWithRouterHooksAndProvider(<Login />, '/');

      const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
      const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
      const button = screen.getByTestId(BUTTON_TEST_ID);

      const cocktailsTokenStorage = localStorage.getItem('cocktailsToken');
      const mealsTokenStorage = localStorage.getItem('mealsToken');
      const userInfo = localStorage.getItem('user');

      await userEvent.type(email, VALID_EMAIL);
      await userEvent.type(password, VALID_PASSWORD);
      await fireEvent.click(button);

      expect(cocktailsTokenStorage).toBe('1');
      expect(mealsTokenStorage).toBe('1');
      expect(userInfo).toBe('{"email":"teste@teste.com"}');
    });
  });
});

// Source: https://reactjs.org/docs/test-utils.html#act
