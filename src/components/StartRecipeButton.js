import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useRouteMatch } from 'react-router-dom';

export default function StartRecipeButton({ path }) {
  const history = useHistory();
  const match = useRouteMatch();
  const { params: { id } } = match;

  const setLocal = () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {},
      cocktails: {},
    }));
  };

  const setInProgress = () => {
    const getLocalInPro = localStorage.getItem('inProgressRecipes');
    const inProgress = JSON.parse(getLocalInPro);
    if (path === 'comidas') {
      const { meals } = inProgress;
      const toSet = {
        ...inProgress,
        meals: { ...meals, [id]: [] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(toSet));
    }
    if (path === 'bebidas') {
      const { cocktails } = inProgress;
      const toSet = {
        ...inProgress,
        cocktails: { ...cocktails, [id]: [] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(toSet));
    }
  };

  const handleInprogress = () => {
    const inProRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProRecipe === null) {
      setLocal();
    }
    setInProgress();
  };

  const searchIt = () => {
    const inProRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (path === 'comidas') {
      const ids = Object.keys(inProRecipe.meals);
      return ids.includes(id);
    }
    if (path === 'bebidas') {
      const ids = Object.keys(inProRecipe.cocktails);
      return ids.includes(id);
    }
  };

  const verifyInPro = () => {
    const inProRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const toReturn = inProRecipe ? searchIt() : false;
    return toReturn;
  };

  const handleButton = () => {
    handleInprogress();
    history.push(`/${path}/${id}/in-progress`);
  };

  return (
    <div className="button-container">
      <button
        className="start-button"
        onClick={ () => handleButton() }
        data-testid="start-recipe-btn"
        type="button"
      >
        { verifyInPro() ? 'Continuar Receita' : 'Iniciar Receita' }
      </button>
    </div>
  );
}

StartRecipeButton.propTypes = {
  path: PropTypes.string.isRequired,
};
