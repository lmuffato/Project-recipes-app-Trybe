import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function FoodsIngredients() {
  const [ingredients, setIngredients] = useState([]);
  // const [selectedIngredient, setSelectedIngredient] = useState('');

  useEffect(() => {
    const getIngredients = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setIngredients(meals);
    };
    getIngredients();
  }, []);

  const getTwelveIngredients = () => {
    const TWELVE = 12;
    const twelveIngredients = ingredients
      .filter((ingredient, index) => index < TWELVE);
    return (
      twelveIngredients.map((ingredient, index) => {
        const name = ingredient.strIngredient;
        return (
          <Link
            to="/comidas"
            key={ index }
            data-testid={ `${index}-ingredient-card` }
            // Passar o nome do ingrediente para um estado global para filtra-lo por receita
            // onClick={ setSelectedIngredient(name) }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${name}-Small.png` }
              alt={ name }
            />
            <p data-testid={ `${index}-card-name` }>{ name }</p>
          </Link>
        );
      })
    );
  };

  console.log(ingredients);

  return (
    getTwelveIngredients()
  );
}

export default FoodsIngredients;
