import React from 'react';
import renderWithRouter from '../renderWithRouter';
import Login from '../pages/Login';

describe('Testando a página Login', () => {
	test('Se renderiza o título  `Login`', () => {
		const { getByRole } = renderWithRouter(<Login />);
		const heading = getByRole('heading', {
			name: /login/i,
			level: 1,
		});
		expect(heading).toBeInTheDocument();
	});
  test('Se existe um local para o usuário insira seu email e senha', () => {
    const { getByTestId  } = renderWithRouter(<Login />, '/');
    const email = getByTestId('email-input');
    const senha = getByTestId('password-input');

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });
	test('Se possui um link com o texto "Entrar"', () => {
    const { getAllByRole } = renderWithRouter(<Login/>);
    const link = getAllByRole('link', {
      name: /Entrar/i,
    });
    expect(link).toHaveLength(1);
  });

	test('Se a aplic. é redirecionada para a pág. comidas ao clicar no link Entrar.', () => {
    const { getByRole, history } = renderWithRouter(<Login />);
    history.push('/comidas');
    const titlePage = getByRole('heading', {
      name: /Comidas/i,
      level: 1,
    });
    expect(titlePage).toBeInTheDocument();
  });
});