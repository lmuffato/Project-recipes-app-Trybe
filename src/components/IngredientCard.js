import React from 'react';
import { Link } from 'react-router-dom';
// import { arrayOf, shape, string } from 'prop-types';
import { useSelector } from 'react-redux';

function IngredientCard() {
  const ingredients = useSelector((state) => state.meals.ingredients);

  return (
    <div>
      {ingredients.map(({ strIngredient }, index) => (
        <Link
          data-testid={ `${index}-ingredient-card` }
          key={ strIngredient }
          to={ {
            pathname: '/comidas',
            state: {
              fromIngredientsPage: true,
              ingredientName: strIngredient,
            },
          } }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            alt={ strIngredient }
            width="100"
            height="100"
          />
          <div data-testid={ `${index}-card-name` }>{strIngredient}</div>

        </Link>
      ))}
    </div>
  );
}

export default IngredientCard;
