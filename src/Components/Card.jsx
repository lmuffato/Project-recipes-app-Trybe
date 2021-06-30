import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ thumb, name, index }) => (
  <div className="card-container" data-testid={ `${index}-recipe-card` }>
    <img
      src={ thumb }
      alt={ name }
      className="img-card"
      data-testid={ `${index}-card-img` }
    />
    <h3 data-testid={ `${index}-card-name` }>{name}</h3>
  </div>
);

Card.propTypes = {
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
