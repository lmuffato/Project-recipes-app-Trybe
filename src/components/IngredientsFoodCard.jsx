import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import context from '../store/Context';

function IngredientsFoodCard({ foodsIngredients, index }) {
  const { setByIngredient, setIngredientByName } = useContext(context);
  const { strIngredient } = foodsIngredients;

  return (
    <div>
      <div
        src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
        data-testid={ `${index}-ingredient-card` }
      >
        <Link
          onClick={ () => {
            setByIngredient(true);
            setIngredientByName(strIngredient);
          } }
          to="/comidas"
          data-testid={ `${index}-main-ingredient-card-link-image` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            alt={ strIngredient }
          />
        </Link>
        <Link
          onClick={ () => {
            setByIngredient(true);
            setIngredientByName(strIngredient);
          } }
          to="/comidas"
          data-testid={ `${index}-main-ingredient-card-link` }
        >
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
