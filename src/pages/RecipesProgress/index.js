/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Image from './Image';
import Title from './Title';
import BtnShare from './BtnShare';
import BtnFavorite from './BtnFavorite';
import Category from './Category';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import { AppContext } from '../../context/AppContext';
import BtnFinishRecipe from './BtnFinishRecipe';

const oneMeal = {
  meals: [
    {
      idMeal: '52771',
      strMeal: 'Spicy Arrabiata Penne',
      strDrinkAlternate: null,
      strCategory: 'Vegetarian',
      strArea: 'Italian',
      strInstructions: `Bring a large pot of water to a boil. 
      Add kosher salt to the boiling water, 
      then add the pasta. Cook according to the package instructions, about 9 minutes.\r\n
      In a large skillet over medium-high heat, add the olive oil
      and heat until the oil starts to shimmer. 
      Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. 
      Add the chopped tomatoes, red chile flakes, Italian seasoning and salt 
      and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the 
      heat and add the chopped basil.\r\nDrain the pasta and add it to the sauce. 
      Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.`,
      strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      strTags: 'Pasta,Curry',
      strYoutube: 'https://www.youtube.com/watch?v=1IszT_guI08',
      strIngredient1: 'penne rigate',
      strIngredient2: 'olive oil',
      strIngredient3: 'garlic',
      strIngredient4: 'chopped tomatoes',
      strIngredient5: 'red chile flakes',
      strIngredient6: 'italian seasoning',
      strIngredient7: 'basil',
      strIngredient8: 'Parmigiano-Reggiano',
      strIngredient9: '',
      strIngredient10: '',
      strIngredient11: '',
      strIngredient12: '',
      strIngredient13: '',
      strIngredient14: '',
      strIngredient15: '',
      strIngredient16: null,
      strIngredient17: null,
      strIngredient18: null,
      strIngredient19: null,
      strIngredient20: null,
      strMeasure1: '1 pound',
      strMeasure2: '1/4 cup',
      strMeasure3: '3 cloves',
      strMeasure4: '1 tin ',
      strMeasure5: '1/2 teaspoon',
      strMeasure6: '1/2 teaspoon',
      strMeasure7: '6 leaves',
      strMeasure8: 'spinkling',
      strMeasure9: '',
      strMeasure10: '',
      strMeasure11: '',
      strMeasure12: '',
      strMeasure13: '',
      strMeasure14: '',
      strMeasure15: '',
      strMeasure16: null,
      strMeasure17: null,
      strMeasure18: null,
      strMeasure19: null,
      strMeasure20: null,
      strSource: null,
      dateModified: null,
    },
  ],
};
const { meals } = oneMeal;

export default function RecipesProgress({ match }) {
  const { path } = match;
  const { context } = useContext(AppContext);
  const { setPageOrigin, pageOrigin } = context;
  const [recipeInProgress, setRecipeInProgress] = useState('');
  const key = 'inProgressRecipes';
  const [fromStorage, setFromStorage] = useState('');

  function getFromStorage() {
    const storageValue = localStorage.getItem(key);
    if (storageValue) {
      const result = JSON.parse(storageValue);
      const values = Object.keys(result);
      const [id] = values;
      setFromStorage(id);
    }
  }

  async function getRecipeStorage() {
    if (fromStorage && pageOrigin) {
      const data = await
      fetch(`https://www.${pageOrigin}.com/api/json/v1/1/lookup.php?i=${fromStorage}`);
      const results = await data.json();
      return setRecipeInProgress(results.meals || results.drinks);
    }
    setRecipeInProgress(meals);
  }

  useEffect(() => {
    setPageOrigin(path === '/comidas/:id/in-progress' ? 'themealdb' : 'thecocktaildb');
  }, [path]);

  useEffect(() => {
    getRecipeStorage();
  }, [pageOrigin, fromStorage]);

  useEffect(() => {
    getFromStorage();
  }, [recipeInProgress]);

  return (
    <div>
      {recipeInProgress && recipeInProgress.map((recipe, index) => (
        <div key={ index } className="recipes-progress">
          <Image src={ recipe.strMealThumb || recipe.strDrinkThumb } />

          <div className="title">
            <Title title={ recipe.strMeal || recipe.strDrink } />
            <BtnShare match={ match } />
            <BtnFavorite
              recipe={ recipe }
            />
            <Category category={ recipe.strCategory || recipe.strAlcoholic } />

            <h2>Ingredientes</h2>
            <Ingredients recipe={ recipe } />
            <h2>Instruções</h2>
            <Instructions instruction={ recipe.strInstructions } />
          </div>
        </div>

      ))}
      <BtnFinishRecipe />

    </div>
  );
}

RecipesProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};
