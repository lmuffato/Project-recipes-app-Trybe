import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import App from '../App';

const PROFILE_DONE_BTN = 'profile-done-btn';
export default PROFILE_DONE_BTN;
describe('[82 - 87] Testing Profile Screen', () => {
  it('Test whether the required elements are rendered on the screen', () => {
    const history = createMemoryHistory();
    history.push('/perfil');
    console.log(history);
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    console.log(screen.getByTestId('profile-email'));
    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
    expect(screen.getByTestId(PROFILE_DONE_BTN)).toBeInTheDocument();
    expect(screen.getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-logout-btn')).toBeInTheDocument();
  });

  it('Redirects to the correct route when clicking the "Receitas Favoritas" button',
    () => {
      const history = createMemoryHistory();
      history.push('/perfil'); // cai na page de profile
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );
      userEvent.click(screen.getByText('Receitas Favoritas')); // click em "Receitas Favoritas"
      // console.log(screen.getByText('Aqui encontra-se minhas receitas favoritas'));
      expect(screen.getByText('All')).toBeInTheDocument();
      expect(screen.getByText('Food')).toBeInTheDocument();
      expect(screen.getByText('Drinks')).toBeInTheDocument();
    });

  it('Redirects to the correct route when clicking the "Sair" button',
    () => {
      const history = createMemoryHistory();
      history.push('/perfil'); // cai na page de profile
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );
      userEvent.click(screen.getByTestId('profile-logout-btn')); // click em "Sair"
      expect(screen.getByTestId('login-submit-btn')); // verifica se o botao de login esta presenta na tela.
    });

  it('Redirects to the correct route when clicking the "Receitas Feitas" button',
    () => {
      const history = createMemoryHistory();
      history.push('/perfil'); // cai na page de profile
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );
      userEvent.click(screen.getByTestId(PROFILE_DONE_BTN)); // click em "Sair"
      expect(screen.getByText('Receitas já feitas')).toBeInTheDocument(); // Alterar quando fizer a pagina testada.
    });

  it('Checks whether by clicking the "Sair" button the localStorage is cleared.',
    () => {
      const history = createMemoryHistory();
      history.push('/perfil');
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );
      userEvent.click(screen.getByTestId(PROFILE_DONE_BTN));
    });
});
