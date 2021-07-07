import React from 'react';
import { Link } from 'react-router-dom';

export default function RecomendationCard(type, recipe, index) {
  let title = '';
  let img = '';
  let category = '';
  let url = '';
  if (type === 'comidas') {
    title = recipe.strDrink;
    img = recipe.strDrinkThumb;
    category = recipe.strAlcoholic;
    url = `/bebidas/${recipe.idDrink}`;
  } else {
    title = recipe.strMeal;
    img = recipe.strMealThumb;
    category = recipe.strCategory;
    url = `/comidas/${recipe.idMeal}`;
  }
  if (recipe) {
    return (
      <Link to={ url }>
        <div
          className="card-item"
          data-testid={ `${index}-recomendation-card` }
        >
          <span data-testid={ `${index}-recomendation-title` }>{title}</span>
          <span>{category}</span>
          <img alt={ title } src={ img } />
        </div>
      </Link>
    );
  }
}
