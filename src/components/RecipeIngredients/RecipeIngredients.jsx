import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import formattingMeasuresAndIngredients from '../../services/fetchFilteredRecipes';

function RecipeIngredients({ recipe, type }) {
  // const keysAndValues = Object.entries(recipe);
  // const [ingredients, setIngredients] = useState([]);
  // const [measures, setMeasures] = useState([]);
  const [ingredientsAndMeasures, setIngredientsAndMeasures] = useState({});

  // filtra os valores e retorna um objeto com todos os ingredientes e medidas
  // const filterIngredientsAndMeasures = useCallback(() => {
  //   const formatting = formattingMeasuresAndIngredients(type, keysAndValues);
  //   setIngredientsAndMeasures(formatting);
  // }, [keysAndValues, type]);

  useEffect(() => {
    const recipeskeysAndValues = Object.entries(recipe);
    const formatting = formattingMeasuresAndIngredients(type, recipeskeysAndValues);
    setIngredientsAndMeasures(formatting);
    // console.log(ingredientsAndMeasures);
  }, [recipe, type]);

  const keyIngr = 'ingredients';

  return (
    <>
      <h3>Ingredientes</h3>
      <ul>
        {(ingredientsAndMeasures.length > 0
        && ingredientsAndMeasures.measures.map((element, index) => (
          <li key={ element } data-testid={ `${index}-ingredient-name-and-measure` }>
            <span>
              {' '}
              { element[keyIngr][0] }
            </span>
          </li>)))}
      </ul>
    </>
  );
}

export default RecipeIngredients;

RecipeIngredients.propTypes = {
  recipe: PropTypes.shape().isRequired,
  type: PropTypes.string.isRequired,
};
