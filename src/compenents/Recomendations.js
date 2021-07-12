import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/Recomendations.css';

function Recomendations({ index, id, thumb, recipeName }) {
  return (
    <Link
      to={ `/comidas/${id}` }
      className="recipe recomendation-card"
      data-testid={ `${index}-recomendation-card` }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ thumb }
        alt="Meal"
        className="recipe-image"
      />
      <p className="recipe-title" data-testid={ `${index}-recomendation-title` }>
        {recipeName}
      </p>
    </Link>
  );
}

Recomendations.propTypes = {
  index: PropTypes.number,
  id: PropTypes.string,
  thumb: PropTypes.string,
  recipeName: PropTypes.string,
}.isRequired;

export default Recomendations;
