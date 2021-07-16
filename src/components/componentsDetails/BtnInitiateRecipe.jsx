import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './Recommends.css';

export default function BtnInitiateRecipe({ id, type }) {
  const history = useHistory();
  return (
    <button
      data-testid="start-recipe-btn"
      type="button"
      id="start-recipe-btn"
      className="playRecipe"
      onClick={ () => history.push(`/${type}s/${id}/in-progress`) }
    >
      Iniciar Receita
    </button>
  );
}

BtnInitiateRecipe.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
}.isRequired;
