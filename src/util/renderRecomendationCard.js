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
          className="card"
          data-testid={ `${index}-recomendation-card` }
        >
          <img alt={ title } src={ img } />
          <div className="title-div">
            <p
              data-testid={ `${index}-recomendation-title` }
              className="title"
            >
              {title}
            </p>
            <p className="subtitle">{category}</p>
          </div>
        </div>
      </Link>
    );
  }
}
