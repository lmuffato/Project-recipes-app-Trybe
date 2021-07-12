import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';

function EndButton({ id, toggleURL, recipeStatus }) {
  const { setDoingRecipes } = useContext(UserContext);

  const getRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const toggle = toggleURL === 'comidas' ? 'meals' : 'cocktails';

  const handleStart = () => {
    let toSavedOnLocal;
    if (getRecipes) {
      const currentRecipes = getRecipes[toggle];
      if (currentRecipes) {
        toSavedOnLocal = {
          ...getRecipes,
          [toggle]: {
            ...getRecipes[toggle],
            [id]: [...getRecipes[toggle][id]],
          },
        };
      }
    } else {
      toSavedOnLocal = {
        ...getRecipes,
        [toggle]: {
          [id]: [],
        },
      };
    }
    setDoingRecipes(toSavedOnLocal);
    localStorage.setItem('inProgressRecipes', JSON.stringify(toSavedOnLocal));
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
