import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const INPUT_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const BTN_TEST_ID = 'login-submit-btn';
const EMAIL_TEST = 'teste@teste.com';

describe(' 2 - Crie todos os elementos que devem estar na tela de login', () => {
  test('Tem os data-testids email-input, password-input e login-submit-btn', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const inputEmail = getByTestId(INPUT_TEST_ID);
    const inputPassword = getByTestId(PASSWORD_TEST_ID);
    const btnLogin = getByTestId(BTN_TEST_ID);
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();
  });
});

describe('3 - A pessoa deve conseguir escrever seu email no input de email', () => {
  test('É possível escrever o email', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const emailInput = getByTestId(INPUT_TEST_ID);
    fireEvent.change(emailInput, { target: { value: EMAIL_TEST } });
    expect(emailInput.value).toBe('teste@teste.com');
  });
});

describe('4 - A pessoa deve conseguir escrever sua senha no input de senha', () => {
  test('É possível escrever a senha', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const senhaInput = getByTestId(PASSWORD_TEST_ID);
    fireEvent.change(senhaInput, { target: { value: '1234567' } });
    expect(senhaInput.value).toBe('1234567');
  });
});

describe('5 - o formulário só é válido após um email  e uma senha valido', () => {
  test('testa se o botão está inativo ao entrar na página', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const btnLogin = getByTestId(BTN_TEST_ID);
    const emailInput = getByTestId(INPUT_TEST_ID);
    const senhaInput = getByTestId(PASSWORD_TEST_ID);
    expect(btnLogin).toBeDisabled();
    userEvent.type(emailInput, 'teste');
    expect(btnLogin).toBeDisabled();
    userEvent.type(senhaInput, '1234');
    expect(btnLogin).toBeDisabled();
  });
});

describe('6 - Salve 2 tokens e email no localStorage após a submissão', () => {
  test('Se salva todos os itens no LocalStorage', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const btnLogin = getByTestId(BTN_TEST_ID);
    const emailInput = getByTestId(INPUT_TEST_ID);
    const senhaInput = getByTestId(PASSWORD_TEST_ID);
    userEvent.type(emailInput, EMAIL_TEST);
    userEvent.type(senhaInput, '1234567');
    userEvent.click(btnLogin);

    expect(localStorage.getItem('mealsToken')).toBe('1');
    expect(localStorage.getItem('cocktailsToken')).toBe('1');
  });
});
