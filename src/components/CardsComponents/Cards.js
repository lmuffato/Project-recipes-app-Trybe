import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import '../../styles/Card.css';

function Card({ index, strName, strThumb, strId, page }) {
  const history = useHistory();
  return (
    <button
      className="card"
      type="button"
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(`/${page}/${strId}`) }
    >
      <img
        className="card-img"
        src={ strThumb }
        data-testid={ `${index}-card-img` }
        alt="foto da receita"
      />
      <h4 className="card-title" data-testid={ `${index}-card-name` }>{ strName }</h4>
    </button>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  strName: PropTypes.string.isRequired,
  strThumb: PropTypes.string.isRequired,
  strId: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

export default Card;
