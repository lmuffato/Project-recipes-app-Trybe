import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function ExploreIngredients({ type }) {
  const [ingredients, setIngredients] = useState([]);
  const i = useParams();
  console.log(type);
  console.log(i);
  const MAX_INGREDIENTS = 12;

  const fetchIngredientsFood = useCallback(async () => {
    if (type === 'meals') {
      const data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const ingredientsFood = await data.json();
      console.log(ingredientsFood.meals.slice(0, MAX_INGREDIENTS));
      setIngredients(ingredientsFood.meals.slice(0, MAX_INGREDIENTS));
    }
    if (type === 'drinks') {
      const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const ingredientsDrink = await data.json();
      console.log(ingredientsDrink.drinks.slice(0, MAX_INGREDIENTS)); // .meals.slice(0, MAX_INGREDIENTS));
      setIngredients(ingredientsDrink.drinks.slice(0, MAX_INGREDIENTS));
    }
  }, [type]);

  useEffect(() => {
    fetchIngredientsFood();
  }, [fetchIngredientsFood]);
  console.log(ingredients);

  return (
    <div>
      <Header>
        <h2 data-testid="page-title">Explorar Ingredientes</h2>
      </Header>
      {ingredients.map((ingredient, index) => {
        const imgUrl = type === 'meals'
          ? `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`
          : `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png`;
        return (
          <section key={ index }>
            <div data-testid={ `${index}-ingredient-card` }>
              <div className="img-wrapper">
                <img
                  data-testid={ `${index}-card-img` }
                  // style={ { maxWidth: '100px' } }
                  src={ imgUrl }
                  alt="Ingredient food/drink"
                />
              </div>
              <div className="card-info">
                <p data-testid={ `${index}-card-name` }>
                  {ingredient.strIngredient1 || ingredient.strIngredient}
                </p>
              </div>
            </div>
          </section>
        );
      })}
      <Footer />
    </div>
  );
}

ExploreIngredients.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ExploreIngredients;
