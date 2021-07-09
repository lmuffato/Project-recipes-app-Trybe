import React, { useContext, useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import RecipesContext from '../contexts/RecipesContext';
import '../styles/mapDetails.css';

function ExploreFoodOrDrink() {
  const { ingredients,
    recipes,
  } = useContext(RecipesContext);
  const [keyName, setKeyName] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [urlImageName, setUrlImageName] = useState('');

  const { url } = useRouteMatch();

  useEffect(() => {
    if (url.includes('comidas')) {
      setKeyName('foods');
      setIngredientName('strIngredient');
      setUrlImageName('themealdb');
    }
    if (url.includes('bebidas')) {
      setKeyName('drinks');
      setIngredientName('strIngredient1');
      setUrlImageName('thecocktaildb');
    }
  }, []);
  const recipesResult = recipes[keyName];

  const filterIngredientFn = (recipe = {}, name) => {
    if (recipesResult) {
      const filter = Object.entries(recipe)
        .filter((value) => value[0].includes('strIngredient') && value[1] === name);
      console.log(filter);
    }
  };
  return (
    <>
      {ingredients[keyName] ? ingredients[keyName].map((value, index) => {
        const src = `https://www.${urlImageName}.com/images/ingredients/${value[ingredientName]}-Small.png`;
        return (
          <div data-testid={ `${index}-ingredient-card` } key={ index }>
            <h1 data-testid={ `${index}-card-name` }>{value[ingredientName]}</h1>
            <button
              onClick={ () => {
                filterIngredientFn(recipesResult[0], value[ingredientName]);
              } }
              type="button"
              className="effectBtn"
            >
              <img
                data-testid={ `${index}-card-img` }
                alt={ value[ingredientName] }
                src={ src }
                style={ { width: '300px' } }
              />
            </button>
          </div>
        );
      }) : null}
      ;
    </>
  );
}

export default ExploreFoodOrDrink;
