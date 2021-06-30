import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReceitasContext from '../contexts/ReceitasContext';

function Card({ index, strName, strThumb, id, type }) {
  const { setCurrent } = useContext(ReceitasContext);
  return (
    <Link to={ `/${type}/${id}` } onClick={ () => setCurrent(index) }>
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
