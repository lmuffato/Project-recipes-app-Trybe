import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import context from '../store/Context';
import { fetchFilterDrinkByIngredient } from '../services/Data';

function IngredientsDrinkCard({ drinksIngredients, index }) {
  const { setDrinks } = useContext(context);
  const { strIngredient1 } = drinksIngredients;

  const getRecipeByIngredients = (ing) => {
    fetchFilterDrinkByIngredient(ing).then((data) => {
      setDrinks(data);
    });
  };

  return (
    <div>
      <div>
        <Link
          to="/bebidas"
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => getRecipeByIngredients(strIngredient1) }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png ` }
            alt={ strIngredient1 }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            {strIngredient1}
          </p>
        </Link>
      </div>
    </div>
  );
}

IngredientsDrinkCard.propTypes = {
  drinksIngredients: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default IngredientsDrinkCard;
