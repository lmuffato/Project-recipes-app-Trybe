import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RenderFavoriteHeart from '../util/addOrRemoveFavorite';
import RenderInstructions from '../util/mealDetailsComponents/renderInstructions';
import RenderRecipeImg from '../util/mealDetailsComponents/renderRecipeImg';
import shareIcon from '../images/shareIcon.svg';
import RenderCheckboxIngredients from '../util/renderCheckboxIngredients';

export default function DrinkInProgress() {
  const id = window.location.href.split('/')[4];
  const globalState = useSelector((state) => state.detailsReducer.favorites);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [copy, setCopy] = useState('');
  const history = useHistory();

  useEffect(() => {
    const mealDrinks = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { drinks } = await fetch(url).then((r) => r.json());
      setData(drinks);
    };
    mealDrinks();
  }, [id]);

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopy('Link copiado!');
  };

  const renderInProgressRecipe = () => {
    if (data && data.length > 0) {
      const ingredients = [];
      const measure = [];
      const array = Object.entries(data[0]);
      array.forEach((item) => {
        if (item[0].includes('strIngredient') && item[1] !== null) {
          ingredients.push(item[1]);
        }
        if (item[0].includes('strMeasure')) {
          measure.push(item[1]);
        }
      });
      const { strDrinkThumb, strDrink, strCategory, strInstructions } = data[0];

      return (
        <div>
          {RenderRecipeImg(strDrinkThumb)}
          <div>
            <h2 data-testid="recipe-title">{strDrink}</h2>
            {RenderFavoriteHeart('comida', data[0], dispatch, globalState)}
            {copy}
            <button data-testid="share-btn" type="button" onClick={ () => copyLink() }>
              <img alt="share" src={ shareIcon } />
            </button>
            <h3 data-testid="recipe-category">{strCategory}</h3>
          </div>
          <h2>Ingredients</h2>
          {RenderCheckboxIngredients(ingredients, measure)}
          <h2>Instructions</h2>
          {RenderInstructions(strInstructions)}
          <button
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
