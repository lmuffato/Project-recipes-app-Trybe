import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import myContext from '../context/myContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../Style/InProgressDrinkOrFood.css';

const disableButton = (fn, foodOrDrink, ingredients) => {
  if (fn(foodOrDrink[0]).length === ingredients.length) {
    return false;
  }
  return true;
};

function InProgressDrinkOrFood() {
  const { url } = useRouteMatch();
  const history = useHistory();

  const { recipes, setFetchFood, setFetchDrinks } = useContext(myContext);
  const { food, drinks } = recipes;
  const [mapName, setMapName] = useState('');
  const [foodOrDrink, setFoodOrDrink] = useState([]);
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const [shareButton, setShareButton] = useState(false);
  const [favorited, setFavorited] = useState('');

  const urlRequest = url.includes('comidas') ? 'themealdb' : 'thecocktaildb';

  const regex = /[\d+]/g;
  const id = url.match(regex).join('');

  const mapIngredients = (fn = {}) => {
    const filterByIngredients = Object.entries(fn)
      .filter((element) => element[0].includes('strIngredient') && element[1])
      .reduce((acc, element) => [...acc, element[1]], []);
    return filterByIngredients;
  };

  useEffect(() => {
    if (url.includes('comidas')) {
      setMapName('Meal');
      setFoodOrDrink(food);
      setCategory('Category');
    }
    if (url.includes('bebidas')) {
      setMapName('Drink');
      setFoodOrDrink(drinks);
      setCategory('Alcoholic');
    }
  }, [food, drinks]);

  const fetchAPI = async () => {
    const response = await fetch(`https://www.${urlRequest}.com/api/json/v1/1/lookup.php?i=${id}`);
    const recipe = await response.json();
    setFetchFood(recipe.meals);
    setFetchDrinks(recipe.drinks);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const clickFavorite = () => {
    setFavorited(!favorited);
  };

  const clickShare = () => {
    navigator.clipboard.writeText(`http://localhost:3000${url.split('/in-progress')[0]}`);
    setShareButton(!shareButton);
  };

  const handleIngredientChecked = ({ target }) => {
    if (target.checked) {
      target.parentNode.classList.add('crossed');
      setIngredients(ingredients.concat(target.nextSibling.innerText));
    } else {
      target.parentNode.classList.remove('crossed');
    }
  };

  return (
    <div>
      {foodOrDrink.map((item, index) => {
        const filterByMeasures = Object.entries(foodOrDrink[0])
          .filter((element) => element[0].includes('strMeasure') && element[1])
          .reduce((acc, element) => [...acc, element[1]], []);
        return (
          <div key={ index }>
            <img
              style={ { width: '250px' } }
              src={ item[`str${mapName}Thumb`] }
              alt={ item[`str${mapName}`] }
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{item[`str${mapName}`]}</h2>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ clickShare }
            >
              <img src={ shareIcon } alt="share-button" />
            </button>
            {shareButton ? <span>Link copiado!</span> : null}
            <button
              type="button"
              onClick={ clickFavorite }
            >
              <img
                src={ favorited
                  ? blackHeartIcon
                  : whiteHeartIcon }
                alt="favorite-button"
                data-testid="favorite-btn"
              />
            </button>
            <p data-testid="recipe-category">{item[`str${category}`]}</p>
            <ul>
              <h1>Ingredientes</h1>
              { mapIngredients(foodOrDrink[0]).map((ingredient, index2) => (
                <li
                  key={ index2 }
                  data-testid={ `${index2}-ingredient-step` }
                >
                  <label
                    htmlFor={ ingredient }
                  >
                    <input
                      id={ ingredient }
                      type="checkbox"
                      onChange={ handleIngredientChecked }
                    />
                    <span>{`${ingredient} - `}</span>
                    <span>{`${filterByMeasures[index2]}`}</span>
                  </label>
                </li>
              ))}
            </ul>
            <p data-testid="instructions">
              {item.strInstructions}
            </p>
          </div>
        );
      })}
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => { history.push('/receitas-feitas'); } }
        disabled={ disableButton(mapIngredients, foodOrDrink, ingredients) }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default InProgressDrinkOrFood;
