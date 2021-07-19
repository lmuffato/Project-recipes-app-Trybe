import { arrayOf, string } from 'prop-types';
import React from 'react';

function Ingredients({ list }) {
  return (
    <section>
      {list.map(([ingredient, measure], index) => (
        <div key={ index } className="ingredients-list">
          <p
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ `${index}-${ingredient}` }
          >
            {`- ${ingredient} - ${measure}`}
          </p>
        </div>
      ))}
    </section>
  );
}

Ingredients.propTypes = {
  list: arrayOf(arrayOf(string)).isRequired,
};
export default Ingredients;
