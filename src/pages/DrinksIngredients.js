import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../contexts/RecipesContext';

function DrinksIngredients() {
  const {
    mealsAndDrinkByIngredients, setMealsAndDrinkByIngredients,
  } = useContext(RecipesContext);

  useEffect(() => {
    const getIngredients = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setMealsAndDrinkByIngredients(drinks);
      console.log(mealsAndDrinkByIngredients);
    };
    getIngredients();
  }, []);

  // https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${}

  console.log(mealsAndDrinkByIngredients);

  const getTwelveIngredients = () => {
    const TWELVE = 12;
    const twelveIngredients = mealsAndDrinkByIngredients
      .filter((ingredient, index) => index < TWELVE);
    return (
      twelveIngredients.map((ingredient, index) => {
        const name = ingredient.strIngredient1;
        return (
          <Link
            to="/bebidas"
            key={ index }
            data-testid={ `${index}-ingredient-card` }
            // onClick={}
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
