import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Recommends.css';

export default function RecFoodCard({
  meal: {
    idMeal, strMeal, strMealThumb, strCategory }, index }) {
  return (
    <Link to={ `/comidas/${idMeal}` }>
      <div className="recommendCard">
        <img
          className="recommendImg"
          src={ strMealThumb }
          alt=""
          data-testid={ `${index}-card-img` }
        />
        <p
          data-testid={ `${index}-recomendation-card` }
        >
          { strCategory }
        </p>
        <h3
          data-testid={ `${index}-recomendation-title` }
        >
          { strMeal }
        </h3>
      </div>
    </Link>
  );
}

RecFoodCard.propTypes = {
  meal: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
}.isRequired;
