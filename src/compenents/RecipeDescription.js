import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../contexts/RecipesContext';
import Loading from './Loading';
import MealDescription from './MealDescription';
import DrinkDescription from './DrinkDescription';

function RecipeDescription() {
  const { recomendations, setRecomendations } = useContext(RecipesContext);
  const history = useHistory();

  const recipeType = history.location.pathname.split('/')[1];
  const recipeId = history.location.pathname.split('/')[2];
  let recipeSearch;
  let type;
  // console.log(recipeType);
  // console.log(recipeId);

  if (recipeType === 'comidas') {
    recipeSearch = 'meal';
    type = 'cocktail';
  } else if (recipeType === 'bebidas') {
    recipeSearch = 'cocktail';
    type = 'meal';
  } else {
    recipeSearch = null;
  }

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const getMeal = async () => {
      const recipeEndpoint = `https://www.the${recipeSearch}db.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      await fetch(recipeEndpoint).then((data) => data.json())
        .then((result) => {
          setRecipe(result);
        })
        .catch(() => global.alert(
          'Falha na receita, por favor, volte na tela anterior e tente novamente!',
        ));

      const recomendationsEndpoint = `https://www.the${type}db.com/api/json/v1/1/search.php?s=`;
      const lastRecomendation = 6;
      await fetch(recomendationsEndpoint).then((data) => data.json())
        .then((result) => {
          setRecomendations(Object.values(result)[0]
            .slice(0, lastRecomendation));
        })
        .catch(() => global.alert(
          'Falha nas recomendações, por favor, volte na tela anterior e tente novamente!',
        ));
    };
    getMeal();
  }, [recipeId, recipeSearch, type, setRecomendations]);

  const recipeRender = () => (
    recipeSearch === 'meal'
      ? <MealDescription recipe={ Object.values(recipe)[0][0] } recipeId={ recipeId } />
      : <DrinkDescription recipe={ Object.values(recipe)[0][0] } recipeId={ recipeId } />
  );

  return (
    recipe && recomendations ? recipeRender() : <Loading />
  );
}

export default RecipeDescription;
