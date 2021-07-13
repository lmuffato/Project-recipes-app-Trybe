import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import '../../styles/Card.css';
import ReceitasContext from '../../contexts/ReceitasContext';

function IngredienteCard({ index, strName, strThumb, page, endpoint }) {
  const { fetchApi, setExplore } = useContext(ReceitasContext);

  const history = useHistory();
  return (
    <button
      className="card"
      type="button"
      data-testid={ `${index}-ingredient-card` }
      onClick={ () => {
        fetchApi(endpoint, page);
        setExplore(true);
        history.push(`/${page}`);
      } }
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

IngredienteCard.propTypes = {
  index: PropTypes.number.isRequired,
  strName: PropTypes.string.isRequired,
  strThumb: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default IngredienteCard;
