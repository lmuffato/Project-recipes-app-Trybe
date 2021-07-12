import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Redirect, Link } from 'react-router-dom';
import { fetchDrinkForId } from '../../services/Data';
import shareIcon from '../../images/shareIcon.svg';
import context from '../../store/Context';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function DrinkInProgress() {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [drinkDetail, setDrinkDetail] = useState([]);
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
    const filtered = list.filter(
      (ingredient) => ingredient !== '' && ingredient !== null,
    );
    const listIngredients = filtered.map((ingredient, index) => (
      <>
        <label
          key=""
          htmlFor="ingredient"
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
      <button
        type="button"
        onClick={ copyLink }
      >
        <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
      </button>
      <button
        type="button"
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
