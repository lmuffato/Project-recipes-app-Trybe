// import React from 'react';
// import userEvent from '@testing-library/user-event';
// import MainFoods from '../pages/MainFoods';
// import App from '../App';
// import renderWithRouter from './renderWithRouter';

// const RECIPES_LENGTH = 12;

// describe(`Implemente os elementos da tela principal de receitas respeitando
//   os atributos descritos no protótipo`, () => {
//   it('A tela tem os data-testids de todos os 12 cards da tela de comidas', async () => {
//     jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
//       json: () => Promise.resolve(fakeUser),
//     }));
//     const { getByTestId, history } = renderWithRouter(<App />);
//     // const recipe = getByTestId(`${0}-recipe-card`);
//     history.push('/comidas');
//     console.log(getByTestId(`${0}-recipe-card`));
//     Array(RECIPES_LENGTH).forEach((_, index) => {
//       // expect().toBeInTheDocument();
//       console.log(index);
//     });
//   });
// });
