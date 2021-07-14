import React from 'react';
import PropTypes from 'prop-types';
import makeObjIngredients from '../../../services/formatObjects/makeObjIngredients';

const Ingredients = ({ recipe }) => {
  const objIngredients = makeObjIngredients(recipe);
  let arrEntries = [];
  if (objIngredients) {
    arrEntries = Object.entries(objIngredients);
  }
  return (
    <>
      <h4>Ingredients</h4>
      <section>
        <ul className="list-group">
          { arrEntries
            .map((ingredient, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
                className="list-group-item"
              >
                {`${ingredient[0]} - ${ingredient[1]}`}
              </li>))}
        </ul>
      </section>
    </>
  );
};

Ingredients.propTypes = {
  recipe: PropTypes.object,
}.isRequired;

export default Ingredients;
