import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import myContext from '../context/myContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../Style/InProgressDrinkOrFood.css';

function InProgressDrinkOrFood() {
  const { url } = useRouteMatch();
  const history = useHistory();

  const { recipes, setFetchFood, setFetchDrinks } = useContext(myContext);
  const { food, drinks } = recipes;
  const [mapName, setMapName] = useState('');
  const [foodOrDrink, setFoodOrDrink] = useState([]);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');

  const [shareButton, setShareButton] = useState(false);
  const [favorited, setFavorited] = useState('');

  const urlRequest = url.includes('comidas') ? 'themealdb' : 'thecocktaildb';

  const regex = /[\d+]/g;
  const id = url.match(regex).join('');

  useEffect(() => {
    if (url.includes('comidas')) {
      setMapName('Meal');
      setFoodOrDrink(food);
      setCategory('Category');
      setType('comidas');
    }
    if (url.includes('bebidas')) {
      setMapName('Drink');
      setFoodOrDrink(drinks);
      setCategory('Alcoholic');
      setType('bebidas');
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
    navigator.clipboard.writeText(`http://localhost:3000${url}/in-progress`);
    setShareButton(!shareButton);
  };

  const handleIngredientChecked = ({ target }) => {
    if (target.checked) {
      target.parentNode.classList.add('crossed');
    } else {
      target.parentNode.classList.remove('crossed');
    }
  };

  if (foodOrDrink) {
    const { strArea, strCategory, strAlcoholic } = foodOrDrink;
    console.log(strArea, strCategory, strAlcoholic);
  }

  // const recipeInfo = {
  //   id: `id${mapName}`,
  //   type,
  //   area: strArea || '',
  //   category: strCategory || '',
  //   alcoholicOrNot: strAlcoholic || '',
  //   name: `str${mapName}`,
  //   image: `str${mapName}Thumb`,
  // };

  // console.log(recipeInfo);

  return (
    <div>
      {foodOrDrink.map((item, index) => {
        const filterByIngredients = Object.entries(foodOrDrink[0])
          .filter((element) => element[0].includes('strIngredient') && element[1])
          .reduce((acc, element) => [...acc, element[1]], []);
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
              {filterByIngredients.map((ingredient, index2) => (
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
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default InProgressDrinkOrFood;
