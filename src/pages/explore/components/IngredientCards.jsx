import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { string, number } from 'prop-types';
import Context from '../../../context/Context';
import {
  fetchFilterFoodByIngredient,
  fetchFilterDrinkByIngredient,
} from '../../../services/fetchApi';

function IngredientCards({
  index, thumbnail, name, key, param }) {
  const history = useHistory();
  const {
    setFilterFoods, setFilterDrinks,
  } = useContext(Context);
  // console.log(filterFoods);
  // console.log(filterDrinks);
  const handleExploreDirection = async () => {
    if (param === '/bebidas') {
      const data = await fetchFilterDrinkByIngredient(name);
      setFilterDrinks(data);
    }
    if (param === '/comidas') {
      const data = await fetchFilterFoodByIngredient(name);
      setFilterFoods(data);
    }
    console.log('hello');
    history.push(param);
  };

  return (
    <button type="button" onClick={ () => handleExploreDirection() }>
      <div key={ key } data-testid={ `${index}-ingredient-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ thumbnail }
          alt={ name }
          index={ index }
        />
        <h4
          key={ index }
          data-testid={ `${index}-card-name` }
        >
          { name }
        </h4>
      </div>
    </button>
  );
}

IngredientCards.propTypes = {
  index: number,
  thumbnail: string,
  name: string,
}.isRequired;

export default IngredientCards;
