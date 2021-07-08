import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function RecFoodCard({
  meal: {
    idMeal, strMeal, strMealThumb }, index }) {
  return (
    <Link to={ `/comidas/${idMeal}` }>
      <div
        style={ {
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100vw',
          alignItems: 'center' } }
        data-testid={ `${index}-recipe-card` }
      >
        <p
          data-testid={ `${index}-recomendation-card` }
        >
          { strMeal }
        </p>
        <img
          style={ { width: '80vw' } }
          src={ strMealThumb }
          alt=""
          data-testid={ `${index}-card-img` }
        />
      </div>
    </Link>
  );
}

RecFoodCard.propTypes = {
  meal: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
}.isRequired;
