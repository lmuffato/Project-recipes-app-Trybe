// import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderWithRouterAndRedux from './renderWithRouterAndRedux';
// import '@testing-library/jest-dom';
// import CategoriesBtn from '../pages/components/CategoriesBtn';

// const mockMealsStore = {
//   meals: {
//     categories: ['Beef', 'Breakfast', 'Chicken', 'Desserts', 'Goat'],
//     meals: [],
//     loading: false,
//     filter: '',
//   },
// };

// const mockMealCategories = ['Beef', 'Breakfast', 'Chicken', 'Desserts', 'Goat'];

// const mockDrinkCategories = ['Odinary Drink', 'Cocktail',
//   'Milk / Float / Shake', 'Other/Unknown', 'Cocoa'];

// describe('1 - Test if category buttons are rendered', () => {
//   it('Test if meal buttons are rendered', async () => {

//     const { findAllByRole, store } = renderWithRouterAndRedux(
//       <CategoriesBtn type="meals" />,
//     );

//     const buttons = await findAllByRole('button');
//     console.log(store.getState());
//     expect(buttons.length).toBe(6);
//   });
// });
