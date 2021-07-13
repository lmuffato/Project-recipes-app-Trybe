import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../../components/RecipesCardsGrid/components/RecipeSimpleCard';
import styles from './styles.module.scss';

function ExploreCards({ ingredients }) {
  return (
    <section className={ styles.grid }>
      {ingredients.map((ingredient, index) => (
        <Card
          key={ ingredient.id }
          recipe={ ingredient }
          index={ index }
          page="ingredient"
        />))}
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
