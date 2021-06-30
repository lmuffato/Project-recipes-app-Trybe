import React from 'react';
import { screen } from '@testing-library/dom'
import App from './App';
import renderWhithRouter from './components/RenderWithRouter';
import userEvent from '@testing-library/user-event';

describe('1 - Testes tela de login', () => {
  test('Verifica se existe tela de login',
  () => {
    const { history } = renderWhithRouter(<App />);
    const { location } = history;
    const { pathname } = location;
    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Login',
    });
    expect(pathname).toBe('/');
    expect(heading).toBeInTheDocument();
  });

  test('Verifica campos de Email, Senha e Botao',
  () => {
    renderWhithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassWord = screen.getByTestId('password-input');
    const btn = screen.getByRole('button', { name: 'Entrar'});

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassWord).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  test('Verifica condicoes para acionar botao',
  () => {
    renderWhithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassWord = screen.getByTestId('password-input');
    const btn = screen.getByRole('button', { name: 'Entrar'});

    expect(btn).toBeDisabled();

    userEvent.type(inputEmail, 'exemplo');
    userEvent.type(inputPassWord, 'exemplo');
    userEvent.click(btn);
    expect(btn).toBeDisabled();

    userEvent.type(inputEmail, 'exemplo@exemplo');
    userEvent.type(inputPassWord, 'exemplo');
    expect(btn).toBeDisabled();

    userEvent.type(inputEmail, 'exemplo@exemplo');
    userEvent.type(inputPassWord, 'exempl');
    expect(btn).toBeDisabled();

    userEvent.type(inputEmail, 'exemplo@exemplo.exemplo');
    userEvent.type(inputPassWord, 'exemplo');
    expect(btn).not.toBeDisabled();
  });

  test('Verirfica se ao clique do botão é redirecionado para a tela principa COMIDAS',
  () => {
    const { history } = renderWhithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassWord = screen.getByTestId('password-input');
    const btn = screen.getByRole('button', { name: 'Entrar'});

    userEvent.type(inputEmail, 'exemplo@exemplo.exemplo');
    userEvent.type(inputPassWord, 'exemplo');
    userEvent.click(btn);
    const { location } = history;
    const { pathname } = location;

    expect(pathname).toBe('/comidas');
  });
});
