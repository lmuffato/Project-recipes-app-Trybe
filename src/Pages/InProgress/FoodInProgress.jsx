import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Redirect, Link } from 'react-router-dom';
import { fetchFoodForId } from '../../services/Data';
import shareIcon from '../../images/shareIcon.svg';
import context from '../../store/Context';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function FoodInProgress() {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [foodDetail, setFoodDetail] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { inProgressRecipes } = useContext(context);

  const handleClick = () => {
    setShouldRedirect(true);
  };

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  useEffect(() => {
    fetchFoodForId(id)
      .then(({ meals }) => setFoodDetail(meals));
  }, [id]);

  if (shouldRedirect) return <Redirect to="/comidas/receitas-feitas" />;
  if (!foodDetail.length) return <div>Preparing Ingredients...</div>;
  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions } = foodDetail[0];

  function ingredientsList() {
    const ingredientList = foodDetail[0];
    const twenty = 20;
    const list = [];
    for (let index = 1; index <= twenty; index += 1) {
      list.push(ingredientList[`strIngredient${index}`]);
    }
    const filtered = list.filter((ingredient) => ingredient !== '');
    const listIngredients = filtered.map((ingredient, index) => (
      <>
        <label
          key=""
          htmlFor="ingredient"
        >
          <input
            data-testid={ `${index}-ingredient-step` }
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
    const measureList = foodDetail[0];
    const twenty = 20;
    const list = [];
    for (let index = 1; index <= twenty; index += 1) {
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
      <img data-testid="recipe-photo" src={ strMealThumb } alt="food" />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <h2 data-testid="recipe-category">{strCategory}</h2>
      <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
      <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="favorite icon" />
      <h4>Ingredients :</h4>
      {ingredientsList()}
      {measuresList()}
      <h4>Instructions :</h4>
      <p data-testid="instructions">{strInstructions}</p>
      <Link to="/comidas">Voltar</Link>
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

export default FoodInProgress;
