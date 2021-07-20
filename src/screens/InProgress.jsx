/*
A foto deve possuir o atributo data-testid="recipe-photo";
O título deve possuir o atributo data-testid="recipe-title";
O botão de compartilhar deve possuir o atributo data-testid="share-btn";
O botão de favoritar deve possuir o atributo data-testid="favorite-btn";
O texto da categoria deve possuir o atributo data-testid="recipe-category";
Os ingredientes devem possuir o atributo data-testid=${index}-ingredient-step, a verificação será feita pelo length do atributo.
O elemento de instruções deve possuir o atributo data-testid="instructions";
O botão para finalizar a receita deve possuir o atributo data-testid="finish-recipe-btn".

Este componente renderiza a tela de receitas em progresso
*/

import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/ContextRecipes';
import fetchApiById from '../service/fetchApiById';
import HeaderDetailsInProgress from '../components/HeaderDetailsInProgress';
import Ingredients from '../components/Ingredients';
import Instructions from '../components/Instructions';
import ButtonFinish from '../components/ButtonFinish';

function InProgress(props) {
  const { match: { params: { id } } } = props;
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState(false);
  const [isLoalding, setIsLoalding] = useState(true);
  const { isCompleted } = useContext(ContextRecipes);
  const dbType = pathname.includes('comidas') ? 'themealdb' : 'thecocktaildb';

  useEffect(() => {
    async function requestApi() {
      setIsLoalding(true);
      const request = await fetchApiById(dbType, id);
      setRecipe(request);
      setIsLoalding(false);
    }
    requestApi();
  }, [dbType, id]);

  return (
    <div>
      { isLoalding ? <h1>Loalding</h1>
        : (
          <main>
            <HeaderDetailsInProgress recipe={ recipe } />
            <Ingredients recipe={ recipe } />
            <Instructions instructions={ recipe.strInstructions } />
            <ButtonFinish
              completed={ isCompleted }
              dbType={ dbType }
              id={ id }
            />
          </main>)}
    </div>

  );
}

InProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default InProgress;
