import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ recipe, index, isMain, path }) {
  const [getImage, setGetImage] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    if (isMain === false) {
      const item = recipe.strIngredient || recipe.strIngredient1;
      const url = `https://www.${path}.com/images/ingredients/${item}-Small.png`;
      fetch(url, { signal: controller.signal })
        .then((result) => setGetImage(result.url))
        .catch((error) => console.log(error));
    }
    return (() => {
      controller.abort();
    });
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
        width="100%"
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
