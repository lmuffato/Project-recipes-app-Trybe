import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import contexteRecipes from '../context/ContextRecipes';

function RenderProgress(props) {
  const { type, ke } = props;
  const { doneRecipes } = useContext(contexteRecipes);
  const history = useHistory();

  const startRecipe = {
    position: 'fixed',
    bottom: '0px',
  };

  function alreadyDone() {
    let doneFlag = false;
    doneRecipes.forEach((recip) => {
      if (recip.id === ke) doneFlag = true;
    });
    return doneFlag;
  }

  localStorage.setItem('inProgressRecipes', JSON.stringify({
    meals: {},
    cocktails: {},
  }));

  const getLocalInPro = localStorage.getItem('inProgressRecipes');
  const inProgress = JSON.parse(getLocalInPro);
  if (type === 'comidas') {
    const { meals } = inProgress;
    const toSet = {
      ...inProgress,
      meals: { ...meals, [ke]: [] },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(toSet));
  }

  if (type === 'bebidas') {
    const { cocktails } = inProgress;
    const toSet = {
      ...inProgress,
      cocktails: { ...cocktails, [ke]: [] },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(toSet));
  }

  const searchIt = () => {
    const inProRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (type === 'comidas') {
      const ids = Object.keys(inProRecipe.meals);
      return ids.includes(ke);
    }
    if (type === 'bebidas') {
      const ids = Object.keys(inProRecipe.cocktails);
      return ids.includes(ke);
    }
  };

  const verifyInPro = () => {
    const inProRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const toReturn = inProRecipe ? searchIt() : false;
    return toReturn;
  };

  if (alreadyDone()) {
    return (<div>Receita já feita</div>);
  }

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      style={ startRecipe }
      onClick={ () => history.push(`/${type}/${ke}/in-progress`) }
    >
      { verifyInPro() ? 'Continuar Receita' : 'Iniciar Receita' }
    </button>
  );
}

RenderProgress.propTypes = {
  type: PropTypes.string.isRequired,
  ke: PropTypes.number.isRequired,
};

export default RenderProgress;
