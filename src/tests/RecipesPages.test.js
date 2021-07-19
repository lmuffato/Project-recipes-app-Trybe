// import React from 'react';
// import { act } from 'react-dom/test-utils';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import App from '../App';
// import renderWithRouter from './renderWithRouter';
// import { meals, drinks } from './recipesMock';
// import { drinksCategories, mealsCategories } from './categoriesMock';
// import {
//   drinksCategoriesRecipes,
//   mealsCategoriesRecipes,
// } from './recipesCategories';

// const mockFetchMeals = () => {
//   jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
//     json: () => Promise.resolve(meals),
//   }));
// };

// const mockFetchDrinks = () => {
//   jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
//     json: () => Promise.resolve(drinks),
//   }));
// };

// const mockFetchCategories = (condition) => {
//   jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
//     json: () => Promise.resolve(
//       condition === 'meals' ? mealsCategories : drinksCategories,
//     ),
//   }));
// };

// const fetchRecipesByCategory = (type) => {
//   jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
//     json: () => Promise.resolve(
//       type === 'meals' ? mealsCategoriesRecipes : drinksCategoriesRecipes,
//     ),
//   }));
// };

// describe(`Implemente os elementos da tela principal de receitas respeitando
//   os atributos descritos no protótipo`, () => {
//   it('A tela tem os data-testids de todos os 12 cards da tela de comidas', async () => {
//     mockFetchMeals();
//     await act(async () => {
//       const { history } = await renderWithRouter(<App />);
//       history.push('/comidas');
//     });
//     meals.meals.forEach((_, index) => {
//       const recipe = screen.getByTestId(`${index}-recipe-card`);
//       expect(recipe).toBeInTheDocument();
//     });
//   });
//   it('A tela tem os data-testids de todos os 12 cards da tela de bebidas', async () => {
//     mockFetchDrinks();
//     await act(async () => {
//       const { history } = await renderWithRouter(<App />);
//       history.push('/bebidas');
//     });
//     drinks.drinks.forEach((_, index) => {
//       const recipe = screen.getByTestId(`${index}-recipe-card`);
//       expect(recipe).toBeInTheDocument();
//     });
//   });
// });

// describe(`26 - Carregue as 12 primeiras receitas de comidas ou bebidas,
//   uma em cada card`, () => {
//   it('Renderiza os cards corretamente na tela de Comidas', async () => {
//     mockFetchMeals();
//     await act(async () => {
//       const { history } = await renderWithRouter(<App />);
//       history.push('/comidas');
//     });
//     meals.meals.forEach(({ strMeal, strMealThumb }, index) => {
//       const cardName = screen.getByTestId(`${index}-card-name`);
//       expect(cardName).toBeInTheDocument();
//       expect(cardName.textContent).toBe(strMeal);
//       const cardImage = screen.getByTestId(`${index}-card-img`);
//       expect(cardImage).toBeInTheDocument();
//       expect(cardImage).toHaveAttribute('src', strMealThumb);
//     });
//   });
//   it('Renderiza os cards corretamente na tela de Bebidas', async () => {
//     mockFetchDrinks();
//     await act(async () => {
//       const { history } = await renderWithRouter(<App />);
//       history.push('/bebidas');
//     });
//     drinks.drinks.forEach(({ strDrink, strDrinkThumb }, index) => {
//       const cardName = screen.getByTestId(`${index}-card-name`);
//       expect(cardName).toBeInTheDocument();
//       expect(cardName.textContent).toBe(strDrink);
//       const cardImage = screen.getByTestId(`${index}-card-img`);
//       expect(cardImage).toBeInTheDocument();
//       expect(cardImage).toHaveAttribute('src', strDrinkThumb);
//     });
//   });
// });

// describe(`27 - Implemente os botões de categoria para serem utilizados
//   como filtro`, () => {
//   const testButtons = (data) => {
//     data.forEach(({ strCategory }) => {
//       const btnCategory = screen.getByTestId(`${strCategory}-category-filter`);
//       expect(btnCategory).toBeInTheDocument();
//       expect(btnCategory.textContent).toBe(strCategory);
//     });
//   };
//   it('Deve-se exibir as 5 primeiras categorias de comida', async () => {
//     mockFetchCategories('meals');
//     await act(async () => {
//       const { history } = await renderWithRouter(<App />);
//       history.push('/comidas');
//     });
//     testButtons(mealsCategories.meals);
//   });
//   it('Deve-se exibir as 5 primeiras categorias de bebida', async () => {
//     mockFetchCategories('drinks');
//     await act(async () => {
//       const { history } = await renderWithRouter(<App />);
//       history.push('/bebidas');
//     });
//     testButtons(drinksCategories.drinks);
//   });
// });

// describe(`28 - Implemente o filtro das receitas através da API ao
//   clicar no filtro de categoria`, () => {
//   it('Deve exibir todas as receitas ao clicar nas categorias de comidas', async (done) => {
//     mockFetchCategories('meals');
//     await act(async () => {
//       const { history } = renderWithRouter(<App />);
//       history.push('/comidas');
//     });
//     mealsCategories.meals.forEach(async ({ strCategory }) => {
//       fetchRecipesByCategory('meals');
//       const categoryBtn = await screen.findByTestId(
//         `${strCategory}-category-filter`,
//       );
//       userEvent.click(categoryBtn);
//       Object.values(mealsCategoriesRecipes.meals[0]).forEach((recipes) => {
//         recipes.forEach(async (_recipe, index) => {
//           const recipeName = await screen.findByTestId(`${index}-card-name`);
//           expect(recipeName).toBeInTheDocument();
//           done();
//         });
//       });
//     });
//   });
//   it('Deve exibir todas as receitas ao clicar nas categorias de bebidas', async (done) => {
//     mockFetchCategories('meals');
//     await act(async () => {
//       const { history } = renderWithRouter(<App />);
//       history.push('/bebidas');
//     });
//     drinksCategories.drinks.forEach(async ({ strCategory }) => {
//       fetchRecipesByCategory('drinks');
//       const categoryBtn = await screen.findByTestId(
//         `${strCategory}-category-filter`,
//       );
//       userEvent.click(categoryBtn);
//       Object.values(drinksCategoriesRecipes.drinks[0]).forEach((recipes) => {
//         recipes.forEach(async (_recipe, index) => {
//           const recipeName = await screen.findByTestId(`${index}-card-name`);
//           expect(recipeName).toBeInTheDocument();
//           done();
//         });
//       });
//     });
//   });
// });
