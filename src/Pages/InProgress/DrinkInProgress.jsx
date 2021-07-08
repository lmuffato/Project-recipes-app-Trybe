import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Redirect, Link } from 'react-router-dom';
import { fetchDrinkForId } from '../../services/Data';
import shareIcon from '../../images/shareIcon.svg';
import context from '../../store/Context';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function DrinkInProgress() {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { inProgressRecipes } = useContext(context);

  const handleClick = () => {
    setShouldRedirect(true);
  };

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  useEffect(() => {
    fetchDrinkForId(id)
      .then((res) => {
        if (res.drinks) setDrinkDetail(res.drinks[0]);
      });
  }, [id]);

  if (!drinkDetail) return <div>Preparing Ingredients...</div>;
  if (shouldRedirect) return <Redirect to="/comidas/receitas-feitas" />;
  const {
    strDrinkThumb,
    strDrink,
    strAlcoholic,
    strInstructions } = drinkDetail;

  function ingredientsList() {
    const ingredientList = drinkDetail;
    const fifteen = 15;
    const list = [];
    for (let index = 1; index <= fifteen; index += 1) {
      list.push(ingredientList[`strIngredient${index}`]);
    }
    const filtered = list.filter((ingredient) => ingredient !== null);
    const listIngredients = filtered.map((ingredient, index) => (
      <>
        <label
          key=""
          htmlFor="ingredient"
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            id="ingredient"
            type="checkbox"
          />
          {ingredient}
        </label>
        <br />
      </>
    ));
    return listIngredients;
  }

  function measuresList() {
    const measureList = drinkDetail;
    const fifteen = 15;
    const list = [];
    for (let index = 1; index <= fifteen; index += 1) {
      list.push(measureList[`strMeasure${index}`]);
    }
    const filtered = list.filter((ingredient) => ingredient !== '');
    const listMeasure = filtered.map((measure, index) => (
      <p key={ index }>
        {measure}
      </p>));
    return listMeasure;
  }

  return (
    <>
      <img data-testid="recipe-photo" src={ strDrinkThumb } alt="drink" />
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <h2 data-testid="recipe-category">{strAlcoholic}</h2>
      <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
      <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="favorite icon" />
      <h4>Ingredients :</h4>
      {ingredientsList()}
      {measuresList()}
      <h4>Instructions :</h4>
      <p data-testid="instructions">{strInstructions}</p>
      <Link to="/bebidas">Voltar</Link>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleClick }
      >
        Finalizar Receita
      </button>
    </>
  );
}

export default DrinkInProgress;
