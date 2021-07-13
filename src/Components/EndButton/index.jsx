import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { handleLocalProgress } from '../../helpers';

function EndButton({ id, toggleURL, recipeStatus }) {
  const { setDoingRecipes } = useContext(UserContext);

  const toggle = toggleURL === 'comidas' ? 'meals' : 'cocktails';
  const handleStart = () => {
    const toSave = handleLocalProgress(toggle, id, '');
    setDoingRecipes(toSave);
    localStorage.setItem('inProgressRecipes', JSON.stringify(toSave));
  };

  return (
    <div className="btn-cntl">
      <Link to={ `/${toggleURL}/${id}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="init-btn btn btn-primary"
          onClick={ () => handleStart() }
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
