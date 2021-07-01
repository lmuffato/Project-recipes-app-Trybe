// import React from 'react';
// import { fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderWithRouter from './renderWithRouter';
// import App from '../App';

// describe('Test the component Footer', () => {
//   const iconArray = [
//     { icon: 'drinkIcon', dataTest: 'drinks-bottom-btn' },
//     { icon: 'exploreIcon', dataTest: 'explore-bottom-btn' },
//     { icon: 'mealIcon', dataTest: 'food-bottom-btn' },
//   ];

//   const emailInput = 'email-input';
//   const passwordInput = 'password-input';
//   const loginBtn = 'login-submit-btn';

//   const loginData = { user: 'teste@teste.com', password: '1234567' };

//   iconArray.forEach(({ icon: currIcon, dataTest }) => {
//     it(`verify if the ${currIcon} exist`, () => {
//       const { getByTestId } = renderWithRouter(<App />);
//       const userInput = getByTestId(emailInput);
//       const userPasswordInput = getByTestId(passwordInput);
//       const loginSubmitBtn = getByTestId(loginBtn);

//       userEvent.type(userInput, loginData.user);
//       userEvent.type(userPasswordInput, loginData.password);
//       userEvent.click(loginSubmitBtn);

//       const testIcon = getByTestId(dataTest);

//       expect(testIcon).toBeInTheDocument();
//       expect(testIcon).toHaveAttribute('src', `${currIcon}.svg`);
//     });
//   });

//   it('verify the footers position', () => {
//     const { getByTestId } = renderWithRouter(<App />);
//     const userInput = getByTestId(emailInput);
//     const userPasswordInput = getByTestId(passwordInput);
//     const loginSubmitBtn = getByTestId(loginBtn);

//     userEvent.type(userInput, loginData.user);
//     userEvent.type(userPasswordInput, loginData.password);
//     userEvent.click(loginSubmitBtn);

//     const footer = getByTestId('footer');

//     expect(footer).toBeInTheDocument();

//     // Source: https://spectrum.chat/testing-library/help-dom/fire-scroll-event-with-specified-x-y-positions~4798d1c8-2658-4479-a855-9c8f26c74385
//     fireEvent.scroll(window, { target: { scrollY: 101 } });

//     expect(footer).toBeInTheDocument();
//   });

//   it('verify if on click the page redirects to right Routes', () => {
//     const {
//       getByTestId, history,
//     } = renderWithRouter(<App />);
//     const userInput = getByTestId('email-input');
//     const userPasswordInput = getByTestId('password-input');
//     const loginSubmitBtn = getByTestId('login-submit-btn');

//     userEvent.type(userInput, loginData.user);
//     userEvent.type(userPasswordInput, loginData.password);
//     userEvent.click(loginSubmitBtn);

//     const routeArray = ['/bebidas', '/explorar', '/comidas'];

//     iconArray.forEach(({ dataTest }, index) => {
//       const testIcon = getByTestId(dataTest);
//       userEvent.click(testIcon);
//       const { pathname } = history.location;
//       expect(pathname).toBe(routeArray[index]);
//     });
//   });
// });
