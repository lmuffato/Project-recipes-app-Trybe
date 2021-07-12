import { number, shape, string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function CardRecipe({ recipe, typeFilter, index }) {
  const idRecipe = typeFilter === 'Meal' ? recipe.idMeal : recipe.idDrink;
  const linkRedirect = typeFilter === 'Meal'
    ? `/comidas/${idRecipe}`
    : `/bebidas/${idRecipe}`;

  return (
    <Link to={ linkRedirect }>
      <section data-testid={ `${index}-recipe-card` }>
        <p data-testid={ `${index}-card-name` }>{recipe[`str${typeFilter}`]}</p>
        <img
          width="200"
          data-testid={ `${index}-card-img` }
          src={ recipe[`str${typeFilter}Thumb`] }
          alt={ recipe[`str${typeFilter}`] }
        />
      </section>
    </Link>
  );
}

CardRecipe.propTypes = {
  recipe: shape({}).isRequired,
  typeFilter: string.isRequired,
  index: number.isRequired,
};

export default CardRecipe;
