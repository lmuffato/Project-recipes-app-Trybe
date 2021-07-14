import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import MealIngredientsMeasure from '../compenents/MealIngredientsMeasure';
import RecipesContext from '../contexts/RecipesContext';
import ShareButton from '../compenents/ShareButton';
import FavoriteBtn from '../compenents/FavoriteBtn';
import Loading from '../compenents/Loading';

function MealsRecepiesProgress() {
  const [detailsRecepie, setDetailsRecepie] = useState();
  const { allChecked, setIsFavorite } = useContext(RecipesContext);
  const history = useHistory();
  const recepiID = history.location.pathname.split('/')[2];

  // ao montar a pagina, faz api que traz infos via ID.
  useEffect(() => {
    const getRecepi = async () => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recepiID}`;
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setDetailsRecepie(meals[0]);
    };
    getRecepi();
  }, []);

  const getLocalStr = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let checkLocalStr;

  if (getLocalStr !== null) {
    // procura o recipeId no LS
    checkLocalStr = Object.values(getLocalStr)
      .find(({ id: strId }) => strId === recepiID);
  }

  function saveLS() {
    // Esta função não esta sendo chamada, e precisa ser duplicada para o MealsRecepiesProgress
    console.log('chamou a função de salvar');
    const getLS = localStorage.getItem('doneRecipes');
    const desStringGetLS = JSON.parse(getLS);
    // desStringGetLS é um array de objetos
    const { strMeal, strCategory, strArea, strMealThumb, strTags } = detailsRecepie;
    const date = new Date();
    const newDoneRecepi = {
      id: recepiID,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: `${date.getDate()} - ${date.getTime()}`,
      tags: strTags,
    };
    if (desStringGetLS === null) {
      console.log('desStringGetLs é null');
      const newDoneRecepiString = JSON.stringify(newDoneRecepi);
      return localStorage.setItem('doneRecipes', [newDoneRecepiString]);
    }
    console.log('localStorage nao é null');
    const newArrayOfObjects = desStringGetLS.push(newDoneRecepi);
    const stringNewArrayOfObjects = JSON.stringify(newArrayOfObjects);
    return localStorage.setItem('doneRecipes', stringNewArrayOfObjects);
  }

  if (checkLocalStr) {
    setIsFavorite(true);
  } else {
    setIsFavorite(false);
  }

  if (detailsRecepie === undefined) {
    return <Loading />;
  }
  const {
    strArea, strCategory, strMeal, strMealThumb, strInstructions,
  } = detailsRecepie;

  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt="meals recepi"
        src={ strMealThumb }
        width="50px"
      />
      <h2 data-testid="recipe-title">{ strMeal }</h2>
      <ShareButton
        idRecipe={ `comidas/${recepiID}` }
      />
      <FavoriteBtn
        id={ recepiID }
        type="comida"
        area={ strArea }
        category={ strCategory }
        alcoholicOrNot=""
        name={ strMeal }
        image={ strMealThumb }
      />
      <p data-testid="recipe-category">{ strCategory }</p>
      <p>Ingredients</p>
      <MealIngredientsMeasure
        detailsRecepie={ detailsRecepie }
      />
      <p>Instruções</p>
      <p data-testid="instructions">{ strInstructions }</p>

      <Link to="/receitas-feitas">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ allChecked }
          onClick={ () => saveLS() }
        >
          Finalizar receita
        </button>
      </Link>
    </div>
  );
}

export default MealsRecepiesProgress;
