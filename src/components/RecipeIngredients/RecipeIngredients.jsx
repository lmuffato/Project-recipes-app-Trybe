import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function RecipeIngredients({ recipe }) {
  const keysAndValues = Object.entries(recipe);
  const [ingredient, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  // const { strIngredient1,
  // strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7 } = recipe;

  const handleIngredientsAndMeasures = () => {
    const mapIngredients = keysAndValues.map(
      (element) => (element[0].includes('strIngredient') && element[1] !== null ? (
        setIngredients(mapIngredients)
      ) : ''),
    );
    const mapMeasures = keysAndValues.map(
      (el) => (el[0].includes('strMeasure') && el[1] !== null ? (
        setMeasures(mapMeasures)
      ) : ''),
    );
  };
  // const handleIngr = (value) => {
  //   if (value.trim() !== '') {
  //     setIngredientsArr([...ingredientsArr].push(value));
  //     // console.log(ingredientsArr);
  //   }
  // };

  useEffect(() => {
    console.log(keysAndValues);
  }, [keysAndValues, recipe]);

  // const handleAddIngrToArr = () => {
  //   handleIngr(strIngredient1);
  //   console.log(ingredientsArr);
  // };

  return (
    <div>
      <h3>Ingredientes</h3>
      <ul>
        { keysAndValues.map((element, index) => (
          element[0].includes('strIngredient') && element[1] !== null ? (
            <li key={ element } data-testid={ `${index}-ingredient-name-and-measure` }>
              { element[1]}
            </li>
          ) : (
            ' '
          )))}
      </ul>
    </div>
  );
}

export default RecipeIngredients;

RecipeIngredients.propTypes = {
  recipe: PropTypes.shape().isRequired,
};
