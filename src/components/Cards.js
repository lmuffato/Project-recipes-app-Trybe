import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Card({ index, strName, strThumb, id, type }) {
  return (
    <Link to={ `/${type}/${id}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          src={ strThumb }
          data-testid={ `${index}-card-img` }
          alt="foto da receita"
        />
        <h4 data-testid={ `${index}-card-name` }>{ strName }</h4>
      </div>
    </Link>

  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  strName: PropTypes.string.isRequired,
  strThumb: PropTypes.string.isRequired,
};

export default Card;
