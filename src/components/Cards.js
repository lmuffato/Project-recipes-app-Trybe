import React from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// import ReceitasContext from '../contexts/ReceitasContext';

function Card({ index, strName, strThumb }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ strThumb }
        data-testid={ `${index}-card-img` }
        alt="foto da receita"
      />
      <h4 data-testid={ `${index}-card-name` }>{ strName }</h4>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.string.isRequired,
  strName: PropTypes.string.isRequired,
  strThumb: PropTypes.string.isRequired,
};

export default Card;
