import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DrinkCards from '../compenents/DrinkCards';
import MealCards from '../compenents/MealCards';
// import RecipeCard from '../compenents/RecipeCard';
import SearchbarContext from '../contexts/SearchbarContext';
import apiRequester from '../services/fetchApi';
import '../styles/MealAndDrinkCards.css';

// Usar o contexto mealOrDrink pra fazer a requisição https://www.the${mealOrDrink}db.com/api/json/v1/1/search.php?s=

function MainMealsRecipes() {
  // const [recipes, setRecipes] = useState(null); // Guarda as 25 receitas vindas da API, sendo um backup
  const [twelveRecipes, setTwelveRecipes] = useState(null);
  const [categories, setCategories] = useState(null);
  // const [loading, setLoading] = useState(false);

  const { mealOrDrink } = useContext(SearchbarContext);

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
    const endpointMealOrDrink = `https://www.the${type}db.com/api/json/v1/1/search.php?s=`;
    const endpointCategories = `https://www.the${type}db.com/api/json/v1/1/list.php?c=list`;
    const lastRecipe = 12;
    const lastCategory = 5;
    apiRequester(endpointMealOrDrink)
      .then((response) => {
        // setRecipes(response); // Salva as 25 receitas retornadas da API, faz um backup
        setTwelveRecipes(Object.values(response)[0].slice(0, lastRecipe));
        // setLoading(false);
      });
    apiRequester(endpointCategories)
      .then((response) => {
        console.log(Object.values(response)[0]);
        setCategories(Object.values(response)[0].slice(0, lastCategory));
      });
  }, [type]);

  if (twelveRecipes !== null && categories !== null) {
    // let categoriesList = [];
    // categoriesList = twelveRecipes
    //   .map((recipe) => recipe.strCategory)
    //   .filter((recipe, index, array) => array.indexOf(recipe) === index)
    //   .slice(0, lastCategory);
    console.log(twelveRecipes[0]);
    console.log(categories);
    if (type === 'meal') {
      return (
        <>
          <section>
            <button type="button">All</button>
            {categories.map(({ strCategory }, index) => (
              <button
                key={ index }
                type="button"
                data-testid={ `${strCategory}-category-filter` }
              >
                { strCategory }
              </button>
            ))}
          </section>
          <section className="recipes-container">
            {twelveRecipes.map((recipe, index) => (
              <MealCards
                data={ recipe }
                index={ index }
                key={ recipe.idMeal }
              />
            ))}
          </section>
        </>
      );
    }
    return (
      <>
        <section>
          <button type="button">All</button>
          {categories.map(({ strCategory }, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `${strCategory}-category-filter` }
            >
              { strCategory }
            </button>
          ))}
        </section>
        <section className="recipes-container">
          {twelveRecipes.map((recipe, index) => (
            <DrinkCards
              data={ recipe }
              index={ index }
              key={ recipe.idDrink }
            />
          ))}
        </section>
      </>
    );
  }
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

export default MainMealsRecipes;
