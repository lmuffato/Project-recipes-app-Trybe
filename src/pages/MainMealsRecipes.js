import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DrinkCards from '../compenents/DrinkCards';
import MealCards from '../compenents/MealCards';
// import RecipeCard from '../compenents/RecipeCard';
import SearchbarContext from '../contexts/SearchbarContext';
import fetchRecipes from '../services/fetchApi';
import '../styles/MealAndDrinkCards.css';

// Usar o contexto mealOrDrink pra fazer a requisição https://www.the${mealOrDrink}db.com/api/json/v1/1/search.php?s=

function MainMealsRecipes() {
  // const [recipes, setRecipes] = useState(null);
  const [twelveRecipes, setTwelveRecipes] = useState(null);
  // const [loading, setLoading] = useState(false);

  const { mealOrDrink } = useContext(SearchbarContext);
  // console.log(`MainMealsRecipes: ${mealOrDrink}`);

  let type;
  const history = useHistory();

  console.log(history.location.pathname);
  if (history.location.pathname === '/bebidas' || mealOrDrink === 'cocktail') {
    console.log('Bebida');
    type = 'cocktail';
  } else if (history.location.pathname === '/comidas' || mealOrDrink === 'meal') {
    type = 'meal';
  }

  useEffect(() => {
    const endpoint = `https://www.the${type}db.com/api/json/v1/1/search.php?s=`;
    const lastRecipe = 12;
    fetchRecipes(endpoint)
      .then((response) => {
        // setRecipes(response); // Salva as 25 receitas retornadas da API, faz um backup
        setTwelveRecipes(Object.values(response)[0].slice(0, lastRecipe));
        // setLoading(false);
      });
  }, [type]);

  if (twelveRecipes !== null) {
    console.log(twelveRecipes[0]);
    if (type === 'meal') {
      return (
        <section className="recipes-container">
          {twelveRecipes.map((recipe, index) => (
            <MealCards
              data={ recipe }
              index={ index }
              key={ recipe.idMeal }
            />
          ))}
        </section>
      );
    }
    return (
      <section className="recipes-container">
        {twelveRecipes.map((recipe, index) => (
          <DrinkCards
            data={ recipe }
            index={ index }
            key={ recipe.idDrink }
          />
        ))}
      </section>
    );
  }
  return (
    <div>
      <p>Loading...</p>
      {/* <RecipeCard /> */}
    </div>
  );
}

export default MainMealsRecipes;
