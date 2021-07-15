import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { RecipesContext } from '../../../../context/Recipes';

import styles from './styles.module.scss';

function StartOrFinishRecipeBtn({ recipe }) {
  const { id } = useParams();
  const {
    doneRecipes, inProgressRecipes, addRecipeInProgress,
  } = useContext(RecipesContext);
  const { location: { pathname }, push: historyPush } = useHistory();
  const recipeIsNotFinished = !(doneRecipes.find((doneRecipe) => doneRecipe.id === id));
  const [typeInProgress, setTypeInProgress] = useState('');
  const recipeIsInProgress = (
    inProgressRecipes[typeInProgress] && inProgressRecipes[typeInProgress][id]
  );

  useEffect(() => {
    const lastCharacter = -1;
    const type = pathname.split('/')[1].slice(0, lastCharacter);
    switch (type) {
    case 'comida': {
      setTypeInProgress('meals');
      break;
    }

    case 'bebida': {
      setTypeInProgress('cocktails');
      break;
    }

    default:
      break;
    }
  }, [pathname]);

  function startOrFinishRecipe() {
    const lastCharacter = -1;
    const type = pathname.split('/')[1].slice(0, lastCharacter);
    if (recipeIsNotFinished) {
      historyPush(`${pathname}/in-progress`);
      addRecipeInProgress(type, id, recipe.ingredients);
    } else {
      historyPush('/receitas-feitas');
    }
  }

  return (
    <button
      type="button"
      className={ `${styles.startRecipe} ${!recipeIsNotFinished && styles.finished}` }
      onClick={ startOrFinishRecipe }
      data-testid={
        pathname.includes('in-progress') ? 'finish-recipe-btn' : 'start-recipe-btn'
      }
    >
      { (recipeIsNotFinished && recipeIsInProgress) && 'Continuar receita' }
      { (recipeIsNotFinished && !recipeIsInProgress) && 'Iniciar receita' }
      { (!recipeIsNotFinished) && 'Finalizar receita' }
    </button>
  );
}

StartOrFinishRecipeBtn.propTypes = {
  recipe: PropTypes.shape({
    ingredients: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default StartOrFinishRecipeBtn;
