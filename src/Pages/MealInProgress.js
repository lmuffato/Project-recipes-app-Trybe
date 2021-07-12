import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RenderFavoriteHeart from '../util/addOrRemoveFavorite';
import RenderInstructions from '../components/renderInstructions';
import RenderRecipeImg from '../util/mealDetailsComponents/renderRecipeImg';
import shareIcon from '../images/shareIcon.svg';
import RenderCheckboxIngredients from '../util/renderCheckboxIngredients';

export default function MealInProgress() {
  const id = window.location.href.split('/')[4];
  const globalState = useSelector((state) => state.detailsReducer.favorites);
  const [data, setData] = useState();
  const [inProgress, setInProgress] = useState();
  const dispatch = useDispatch();
  const [copy, setCopy] = useState('');
  const history = useHistory();

  useEffect(() => {
    const mealDrinks = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await fetch(url).then((r) => r.json());
      setData(meals);
    };
    mealDrinks();
  }, [id]);

  const copyLink = (recipeId) => {
    const url = `http://localhost:3000/comidas/${recipeId}`;
    navigator.clipboard.writeText(url);
    setCopy('Link copiado!');
  };

  const renderInProgressRecipe = () => {
    if (data && data.length > 0) {
      const ingredients = [];
      const measure = [];
      const aux = [];
      const array = Object.entries(data[0]);
      array.forEach((item) => {
        if (item[0].includes('strIngredient') && item[1] !== null && item[1] !== '') {
          ingredients.push(item[1]);
        }
        if (item[0].includes('strMeasure')) {
          measure.push(item[1]);
        }
      });
      ingredients.forEach((item, index) => {
        if (measure[index]) {
          aux.push(`${item} - ${measure[index]}`);
        } else {
          aux.push(item);
        }
      });
      const { idMeal, strMealThumb, strMeal, strCategory, strInstructions } = data[0];
      const ls = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const disabled = ls ? ls.meals[idMeal].length === aux.length : false;
      return (
        <div>
          {RenderRecipeImg(strMealThumb)}
          <div>
            <h2 data-testid="recipe-title">{strMeal}</h2>
            {RenderFavoriteHeart('comida', data[0], dispatch, globalState)}
            <button
              data-testid="share-btn"
              type="button"
              onClick={ () => copyLink(idMeal) }
            >
              <img alt="share" src={ shareIcon } />
            </button>
            {copy}
            <h3 data-testid="recipe-category">{strCategory}</h3>
          </div>
          <h2>Ingredients</h2>
          <RenderCheckboxIngredients
            ingredients={ aux }
            inProgress={ inProgress }
            setInProgress={ setInProgress }
          />
          <h2>Instructions</h2>
          <RenderInstructions strInst={ strInstructions } />
          <button
            disabled={ !disabled }
            className="footer"
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ () => history.push('/receitas-feitas') }
          >
            Finalizar Receita
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      {renderInProgressRecipe()}
    </div>
  );
}
