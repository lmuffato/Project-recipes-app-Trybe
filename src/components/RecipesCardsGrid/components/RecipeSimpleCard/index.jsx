import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

import plus18Icon from '../../../../images/plus18.svg';

import styles from './styles.module.scss';
import { RecipesContext } from '../../../../context/Recipes';

function RecipeSimpleCard({ page, recipe, index, alcoholic }) {
  const { filterRecipe } = useContext(RecipesContext);
  const { location: { pathname } } = useHistory();

  let redirec = `${pathname}/${recipe.id}`;

  if ((pathname.includes('explorar')) && (!pathname.includes('area'))) {
    redirec = pathname.includes('comidas') ? '/comidas' : '/bebidas';
  }

  if (pathname.includes('area')) {
    redirec = `/comidas/${recipe.id}`;
  }

  function ingredientsClick() {
    if (!pathname.includes('explorar') && (!pathname.includes('area'))) return;
    filterRecipe({ type: 'ingredient', content: recipe.name });
  }

  return (
    <Link
      to={ redirec }
      onClick={ ingredientsClick }
    >
      <div data-testid={ `${index}-${page}-card` } className={ styles.card }>
        { alcoholic && (
          <span className={ styles.alcoholicTag }>
            <img src={ plus18Icon } alt="18+" />
            Alcoholic
          </span>
        )}
        <img
          src={ recipe.imagePath }
          alt={ recipe.name }
          data-testid={ `${index}-card-img` }
        />
        <span
          data-testid={ `${index}-card-name` }
          className={ styles.title }
        >
          {recipe.name}
        </span>
      </div>
    </Link>
  );
}

RecipeSimpleCard.propTypes = {
  index: PropTypes.number.isRequired,
  page: PropTypes.string.isRequired,
  alcoholic: PropTypes.bool,
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    imagePath: PropTypes.string,
  }).isRequired,
};

RecipeSimpleCard.defaultProps = {
  alcoholic: false,
};

export default RecipeSimpleCard;
