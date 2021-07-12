import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';

function EndButton({ id, toggleURL, recipeStatus }) {
  const { setDoingRecipes, doingRecipes } = useContext(UserContext);
  return (
    <div className="btn-cntl">
      <Link to={ `/${toggleURL}/${id}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="init-btn btn btn-primary"
          onClick={ () => setDoingRecipes([...doingRecipes, { id, ingrd: [] }]) }
        >
          {recipeStatus}
        </button>
      </Link>
    </div>
  );
}

EndButton.propTypes = {
  id: PropTypes.string,
  toggleURL: PropTypes.string,
  recipeStatus: PropTypes.string,
}.isRequired;

export default EndButton;
