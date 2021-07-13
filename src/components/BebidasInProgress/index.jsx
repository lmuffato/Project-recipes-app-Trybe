import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import getIngredients from '../../services/getIngredients';
import ShareButton from '../ShareButton';
import FavoriteButton from '../FavoriteButton';

function DrinksInProgress({ data }) {
  const { href } = window.location;
  const sliceMax = -12;
  const ingredients = getIngredients(data, 'strIngredient').map((e) => e[1]);
  const { pathname } = useLocation();
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    function saveState() {
      const { strDrinkThumb, strDrink, strCategory } = data;
      const obj = [{
        image: strDrinkThumb,
        title: strDrink,
        category: strCategory,
      }];
      setKeys(obj);
    }
    saveState();
  }, [data, pathname]);

  if (keys.length > 0) {
    return (
      <div>
        <img src={ keys[0].image } alt="thumb" data-testid="recipe-photo" width="200px" />
        <h3 data-testid="recipe-title">{ keys[0].title }</h3>
        <ShareButton dataTestId="share-btn" urlCopied={ href } />
        <FavoriteButton data={ data } path={ pathname.slice(sliceMax) } />
        <p data-testid="recipe-category">{ keys[0].category }</p>
        <ul>
          { ingredients.map((element, index) => (
            <li
              key={ element }
              data-testid={ `data-testid=${index}-ingredient-step` }
            >
              <label htmlFor="ingredients">
                { element }
                <input type="checkbox" id="ingredients" name="ingredients" />
              </label>
            </li>)) }
        </ul>
        <p data-testid="instructions">{ data.strInstructions }</p>
        <button type="button" data-testid="finish-recipe-btn">Finalizar Receita!</button>
      </div>
    );
  }

  return (
    <div>
      Progresso...
    </div>
  );
}

DrinksInProgress.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DrinksInProgress;
