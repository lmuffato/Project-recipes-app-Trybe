import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { fetchDrinkForId } from '../../services/Data';
import shareIcon from '../../images/shareIcon.svg';
import context from '../../store/Context';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const getDrinksFavorites = (setFavHeart, id) => (
  (JSON.parse(localStorage.getItem('favoriteRecipes')) || [])
    .filter(({ id: localStorageId }) => localStorageId === id)
    .length ? setFavHeart(blackHeartIcon) : setFavHeart(whiteHeartIcon)
);

const copyLink = (id, alert, setAlert) => {
  copy(`http://localhost:3000/bebidas/${id}`);
  if (alert === '') {
    setAlert(<div>Link copiado!</div>);
  }
};

function DrinkInProgress() {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [alert, setAlert] = useState('');
  const [favHeart, setFavHeart] = useState(whiteHeartIcon);
  const { inProgressRecipes, setInProgressRecipes } = useContext(context);
  const { cocktails } = inProgressRecipes;
  const {
    idDrink,
    strCategory,
    strDrinkThumb,
    strDrink,
    strAlcoholic,
    strInstructions } = drinkDetail;

  useEffect(() => {
    const favoriteRecipes = (JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes]));
    getDrinksFavorites(setFavHeart, id);
    fetchDrinkForId(id)
      .then((res) => {
        if (res.drinks) setDrinkDetail(res.drinks[0]);
      });
  }, [id, cocktails]);

  const handleClick = () => {
    setShouldRedirect(true);
    setInProgressRecipes({
      cocktails: { ...cocktails, [id]: [] },
      meals: {},
    });
  };

  const addFavoriteRecipes = () => {
    const favoriteRecipes = (JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    }]));
    getDrinksFavorites(setFavHeart, id);
  };

  const delFavoriteRecipes = () => {
    const favoriteRecipes = (JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
    localStorage
      .setItem('favoriteRecipes', JSON
        .stringify(favoriteRecipes.filter((recipe) => recipe.id !== id)));
    getDrinksFavorites(setFavHeart, id);
  };

  const clickFavorite = () => (
    (JSON.parse(localStorage.getItem('favoriteRecipes')) || [])
      .filter(({ id: localStorageId }) => localStorageId === id)
      .length ? delFavoriteRecipes() : addFavoriteRecipes()
  );

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
          htmlFor="ingredients"
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            id="ingredients"
          />
          {ingredient}
          {' '}
          {ingredientList[`strMeasure${index}`]}
        </label>
        <br />
      </>
    ));
    return listIngredients;
  }
  if (drinkDetail.length === 0) return <div>Preparing Ingredients...</div>;
  if (shouldRedirect) return <Redirect to="/receitas-feitas" />;
  return (
    <>
      <img data-testid="recipe-photo" src={ strDrinkThumb } alt="drink" />
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <h2 data-testid="recipe-category">{strAlcoholic}</h2>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => copyLink(id, alert, setAlert) }
      >
        <img src={ shareIcon } alt="share-icon" />
      </button>
      <button
        type="button"
        onClick={ clickFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ favHeart }
          alt="favorite icon"
        />
      </button>
      {alert}
      <h4>Ingredients :</h4>
      {ingredientsList()}
      <h4>Instructions :</h4>
      <p data-testid="instructions">{strInstructions}</p>
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
