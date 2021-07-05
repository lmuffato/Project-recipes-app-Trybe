import React, { useContext, useEffect, useState } from 'react';
import MealCard from '../compenents/MealCard';
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
  console.log(`MainMealsRecipes: ${mealOrDrink}`);

  useEffect(() => {
    const endpoint = `https://www.the${mealOrDrink}db.com/api/json/v1/1/search.php?s=`;
    const lastRecipe = 12;
    fetchRecipes(endpoint)
      .then((response) => {
        // setRecipes(response); // Salva as 25 receitas retornadas da API, faz um backup
        setTwelveRecipes(Object.values(response)[0].slice(0, lastRecipe));
        // setLoading(false);
      });
  }, [mealOrDrink]);
  // if (recipes !== null) {
  // }

  if (twelveRecipes !== null) {
    console.log(twelveRecipes[0]);
    if (mealOrDrink === 'meal') {
      return (
        <section className="recipes-container">
          {twelveRecipes.map((recipe, index) => (
            <MealCard
              data={ recipe }
              index={ index }
              key={ recipe.idMeal }
            />
          ))}
        </section>
      );
    }
    // return (
    //   <section className="recipes-container">
    //     <p>
    //       {twelveRecipes.map((recipe) => (
    //         <div className="recipe" key={ recipe.idMeal }>
    //           <img data-testid="recipe-photo" src={ recipe.strMealThumb } alt="Meal" />
    //         </div>
    //       ))}
    //     </p>
    //   </section>
    // );
  }
  return (
    <div>
      <p>Loading...</p>
      {/* <RecipeCard /> */}
    </div>
  );
}

export default MainMealsRecipes;
