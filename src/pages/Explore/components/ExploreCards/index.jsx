import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '../../../../components/RecipesCardsGrid/components/RecipeSimpleCard';
import styles from './styles.module.scss';

function ExploreCards({ ingredients }) {
  return (
    <section className={ styles.grid }>
      {ingredients.map((ingredient, index) => (
        <Link to="/comidas" key={ ingredient.id }>
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
