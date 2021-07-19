import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function IngredientCard() {
  const ingredients = useSelector((state) => state.meals.ingredients);

  return (
    <div className="ingredient-container">
      {ingredients.map(({ strIngredient }, index) => (
        <Link
          className="ingredient-card"
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
          <div className="img-crop">
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
              alt={ strIngredient }
              width="100"
              height="100"
            />
          </div>
          <p data-testid={ `${index}-card-name` }>{strIngredient}</p>

        </Link>
      ))}
    </div>
  );
}

export default IngredientCard;
