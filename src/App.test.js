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

describe('4 - Testes do Menu inferior(Footer)', () => {
  test('Verifica se existe o componente Footer em uma página',
  () => {
    const { history } = renderWhithRouter(<App />);

    history.push('/comidas');
    const { location } = history;
    const { pathname } = location;

    const linkFoods = screen.getByTestId('food-bottom-btn');
    const linkDrinks = screen.getByTestId('drinks-bottom-btn');
    const linkExplore = screen.getByTestId('explore-bottom-btn');

    expect(linkFoods).toBeInTheDocument();
    expect(linkDrinks).toBeInTheDocument();
    expect(linkExplore).toBeInTheDocument();
    expect(pathname).toBe('/comidas');

  });

  test('Verifica se ao clicar nos icones você é redirecionado',
  () => {
    const { history } = renderWhithRouter(<App />);

    history.push('/perfil');
    const pathnamePerfil = history.location.pathname;

    expect(pathnamePerfil).toBe('/perfil');

    //Comidas
    const linkFoods = screen.getByTestId('food-bottom-btn');
    expect(linkFoods).toBeInTheDocument();    

    userEvent.click(linkFoods);
    const pathFoods = history.location.pathname;
     expect(pathFoods).toBe('/comidas');

    //Drinks
    const linkDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(linkDrinks).toBeInTheDocument();
    
    userEvent.click(linkDrinks);
    const pathBebidas = history.location.pathname;
    expect(pathBebidas).toBe('/bebidas');

    // Explorar
    const linkExplore = screen.getByTestId('explore-bottom-btn');
    expect(linkExplore).toBeInTheDocument();

    userEvent.click(linkExplore);
    const pathExplore = history.location.pathname;
    expect(pathExplore).toBe('/explorar');


  });

  test('Verifica se existe o componente Footer na página de Bebida',
  () => {
    const { history } = renderWhithRouter(<App />);

    history.push('/bebidas');
    const { location } = history;
    const { pathname } = location;

    const linkFooter = screen.getByTestId('footer')

    expect(linkFooter).toBeInTheDocument();
    expect(linkFooter.children.length).toBe(3);
    expect(pathname).toBe('/bebidas');

  });

  test('Verifica se existe o componente Footer na página de Comidas',
  () => {
    const { history } = renderWhithRouter(<App />);

    history.push('/comidas');
    const { location } = history;
    const { pathname } = location;

    const linkFooter = screen.getByTestId('footer')

    expect(linkFooter).toBeInTheDocument();
    expect(linkFooter.children.length).toBe(3);
    expect(pathname).toBe('/comidas');

  });

  test('Verifica se existe o componente Footer na página de Explorar',
  () => {
    const { history } = renderWhithRouter(<App />);

    history.push('/explorar');
    const { location } = history;
    const { pathname } = location;

    const linkFooter = screen.getByTestId('footer')

    expect(linkFooter).toBeInTheDocument();
    expect(linkFooter.children.length).toBe(3);
    expect(pathname).toBe('/explorar');

  });

  test('Verifica se existe o componente Footer na página de ExplorarComidas',
  () => {
    const { history } = renderWhithRouter(<App />);

    history.push('/explorar/comidas');
    const { location } = history;
    const { pathname } = location;

    const linkFooter = screen.getByTestId('footer')

    expect(linkFooter).toBeInTheDocument();
    expect(linkFooter.children.length).toBe(3);
    expect(pathname).toBe('/explorar/comidas');

  });

  test('Verifica se existe o componente Footer na página de ExplorarBebidas',
  () => {
    const { history } = renderWhithRouter(<App />);

    history.push('/explorar/bebidas');
    const { location } = history;
    const { pathname } = location;

    const linkFooter = screen.getByTestId('footer')

    expect(linkFooter).toBeInTheDocument();
    expect(linkFooter.children.length).toBe(3);
    expect(pathname).toBe('/explorar/bebidas');

  });

  test('Verifica se existe o componente Footer na página de ExplorarBebidasING',
  () => {
    const { history } = renderWhithRouter(<App />);

    history.push('/explorar/bebidas/ingredientes');
    const { location } = history;
    const { pathname } = location;

    const linkFooter = screen.getByTestId('footer')

    expect(linkFooter).toBeInTheDocument();
    expect(linkFooter.children.length).toBe(3);
    expect(pathname).toBe('/explorar/bebidas/ingredientes');

  });

  test('Verifica se existe o componente Footer na página de ExplorarComidasING',
  () => {
    const { history } = renderWhithRouter(<App />);

    history.push('/explorar/comidas/ingredientes');
    const { location } = history;
    const { pathname } = location;

    const linkFooter = screen.getByTestId('footer')

    expect(linkFooter).toBeInTheDocument();
    expect(linkFooter.children.length).toBe(3);
    expect(pathname).toBe('/explorar/comidas/ingredientes');

  });

  test('Verifica se não existe o componente Footer na página de Login',
  () => {
    const { history } = renderWhithRouter(<App />);

    history.push('/');
    const { location } = history;
    const { pathname } = location;

    const footer = screen.queryByText('footer')
    expect(footer).not.toBeInTheDocument()
    expect(pathname).toBe('/');
  });

  test('Verifica se não existe o componente Footer na página de Login',
  () => {
    const { history } = renderWhithRouter(<App />);

    history.push('receitas-feitas');
    const { location } = history;
    const { pathname } = location;

    const footer = screen.queryByText('footer')
    expect(footer).not.toBeInTheDocument()
    expect(pathname).toBe('/receitas-feitas');
  });
});
