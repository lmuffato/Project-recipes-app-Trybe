import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import CheckIngredient from '../effects/CheckIngredient';

export default function IngredientsChecks({ ingredients }) {
  const [currIngredients, setCurrIngredients] = useState({
    ingredientsInit: [],
    filterIngredients: [],
    currIngredient: '',
    checkLocalStorage: false,
    arrFromLocalStorage: [],
    finish: false,
  });

  CheckIngredient(ingredients, currIngredients, setCurrIngredients);

  const { ingredientsInit, filterIngredients, arrFromLocalStorage } = currIngredients;

  if (!ingredientsInit) return <div />;
  return (
    <>
      { ingredientsInit.map((ingredient, index) => (
        <Card
          className="ingredientsChecks"
          key={ `${index}-${ingredient}` }
          data-testid={ `${index}-ingredient-step` }
          onChange={ () => setCurrIngredients({ ...currIngredients,
            filterIngredients: [...filterIngredients, ingredient],
            currIngredient: ingredient }) }
        >
          <input
            type="checkbox"
            id={ ingredient }
            name={ ingredient }
            value={ ingredient }
            defaultChecked={ arrFromLocalStorage.includes(ingredient) }
          />
          <label htmlFor={ ingredient }>{ingredient}</label>
        </Card>
      ))}
    </>
  );
}

IngredientsChecks.propTypes = {
  ingredients: PropTypes.array,
}.isRequired;
