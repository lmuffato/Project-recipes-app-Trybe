import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Redirect, Link } from 'react-router-dom';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { fetchFoodForId } from '../../services/Data';
import shareIcon from '../../images/shareIcon.svg';
import context from '../../store/Context';

const copy = require('clipboard-copy');

function FoodInProgress() {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [foodDetail, setFoodDetail] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [alert, setAlert] = useState('');
  const [favHeart, setFavHeart] = useState(
    <img src={ whiteHeartIcon } alt="favorite icon" />,
  );
  const { inProgressRecipes } = useContext(context);

  const handleClick = () => {
    setShouldRedirect(true);
  };

  const copyLink = () => {
    const shareLink = location.pathname;
    copy(`http://localhost:3000/${shareLink}`);
    if (alert === '') {
      setAlert(<div>Link copiado!</div>);
    }
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
    const filtered = list.filter(
      (ingredient) => ingredient !== '' && ingredient !== null,
    );
    const listIngredients = filtered.map((ingredient, index) => (
      <>
        <label
          key=""
          htmlFor="ingredients"
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            id="ingredient"
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
    const filtered = list.filter(
      (ingredient) => ingredient !== '' || ingredient !== null,
    );
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
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyLink }
      >
        <img src={ shareIcon } alt="share-icon" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => setFavHeart(<img src={ blackHeartIcon } alt="favorite icon" />) }
      >
        {favHeart}
      </button>
      {alert}
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
