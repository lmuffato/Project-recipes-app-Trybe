import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipeDetails() {
  const location = useLocation();
  const { state } = location;
  const { recipe } = state;
  console.log(recipe);
  const recipeName = recipe.strMeal || recipe.strDrink;
  const recipeThumb = recipe.strMealThumb || recipe.strDrinkThumb;
  const recipeCategory = recipe.strCategory;
  // const recipeName = recipe.strMeal;
  // const recipeThumb = recipe.strMealThumb;

  return (
    <div className="componente1">
      <div className="recipe-info">
        <span>{ recipeName }</span>
        <span className="category">{recipeCategory || 'categoria'}</span>
      </div>
      <div className="img-container">
        <img src={ recipeThumb } alt="Foto da receita" />
      </div>
    </div>
  );
}

export default RecipeDetails;

RecipeDetails.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;
