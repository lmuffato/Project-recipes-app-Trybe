import React from 'react';
import { render } from '@testing-library/react';
import Perfil from '../pages/Perfil';

describe('Tela de Perfil', () => {
  test('Exibe uma imagem de perfil', () => {
    const { getByAltText } = render(<Perfil />);
    const imagem = getByAltText('Imagem de perfil');
    expect(imagem).toBeInTheDocument();
  });

  test('Existe um título de nível 3 para exibir o e-mail do usuário', () => {
    const { getByRole } = render(<Perfil />);
    const titulo = getByRole('heading', { level: 3 });
    expect(titulo).toBeInTheDocument();
  });

  test('Exibe um botão relacionado as receitas feitas', () => {
    const { getByTestId, getByRole } = render(<Perfil />);
    const botaoTeste1 = getByTestId('profile-done-btn');
    const botaoTeste2 = getByRole('button', { name: 'Receitas Feitas' });
    expect(botaoTeste1).toBeInTheDocument();
    expect(botaoTeste2).toBeInTheDocument();
    expect(botaoTeste2).toHaveTextContent('Receitas Feitas');
  });

  test('Exibe um botão relacionado as receitas favoritas', () => {
    const { getByTestId, getByRole } = render(<Perfil />);
    const botaoTeste1 = getByTestId('profile-favorite-btn');
    const botaoTeste2 = getByRole('button', { name: 'Receitas Favoritas' });
    expect(botaoTeste1).toBeInTheDocument();
    expect(botaoTeste2).toBeInTheDocument();
    expect(botaoTeste2).toHaveTextContent('Receitas Favoritas');
  });

  test('Exibe um botão para fazer logout', () => {
    const { getByTestId, getByRole } = render(<Perfil />);
    const botaoTeste1 = getByTestId('profile-logout-btn');
    const botaoTeste2 = getByRole('button', { name: 'Sair' });
    expect(botaoTeste1).toBeInTheDocument();
    expect(botaoTeste2).toBeInTheDocument();
    expect(botaoTeste2).toHaveTextContent('Sair');
  });
});
