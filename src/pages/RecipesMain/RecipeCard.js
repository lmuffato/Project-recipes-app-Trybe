import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchImageIngredients } from '../../services/fetchApiIngredients';

export default function RecipeCard({ recipe, index, isMain, path }) {
  const [getImage, setGetImage] = useState('');

  useEffect(() => {
    const item = recipe.strIngredient || recipe.strIngredient1;
    if (isMain === false) {
      fetchImageIngredients(path, item)
        .then((result) => setGetImage(result.url));
    }
  }, [path, recipe, isMain]);

  return (

    <div
      className="recipe-card"
      data-testid={ isMain ? `${index}-recipe-card` : `${index}-ingredient-card` }
    >

      <img
        data-testid={ `${index}-card-img` }
        src={ isMain ? recipe.strMealThumb || recipe.strDrinkThumb
          : getImage }
        alt="recipe"
        width="150px"
      />
      <p
        data-testid={ `${index}-card-name` }
      >
        { isMain
          ? recipe.strMeal || recipe.strDrink
          : recipe.strIngredient || recipe.strIngredient1 }

      </p>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.object,
  index: PropTypes.number,
}.isRequired;
