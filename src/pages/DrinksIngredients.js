import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function DrinksIngredients() {
  const [ingredientsDrink, setIngredientsDrink] = useState([]);

  useEffect(() => {
    const getIngredients = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setIngredientsDrink(drinks);
    };
    getIngredients();
  }, []);

  console.log(ingredientsDrink);

  const getTwelveIngredients = () => {
    const TWELVE = 12;
    const twelveIngredients = ingredientsDrink
      .filter((ingredient, index) => index < TWELVE);
    return (
      twelveIngredients.map((ingredient, index) => {
        const name = ingredient.strIngredient1;
        return (
          <Link to="/bebidas" key={ index } data-testid={ `${index}-ingredient-card` }>
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
