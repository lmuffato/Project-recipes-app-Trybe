// import React from 'react';
// import userEvent from '@testing-library/user-event';
// import MainFoods from '../pages/MainFoods';
// import App from '../App';
// import renderWithRouter from './renderWithRouter';

// const RECIPES_LENGTH = 12;

// describe(`Implemente os elementos da tela principal de receitas respeitando
//   os atributos descritos no protótipo`, () => {
//   it('A tela tem os data-testids de todos os 12 cards da tela de comidas', async () => {
//     const { getByTestId, history } = await renderWithRouter(<App />);
//     // const recipe = getByTestId(`${0}-recipe-card`);
//     await history.push('/comidas');
//     console.log(getByTestId(`${0}-recipe-card`));
//     Array(RECIPES_LENGTH).forEach((_, index) => {
//       // expect().toBeInTheDocument();
//       console.log(index);
//     });
//   });
// });
