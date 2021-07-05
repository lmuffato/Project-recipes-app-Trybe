import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

function RecipeIngredients({ recipe, type }) {
  const keysAndValues = Object.entries(recipe);
  // const [ingredients, setIngredients] = useState([]);
  // const [measures, setMeasures] = useState([]);
  const [ingredientsAndMeasures, setIngredientsAndMeasures] = useState({});

  // const handleMealsIngredientsAndMeasures = useCallback(() => {
  //   keysAndValues.map(
  //     (element) => (
  //       element[0].includes('strIngredient') && element[1] !== '' ? (
  //         setMealsAndMeasures(...ingredientsAndMeasures, { ingredients: element[1] })
  //       ) : ''),
  //   );
  //   keysAndValues.map(
  //     (el) => (el[0].includes('strMeasure') && el[1] !== '' ? (
  //       setMealsAndMeasures(...ingredientsAndMeasures, { measures: el[1] })
  //     ) : ''),
  //   );
  // }, [ingredientsAndMeasures, keysAndValues]);

  // const handleDrinksIngredientsAndMeasures = useCallback(() => {
  //   keysAndValues.map(
  //     (element) => (
  //       element[0].includes('strIngredient') && element[1] !== null ? (
  //         setMealsAndMeasures(...ingredientsAndMeasures, { ingredients: element[1] })
  //       ) : ''),
  //   );
  //   keysAndValues.map(
  //     (el) => (el[0].includes('strMeasure') && el[1] !== null ? (
  //       setMealsAndMeasures([...ingredientsAndMeasures].concat({ measures: el[1] }))
  //     ) : ''),
  //   );
  // }, [ingredientsAndMeasures, keysAndValues]);

  // const handleIngredientsAndMeasuresSwitch = useCallback(() => {
  //   switch (type) {
  //   case 'meals':
  //     handleMealsIngredientsAndMeasures();
  //     break;
  //   case 'drinks':
  //     handleDrinksIngredientsAndMeasures();
  //     break;
  //   default:
  //     break;
  //   }
  // }, [handleDrinksIngredientsAndMeasures, handleMealsIngredientsAndMeasures, type]);

  // filtra os valores e retorna um objeto com todos os ingredientes e medidas
  const filterIngredientsAndMeasures = useCallback(() => {
    const mapingValues = keysAndValues.reduce((acc, cur) => {
      const objeto = acc;
      const currentItem = cur;
      if (currentItem[0].includes('strIngredient') && currentItem[1] !== '') {
        const [itemOne, itemTwo] = currentItem;
        objeto[itemOne] = itemTwo;
      }
      if (currentItem[0].includes('strMeasure') && currentItem[1] !== '') {
        const [itemOne, itemTwo] = currentItem;
        objeto[itemOne] = itemTwo;
      }
      console.log(Object.entries(objeto));
      return objeto;
    }, {});
    setIngredientsAndMeasures(mapingValues);
    return mapingValues;
  }, [keysAndValues]);

  // const comparingReduce = useCallback(() => {
  //   console.log(ingredientsAndMeasures);
  // }, [ingredientsAndMeasures]);

  useEffect(() => {
    filterIngredientsAndMeasures();
    // console.log(ingredientsAndMeasures);
  }, []);

  return (
    <div>
      <h3>Ingredientes</h3>
      <ul>
        { type === 'drinks'
          ? (Object.entries(ingredientsAndMeasures).map((element, index) => (
            (element[0].includes('strIngredient')) && element[1] !== null ? (
              <li key={ element } data-testid={ `${index}-ingredient-name-and-measure` }>
                { element[1] }
              </li>
            ) : (
              ' '
            ))))
          : (Object.entries(ingredientsAndMeasures).map((element, index) => (
            (element[0].includes('strIngredient')) && element[1] !== '' ? (
              <li key={ element } data-testid={ `${index}-ingredient-name-and-measure` }>
                { element[1] }
              </li>
            ) : (
              ' '
            ))))}
      </ul>
    </div>
  );
}

export default RecipeIngredients;

RecipeIngredients.propTypes = {
  recipe: PropTypes.shape().isRequired,
  type: PropTypes.string.isRequired,
};
