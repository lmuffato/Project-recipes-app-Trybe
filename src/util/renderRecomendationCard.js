import React from 'react';

export default function RecomendationCard(type, recipe, index) {
  let title = '';
  let img = '';
  let category = '';
  if (type === 'comidas') {
    title = recipe.strDrink;
    img = recipe.strDrinkThumb;
    category = recipe.strAlcoholic;
  } else {
    title = recipe.strMeal;
    img = recipe.strMealThumb;
    category = recipe.strCategory;
  }
  if (recipe) {
    return (
      <div
        className="card-item"
        data-testid={ `${index}-recomendation-card` }
      >
        <span data-testid={ `${index}-recomendation-title` }>{title}</span>
        <span>{category}</span>
        <img alt={ title } src={ img } />
      </div>
    );
  }
}
