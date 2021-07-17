import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { fetchFoodForId } from '../../services/Data';
import shareIcon from '../../images/shareIcon.svg';
import context from '../../store/Context';

const copy = require('clipboard-copy');

const getFoodsFavorites = (setFavHeart, id) => (
  (JSON.parse(localStorage.getItem('favoriteRecipes')) || [])
    .filter(({ id: localStorageId }) => localStorageId === id)
    .length ? setFavHeart(blackHeartIcon) : setFavHeart(whiteHeartIcon)
);

const copyLink = (id, alert, setAlert) => {
  copy(`http://localhost:3000/comidas/${id}`);
  if (alert === '') {
    setAlert(<div>Link copiado!</div>);
  }
};

const getFoodsLocalStorage = () => (
  localStorage.getItem('inProgressRecipes')
  && Object.keys(JSON.parse(localStorage.getItem('inProgressRecipes')).meals)
);

getFoodsLocalStorage();

function FoodInProgress() {
  const { inProgressRecipes, setInProgressRecipes } = useContext(context);
  const { meals } = inProgressRecipes;
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [foodDetail, setFoodDetail] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [alert, setAlert] = useState('');
  const [favHeart, setFavHeart] = useState(whiteHeartIcon);

  const handleClick = () => {
    setShouldRedirect(true);
    setInProgressRecipes({
      cocktails: {},
      meals: { ...meals, [id]: [] },
    });
  };

  useEffect(() => {
    const favoriteRecipes = (JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes]));
    getFoodsFavorites(setFavHeart, id);
    fetchFoodForId(id)
      .then((res) => {
        if (res.meals) setFoodDetail(res.meals[0]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, meals]);

  const {
    idMeal,
    strArea,
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions } = foodDetail;

  const addFavoriteRecipes = () => {
    const favoriteRecipes = (JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    }]));
    getFoodsFavorites(setFavHeart, id);
  };
  const delFavoriteRecipes = () => {
    const favoriteRecipes = (JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
    localStorage
      .setItem('favoriteRecipes', JSON
        .stringify(favoriteRecipes.filter((recipe) => recipe.id !== id)));
    getFoodsFavorites(setFavHeart, id);
  };

  const clickFavorite = () => (
    (JSON.parse(localStorage.getItem('favoriteRecipes')) || [])
      .filter(({ id: localStorageId }) => localStorageId === id)
      .length ? delFavoriteRecipes() : addFavoriteRecipes()
  );

  const ingredientsList = () => {
    const ingredientList = foodDetail;
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
            value={ ingredient }
            name="checkbox"
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
  };

  if (shouldRedirect) return <Redirect to="/receitas-feitas" />;
  if (foodDetail.length === 0) return <div>Preparing Ingredients...</div>;
  return (
    <>
      <img data-testid="recipe-photo" src={ strMealThumb } alt="food" />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <h2 data-testid="recipe-category">{strCategory}</h2>
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
        disabled="true"
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
