import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../contexts/RecipesContext';

function FoodsIngredients() {
  const {
    ingredients, setIngredients,
    setMealsAndDrinkByIngredients, mealsAndDrinkByIngredients,
  } = useContext(RecipesContext);
  const TWELVE = 12;

  const getRecipesByIngredients = async (param) => {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${param}`;
    const { meals } = await fetch(endpoint).then((data) => data.json());
    console.log(meals);
    setMealsAndDrinkByIngredients(meals.slice(0, TWELVE));
  };

  console.log(mealsAndDrinkByIngredients);

  useEffect(() => {
    const getIngredients = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setIngredients(meals);
    };
    getIngredients();
  }, []);

  const getTwelveIngredients = () => {
    const twelveIngredients = ingredients
      .filter((ingredient, index) => index < TWELVE);
    return (
      twelveIngredients.map((eachIngredient, index) => {
        const name = eachIngredient.strIngredient;
        return (
          <Link
            to="/comidas"
            data-testid={ `${index}-ingredient-card` }
            key={ index }
            onClick={ (e) => getRecipesByIngredients(e.target.alt || e.target.innerText) }
          >
            <div>
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${name}-Small.png` }
                alt={ name }
              />
              <p
                value={ name }
                data-testid={ `${index}-card-name` }
              >
                { name }
              </p>
            </div>
          </Link>
        );
      })
    );
  };

  return (
    getTwelveIngredients()
  );
}

export default FoodsIngredients;
