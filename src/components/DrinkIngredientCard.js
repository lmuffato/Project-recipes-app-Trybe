import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function DrinkIngredientCard() {
  const ingredients = useSelector((state) => state.drinks.ingredients);

  return (
    <div className="ingredient-container">
      {ingredients.map(({ strIngredient1 }, index) => (
        <Link
          className="ingredient-card"
          data-testid={ `${index}-ingredient-card` }
          key={ strIngredient1 }
          to={ {
            pathname: '/bebidas',
            state: {
              fromIngredientsPage: true,
              ingredientName: strIngredient1,
            },
          } }
        >
          <div className="img-crop">
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
              alt={ strIngredient1 }
              width="100"
              height="100"
            />
          </div>
          <p data-testid={ `${index}-card-name` }>{strIngredient1}</p>
        </Link>
      ))}
    </div>
  );
}

export default DrinkIngredientCard;
