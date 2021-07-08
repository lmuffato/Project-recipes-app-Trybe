import React from 'react';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';

export default function DoneRecipeCardFood(
  { area, category, recipeImg,
    doneDate, recipeTags, recipeName, index },
) {
  return (
    <div className="doneRecipesCard__container">
      <img
        src={ recipeImg }
        alt="recipe"
        className="doneRecipesCard__img"
        data-testid={ `${index}-horizontal-image` }
      />
      <div>
        <div>
          <span data-testid={ `${index}-horizontal-top-text` }>
            {`${area} - ${category}`}
          </span>
          <ShareButton index={ index } />
        </div>
        <h2
          data-testid={ `${index}-horizontal-name` }
        >
          {recipeName}
        </h2>
        <span
          data-testid={ `${index}-horizontal-done-date` }
        >
          {`Feita em: ${doneDate}`}
        </span>
        <div>
          {recipeTags && recipeTags.map((tag, indexTags) => (
            <div
              key={ indexTags }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

DoneRecipeCardFood.propTypes = {
  area: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  recipeImg: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  recipeTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipeName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
