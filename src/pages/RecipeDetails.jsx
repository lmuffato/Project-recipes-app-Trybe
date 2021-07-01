import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeInfo from '../components/RecipeInfo/RecipeInfo';
import RecipeIngredients from '../components/RecipeIngredients/RecipeIngredients';

function RecipeDetails() {
  const location = useLocation();
  const { state } = location;
  const { recipe, type } = state;
  // console.log(recipe);
  const recipeName = recipe.strMeal || recipe.strDrink;
  const recipeId = recipe.idMeal || recipe.idDrink;
  const recipeThumb = recipe.strMealThumb || recipe.strDrinkThumb;
  const recipeCategory = recipe.strCategory;
  const isAlchooholic = recipe.strAlcoholic || '';

  return (
    <div className="recipe-details-page">
      <RecipeInfo
        recipeName={ recipeName }
        recipeThumb={ recipeThumb }
      >
        { type === 'drinks' ? (<h3 data-testid="recipe-category">{isAlchooholic}</h3>) : (
          <h3 data-testid="recipe-category">{recipeCategory}</h3>)}
      </RecipeInfo>
      <RecipeIngredients id={ recipeId } type={ type } />
      <div className="instructions">
        <h5>Instructions</h5>
        <p data-testid="instructions">
          { recipe.strInstructions }
        </p>
      </div>

    </div>
  );
}

// fazer um if com o retorno do fetch da receita
// pegar todas as chaves que iniciam com os ingredientes, concatenar
// usar o trim() num if para deixar de fora os valores que são strings vazias
export default RecipeDetails;

RecipeDetails.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;
