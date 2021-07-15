import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '../../../../components/RecipesCardsGrid/components/RecipeSimpleCard';
import styles from './styles.module.scss';

function ExploreCards({ ingredients }) {
  const { location: { pathname: locationPathname } } = useHistory();
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    function getPathname() {
      if (locationPathname.includes('comidas')) setPathname('/comidas');
      else setPathname('/bebidas');
    }
    getPathname();
  }, [locationPathname]);

  return (
    <section className={ styles.grid }>
      {ingredients.map((ingredient, index) => (
        <Link
          to={ { pathname, state: { ingredient } } }
          key={ ingredient.id }
        >
          <Card
            recipe={ ingredient }
            index={ index }
            ingredient
          />
        </Link>
      ))}
    </section>
  );
}

ExploreCards.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    imagePath: PropTypes.string,
  }).isRequired),
}.isRequired;

export default ExploreCards;
