import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ShareBtn from './ShareButton';
import FavBtn from './FavoriteButton';
import RecipeImage from './RecipeImage';
import RecipeTitle from './RecipeTitle';
import RecipeCatg from './RecipeCategory';
import RecipeInst from './RecipeInstructions';

function ProgressCard({ recipe }) {
  // const [ingredientList, setIngredientList] = useState('');
  let currentInfo = [];

  const filterIngredients = (recipeItems) => Object.entries(recipeItems)
    .filter(([name, value]) => name.includes('Ingredient') && value);

  const markAsDone = ({ target }) => {
    if (target.parentNode.style.textDecoration === 'line-through') {
      target.parentNode.style.textDecoration = 'none';
    } else {
      target.parentNode.style.textDecoration = 'line-through';
    }
  };
  const listIngredients = (ingredients) => (
    <ol>
      {ingredients.map((ingredient, key) => (
        <li key={ key }>
          <label
            htmlFor={ `ingredient${key}` }
            data-testid={ `${key}-ingredient-step` }
          >
            {ingredient[1]}
            <input id={ `ingredient${key}` } type="checkbox" onClick={ markAsDone } />
          </label>
        </li>))}
    </ol>
  );

  if (recipe.drinks) {
    const { idDrink, strCategory, strAlcoholic,
      strDrink, strDrinkThumb, strInstructions } = recipe.drinks[0];
    currentInfo = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory || '',
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      instructions: strInstructions,
      ingredients: filterIngredients(recipe.drinks[0]),
    };
  } else {
    const { idMeal, strArea, strCategory, strMeal,
      strMealThumb, strInstructions } = recipe.meals[0];
    currentInfo = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory || '',
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      instructions: strInstructions,
      ingredients: filterIngredients(recipe.meals[0]),
    };
  }
  return (
    <div className="recipe_details">
      <RecipeImage origin={ currentInfo.image } />
      <RecipeTitle title={ currentInfo.name } />
      <ShareBtn />
      <FavBtn info={ currentInfo } />
      <RecipeCatg category={ `${currentInfo.category} ${currentInfo.alcoholicOrNot}` } />
      <h3>Ingredientes</h3>
      {listIngredients(currentInfo.ingredients)}
      <h3>Instruções</h3>
      <RecipeInst instructions={ currentInfo.instructions } />
      <button data-testid="finish-recipe-btn" type="button">Finalizar Receita</button>
    </div>
  );
}

ProgressCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default ProgressCard;
