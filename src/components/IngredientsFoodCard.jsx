import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import context from '../store/Context';
import { fetchFilterFoodByIngredient } from '../services/Data';

function IngredientsFoodCard({ foodsIngredients, index }) {
  const { setFoods } = useContext(context);
  const { strIngredient } = foodsIngredients;

  const getRecipeByIngredients = (ing) => {
    fetchFilterFoodByIngredient(ing).then((data) => {
      setFoods(data);
    });
  };

  return (
    <div>
      <div>
        <Link
          to="/comidas"
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => getRecipeByIngredients(strIngredient) }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            alt={ strIngredient }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            {strIngredient}
          </p>
        </Link>
      </div>
    </div>
  );
}

IngredientsFoodCard.propTypes = {
  foodsIngredients: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default IngredientsFoodCard;
