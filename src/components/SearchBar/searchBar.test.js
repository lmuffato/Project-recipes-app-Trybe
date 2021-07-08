// import React from 'react';
// import { render } from '@testing-library/react';
// import { Router } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
// import userEvent from '@testing-library/user-event';

// // import requestApiMock from './mock';
// import App from '../../App';

// const LENGTH_INPUT_RADIO = 3;
// const SEARCH_INPUT = 'search-input';
// const EXER_SEARCH_BTN = 'exec-search-btn';

// const renderPath = (path) => {
//   const history = createBrowserHistory();
//   history.push(path);
//   const { ...resources } = render(
//     <Router history={ history }>
//       <App />
//     </Router>,
//   );
//   return { ...resources };
// };

// const requestApiReturn = () => Promise.resolve({
//   JSON: () => Promise.resolve(requestApiMock),
// });

// describe('Test para o Search Bar', () => {
//   it('Testando se os campos aparecem na tela', () => {
//     const { getByTestId, getAllByRole } = renderPath('/comidas');

//     expect(getByTestId(SEARCH_INPUT)).toBeInTheDocument();
//     expect(getByTestId(EXER_SEARCH_BTN)).toBeInTheDocument();
//     expect(getAllByRole('radio').length).toEqual(LENGTH_INPUT_RADIO);
//   });

//   it('Test se esta todos elementos habilitados para usar', () => {
//     const { getByTestId } = renderPath('/comidas');

//     const input = getByTestId(SEARCH_INPUT);
//     const radioIngredients = getByTestId('ingredient-search-radio');
//     const button = getByTestId(EXER_SEARCH_BTN);

//     userEvent.type(input, 'beef');
//     userEvent.click(radioIngredients);
//     userEvent.click(button);
//   });

//   it(`Test se aparece um alert na tela quando digita mais
//     de uma letra na busca por firstLetter`, async () => {
//     const { getByTestId, findByTestId } = renderPath('/comidas');

//     const input = getByTestId(SEARCH_INPUT);
//     const radioFirstLetter = getByTestId('first-letter-search-radio');
//     const button = await findByTestId(EXER_SEARCH_BTN);

//     userEvent.type(input, 'pamonha');
//     userEvent.click(radioFirstLetter);
//     userEvent.click(button);
//   });
// });
