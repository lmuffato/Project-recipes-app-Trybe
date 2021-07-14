import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import DrinkIngredientsMeasure from '../compenents/DrinkIngredientsMeasure';
import RecipesContext from '../contexts/RecipesContext';
import ShareButton from '../compenents/ShareButton';
import FavoriteBtn from '../compenents/FavoriteBtn';
import Loading from '../compenents/Loading';

function DrinksRecepiesProgress() {
  const [detailsRecepie, setDetailsRecepie] = useState();
  const { allChecked, setIsFavorite } = useContext(RecipesContext);
  const history = useHistory();
  const recepiID = history.location.pathname.split('/')[2];

  // ao montar a pagina, faz api que traz infos via ID.
  useEffect(() => {
    const getRecepi = async () => {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recepiID}`;
      const returnFetch = await fetch(endpoint);
      const dataJson = await returnFetch.json();
      const { drinks } = dataJson;
      setDetailsRecepie(drinks[0]);
    };
    getRecepi();
  }, []);

  /*   function saveLS() {
  // Esta função não esta sendo chamada, e precisa ser duplicada para o MealsRecepiesProgress
    console.log('chamou a função de salvar');
    const getLS = localStorage.getItem('doneRecipes');
    const { strDrink, strDrinkThumb, strAlcoholic, strTags } = detailsRecepie;
    const date = new Date();
    const newDoneRecepi = {
      id: recepiID,
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: `${date.getDate()} - ${date.getTime()}`,
      tags: strTags,
    };
    console.log(newDoneRecepi.doneDate);
    return localStorage.setItem('doneRecipes', [...getLS, newDoneRecepi]);
  } */

  const getLocalStr = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let checkLocalStr;

  if (getLocalStr !== null) {
    // procura o recipeId no LS
    checkLocalStr = Object.values(getLocalStr)
      .find(({ id: strId }) => strId === recepiID);
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
    strDrink, strDrinkThumb,
    strAlcoholic, strInstructions,
  } = detailsRecepie;

  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt="drinks recepi"
        src={ strDrinkThumb }
        width="50px"
      />
      <h2 data-testid="recipe-title">{ strDrink }</h2>
      <ShareButton
        idRecipe={ `bebidas/${recepiID}` }
      />
      <FavoriteBtn
        id={ recepiID }
        type="bebida"
        area=""
        category="Cocktail"
        alcoholicOrNot={ strAlcoholic }
        name={ strDrink }
        image={ strDrinkThumb }
      />
      <p data-testid="recipe-category">{ strAlcoholic }</p>
      <p>Ingredients</p>
      <DrinkIngredientsMeasure
        detailsRecepie={ detailsRecepie }
      />
      <p>Instruções</p>
      <p data-testid="instructions">{ strInstructions }</p>

      <Link to="/receitas-feitas">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ allChecked }
          // onClick={ saveLS }
        >
          Finalizar receita
        </button>
      </Link>
    </div>
  );
}

export default DrinksRecepiesProgress;
