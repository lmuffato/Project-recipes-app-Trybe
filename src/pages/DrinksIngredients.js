import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../contexts/RecipesContext';

function DrinksIngredients() {
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const {
    mealsAndDrinkByIngredients, setMealsAndDrinkByIngredients,
  } = useContext(RecipesContext);
  const TWELVE = 12;

  useEffect(() => {
    const getIngredients = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setDrinkIngredients(drinks);
    };
    getIngredients();
  }, []);

  const getRecipesByIngredient = async (param) => {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${param}`;
    const { drinks } = await fetch(endpoint).then((data) => data.json());
    setMealsAndDrinkByIngredients(drinks.slice(0, TWELVE));
  };

  console.log(mealsAndDrinkByIngredients);

  const getTwelveIngredients = () => {
    const twelveIngredients = drinkIngredients
      .filter((ingredient, index) => index < TWELVE);
    return (
      twelveIngredients.map((ingredient, index) => {
        const name = ingredient.strIngredient1;
        return (
          <Link
            to="/bebidas"
            key={ index }
            data-testid={ `${index}-ingredient-card` }
            onClick={ (e) => getRecipesByIngredient(e.target.innerText || e.target.alt) }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png` }
              alt={ name }
            />
            <p data-testid={ `${index}-card-name` }>{ name }</p>
          </Link>
        );
      })
    );
  };

  return (
    getTwelveIngredients()
  );
}

export default DrinksIngredients;
