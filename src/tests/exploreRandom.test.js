import { waitForElement, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouterHooksAndProvider from './renderWithRouterHooksAndProvider';

const RECIPE_TITLE = 'recipe-title';

const randomFoodMock = {
  meals: [
    {
      idMeal: '52945',
      strMeal: 'Kung Pao Chicken',
      strDrinkAlternate: null,
      strCategory: 'Chicken',
      strArea: 'Chinese',
      strInstructions: `Combine the sake or rice wine, soy sauce, sesame oil and 
      cornflour dissolved in water. Divide mixture in half.\r\nIn a glass dish or bowl,
      combine half of the sake mixture with the chicken pieces and toss to coat.`,
      strMealThumb: 'https://www.themealdb.com/images/media/meals/1525872624.jpg',
      strTags: null,
      strYoutube: 'https://www.youtube.com/watch?v=QqdcCHQlOe0',
      strIngredient1: 'Sake',
      strIngredient2: 'Soy Sauce',
      strIngredient3: 'Sesame Seed Oil',
      strIngredient4: 'Corn Flour',
      strIngredient5: 'Water',
      strIngredient6: 'Chicken',
      strIngredient7: 'Chilli Powder',
      strIngredient8: 'Rice Vinegar',
      strIngredient9: 'Brown Sugar',
      strIngredient10: 'Spring Onions',
      strIngredient11: 'Garlic Clove',
      strIngredient12: 'Water Chestnut',
      strIngredient13: 'Peanuts',
      strIngredient14: '',
      strIngredient15: '',
      strIngredient16: '',
      strIngredient17: '',
      strIngredient18: '',
      strIngredient19: '',
      strIngredient20: '',
      strMeasure1: '2 tbs',
      strMeasure2: '2 tbs',
      strMeasure3: '2 tbs',
      strMeasure4: '2 tbs',
      strMeasure5: '2 tbs',
      strMeasure6: '500g',
      strMeasure7: '1 tbs',
      strMeasure8: '1 tsp ',
      strMeasure9: '1 tbs',
      strMeasure10: '4 Chopped',
      strMeasure11: '6 cloves',
      strMeasure12: '220g',
      strMeasure13: '100g ',
      strMeasure14: '',
      strMeasure15: '',
      strMeasure16: '',
      strMeasure17: '',
      strMeasure18: '',
      strMeasure19: '',
      strMeasure20: '',
      strSource: 'htt://allrecipes.co.uk/recipe/1773/kung-pao-chicken.aspx',
      strImageSource: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null,
    },
  ],
};

const randomDrinkMock = {
  drinks: [
    {
      idDrink: '16273',
      strDrink: 'Shark Attack',
      strDrinkAlternate: null,
      strTags: null,
      strVideo: null,
      strCategory: 'Cocktail',
      strIBA: null,
      strAlcoholic: 'Alcoholic',
      strGlass: 'Pitcher',
      strInstructions: `Mix lemonade and water according to instructions on back of can. 
      If the instructions say to add 4 1/3 cans of water do so. Mix into pitcher.
      Add 1 1/2 cup of Vodka (Absolut). Mix well. Pour into glass of crushed ice.
      Excellent!`,
      strInstructionsES: null,
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/uv96zr1504793256.jpg',
      strIngredient1: 'Lemonade',
      strIngredient2: 'Water',
      strIngredient3: 'Vodka',
      strIngredient4: null,
      strIngredient5: null,
      strIngredient6: null,
      strIngredient7: null,
      strIngredient8: null,
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: '1 can ',
      strMeasure2: '3 cans ',
      strMeasure3: '1 1/2 cup ',
      strMeasure4: null,
      strMeasure5: null,
      strMeasure6: null,
      strMeasure7: null,
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
      strImageSource: null,
      strImageAttribution: null,
      strCreativeCommonsConfirmed: 'No',
      dateModified: '2017-09-07 15:07:37',
    },
  ],
};

describe('Testes Explorar: Me Surpreenda!', () => {
  it('Testa me surpreenda de comidas',
    async () => {
      global.fetch = jest.fn().mockImplementation(
        () => Promise.resolve({
          json: () => Promise.resolve(randomFoodMock),
        }),
      );

      const { getByText, getByTestId } = await renderWithRouterHooksAndProvider(
        <App />,
        '/explorar/comidas',
      );
      expect(getByTestId('explore-surprise')).toBeInTheDocument();
      fireEvent.click(getByText('Me Surpreenda!'));
      await waitForElement(() => getByTestId(RECIPE_TITLE));
      expect(getByTestId(RECIPE_TITLE)).toBeInTheDocument();
      expect(getByText('Kung Pao Chicken')).toBeInTheDocument();
      expect(getByTestId('recipe-photo').src).toMatch(
        'https://www.themealdb.com/images/media/meals/1525872624.jpg',
      );
    });

  it('Testa me surpreenda de bebidas',
    async () => {
      global.fetch = jest.fn().mockImplementation(
        () => Promise.resolve({
          json: () => Promise.resolve(randomDrinkMock),
        }),
      );

      const { getByText, getByTestId } = await renderWithRouterHooksAndProvider(
        <App />,
        '/explorar/bebidas',
      );
      expect(getByTestId('explore-surprise')).toBeInTheDocument();
      fireEvent.click(getByText('Me Surpreenda!'));
      await waitForElement(() => getByTestId(RECIPE_TITLE));
      expect(getByTestId(RECIPE_TITLE)).toBeInTheDocument();
      expect(getByText('Shark Attack')).toBeInTheDocument();
      expect(getByTestId('recipe-photo').src).toMatch(
        'https://www.thecocktaildb.com/images/media/drink/uv96zr1504793256.jpg',
      );
    });
});
